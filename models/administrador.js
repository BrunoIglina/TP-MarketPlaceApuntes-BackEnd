import { Sequelize, DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import { validateAdministrador, validatePartialAdministrador } from '../schemas/administrador.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);


export const Administrador = sequelize.define('Administrador', {
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
    rol_usuario: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    tableName: 'administrador',
    timestamps: false
});

export function createAdministrador(data) {
    const { error } = validateAdministrador(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    return Administrador.create(data);
}

export async function updateAdministrador(id, data) {
    const administrador = await Administrador.findByPk(id);
    if (!administrador) {
        throw new Error('Administrador no encontrado');
    }
    const { error } = validatePartialAdministrador(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    return administrador.update(data);
}

export function getAdministradorByEmail(email) {
    return Administrador.findOne({ where: { email_usuario: email } });
}

export function getAdministradorByNombreUsuario(nombreUsuario) {
    return Administrador.findOne({ where: { nombre_usuario: nombreUsuario } });
}

(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo sincronizado con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar el modelo con la base de datos:', error);
    }
})();