import { Sequelize, DataTypes } from 'sequelize';
import moment from 'moment-timezone';
import { validateAlumno, validatePartialAlumno } from '../schemas/alumno.js';
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

export const Alumno = sequelize.define('Alumno', {
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
    },
    rol_usuario: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    tableName: 'alumno',
    timestamps: false
});

export function createAlumno(data) {
    const { error } = validateAlumno(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    return Alumno.create(data);
}

export function getAlumnoById(id) {
    return Alumno.findByPk(id);
}

export async function updateAlumno(id, data) {
    const alumno = await Alumno.findByPk(id);
    if (!alumno) {
        throw new Error('Alumno no encontrado');
    }
    const { error } = validatePartialAlumno(data);
    if (error) {
        throw new Error(error.details.map(err => err.message).join(', '));
    }
    return alumno.update(data);
}

export function getAlumnoByLegajo(legajo) {
    return Alumno.findOne({ where: { legajo_usuario: legajo } });
}

export function getAlumnoByEmail(email) {
    return Alumno.findOne({ where: { email_usuario: email } });
}

export function getAlumnoByNombreUsuario(nombreUsuario) {
    return Alumno.findOne({ where: { nombre_usuario: nombreUsuario } });
}

(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo sincronizado con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar el modelo con la base de datos:', error);
    }
})();