import { DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import { sequelize } from '../config/database.js';
import { validateMateria, validatePartialMateria } from '../schemas/materia.js';

export const Materia = sequelize.define('Materia', {
    cod_materia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_materia: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    nivel_carrera: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_hora_alta_materia: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    numero_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado_materia: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: 'A',
    }
}, {
    tableName: 'materia',
    timestamps: false,
});

export async function createMateria(data) {
    const { error } = validateMateria(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    if (!data.estado_materia) {
        data.estado_materia = 'A';
    }

    data.fecha_hora_alta_materia = moment.tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
    return Materia.create(data);
}

export async function getMateriaById(id) {
    return Materia.findOne({ where: { cod_materia: id, estado_materia: 'A' } });
}

export async function getAllMaterias() {
    return Materia.findAll({ where: { estado_materia: 'A' } });
}

export async function updateMateria(id, data) {
    const { error } = validatePartialMateria(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }

    const materia = await Materia.findByPk(id);
    if (!materia) {
        throw new Error('Materia no encontrada');
    }

    return materia.update(data);
}

export async function deleteMateria(id) {
    const materia = await Materia.findByPk(id);
    if (materia) {
        return materia.update({ estado_materia: 'N' });
    }
    throw new Error('Materia no encontrada');
}


export async function restoreMateria(id) {
    const materia = await Materia.findOne({ where: { cod_materia: id, estado_materia: 'N' } });
    if (!materia) {
        return null;
    }
    return materia.update({ estado_materia: 'A' });
}


export async function getAllMateriasBajas() {
  return Materia.findAll({
    where: { estado_materia: 'N' },
  });
}


(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo Materia sincronizado con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar el modelo Materia con la base de datos:', error);
    }
})();

