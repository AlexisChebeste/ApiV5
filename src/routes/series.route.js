const { Router } = require('express')
const seriesController= require('../controllers/series.controller')
const {seriesMiddleware} = require('../middlewares')
const route = Router()

route.get('/series', seriesController.getAllSeries )

route.get('/series/:id', 
    seriesMiddleware.validateIdSerie, 
    seriesController.getSerieById)

route.delete('/series/:id',
    seriesMiddleware.validateIdSerie, 
    seriesController.deleteById)

route.post('/series', seriesController.createSerie)



module.exports = route