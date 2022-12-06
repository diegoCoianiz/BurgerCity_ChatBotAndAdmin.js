const mongoose = require("mongoose") // <-- conexión base de datos
const { prompt } = require("inquirer")
const diaSchema = require("/Users/diego/cli burgercity/models/dia")

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
    ganancia_Total: 0,
    ganancia_Parcial: 0,
    total_Efectivo: 0,
    gastos_Efectivo: 0,
    return: returnBalanceTo0()
}

recuperar = async () => {
    console.log("la operación esta siendo realizada...")

    archivosRecuperados = await diaSchema.find().sort({contador:-1})
    console.clear()
    console.log("\t\t\t*** BALANCE GENERAL ***\n")
    console.log(`Existen ${archivosRecuperados.length} fechas listas para visualizar\n`)

    eleccion(archivosRecuperados)
}

eleccion = (listaDeArchivosRecuperados) => {
    prompt([
        {
        type: "rawlist",
        name: "eleccion",
        message: "periodo de ventas a visualizar: ",
        choices: [
            "ultima semana",
            "ultimo mes",
            "ultimo trimestre",
            "todo"
        ]
    }]).then((res) => {

        if(res.eleccion == "ultima semana"){
            ciclosBalance(7, listaDeArchivosRecuperados, true)
        }
        
        if (res.eleccion == "ultimo mes"){
            ciclosBalance(31, listaDeArchivosRecuperados, false)
        }

        if (res.eleccion == "ultimo trimestre"){
            fechasNoCorrespondidas = 0
            listaDeArchivosRecuperados.length > 92 ? fechas = 92 : fechas = listaDeArchivosRecuperados.length
            for(index=0; index<fechas ;index++){
                if (
                listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes ||
                listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes-1 ||
                listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes-2
                ){
                    parametrosBalance(listaDeArchivosRecuperados[index])
                } else  {
                    fechasNoCorrespondidas ++
                }
            }
        
        console.log("\tSe presentan las ultimas", fechas-fechasNoCorrespondidas, "fechas del trimestre balanceadas")
        console.log("\tSe descartaron ", fechasNoCorrespondidas, " fechas que no correspondían con la solicitud")
        console.log(balance)
        }

        if(res.eleccion == "todo"){
            for(index=0; index<listaDeArchivosRecuperados.length ;index++){
                parametrosBalance(listaDeArchivosRecuperados[index])
            }
        
            console.log("\tSe presentan balanceadas las", listaDeArchivosRecuperados.length, "fechas")
            console.log(balance)
        }

        mongoose.connection.close()
        process.exit()
    })
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
    balance.ganancia_Total += archivosRecuperados.ganancia_Total
    balance.ganancia_Parcial += archivosRecuperados.ganancia_Parcial
    balance.total_Efectivo += archivosRecuperados.total_Efectivo
    balance.gastos_Efectivo += archivosRecuperados.gastos_Efectivo
}

ciclosBalance = (num, listaDeArchivosRecuperados, semana) => {
    fechasNoCorrespondidas = 0
    listaDeArchivosRecuperados.length >= num ? fechas = num : fechas = listaDeArchivosRecuperados.length
    for(index=0; index<fechas ;index++){
        if(listaDeArchivosRecuperados[index].fecha.split("/")[1] == mes){
            if(semana){
                if(listaDeArchivosRecuperados[index].fecha.split("/")[0] >  hoy - restadorDia(true)
                & listaDeArchivosRecuperados[index].fecha.split("/")[0] < hoy + restadorDia(false)){
                    parametrosBalance(listaDeArchivosRecuperados[index])
                } else {
                    fechasNoCorrespondidas++
                }
            } else {
                parametrosBalance(listaDeArchivosRecuperados[index])
            }
        } else {
            fechasNoCorrespondidas++
        }
    }
    console.log("\tSe presentan las ultimas", fechas-fechasNoCorrespondidas, "fechas balanceadas")
    console.log("\tSe descartaron ", fechasNoCorrespondidas, " fechas que no correspondían con la solicitud")
    console.log(balance)

}

module.exports = {
    recuperar,
    ciclosBalance,
    parametrosBalance,
    balance
}

function returnBalanceTo0 () {
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
        ganacia_Total: 0,
        ganancia_Parcial: 0,
        total_Efectivo: 0,
        gastos_Efectivo: 0
    }
}