const mongoose = require("mongoose")
const { prompt } = require("inquirer")
const diaSchema = require("/Users/diego/cli burgercity/models/dia")
const cajaSchema = require("/Users/diego/cli burgercity/models/caja")

//#region METHODS nad EXPORTS
//post
postVentasDelDia = (ventas) => {
    prompt({
        type: "confirm",
        name: "c",
        message: "los datos ingresados son correctos? "
    }).then(res => {
        res.c == false ? process.exit() : processing(ventas)
    })

    
    processing = (ventas) => {
        startProcess(ventas)
        confirmation(ventas)
    }
    
    confirmation = (ventas,msg) => {
        prompt({
            type: "confirm",
            name: "c",
            message: "almacenar info en base de datos? "
        }).then(res => {
            res.c == false ? process.exit() : bdCreateNewDay(ventas)
        })
    }

    bdCreateNewDay = async (ventas) => {
        console.clear()
        recuperadorCajaSchema = await cajaSchema.find()
        contador = await diaSchema.find()
        ventas.obs != "" ? null : ventas.obs = ""
        const dia = {
            contador: contador.length + 1,
            fecha: ventas.fecha,
            whatsapp_Efectivo: wsEfectivo,
            whatsapp_Billetera: wsBilletera,
            whatsapp_Transferencia: wsTransf,
            cadeteria: totalCadeteria,
            pedidosYa_Online: pyOnline,
            pedidosYa_Efectivo: pyEfectivo,
            rappi: rapiTotalBruto,
            total_Ventas: totalVentasDelDia,
            cantidad_Ventas: cantidadPedidosDelDia.length,
            ganancia_Parcial: totalGanancia,
            ganancia_Total: totalGanancia-totalVentasDelDia /2,
            total_Efectivo: totalEfectivo,
            gastos_Efectivo: ventas.gastos_Efectivo
        }
        diaSchema.create(dia)
            .then(() => {
                console.info(`los datos del día ${ventas.fecha} fueron almacenados con exito`)
                console.table(dia)
                recuperadorCajaSchema.length > 0 ? updateCaja(ventas)   :  mongoose.connection.close()
            })
    }
}

//get One
getVentaUnica = (fecha) => {
    diaSchema.find({fecha: fecha})
        .then(d => {
            console.log("ventas del día", fecha)
            console.log(d)
            mongoose.connection.close()
            process.exit()
        })
}

//get All
getListaVentas = () => {
    diaSchema.find()
        .then(d => {
            console.log("\tfechas presentadas: ", d.length)
            console.log(d)
            console.log("\n\tfechas presentadas: ", d.length)
            mongoose.connection.close()
            process.exit()
        })
}

//update 
updateVentaUnica = (fecha, ventas) => {

    prompt({
        type: "confirm",
        name: "c",
        message: "los datos ingresados son correctos? "
    }).then(res => {
        res.c == false ? process.exit() : processing(ventas)
    })

    processing = (ventas) => {
        startProcess(ventas)
        confirmation()
    }

    confirmation = () => {
        prompt({
            type: "confirm",
            name: "c",
            message: "almacenar nueva info en base de datos?"
        }).then(res => {
            res.c == false ? process.exit() : initDeleteAndUpdate()
        })
    }

    initDeleteAndUpdate = () => {
        deleteLastCaja(fecha)
        bdUpdateNewDay(fecha)
    }
    

    bdUpdateNewDay = async (fecha) => {

        recuperadorCajaSchema = await cajaSchema.find()
        await diaSchema.findOneAndUpdate({fecha: fecha}, {
            whatsapp_Efectivo: wsEfectivo,
            whatsapp_Billetera: wsBilletera,
            whatsapp_Transferencia: wsTransf,
            cadeteria: totalCadeteria,
            pedidosYa_Online: pyOnline,
            pedidosYa_Efectivo: pyEfectivo,
            rappi: rapiTotalBruto,
            total_Ventas: totalVentasDelDia,
            cantidad_Ventas: cantidadPedidosDelDia.length,
            ganancia_Parcial: totalGanancia,
            ganancia_Total: totalGanancia-totalVentasDelDia /2,
            total_Efectivo: totalEfectivo - totalCadeteria,
            gastos_Efectivo: ventas.gastos_Efectivo,
            gastos_Online: ventas.gastos_Online
        },{new:true}).then( d => {
            console.info(`\nlos datos del día ${d.fecha} fueron modificados con exito`)
            console.log(d)
            recuperadorCajaSchema.length > 0 ? updateCaja(ventas)   :  mongoose.connection.close()
        })
    }
}
//delete One
deleteVentaUnica = async (fecha) => {

    await deleteLastCaja(fecha)

    await diaSchema.findOneAndDelete({fecha: fecha})
        .then(d => {
            console.log("\tla siguiente fecha:", fecha, "ha sido eliminada correctamente:")
            console.log(d)
            mongoose.connection.close()
            process.exit()
        })
}

//delete All
deleteListaVentas = () => {
    prompt({
        type:"confirm",
        name:"c",
        message: "¿desea eliminar toda la lista de ventas?"
    }).then(res => {
        res.c == false ? process.exit() : bdDeleteListaVentas()
    })
    bdDeleteListaVentas = async () => {
        await diaSchema.deleteMany()
        .then(d => {
            bdDeleteCaja()
            console.log("la lista de ventas ha sido eliminada corretamente")
        })
    }
    bdDeleteCaja = async () => {
        await cajaSchema.deleteMany()
        .then(d => {
            console.log("la caja de contabilidad ha sido eliminada corretamente")
            mongoose.connection.close()
            process.exit()
        })
    }
}

module.exports = {
    postVentasDelDia,
    getVentaUnica,
    getListaVentas,
    deleteVentaUnica,
    deleteListaVentas,
    updateVentaUnica
}
//#endregion

startProcess = (ventas) => {
    cantidadPedidosDelDia = []

    wsEfectivo = 0
    wsEfLista = ventas.efWs.split("+")
    for(i=0; i<wsEfLista.length ;i++){
        wsEfectivo = wsEfectivo + Number(wsEfLista[i])
        i > 0 || Number(wsEfLista[i]) > 1 ? cantidadPedidosDelDia.push(1) : wsEfLista = []
    }
    wsBilletera = 0
    wsBillLista = ventas.bill.split("+")
    for(i=0; i<wsBillLista.length ;i++){
        wsBilletera = wsBilletera + Number(wsBillLista[i])
        i > 0 || Number(wsBillLista[i]) > 1 ? cantidadPedidosDelDia.push(1) : wsBillLista = []
    }
    wsTransf = 0
    wsTransfLista = ventas.transf.split("+")
    for(i=0; i<wsTransfLista.length ;i++){
        wsTransf = wsTransf + Number(wsTransfLista[i])
        i > 0 || Number(wsTransfLista[i]) > 1 ? cantidadPedidosDelDia.push(1) : wsTransfLista = []
    }
    pyEfectivo = 0
    pyEfLista = ventas.pyEf.split("+")
    for(i=0; i<pyEfLista.length ;i++){
        pyEfectivo = pyEfectivo + Number(pyEfLista[i])
        i > 0 || Number(pyEfLista[i]) > 1 ? cantidadPedidosDelDia.push(1) : pyEfLista = []
    }
    pyOnline = 0
    pyOnLista = ventas.pyOn.split("+")
    for(i=0; i<pyOnLista.length ;i++){
        pyOnline = pyOnline + Number(pyOnLista[i])
        i > 0 || Number(pyOnLista[i]) > 1 ? cantidadPedidosDelDia.push(1) : pyOnLista = []
    }
    rapiTotalBruto = 0
    rapiLista = ventas.Rap.split("+")
    for(i=0; i<rapiLista.length ;i++){
        rapiTotalBruto = rapiTotalBruto + Number(rapiLista[i])
        i > 0 || Number(rapiLista[i]) > 1 ? cantidadPedidosDelDia.push(1) : rapiLista = []
    }

    // totalCadeteria = ventas.Cad < 10 ? totalCadeteria = 1500 : 150 * ventas.Cad
    
    totalCadeteria = ventas.Cad * 200
    totalVentasDelDia = wsEfectivo + wsBilletera + wsTransf + pyEfectivo +
    pyOnline + rapiTotalBruto

    ws = wsEfectivo + wsBilletera + wsTransf;
    totalEfectivo = wsEfectivo + pyEfectivo;
    comisionPedidosYa = Math.floor(((pyEfectivo + pyOnline) / 100) * 31);
    gananciaPedidosYa = Math.floor((pyEfectivo + pyOnline) - comisionPedidosYa);
    comisionRapi = ((rapiTotalBruto / 100) * 39.8);
    totalComisionesYcadeteria = Math.floor(comisionPedidosYa + comisionRapi + totalCadeteria + 3300);
    gananciaRapi = Math.floor(rapiTotalBruto - comisionRapi);
    totalGanancia = ws + gananciaPedidosYa + gananciaRapi - totalCadeteria - 3300;
    
    if(isNaN(totalGanancia)){
        console.log("los datos son incorrectos, ingresar solo numeros.")
        process.exit()
    }

    console.log(`
    Total de ventas: ${cantidadPedidosDelDia.length} . Total bruto del día: ${totalVentasDelDia}

    \nTotal bruto PedidosYa: ${pyEfectivo+pyOnline} (${pyEfLista.length +pyOnLista.length} envíos)
    . Comisión(31%): ${comisionPedidosYa}
    . Ganancia: ${gananciaPedidosYa} . (${pyOnline - comisionPedidosYa - gananciaPedidosYa}) en efectivo
    . A depositar: ${pyOnline - comisionPedidosYa}

    \nTotal bruto Rapi: ${rapiTotalBruto} (${rapiLista.length} envíos)
    . Comisión (39.8%): ${comisionRapi}
    . Ganancia completa a depositar: ${gananciaRapi}

    . Ws: ${wsEfectivo + wsBilletera + wsTransf} (${wsEfLista.length+wsBillLista.length+
    wsTransfLista.length}) | Apps: ${pyEfectivo + pyOnline + 
    rapiTotalBruto} (${pyEfLista.length+ pyOnLista.length+rapiLista.length}))
    . El total de comisiones de las Apps (${comisionPedidosYa+comisionRapi}), la cadetería (${totalCadeteria})
    y el alquiler, aceite e impuestos (${3300}) es de: $${totalComisionesYcadeteria}

    \n.Ganancia parcial: $${totalGanancia} - Mercadería a reponer $${totalVentasDelDia / 
    2} = $${totalGanancia-totalVentasDelDia /2} de ganancia total.
    .Total efectivo: ${totalEfectivo - ventas.gastos_Efectivo}\n
    `)
}

/**
 * Operaciones de caja
 */

updateCaja = async (ventas) => {
    cajaNewUpdate = await cajaSchema.find({name:"caja de gastos y efectivo"})

    newUpdate = await cajaSchema.findOneAndUpdate({name:"caja de gastos y efectivo"},{
        ingresos_Efectivo: cajaNewUpdate[0].ingresos_Efectivo + totalEfectivo,
        egresos_Efectivo: cajaNewUpdate[0].egresos_Efectivo + Number(ventas.gastos_Efectivo),
        egresos_Online: cajaNewUpdate[0].egresos_Online + Number(ventas.gastos_Online),
        egresos_Total: cajaNewUpdate[0].egresos_Total + Number(ventas.gastos_Efectivo) + Number(ventas.gastos_Online),
        total_enEfectivo: cajaNewUpdate[0].total_enEfectivo + totalEfectivo - Number(ventas.gastos_Efectivo)    
    },{new:true})

    console.info(`los datos de caja fueron modificados con exito:\n`)
    console.log(newUpdate)
    mongoose.connection.close()
    process.exit()
}

deleteLastCaja = async (fecha) => {
    console.clear()
    recuperadorCajaSchema = await cajaSchema.find({name:"caja de gastos y efectivo"})
    recuperadorFecha = await diaSchema.find({fecha: fecha})
    
    newUpdate = await cajaSchema.findOneAndUpdate({name:"caja de gastos y efectivo"},{
        ingresos_Efectivo: recuperadorCajaSchema[0].ingresos_Efectivo + (-1 * recuperadorFecha[0].total_Efectivo),
        egresos_Efectivo: recuperadorCajaSchema[0].egresos_Efectivo - recuperadorFecha[0].gastos_Efectivo,
        egresos_Online: recuperadorCajaSchema[0].egresos_Online - recuperadorFecha[0].gastos_Online,
        egresos_Total: recuperadorCajaSchema[0].egresos_Total - (recuperadorFecha[0].gastos_Efectivo + recuperadorFecha[0].gastos_Online),
        total_enEfectivo: recuperadorCajaSchema[0].total_enEfectivo + -1* (recuperadorFecha[0].total_Efectivo - recuperadorFecha[0].gastos_Efectivo)
    },{new:true})
}
