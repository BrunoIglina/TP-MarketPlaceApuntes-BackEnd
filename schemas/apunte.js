import Joi from 'joi';

export const validateApunte = (data) => {
  const schema = Joi.object({
    titulo_apunte: Joi.string().max(45).required(),
    descripcion_apunte: Joi.string().max(45).optional().allow(null),
    calificacion_apunte: Joi.number().integer().optional(),
    fecha_hora_publicacion: Joi.date().optional(),
    numero_alumno: Joi.number().integer().required(),
    cod_materia: Joi.number().integer().required(),
    archivo_apunte: Joi.binary().required(),
    archivo_caratula: Joi.binary().required(),
  });

  return schema.validate(data);
};

export const validatePartialApunte = (data) => {
  const schema = Joi.object({
    titulo_apunte: Joi.string().max(45).optional(),
    descripcion_apunte: Joi.string().max(45).optional().allow(null),
    calificacion_apunte: Joi.number().integer().optional(),
    fecha_hora_publicacion: Joi.date().optional(),
    numero_alumno: Joi.number().integer().optional(),
    cod_materia: Joi.number().integer().optional(),
    archivo_apunte: Joi.binary().optional(),
    archivo_caratula: Joi.binary().optional(),
  });

  return schema.validate(data);
};
