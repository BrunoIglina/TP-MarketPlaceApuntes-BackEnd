import { Op, Model, DataTypes, NOW } from 'sequelize';
import {sequelize} from './sequelize.js'; 
import {ApunteModel} from './apunte.js'; 
import moment from 'moment-timezone';
import dotenv from 'dotenv';
import { validateCompra, validatePartialCompra } from '../schemas/compra.js';

dotenv.config();

export const CompraModel = sequelize.define('Compra', {
  numero_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_apunte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  fecha_hora_compra: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss'),
  },
  calificacion_apunte_comprador: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'compra',
  timestamps: false,
});

// Definición de relaciones
CompraModel.belongsTo(ApunteModel, { foreignKey: 'id_apunte', as: 'apunte' });
ApunteModel.hasMany(CompraModel, { foreignKey: 'id_apunte', as: 'compras' });

export async function createCompra(data) {
  const { error } = validateCompra(data);
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  const compra = await CompraModel.create({
    numero_alumno: data.numero_alumno,
    id_apunte: data.id_apunte,
    fecha_hora_compra: moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss'),
    calificacion_apunte_comprador: data.calificacion_apunte_comprador || null, 
  });
  return compra;
}

export async function updateCompra({ numero_alumno, id_apunte, calificacion_apunte_comprador }) {
  const { error } = validatePartialCompra({ calificacion_apunte_comprador });
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  try {
    const compra = await CompraModel.findOne({
      where: { numero_alumno, id_apunte }
    });

    if (!compra) {
      throw new Error('Compra no encontrada');
    }

    compra.calificacion_apunte_comprador = calificacion_apunte_comprador;
    await compra.save();

    await updateCalificacionPromedio(id_apunte);
    return compra;
  } catch (error) {
    throw new Error(`Error al actualizar la compra: ${error.message}`);
  }
}

export async function GetCompras(numero_alumno1) {
  const compras = await CompraModel.findAll({
    where: { numero_alumno: numero_alumno1 },
    include: [{
      model: ApunteModel,
      as: 'apunte',
      attributes: ['id_apunte', 'titulo_apunte', 'descripcion_apunte', 'calificacion_apunte', 'fecha_hora_publicacion', 'archivo_caratula']
    }],
    order: [[{ model: ApunteModel, as: 'apunte' }, 'fecha_hora_publicacion', 'DESC']] 
  });

  const apuntes = compras.map(compra => compra.apunte);
  return apuntes;
}

export async function GetCompra(numero_alumno1, id_apunte1) {
  const compra = await CompraModel.findOne({
    where: { numero_alumno: numero_alumno1, id_apunte: id_apunte1 }
  });
  return compra;
}

export async function updateCalificacionPromedio(id_apunte) {
  const [results] = await sequelize.query(
    'SELECT AVG(calificacion_apunte_comprador) AS promedio_calificacion FROM compra WHERE id_apunte = ?',
    { replacements: [id_apunte] }
  );

  if (results[0].promedio_calificacion !== null) {
    const promedio = Math.round(results[0].promedio_calificacion);
    return ApunteModel.update({ calificacion_apunte: promedio }, { where: { id_apunte } });
  }
}

