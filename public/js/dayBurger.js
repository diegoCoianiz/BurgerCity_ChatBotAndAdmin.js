/* BURGER DEL DÍA */
//#region BURGER DEL DÍA

const init = () => {
    const burgerDia = document.getElementById("BurgerDia")
    const dayPrice = "$800"
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

    switch (today){
        case "DOMINGO":
            burgerDia.innerHTML = `<h5 class="card-title">Burger Del Día: Rosario
            <a class="btn btn-primary mx-1">${dayPrice}</a></h5>`
        break;
        case "MARTES":
            burgerDia.innerHTML = `<h5 class="card-title">Burger Del Día: París
            <a class="btn btn-primary mx-1">${dayPrice}</a></h5>`
        break;
        case "MIERCOLES":
            burgerDia.innerHTML = `<h5 class="card-title">Burger Del Día: Marsella
            <a class="btn btn-primary mx-1">${dayPrice}</a></h5>`
        break;
        case "JUEVES":
            burgerDia.innerHTML = `<h5 class="card-title">Burger Del Día: New York
            <a class="btn btn-primary mx-1">${dayPrice}</a></h5>`
        break;
        case "VIERNES":
            burgerDia.innerHTML = `<h5 class="card-title">Burger Del Día: Dubai
            <a class="btn btn-primary mx-1">${dayPrice}</a></h5>`
        break;
        case "SABADO":
            burgerDia.innerHTML = `<h5 class="card-title">Burger Del Día: Auckland
            <a class="btn btn-primary mx-1">${dayPrice}</a></h5>`
        break;
        default:
            burgerDia.innerHTML = `<h5 class="card-title">Hoy es lunes : No se trabaja (:
            </h5>`
    };
}
init()
//#endregion