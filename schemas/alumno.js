import Joi from 'joi';

export const validateAlumno = (data) => {
    const schema = Joi.object({
        nombre_apellido_alumno: Joi.string().max(45).required(),
        email_usuario: Joi.string().max(45).required(),
        nombre_usuario: Joi.string().max(45).required(),
        telefono_usuario: Joi.string().max(15).required(),
        contraseña_usuario: Joi.string().max(45).required(),
        legajo_usuario: Joi.number().integer().required(),
        reputacion_usuario: Joi.number().integer().allow(null),
        motivo_suspension: Joi.string().max(45).allow(null),
        numero_admin: Joi.number().integer().allow(null),
        CVU_MP: Joi.number().integer().required(),
    });
    return schema.validate(data);
};

export const validatePartialAlumno = (data) => {
    const schema = Joi.object({
        nombre_apellido_alumno: Joi.string().max(45).optional(),
        email_usuario: Joi.string().max(45).optional(),
        nombre_usuario: Joi.string().max(45).optional(),
        telefono_usuario: Joi.string().max(15).optional(),
        contraseña_usuario: Joi.string().max(45).optional(),
        legajo_usuario: Joi.number().integer().optional(),
        reputacion_usuario: Joi.number().integer().allow(null),
        motivo_suspension: Joi.string().max(45).allow(null),
        numero_admin: Joi.number().integer().allow(null),
        CVU_MP: Joi.number().integer().allow(null),
    });
    return schema.validate(data);
};