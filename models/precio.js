import { DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import dotenv from 'dotenv';
import { validatePrecio, validatePartialPrecio } from '../schemas/precio.js';
import { sequelize } from './sequelize.js'; // Asegúrate de importar sequelize desde este archivo
import { ApunteModel } from './apunte.js';

dotenv.config();

export const PrecioModel = sequelize.define('Precio', {
  id_apunte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ApunteModel,
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

export async function createPrecio(data) {
    const { error } = validatePrecio(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    
    const currentDate = moment().tz("America/Argentina/Buenos_Aires").toDate();
    data.fecha_hora_inicio_precio = currentDate;

    const latestPrice = await PrecioModel.findOne({
        where: { id_apunte: data.id_apunte },
        order: [['fecha_hora_inicio_precio', 'DESC']]
    });

    if (latestPrice) {
        latestPrice.fecha_hora_fin_precio = currentDate;
        await latestPrice.save();
    }

    return PrecioModel.create(data);
}

export function getPrecioApunte(idApunte) {
    return PrecioModel.findOne({
        where: { id_apunte: idApunte },
        order: [['fecha_hora_inicio_precio', 'DESC']]
    });
}

export function updatePrecio(id, data) {
    const { error } = validatePartialPrecio(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }

    return PrecioModel.findByPk(id).then(precio => {
        if (precio) {
            return PrecioModel.update(data);
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


