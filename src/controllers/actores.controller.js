const {Model} = require('sequelize')
const {Series,Actor}= require ('../models')
const controller = {}

const getActorById = async(req,res) =>{
    const id = req.params.id
    const series = await Actor.findOne({
        where: {id},
        include: {
            model: Series,
            as: 'Series'
        }
    })
    res.status(200).json(series)
}

controller.getActorById = getActorById

module.exports = controller