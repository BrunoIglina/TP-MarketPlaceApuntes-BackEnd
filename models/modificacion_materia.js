import { DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import { sequelize } from '../config/database.js';
import { validateModificacionMateria } from '../schemas/modificacion_materia.js';

export const ModificacionMateria = sequelize.define('ModificacionMateria', {
    cod_materia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    fecha_hora_mod_materia: {
        type: DataTypes.DATE,
        primaryKey: true,
        allowNull: false,
    },
    desc_mod_materia: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
}, {
    tableName: 'modificacion_materia',
    timestamps: false,
});

export async function createModificacionMateria(data) {
    const { error } = validateModificacionMateria(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }

    data.fecha_hora_mod_materia = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
    return ModificacionMateria.create(data);
}

export async function getModificacionMateriaById(cod_materia, fecha_hora_mod_materia) {
    return ModificacionMateria.findOne({
        where: { cod_materia, fecha_hora_mod_materia }
    });
}

export async function getAllModificacionesMateria() {
    return ModificacionMateria.findAll();
}

(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo ModificacionMateria sincronizado con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar el modelo ModificacionMateria con la base de datos:', error);
    }
})();

