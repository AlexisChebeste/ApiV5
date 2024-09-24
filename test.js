const serieSchema = require('./src/schemas/series.schema')

const resultado = serieSchema.validate({
    nombre: "a",
    plataforma: 'Star+',
    disponible: true
}, {abortEarly: false})


console.log(resultado.error.details)

