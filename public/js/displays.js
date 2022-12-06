functionDisplay = (display) => {
    
    const accordionTest = document.getElementById("accordion")
    const panelRegistro = document.getElementById("panelRegistro")
    const panelCaja = document.getElementById("panelCaja")
    const panelGraficos = document.getElementById("panelGraficos")
    const botonVolver = document.getElementById("botonVolver")
    const botonNuevoRegistro = document.getElementById("botonNuevoRegistro")
    const botonModificarCaja = document.getElementById("botonModificarCaja")
    const botonGraficos = document.getElementById("botonGraficos")
    
    listaDePaneles = [accordionTest, panelRegistro, panelCaja, panelGraficos]
    listaDeBotones = [botonVolver, botonNuevoRegistro, botonModificarCaja, botonGraficos]

    for(index in listaDePaneles){
        if (Number(index) != display){
            listaDePaneles[index].style.display = "none"
            listaDeBotones[index].style.display = "inline-flex"
        } else {
            listaDePaneles[index].style.display = "block"
            listaDeBotones[index].style.display = "none"
        }
    }

    switch (display) {
        case 0: functionVolver()
            break;
        case 1: functionNuevoRegistro()
            break;
        case 2: functionModificarCaja()
            break;
        case 3: functionGraficos()
            break;
    }
}

functionVolver = () => {

}

functionNuevoRegistro = () => {

}

functionModificarCaja = () => {

}

functionGraficos = () => {

}