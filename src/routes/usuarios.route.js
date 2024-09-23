const { Router } = require('express')
const route = Router()

route.get('/usuarios', (req,res) => {
    res.status(200).json({usuarios: []})
})


module.exports = route
