const dbConnnect = require("../config/mongo")
const cajaSchema = require("../models/caja")
const diaSchema = require("../models/dia")
let { parametrosBalance, balance } = require("./balance")
dbConnnect()
console.clear()

/**
 *                                              @variables de base de datos
 */

const mes= String(new Date().getMonth()+1)
const hoy = String(new Date().getDate())
const hoySemana = ()=> {
    sem = new Date().getDay()
    return sem == 0? sem = 6 : sem == 2? sem = 1 : sem == 3? sem = 2 :
    sem == 4? sem = 3 : sem == 5? sem = 4 : sem == 6? sem = 5 :
    null
}

/**
 *                                              @Cliente whatsapp Bot
 */

 const { Client } = require('whatsapp-web.js');
 const qrcode = require("qrcode-terminal"); 
const client = new Client();

console.log("\t\t\t**************************\n")
console.log("\t\t\t*** ACCESOS DE CELULAR ***\n")
console.log("\t\t\t**************************\n")

client.on('qr', (qr) => {
    qrcode.generate(qr, { small:true });
});


client.on('ready', () => {
    console.clear()
    console.log("\t\t\t**************************\n")
    console.log("\t\t\t*** ACCESOS DE CELULAR ***\n")
    console.log("\t\t\t**************************\n")
    listenMessage()
});

client.initialize();



const listenMessage =  () => {
    client.on('message', async (msg) => {
        const {from, body} = msg;
        const shortFrom = from.substr(3,10)
        
        if(shortFrom != "tus@broadc" && body != ""){
        console.log(shortFrom, "=", body);
        }

        /**
        *                                   @Funciones de base de datos
        */

         FuncionCaja = async () => {
            //console.log("caja\n")
            await cajaSchema.find({name:"caja de gastos y efectivo"})
                .then(db => {
            console.log(db[0])
            sendMessage(from, String(db[0]))
            })
        }

        FuncionBalance = async (num, semana) => {
            archivosRecuperados = await diaSchema.find()
            ciclosFuncionBalance(num, archivosRecuperados, semana)
            
        }
        ciclosFuncionBalance = (num, a, semana) => {
            prueba = 0
            a.length >= num ? fechas = num : fechas = a.length
            for(index=0; index<fechas ;index++){
                if(archivosRecuperados[index].fecha.split("/")[1] == mes){
                    if(semana){
                        if(archivosRecuperados[index].fecha.split("/")[0] > hoy - hoySemana()){
                            parametrosBalance(archivosRecuperados[index])
                        } else {
                            prueba++
                        }
                    } else {
                        parametrosBalance(archivosRecuperados[index])
                    }
                } else {
                    prueba++
                }
            }
            console.log("\tSe presentan las ultimas", fechas-prueba, "fechas balanceadas")
            console.log("\tSe descartaron ", prueba, " fechas que no correspondían con la solicitud")
            console.log(balance)

            sendMessage(from, "Se presentan las ultimas" + String(fechas-prueba) + "fechas balanceadas" +
            "\nSe descartaron " + prueba + " fechas que no correspondían con la solicitud\n")
            sendMessage(from, JSON.stringify(balance,null,2))
        }
        
        FuncionSplit = (body) => {
            newBody = body.split(" ")
            console.log(newBody[1])
            FuncionGetVentaUnica(newBody[1])
        }
        FuncionGetVentaUnica = (fecha) => {
            diaSchema.find({fecha: fecha})
                .then(d => {
                    console.log("ventas del día", fecha)
                    console.log(d)
                    sendMessage(from, String(d[0]))
                })
        }

        /**
         *                                      @switch de respuestas 
         */


        switch (body.toUpperCase()) {
            case "CAJA": FuncionCaja()
            break;
            case "BALANCE SEMANA": 
                
                FuncionBalance(8, semana = true)
                balance.return
                
            break;
            case "BALANCE MES": 
                
                FuncionBalance(32, semana = false)
                balance.return
                
            break;
        }

        if(body.substr(0,5).toUpperCase() == "FECHA"){
            FuncionSplit(body)
        }
    })
}

const sendMessage = (to, message) => {
    client.sendMessage(to, message)
};
