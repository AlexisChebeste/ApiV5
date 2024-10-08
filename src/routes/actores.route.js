const { Router } = require('express')
const actoresController = require('../controllers/actores.controller')
const {actoresMiddleware} = require('../middlewares')

const route = Router()


route.get('/actor/:id', 
    actoresMiddleware.validateIdActor,
    actoresController.getActorById)

module.exports = route