const mongoose = require("mongoose")
//const diaSchema = require("/Users/diego/cli burgercity/models/dia")
const cajaSchema = require("/Users/diego/cli burgercity/models/caja")

getCaja = async (req, res) => {
    recuperadorCajaSchema = await cajaSchema.find()
    data = {
        "caja" : recuperadorCajaSchema
    }  
    res.send(data)
}

module.exports = {
    getCaja
}