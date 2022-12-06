const mongoose = require("mongoose")

const cajaSchema = mongoose.Schema({
    name: {type:String,
            unique:true},
    ingresos_Efectivo: {type:Number},
    egresos_Efectivo: {type:Number},
    egresos_Online: {type:Number},
    egresos_Total: {type:Number},
    total_enEfectivo: {type:Number}
})

module.exports = mongoose.model("cajas", cajaSchema)
//controlador efectivo