const Joi = require('joi')

const serieSchema = Joi.object().keys(
    {
        nombre: Joi.string().required().min(3).max(255).messages({
            "any.required":"Nombre es requerido",
            "string.min": "Debe tener como minimo {#limit} caracteres",
            "string.max":"Debe tener como maximo {#limit} caracteres",
            "string.empty": "Nombre no puede ser vacio"
        }),
        plataforma: Joi.string().required().valid("Netflix","Star+","Flow").messages(
            {
                "string.required":"Plataforma es requerido",
                "any.only":"Las plataformas disponibles son Netflix, Star+, Flow"
            }
        ),
        disponible: Joi.boolean().required().messages({
            "any.required":"Disponible es requerido"
        })
    }
)

module.exports = serieSchema