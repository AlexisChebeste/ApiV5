const {Series, Temporadas, Capitulo}= require ('../models')
const controller = {}

const getAllSeries = async (req, res)=>{
    const dataSeries = await Series.findAll({})
    res.status(200).json(dataSeries)
}
controller.getAllSeries = getAllSeries

const getSerieById= async (req, res)=>{
    const id = req.params.id
    const serie = await Series.findOne({
        where: {id}, 
        include: {
            model: Temporadas,
            as: 'seasons',
            include: {
                model: Capitulo,
                as:'episodios'
            }
        }
    })
    res.status(200).json(serie)
}
controller.getSerieById = getSerieById

const deleteById = async (req, res) => {
    const id = req.params.id
    const r = await Series.destroy({where: {id}})
    res.status(204).json({mensaje: `filas afectadas ${r}`})
}
controller.deleteById = deleteById

const createSerie = async (req, res) => {
    const {nombre, plataforma} = req.body
    const serie = await Series.create({
        nombre,
        plataforma,
        disponible: false
    })
    res.status(201).json(serie)
}
controller.createSerie = createSerie

const updateSerie = async (req, res)=> {
    const {nombre, disponible, plataforma} = req.body
    const id = req.params.id
    const serie = await Series.findByPk(id)
    serie.nombre = nombre
    serie.disponible = disponible
    serie.plataforma = plataforma
    await serie.save()
    res.status(200).json(serie)
}
controller.updateSerie = updateSerie

module.exports = controller