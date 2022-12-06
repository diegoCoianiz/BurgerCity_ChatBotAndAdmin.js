let td = new Date();
let thisGetday = td.getDay()

const dayOfWeek = function () {
    if(thisGetday == "0"){
    today = "DOMINGO";
    } else if(thisGetday == "1"){
    today = "LUNES";
    } else if(thisGetday == "2"){
    today = "MARTES";
    } else if(thisGetday == "3"){
    today = "MIERCOLES";
    } else if(thisGetday == "4"){
    today = "JUEVES";
    } else if(thisGetday == "5"){
    today = "VIERNES";
    } else if(thisGetday == "6"){
    today = "SABADO";
    }
    return today;
};
dayOfWeek()

const todayDate = today + " " + td.getDate() + "/" + (td.getMonth()+1) + "/" + td.getFullYear()


switch (today){
    case "DOMINGO":
        console.log("Burger del día: Rosario")

    break;
    case "MARTES":
        console.log("Burger del día: Paris")
    break;
    case "MIERCOLES":
        console.log("Burger del día: Marsella")

    break;
    case "JUEVES":
        console.log("Burger del día: New York")

    break;
    case "VIERNES":
        console.log("Burger del día: Dubai")

    break;
    case "SABADO":
        console.log("Burger del día: Auckland")
    break;
    default:
};

const hoursOfDay = function () {
    thisHour = new Date();
    thisMinutes = new Date();
    thisGetHour = thisHour.getHours()
    thisGetMinutes = thisMinutes.getMinutes()

    setInterval( function () {
        hoursOfDay()
        if(thisGetHour == 23){
            setInterval( function () {
                hoursOfDay()
                if(thisGetMinutes >25){
                    console.log("fin del programa, guardando cambios")
                    process.exit()
                }
            },120000) //2min
        }
    },2400000) // 40min
}
hoursOfDay()

const inicioTrabajo = "Hora de inicio: "+ thisGetHour +":"+ thisGetMinutes+ " min."
console.log(" " + todayDate ,"\n", inicioTrabajo)