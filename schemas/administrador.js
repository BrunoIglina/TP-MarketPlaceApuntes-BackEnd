import Joi from 'joi';

export const validateAdministrador = (data) => {
    const schema = Joi.object({
        nombre_apellido_alumno: Joi.string().max(45).required(),
        email_usuario: Joi.string().max(45).required(),
        nombre_usuario: Joi.string().max(45).required(),
        telefono_usuario: Joi.string().max(15).required(),
        contraseña_usuario: Joi.string().max(45).required(),
        rol_usuario: Joi.string().max(45).required(),
    });
    return schema.validate(data);
};

export const validatePartialAdministrador = (data) => {
    const schema = Joi.object({
        nombre_apellido_alumno: Joi.string().max(45).optional(),
        email_usuario: Joi.string().max(45).optional(),
        nombre_usuario: Joi.string().max(45).optional(),
        telefono_usuario: Joi.string().max(15).optional(),
        contraseña_usuario: Joi.string().max(45).optional(),
        rol_usuario: Joi.string().max(45).optional(),
    });
    return schema.validate(data);
};