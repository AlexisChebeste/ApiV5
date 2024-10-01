const { Router } = require('express')
const seriesController= require('../controllers/series.controller')
const temporadasController = require('../controllers/temporadas.controller')
const {seriesMiddleware} = require('../middlewares')
const schemaValidator = require('../middlewares/schemaValidator')
const serieSchema = require('../schemas/series.schema')
const temporadaSchema = require('../schemas/temporadas.schema')
const route = Router()

route.get('/series', seriesController.getAllSeries )

route.get('/series/:id', 
    seriesMiddleware.validateIdSerie, 
    seriesController.getSerieById)

route.get('/series/:id/temporadas', 
    seriesMiddleware.validateIdSerie, 
    temporadasController.getTemporadasBySerie )

route.delete('/series/:id',
    seriesMiddleware.validateIdSerie, 
    seriesController.deleteById)

route.post('/series', schemaValidator(serieSchema) ,seriesController.createSerie)

route.post('/series/:id/temporadas', 
    seriesMiddleware.validateIdSerie, 
    schemaValidator(temporadaSchema),
    temporadasController.createTemporada )

route.put('/series/:id', 
    seriesMiddleware.validateIdSerie, 
    seriesController.updateSerie)

module.exports = route