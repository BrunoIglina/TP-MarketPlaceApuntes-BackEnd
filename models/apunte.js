import { Op, Model, DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import { sequelize } from './sequelize.js';
import dotenv from 'dotenv';
import { validateApunte, validatePartialApunte } from '../schemas/apunte.js';

dotenv.config();

export const ApunteModel = sequelize.define('Apunte', {
  id_apunte: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo_apunte: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  descripcion_apunte: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  calificacion_apunte: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fecha_hora_publicacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  numero_alumno: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cod_materia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  archivo_apunte: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  archivo_caratula: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
}, {
  tableName: 'apunte',
  timestamps: false,
});


export async function createApunte(data) {
  const { error } = validateApunte(data);
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  data.fecha_hora_publicacion = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
  return ApunteModel.create(data); 
}

export async function getAllApuntes() {
  return ApunteModel.findAll();
}

export async function getApunteById(id) {
  return ApunteModel.findByPk(id);
}

export async function getApunteByIdMateria(idMateria) {
  return ApunteModel.findAll({
    where: { cod_materia: idMateria },
    order: [['calificacion_apunte', 'DESC']],
  });
}

export async function getApunteByIdAlumno(idAlumno) {
  return ApunteModel.findAll({
    where: { numero_alumno: idAlumno },
    order: [['fecha_hora_publicacion', 'DESC']],
  });
}

export async function updateApunte(id, data) {
  const { error } = validatePartialApunte(data);
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  const apunte = await ApunteModel.findByPk(id);
  if (!apunte) {
    throw new Error('Apunte no encontrado');
  }

  return apunte.update(data);
}

export async function deleteApunte(id) {
  const apunte = await ApunteModel.findByPk(id);
  if (apunte) {
    return apunte.destroy().then(() => true);
  }
  throw new Error('Apunte no encontrado');
}

// Sincronización del modelo con la base de datos
(async () => {
  try {
    await sequelize.sync();
    console.log('Modelo sincronizado con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  }
})();
