import Joi from 'joi';

export const validateModificacionMateria = (data) => {
    const schema = Joi.object({
        cod_materia: Joi.number().integer().required(),
        desc_mod_materia: Joi.string().max(60).required(),
        fecha_hora_mod_materia: Joi.date().optional(),
    });

    return schema.validate(data);
};

export const validatePartialModificacionMateria = (data) => {
    const schema = Joi.object({
        desc_mod_materia: Joi.string().max(60).optional(),
        fecha_hora_mod_materia: Joi.date().optional(),
    });

    return schema.validate(data);
};

