//#region CONST
const { Client , MessageMedia } = require('whatsapp-web.js');
const client = new Client();
const open = require("open")
require("../utils/date")
require('dotenv').config()

const dbConnnect = require("../config/mongo")

const init = (io, port) => {

    const qrcode = require("qrcode-terminal");
    client.on('qr', (qr) => {
    qrcode.generate(qr, { small:true });
    });

    client.on('ready', () => {
        console.clear()
        console.log("Inicializando sesión WebApp de BurgerCity")
        console.log("...")
        open(`http://localhost:${port}`)
        console.log("sesión inicializada con exito!")
        //DB Atlas connect
        dbConnnect()

        io.on("connection", socket => {
            listenMessage(socket)
        })

    });

    client.initialize();
}

let clientesWhatsapp = []
//#endregion

const listenMessage = (socket) => {

    socket.on("transactionFromClient", data => {
        sendMessage(data.to, data.body)
    })

    client.on('message', (msg) => {
        const {from, body} = msg;
        const shortFrom = from.substr(3,10)
        
        if(shortFrom != "tus@broadc" && body != ""){
            let clientesWhatsappEnLista = false
        
            for(i = 0; i < clientesWhatsapp.length; i++) {
                if(shortFrom == clientesWhatsapp[i]) {
                    clientesWhatsappEnLista = true
                    break
                }
            }

            //#region WELLCOME MESSAGE
            if(clientesWhatsappEnLista == false) {
                clientesWhatsapp.push(shortFrom)
                if(com == false) {
                    switch (today){
                        case "DOMINGO":
                        //sendMedia(from, "Rosario.jpeg")
                        sendMessage(from, dayMessageInit(false, "Domingo","Rosario") + dayPrice /*+ "🍔🍟" */+ qickRes)
                        break;
                        case "MARTES":
                        //sendMedia(from, "Paris.jpeg")
                        sendMessage(from, dayMessageInit(false, "Martes","Paris") + dayPrice /*+ "🍔🍟" */+ qickRes)
                        break;
                        case "MIERCOLES":
                        //sendMedia(from, "Marsella.jpeg")
                        sendMessage(from, dayMessageInit(false, "Miercoles","Marsella") + dayPrice /*+ "🍔🍟" */ + qickRes)
                        break;
                        case "JUEVES":
                        //sendMedia(from, "newYork.jpeg")
                        sendMessage(from, dayMessageInit(false, "Jueves","New York") + dayPrice /*+ "🍔🍟" */+ qickRes)
                        break;
                        case "VIERNES":
                        //sendMedia(from, "Dubai.jpeg")
                        sendMessage(from, dayMessageInit(false, "Viernes","Dubai") + dayPrice /*+ "🍔🍟" */+ qickRes)
                        break;
                        case "SABADO":
                        //sendMedia(from, "Auckland.jpeg")
                        sendMessage(from, dayMessageInit(false, "Sabado","Auckland") + dayPrice /*+ "🍔🍟" */+ qickRes)
                        break;
                        default:
                        sendMessage(from, dayMessageInit(true)/* + "Tokio" + " *Simple con guarnición* a" + dayPrice + "🍔🍟" */+ qickRes)
                        //sendMedia(from, "tokioCom.jpeg")
                    };
                } /*else {
                    switch (comBurger){
                        case "TOKIO":
                            sendMessage(from, dayMessageInit(true) + comBurger + " *Simple con guarnición* a" + dayPrice + "🍔🍟" + qickRes)
                            sendMedia(from, "tokioCom.jpeg")
                        break;
                        case "MIAMI":
                            sendMessage(from, dayMessageInit(true) + comBurger + " *Simple con guarnición* a" + dayPrice + "🍔🍟" + qickRes)
                            sendMedia(from, "miamiCom.jpeg")
                        break;
                        case "CALIFORNIA":
                            sendMessage(from, dayMessageInit(true) + comBurger + " *Simple con guarnición* a" + dayPrice + "🍔🍟" + qickRes)
                            sendMedia(from, "californiaCom.jpeg")
                        break;
                    }
                };*/
                //sendMedia(from, "hojaBurgersCartaPrecios.jpeg")
            }
            //#endregion
            
            transaction = {
                transactionNumber: from,
                transactionMessage: body
            }
            transactionJSON = JSON.stringify(transaction)
            socket.emit("transactionFromServer", transactionJSON)
        }

        //#region RESPUESTAS
        /*RES BASICAS SWITCH*/
        switch (body.toUpperCase()) {
            case "MAS":
            case "MÁS":
                sendMessage(from,
                " Nuestro sistema de envíos desde Bv Segui y Oroño hacia el centro, hace tu pedido desde la *carta digital* y un cadete llevará tus Burgers, estés donde estés! 🏍️" +
                "\n\n🔸 *FORMAS DE PAGO.* Quiero saber ¿cómo puedo abonar? 💰" +
                "\n🔸 *CBU*. Pago con tarjeta, necesito sus datos. 🏦" +
                "\n🔸 *DUDA*. Para preguntas frecuentes. 🤔" +
                "\n🔸 *CONTACTO.* Quiero contactar al personal. 👥")
                break;
            case "QR":
                sendMedia(from, "qr.jpg")
                break;
            case "CARTA":
                sendMedia(from, "HojaBurgersCartaPrecios.jpeg")
                break;
            case "VEGGIE":
                sendMedia(from, "cartaVeggi1.jpeg")
                sendMedia(from, "cartaVeggi2.jpeg")
                break;
            case "PROMO":
                sendMedia(from, "cartaCombo.jpeg")
                break;
            case "CBU":
                sendMessage(from, "Titular: Juan Diego Coianiz, Banco: Santander" +
                "CBU: 0720718388000002645386, Alias: CALOR.AROMA.ABACO" + 
                "\n Es *indispensable que mandes el comprobante*. Por favor no lo olvides, para que el cadete salga con tu pedido! 🏍️")
                break;
            case "QUIERO":
                sendMessage(from, "Perfecto! Marcha una Burger del día para tu hogar!!. Necesito tu *nombre*,"+
                " *dirección* y *forma de pago*. " + qickfin)
                break;
            case "DUDA":
             case "PREGUNTA":
                sendMessage(from, "Contame ¿qué dudas tenés?" +
                "\n\n*¿ Horario de atención ?* Martes a Domingos, de 19:30 a 23:30 hs 🕘" +
                "\n*¿ Tiempo de demora ?* Aproximadamente " + demoraEnvio + " para envíos y " + demoraMostrador + " para retirar por local" +
                "\n*¿ Precio de envío ?* Varían de acuerdo a tu zona de entrega, consultalo en la carta digital! menu.loveat.com.ar/burgeCityMenu" +
                "\n\n🔸 *¿ Puedo quitarle algún ingrediente a la Burger ?* El que quieras. Al redactar tu *ORDEN* escribí lo que desees que retiremos y lo leeremos" +
                "\n🔸 *¿ Puedo pedir para un horario en especifico ?* Obvio! Escribí *HORARIO* y la hora que desees" + 
                "\n🔸 *¿ Puedo retirar en el local ?* Yess!! Estamos en Maipú 1130, esquina San Juan. Avisanos y te avisaremos en cuanto tengamos tu pedido!." + 
                "\n🔸 *¿ Algo mas?* Puedo contactarte directamente con el personal de Burgercity. Solo mandame *CONTACTO* 👥")
                sendMessage(from, " ¿Tus dudas fueron resueltas?")
                break;
            case "FIN DE PEDIDO":
            case "FIN":
                console.log("***********************")
                sendMessage(from, "Muchas gracias por tu orden!!!" + 
                " Mis compañeros se contactarán para informarte cuando salga el cadete para la dirección indicada!" + 
                "\n\n Que tengas una excelente noche te desea Burgerbot y todo el equipo de *Burgercity!* 👋🤍")
                break;
            case "ZONA":
                sendMessage(from, "")
                break;
            case "CONTACTO":
                sendMessage(from, "Excelente, mis compañeros están avisados de tu solicitud y en breve serás contactado!" + 
                "\nPor favor, *escribinos la razón de tu consulta* mientras un asistente llega...")
                break;
            case "FORMAS DE PAGO":
            case "FORMA DE PAGO": 
            sendMessage(from, "Nuestras formas de pago son: "+
            "\n *Para Take Away:* Efectivo, Transferencias bancarias y Billetera Santa Fe" +
            "\n *Para envío por cadetería:* solo Mercado pago o Transferenciass (hasta proximo aviso!)" +
            "\nTambien estamos en *Pedidos Ya* o *Rappi*!" +
            "\n\n Ingresa a la carta digital y chequea nuestras ofertas!")
                break;
            default:
        };

        //#region RESPUESTAS COMPLEJAS
        /*CARTA && ORDEN '/SIN' CONDITIONAL */
        if(body.toUpperCase() == "CARTA" && sin == false){
            sendMedia(from, "hojaBurgersCartaPrecios.jpeg")
            //sendMedia(from, "cartaEmpanadasPrecios.jpg")
            //sendMedia(from, "cartaPizasPrecios.jpg")
            sendMessage(from, laCarta)
        } else if(body.toUpperCase() == "CARTA" && sin) {
            sendMessage(from, " *importante:* hoy no disponemos de: " + sinBurger)
            sendMedia(from, "hojaBurgersCartaPrecios.jpeg")
            //sendMedia(from, "cartaEmpanadasPrecios.jpg")
            //sendMedia(from, "cartaPizasPrecios.jpg")
            sendMessage(from, laCarta)
        };

        if(body.toUpperCase() == "ORDEN" && sin == false){
            sendMessage(from, qickOrden)
            sendMessage(from, qickfin)
        } else if(body.toUpperCase() == "ORDEN" && sin) {
            sendMessage(from, " *importante:* hoy no disponemos de: " + sinBurger)
            sendMessage(from, qickOrden)
            sendMessage(from, qickfin)
        };

        /*ADMIN LOG*/
        if((from == numMillan || from == numCoia) && body.toUpperCase() == "/ADMIN"){
            adminOperator = true;
            if(from == numMillan){
                sendMessage(from, "ADMIN MILLAN\n Codigos: /sin /todas /comodin /demora (e, m)");
            } else if (from == numCoia){
                sendMessage(from, "ADMIN COIA\n Codigos: /sin /todas /comodin /demora (e, m)");
            }
        };

        /* ADMIN OPERATORS */
        //for not especific Burgers        
        if(body.substr(0,4).toUpperCase() == "/SIN" && adminOperator){
            sin = true;
            sendMessage(from, "RECIBIDO");
            sinBurger = body.substr(4);
            // all burgers available
        } else if(body.toUpperCase() == "/TODAS" && adminOperator){
            sin = false;
            sendMessage(from, "RECIBIDO");
            // for especial burger days
        } else if((body.substr(0,8).toUpperCase() == "/COMODIN" || body.substr(0,8).toUpperCase() == "/COMODÍN") && adminOperator){
            com = true;
            sendMessage(from, "RECIBIDO");
            comBurger = body.substr(9).toUpperCase();
            console.log("burger comodín: ", comBurger)
        } else if (body.substr(0,9).toUpperCase() == "/DEMORA E" && adminOperator){
            demoraEnvio = body.substr(9)
            sendMessage(from, "RECIBIDO,\n la nueva demora de envío es de " + demoraEnvio);
        } else if (body.substr(0,9).toUpperCase() == "/DEMORA M"){
            demoraMostrador = body.substr(10)
            sendMessage(from, "RECIBIDO, la nueva demora de retiro por mostrador es de " + demoraMostrador);
        }    

        //#endregion RESPUESTAS COMPLEJAS
        
        //#endregion RESPUESTAS
    });
};

                                //MESSAGE SEND FUNCTION 🍔🍟
/*for text */
const sendMessage = (to, message) => {
    client.sendMessage(to, message)
};

/*for media */
const sendMedia = (to, file) => {
    mediaFile = MessageMedia.fromFilePath(`./bot/media/${file}`)
    client.sendMessage(to, mediaFile)
}

//#region VARIABLES

/* ADMINS */
const numCoia = process.env.numCoia
const numMillan = process.env.numMillan
let adminOperator = false;
let sin = false;
let com = false
let sinBurger;
let comBurger;
let demoraMostrador = "15 min (para Burgers)"
let demoraEnvio = "40 min"
const dayPrice = ""//"$800"

/* OLd Answers
const qickfin = " \nEnviame un *FIN* como segundo mensaje para que pueda leerlo y confirmar tu orden." +
"\n🔸¿Querés pagar con tarjeta y no tenes mi CBU? enviame *CBU*."
"\n🔸¿Tenés alguna pregunta? mandame *PREGUNTA* 🤔 primero y me mandás el *FIN DE PEDIDO* despues de resolverla!.";
const laCarta =
"\n\n🔸 ¿Dudas? Chequea las preguntas frecuentes mandando *DUDA*" + 
"\n🔸 ¿Hay carta Veggie? ¡Hay! pedila mandando *VEGGIE*" +
"\n🔸 ¿Estás para pedir? enviame *ORDEN* y seguí las instrucciones." +
"\n🔸 ¿Formas de pago? mandame *FORMAS DE PAGO*."

const qickOrden =  "Necesito: *Tu Nombre* - *Cantidades, tamaños y nombre de cada producto*" + 
" - Si son *con o sin guarnición* - Tu *dirección* y *Forma de pago*"
const qickRes = "\nPodes chequear nuestras promos mandando *PROMO* 📝" +
"\n\n Demoras *aproximadas* de entrega:\n Por mostrador (Maipú 1130): " + demoraMostrador +
"\n Por envío: " + demoraEnvio + 
`.\n\n ¿Ya sabés tu pedido?\n ${qickOrden}` + 
"\n\nEnvía *MÁS* si necesitas otra info. 🧐"*/

/* New Anwser */
const qickRes = "\nTenemos una nueva carta digital! Querés hacer tu pedido y que *te lo mandemos por envío?*"+
` chequea el siguiente link: menu.loveat.com.ar/burgeCityMenu y un repartidor llegara a tu zona! ( *Disponible solo para transferencias* momentaneamente)\n
Querés *pasar a retirar*? querés consultar mas información? envía *MAS* y atenderé tus necesidades!
`

const dayMessageInit = (comodin, day = null, burger = null) => {
    if (comodin == false) {
        return `Holaa, espero que estés teniendo un excelente ${day}! Te habla *BurgerBot*!!🤖\n`
        /*`Nuestra Burger del día es la *${burger} Simple con guarnición* a`*/
    } else {
        return `Holaa, espero que estés teniendo una excelente noche! Te habla *BurgerBot*!!🤖\n`
       /*`Nuestra Burger especial de hoy es la`*/
    }    
}
//#endregion

module.exports = {
    init
}