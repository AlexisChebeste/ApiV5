const {Temporadas} = require('../models')
const controller = require('./series.controller')


const getTemporadasBySerie = async(req,res)=> {
    const serieId = req.params.id
    const temporadas = await Temporadas.findAll({where: {serieId}, include: 'episodios'})
    res.status(200).json(temporadas)
}

controller.getTemporadasBySerie = getTemporadasBySerie

const createTemporada = async(req,res) => {
    const serieId = req.params.id
    const temporada = await Temporadas.create({...req.body, serieId})
    res.status(201).json(temporada)
}

controller.createTemporada = createTemporada

module.exports = controller