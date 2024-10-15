const { Sequelize, DataTypes } = require('sequelize');
const moment = require('moment-timezone');
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

const Apunte = require('./apunte');
const { validatePrecio, validatePartialPrecio } = require('../schemas/precio');

const Precio = sequelize.define('Precio', {
  id_apunte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Apunte,
      key: 'id_apunte',
    },
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
    primaryKey: true,
  },
  fecha_hora_inicio_precio: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
  },
  fecha_hora_fin_precio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  monto_precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'precio',
  timestamps: false,
});

async function createPrecio(data) {
    const { error } = validatePrecio(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    
    const currentDate = moment().tz("America/Argentina/Buenos_Aires").toDate();
    data.fecha_hora_inicio_precio = currentDate;

    const latestPrice = await Precio.findOne({
        where: { id_apunte: data.id_apunte },
        order: [['fecha_hora_inicio_precio', 'DESC']]
    });

    if (latestPrice) {
        latestPrice.fecha_hora_fin_precio = currentDate;
        await latestPrice.save();
    }

    return Precio.create(data);
}

function getPrecioApunte(idApunte) {
    return Precio.findOne({
        where: { id_apunte: idApunte },
        order: [['fecha_hora_inicio_precio', 'DESC']]
    });
}

function updatePrecio(id, data) {
    const { error } = validatePartialPrecio(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }

    return Precio.findByPk(id).then(precio => {
        if (precio) {
            return precio.update(data);
        }
        throw new Error('El precio no se pudo modificar');
    });
}

(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo Precio sincronizado con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar el modelo Precio con la base de datos:', error);
    }
})();

module.exports = {
    createPrecio,
    getPrecioApunte,
    updatePrecio,
}
