const mongoose = require("mongoose")
const { prompt } = require("inquirer")
const cajaSchema = require("/Users/diego/cli burgercity/models/caja")
const diaSchema = require("/Users/diego/cli burgercity/models/dia")

procesador = (nuevoGastoEfectivo, nuevoGastoOnline, nuevoIngreso) => {
    if(isNaN(nuevoGastoEfectivo) || nuevoGastoEfectivo < 0 || 
    isNaN(nuevoGastoOnline) || nuevoGastoOnline < 0 ||
    isNaN(nuevoIngreso) || nuevoIngreso < 0) {
        console.log("los datos son incorrectos, ingresar solo números positivos.")
        process.exit()
    } else {
        const caja = {
            name: "caja de gastos y efectivo",
            ingresos_Efectivo: 0,
            egresos_Efectivo: 0,
            egresos_Online: 0,
            egresos_Total:0,
            total_enEfectivo: 0,
        }
        recuperar(caja, nuevoGastoEfectivo, nuevoGastoOnline, nuevoIngreso)
    }
}

recuperar = async (caja, nuevoGastoEfectivo, nuevoGastoOnline, nuevoIngreso) => {
    console.log("cargando documentos para operar...")

    recuperadorDiaSchema = await diaSchema.find()
    recuperadorCajaSchema = await cajaSchema.find()
    console.clear()
    console.log("\t\t\t*******************************\n")
    console.log("\t\t\t*** CAJA GASTOS && EFECTIVO ***\n")
    console.log("\t\t\t*******************************\n")
    if(recuperadorCajaSchema.length > 0){
        bdUpdateCaja(nuevoGastoEfectivo, nuevoGastoOnline, nuevoIngreso)
    } else {
        console.log("creando Schema efectivo")
        for(index=0; index<recuperadorDiaSchema.length ;index++){
            caja.ingresos_Efectivo += recuperadorDiaSchema[index].total_Efectivo
            caja.egresos_Efectivo += recuperadorDiaSchema[index].gastos_Efectivo
            caja.egresos_Online += recuperadorDiaSchema[index].gastos_Online
            caja.egresos_Total += recuperadorDiaSchema[index].gastos_Efectivo + recuperadorDiaSchema[index].gastos_Online
            caja.total_enEfectivo += recuperadorDiaSchema[index].total_Efectivo - recuperadorDiaSchema[index].gastos_Efectivo
        }
        console.table(caja)
        bdCreateNewEfectivo(caja)
    }
}

bdCreateNewEfectivo = (a) => {
    cajaSchema.create(a)
    .then(() => {
        console.log("el nuevo esquema de efectivo y caja fue creado con exito")
        mongoose.connection.close()
        process.exit()
    })
}

bdUpdateCaja = async (nuevoGastoEfectivo, nuevoGastoOnline, nuevoIngreso) => {
    newUpdate = await cajaSchema.findOneAndUpdate({name: "caja de gastos y efectivo"}, {
        egresos_Efectivo: recuperadorCajaSchema[0].egresos_Efectivo + nuevoGastoEfectivo,
        egresos_Online: recuperadorCajaSchema[0].egresos_Online + nuevoGastoOnline,
        egresos_Total:recuperadorCajaSchema[0].egresos_Total + nuevoGastoEfectivo + nuevoGastoOnline,
        total_enEfectivo: recuperadorCajaSchema[0].total_enEfectivo - nuevoGastoEfectivo + nuevoIngreso
    }, {new:true})

    console.info(`los datos de caja :${nuevoGastoEfectivo} - ${nuevoGastoOnline} - ${nuevoIngreso}` + 
    `: fueron modificados con exito\n`)
    console.log(newUpdate)
    mongoose.connection.close()
    process.exit()
}

deleteCaja = async() => {
    prompt({
        type:"confirm",
        name:"c",
        message: "¿desea eliminar la caja?"
    }).then(res => {
        res.c == false ? process.exit() : bdDeleteCaja()
    })

    bdDeleteCaja = async() => {
        recuperadorCajaSchema = await cajaSchema.deleteMany()
        .then(x => {
            console.log("la caja de contabilidad ha sido eliminada corretamente")
            mongoose.connection.close()
            process.exit()
        })
    }
}

module.exports = {
    procesador,
    deleteCaja
}