const mongoose = require("mongoose")

const diaSchema = mongoose.Schema({
    contador: {type: Number},
    fecha: {type: String,
            unique: true},
    whatsapp_Efectivo: {type: Number},
    whatsapp_Billetera: {type: Number},
    whatsapp_Transferencia: {type: Number},
    cadeteria: {type: Number},
    pedidosYa_Online: {type: Number},
    pedidosYa_Efectivo: {type: Number},
    rappi: {type: Number},
    total_Ventas: {type: Number},
    cantidad_Ventas: {type: Number},
    ganancia_Parcial: {type: Number}, //ganancia bruta sin descontar gastos
    ganancia_Total: {type:Number}, // ganancia menos mercadería a reponer (aprox 50%)
    total_Efectivo: {type: Number}, //efectivo una vez descontada la cadetería
    gastos_Efectivo: {type:Number},
    gastos_Online: {type:Number}
})

module.exports = mongoose.model("dias", diaSchema)
//controladores "dia" y "balance"