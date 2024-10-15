const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
require('dotenv').config();
const { validateCompra, validatePartialCompra } = require('../schemas/compra'); 
const Apunte = require('./apunte'); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const Compra = sequelize.define('Compra', {
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


async function createCompra(data) {
  // Validar los datos de la compra
  const { error } = validateCompra(data);
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  // Crear la compra
  const compra = await Compra.create({
    numero_alumno: data.numero_alumno,
    id_apunte: data.id_apunte,
    fecha_hora_compra: moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss'),
    calificacion_apunte_comprador: data.calificacion_apunte_comprador || null, // Asignar calificación si está presente
  });
  return compra;
}

async function updateCompra({ numero_alumno, id_apunte, calificacion_apunte_comprador }) {
  // Validar la calificación de la compra
  const { error } = validatePartialCompra({ calificacion_apunte_comprador });
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  try {
    const compra = await Compra.findOne({
      where: { numero_alumno, id_apunte }
    });

    if (!compra) {
      throw new Error('Compra no encontrada');
    }

    // Actualizar la calificación
    compra.calificacion_apunte_comprador = calificacion_apunte_comprador;
    await compra.save();

    // Actualizar el promedio de calificación del apunte
    await updateCalificacionPromedio(id_apunte);
    return compra;
  } catch (error) {
    throw new Error(`Error al actualizar la compra: ${error.message}`);
  }
}



  
 
async function updateCalificacionPromedio(id_apunte) {
    const [results] = await sequelize.query(
        'SELECT AVG(calificacion_apunte_comprador) AS promedio_calificacion FROM compra WHERE id_apunte = ?',
        { replacements: [id_apunte] }
    );

    if (results[0].promedio_calificacion !== null) {
        const promedio = Math.round(results[0].promedio_calificacion);

        
        return Apunte.updateApunte(id_apunte, { calificacion_apunte: promedio });
    }
}

module.exports = {
  createCompra,
  updateCompra,
};
