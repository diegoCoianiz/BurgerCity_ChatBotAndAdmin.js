const mongoose = require("mongoose")
const diaSchema = require("/Users/diego/cli burgercity/models/dia")

//#region FUNCIONES internas del controlador
const mes= String(new Date().getMonth()+1)
const hoy = new Date().getDate()
const restadorDia = (bool)=> {
    dia = new Date().getDay()
    if(bool){
        return dia == 0? dia = 6 : dia == 2? dia = 1 : dia == 3? dia = 2 :
        dia == 4? dia = 3 : dia == 5? dia = 4 : dia == 6? dia = 5 : null
    } else {
        return dia == 2? dia = 6 : dia == 3? dia = 5 : dia == 4? dia = 4 :
        dia == 5? dia = 3 : dia == 6? dia = 2 : dia == 0? dia = 6 : null
    }
} 

balance = {
    whatsapp_Efectivo: 0,
    whatsapp_Billetera: 0,
    whatsapp_Transferencia: 0,
    cadeteria: 0,
    pedidosYa_Online: 0,
    pedidosYa_Efectivo: 0,
    rappi: 0,
    total_Ventas: 0,
    cantidad_Ventas: 0,
    ganancia_Parcial: 0,
    ganancia_Total: 0,
    total_Efectivo: 0,
    observaciones: "",
    gastos_Efectivo: 0,
    gastos_Online: 0,
}

functUltimoTrimestre = (listaDeArchivosRecuperados, bool) => {
    if(bool){
        listaDeArchivosRecuperados.length > 92 ? fechas = 92 : fechas = listaDeArchivosRecuperados.length
        for(index=0; index<fechas ;index++){
            if (
                listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes ||
                listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes-1 ||
                listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes-2
            ){
                parametrosBalance(listaDeArchivosRecuperados[index])
            }
        }
    } else {
        for(index=0; index<listaDeArchivosRecuperados.length ;index++){
            parametrosBalance(listaDeArchivosRecuperados[index])
        }

    }
    return balance
}

/*   ***   */
parametrosBalance = (archivosRecuperados) => {
    balance.whatsapp_Efectivo += archivosRecuperados.whatsapp_Efectivo
    balance.whatsapp_Billetera += archivosRecuperados.whatsapp_Billetera
    balance.whatsapp_Transferencia += archivosRecuperados.whatsapp_Transferencia
    balance.cadeteria += archivosRecuperados.cadeteria
    balance.pedidosYa_Online += archivosRecuperados.pedidosYa_Online
    balance.pedidosYa_Efectivo += archivosRecuperados.pedidosYa_Efectivo
    balance.rappi += archivosRecuperados.rappi
    balance.total_Ventas += archivosRecuperados.total_Ventas
    balance.cantidad_Ventas += archivosRecuperados.cantidad_Ventas
    balance.ganancia_Parcial += archivosRecuperados.ganancia_Parcial
    balance.ganancia_Total += archivosRecuperados.ganancia_Total
    balance.total_Efectivo += archivosRecuperados.total_Efectivo
    if(archivosRecuperados.observaciones != ""){
    balance.observaciones += "(" + archivosRecuperados.fecha + 
    ":" + archivosRecuperados.observaciones + ") "
    }
    balance.gastos_Efectivo += archivosRecuperados.gastos_Efectivo
    balance.gastos_Online += archivosRecuperados.gastos_Online
}

ciclosBalance = (num, listaDeArchivosRecuperados, semana) => {

    listaDeArchivosRecuperados.length >= num ? fechas = num : fechas = listaDeArchivosRecuperados.length
    for(index=0; index<fechas ;index++){
        if(listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes){
            if(semana){
                if(listaDeArchivosRecuperados[index].fecha.split("/")[0] >  hoy - restadorDia(true)
                & listaDeArchivosRecuperados[index].fecha.split("/")[0] < hoy + restadorDia(false)){
                    parametrosBalance(listaDeArchivosRecuperados[index])
                }
            } else {
                parametrosBalance(listaDeArchivosRecuperados[index])
            }
        }
    }

    return balance
}

//#endregion

getBalanceSemana = async (req, res) => {
    listaDeArchivosRecuperados = await diaSchema.find().sort({contador:-1})
    data = {
        "semana": ciclosBalance(7, listaDeArchivosRecuperados, true)
    }

    res.send(data)
    functionReturnTo0(balance)
    //mongoose.connection.close()
    /*process.exit()*/
}

getBalanceMes = async (req, res) => {
    
    listaDeArchivosRecuperados = await diaSchema.find().sort({contador:-1})
    data = {
        "mes": ciclosBalance(31, listaDeArchivosRecuperados, false)
    }

    res.send(data)
    functionReturnTo0(balance)
    //mongoose.connection.close()
    /*process.exit()*/
}

getBalanceTrimestre = async (req, res) => {
    
    listaDeArchivosRecuperados = await diaSchema.find().sort({contador:-1})
    
    data = {
        "trimestre": functUltimoTrimestre(listaDeArchivosRecuperados, true)
    }

    res.send(data)
    functionReturnTo0(balance)
    //mongoose.connection.close()
    //process.exit()
}

getBalanceTodo = async (req, res) => {
    
    listaDeArchivosRecuperados = await diaSchema.find()
    data = {
        "todo": functUltimoTrimestre(listaDeArchivosRecuperados, false)
    }

    res.send(data)
    functionReturnTo0(balance)
    //mongoose.connection.close()
    //process.exit()
}

module.exports = {
    getBalanceSemana,
    getBalanceMes,
    getBalanceTrimestre,
    getBalanceTodo
}

functionReturnTo0 = (balance) => {
    balance.whatsapp_Efectivo = 0,
    balance.whatsapp_Billetera = 0,
    balance.whatsapp_Transferencia = 0,
    balance.cadeteria = 0,
    balance.pedidosYa_Online= 0,
    balance.pedidosYa_Efectivo= 0,
    balance.rappi= 0,
    balance.total_Ventas= 0,
    balance.cantidad_Ventas= 0,
    balance.ganancia_Parcial= 0,
    balance.ganancia_Total= 0,
    balance.total_Efectivo= 0,
    balance.observaciones= "",
    balance.gastos_Efectivo= 0,
    balance.gastos_Online= 0
}