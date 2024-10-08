const { Actor } = require('../models')
const middleware = {}
const validateIdActor = async (req, res, next)=>{
    const id = req.params.id
    const actor = await Actor.findByPk(id)
    if (!actor)
        return res.status(404).json({mensaje: `El ${id} no exite.`})
    next()
}
middleware.validateIdActor = validateIdActor



module.exports = middleware

