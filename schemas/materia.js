import Joi from 'joi';

export const validateMateria = (data) => {
    const schema = Joi.object({
    nombre_materia: Joi.string().max(45).required(),
    nivel_carrera: Joi.number().integer().required(),
    numero_admin: Joi.number().integer().required(),
    });

    return schema.validate(data);
};

export const validatePartialMateria = (data) => {
    const schema = Joi.object({
    nombre_materia: Joi.string().max(45).optional(),
    nivel_carrera: Joi.number().integer().optional(),
    numero_admin: Joi.number().integer().optional(),
    });

    return schema.validate(data);
};
