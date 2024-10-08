const {Series, Temporadas, Capitulo, Actor}= require ('../models')
const { message } = require('../schemas/series.schema')
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
        include: [{
            
            model: Temporadas,
            as: 'seasons',
            include: {
                model: Capitulo,
                as:'episodios'
            }
        },{
                        
            model: Actor,
            as: 'Actors'
        }]
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

const addActorToSerie= async (req,res) => {
    const arrayActores = req.body
    const id = req.params.id
    const serie = await Series.findByPk(id)

    /*
    Esta forma con promesa es mucho mas rapida para el sistema
    */
    let promesas = []
    arrayActores.forEach(actor => {
        promesas.push(Actor.findOrCreate({
            where : {id: actor.id ? actor.id: 0}, 
            defaults: actor
        }))
    });
    const actores = await Promise.all(promesas)
    serie.addActors(actores)
    /* 
    esto es crear de uno a uno

    for(let i=0; i<arrayActores.length; i++){
        const actor = await Actor.create(arrayActores[i])
        serie.addActor(actor)
    } */
        
    
    res.status(201).json({message: 'Actor agregado a la serie'})
}

controller.addActorToSerie = addActorToSerie

const addOrFindActorToSerie= async (req,res) => {
    const {id,nombre,fechaNacimiento,nombreArtistico} = req.body
    const idSerie = req.params.id
    const serie = await Series.findByPk(idSerie)

    const [actor] = await Actor.findOrCreate({
        where: id ? { id } : { nombre },
        defaults: {
          nombre,
          fechaNacimiento,
          nombreArtistico
        }
    });

    await serie.addActor(actor);
    res.status(201).json({message: 'Actor agregado a la serie'})
}

controller.addOrFindActorToSerie = addOrFindActorToSerie

module.exports = controller