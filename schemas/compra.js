import Joi from 'joi';

export const validateCompra = (data) => {
  const schema = Joi.object({
    numero_alumno: Joi.number().integer().required(),
    id_apunte: Joi.number().integer().required(),
    fecha_hora_compra: Joi.date().optional(), 
    calificacion_apunte_comprador: Joi.number().integer().min(0).max(10).optional(),
  });

  return schema.validate(data);
};

export const validatePartialCompra = (data) => {
  const schema = Joi.object({
    calificacion_apunte_comprador: Joi.number().integer().min(0).max(10).required(),
  });

  return schema.validate(data);
};
