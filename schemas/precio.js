const Joi = require('joi');


const validatePrecio = (data) => {
  const schema = Joi.object({
    id_apunte: Joi.number().integer().required(),
    fecha_hora_inicio_precio: Joi.date().optional(),  
    fecha_hora_fin_precio: Joi.date().optional().allow(null), 
    monto_precio: Joi.number().integer().required(),  
  });

  return schema.validate(data);
};


const validatePartialPrecio = (data) => {
  const schema = Joi.object({
    fecha_hora_inicio_precio: Joi.date().optional(),
    fecha_hora_fin_precio: Joi.date().required(),  
    monto_precio: Joi.number().integer().optional(),
  });

  return schema.validate(data);
};

module.exports = { validatePrecio, validatePartialPrecio };
