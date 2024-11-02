const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
// const { validateApunte, validatePartialApunte } = require('../schemas/apunte'); // Hacer para alumno
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// CREACIÓN DE LA INSTANCIA ALUMNO
const Alumno = sequelize.define('Alumno', {
    numero_usuario: {
        type: DataTypes.STRING(45),
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_apellido_alumno: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    email_usuario: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    nombre_usuario: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    telefono_usuario: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    contraseña_usuario: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    legajo_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reputacion_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_hora_suspension: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    motivo_suspension: {
        type: DataTypes.STRING(60),
        allowNull: true,
    },
    duracion_suspension: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    numero_admin: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CVU_MP: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'alumno',
    timestamps: false
}) 

function createAlumno(data) {
    const { error } = validateAlumno(data)
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '))
    }
}

function getAlumnoById (id) {
    return Alumno.findByPk(id)
}

async function updateAlumno(id, data) {
    const { error } = validatePartialAlumno(data); 
    if (error) {
      throw new Error(error.details.map(err => err.message).join(', '));
    }
  
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
      throw new Error('Alumno no encontrado');
    }
  
    return alumno.update(data);
  }

  (async () => {
    try {
      await sequelize.sync();
      console.log('Modelo sincronizado con la base de datos.');
    } catch (error) {
      console.error('Error al sincronizar el modelo con la base de datos:', error);
    }
  })();

  module.exports = {
    createAlumno,
    getAlumnoById,
    updateAlumno
  }