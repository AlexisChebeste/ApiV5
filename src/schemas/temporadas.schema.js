const Joi = require('joi')
const validateDate = require('../utils/date.validator')


const temporadaSchema = Joi.object().keys(
    {
        descripcion: Joi.string().required().min(3).max(255).messages({
            "any.required":"Nombre es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max":"Debe tener como maximo {#limit} caracteres",
            "string.empty": "Nombre no puede ser vacio"
        }),
        fechaInicio: Joi.string().custom(validateDate).required().messages(
            {
                "any.custom": "El formato de la fecha debe ser YYYY-MM-DD",
                "any.required":"fechaInicio es requerido",
            }
        ),
        capitulos: Joi.number().min(1).max(100).required().messages({
            "any.required":"capitulos es requerido",
            "number.min": "Debe tener como minimo {#limit} caracteres",
            "number.max":"Debe tener como maximo {#limit} caracteres"
        })
    }
)

module.exports = temporadaSchema