const Joi = require('joi')

const validateAlumno = (data) => {
    const schema = Joi.object({
        numero_usuario: Joi.string().max(45).required(),
        nombre_apellido_alumno:Joi.string().max(45).required(),
        email_usuario: Joi.string().max(45).required(),
        nombre_usuario: Joi.string().max(45).required(),
        telefono_usuario: Joi.string().max(15).required(),
        contraseña_usuario: Joi.string().max(45).required(),
        legajo_usuario: Joi.number().integer().required(),
        reputacion_usuario: Joi.number().integer().allow(null),
        fecha_hora_suspension: Joi.date.optional, 
        motivo_suspension: Joi.string().max(45).allow(null),
        duracion_suspension: Joi.time().allow(null),
        numero_admin: Joi.number().integer().allow(null),
        CVU_MP: Joi.number().integer().allow(null),
    })

    return schema.validate(data)
}

const validatePartialAlumno = (data) => {
    const schema = Joi.object({
        numero_usuario: Joi.string().max(45).required(),
        nombre_apellido_alumno:Joi.string().max(45).required(),
        email_usuario: Joi.string().max(45).required(),
        nombre_usuario: Joi.string().max(45).required(),
        telefono_usuario: Joi.string().max(15).required(),
        contraseña_usuario: Joi.string().max(45).required(),
        legajo_usuario: Joi.number().integer().required(),
        reputacion_usuario: Joi.number().integer().allow(null),
        fecha_hora_suspension: Joi.date.optional, 
        motivo_suspension: Joi.string().max(45).allow(null),
        duracion_suspension: Joi.time().allow(null),
        numero_admin: Joi.number().integer().allow(null),
        CVU_MP: Joi.number().integer().allow(null),
    })

    return schema.validate(data)      
}

module.exports = {validateAlumno, validatePartialAlumno}