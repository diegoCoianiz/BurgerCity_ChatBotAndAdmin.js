const td = new Date()
const today = td.getDate() + "/" + (td.getMonth()+1) + "/" + td.getFullYear()

//post venta
const categoriasVentas = [
    {
        type:"input",
        name:"fecha",
        message:"fecha a operar:",
        default: today
    },
    {
        type:"input",
        name:"efWs",
        message:"efectivo whatsapp: ",
        default: "0"
    },
    {
        type:"input",
        name:"bill",
        message:"billetera Santa Fe: ",
        default: "0"
    },
    {
        type:"input",
        name:"transf",
        message:"Transferencias: ",
        default: "0"
    },
    {
        type:"input",
        name:"pyOn",
        message:"PediosYa Online: ",
        default: "0"
    },
    {
        type:"input",
        name:"pyEf",
        message:"PedidosYa Efectivo: ",
        default: "0"
    },
    {
        type:"input",
        name:"Rap",
        message:"Rapi: ",
        default: "0"
    },
    {
        type:"number",
        name:"Cad",
        message:"Cadetería: ",
        default: 0
    },
    {
        type: "number",
        name: "gastos_Efectivo",
        message: "gastos en efectivo del día: ",
        default: "0"
    },
    {
        type: "number",
        name: "gastos_Online",
        message: "gastos online del día: ",
        default: "0"
    }
]

//update venta
const modificadorCategoriasVentas = 
[
    {
        type:"input",
        name:"efWs",
        message:"efectivo whatsapp: ",
        default: "0"
    },
    {
        type:"input",
        name:"bill",
        message:"billetera Santa Fe: ",
        default: "0"
    },
    {
        type:"input",
        name:"transf",
        message:"Transferencias: ",
        default: "0"
    },
    {
        type:"input",
        name:"pyOn",
        message:"Ped Ya Online: ",
        default: "0"
    },
    {
        type:"input",
        name:"pyEf",
        message:"Ped Ya Efectivo: ",
        default: "0"
    },
    {
        type:"input",
        name:"Rap",
        message:"Rapi: ",
        default: "0"
    },
    {
        type:"number",
        name:"Cad",
        message:"Cadetería: ",
        default: 0
    },
    {
        type: "number",
        name: "gastos_Efectivo",
        message: "gastos en efectivo del día: ",
        default: "0"
    },
    {
        type: "number",
        name: "gastos_Online",
        message: "gastos online del día: ",
        default: "0"
    }
]

module.exports = {
    categoriasVentas,
    modificadorCategoriasVentas
}