const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
const { validateApunte, validatePartialApunte } = require('../schemas/apunte');
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

const Apunte = sequelize.define('Apunte', {
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

function createApunte(data) {
  const { error } = validateApunte(data);
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  
  data.fecha_hora_publicacion = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');

  return Apunte.create(data);
}


function getAllApuntes() {
  return Apunte.findAll();
}

function getApunteById(id) {
  return Apunte.findByPk(id);
}

function getApunteByIdMateria(idMateria) {
  return Apunte.findAll({where: {cod_materia: idMateria}, order:[['calificacion_apunte', 'DESC']]});
} 

function getApunteByIdAlumno(idAlumno) {
  return Apunte.findAll({
    where: { numero_alumno: idAlumno },
    order: [['fecha_hora_publicacion', 'DESC']]
  });
}

async function updateApunte(id, data) {
  const { error } = validatePartialApunte(data); 
  if (error) {
    throw new Error(error.details.map(err => err.message).join(', '));
  }

  const apunte = await Apunte.findByPk(id);
  if (!apunte) {
    throw new Error('Apunte no encontrado');
  }

  return apunte.update(data);
}








function deleteApunte(id) {
  return Apunte.findByPk(id).then(apunte => {
    if (apunte) {
      return apunte.destroy().then(() => true);
    }
    throw new Error('Apunte no encontrado');
  });
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
  createApunte,
  getAllApuntes,
  getApunteById,
  updateApunte,
  deleteApunte,
  getApunteByIdMateria,
  getApunteByIdAlumno,
};


// npm install pdf-lib sharp