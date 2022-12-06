const { prompt } = require("inquirer")
const program = require("commander")
const {categoriasVentas, modificadorCategoriasVentas} = require("../inquirer/ventas")
const { postVentasDelDia, getVentaUnica, getListaVentas, 
deleteListaVentas, deleteVentaUnica, updateVentaUnica } = require("../controllers/CLI/ventas")
const { recuperar } = require("../controllers/CLI/balance")
const { procesador, deleteCaja } = require("../controllers/CLI/caja")

program
    .version("1.0.0")
    .description("Administrador de tareas de BurgerCity")

/* *** */

//bot
program
    .command("bot")
    .alias("b")
    .description("inicializa Burgercity chatBot")
    .action(() => {
        require("../bot/appBot")
})

/* *** CRUD DOCUMENTADOR   */

//post
program
    .command("venta")
    .alias("post")
    .description("inicializa documentador de ventas del día")
    .action(() => {
        console.clear()
        console.log("\t\t\t************************\n")
        console.log("\t\t\t*** INGRESOS DEL DÍA ***\n")
        console.log("\t\t\t************************\n")
        prompt(categoriasVentas).then(res => postVentasDelDia(res))
})

//get
program
    .command("historial <fecha>")
    .alias("get")
    .description("inicializa historal de ventas por fecha. 'todo' o 'dd/m/aaaa'")
    .action((fecha) => {
        console.clear()
        console.log("\t\t\t***************************\n")
        console.log("\t\t\t*** HISTORIAL DE VENTAS ***\n")
        console.log("\t\t\t***************************\n")
        if(fecha == "todo"){
            getListaVentas()
        } else {
            getVentaUnica(fecha)
        }
})

//update
program
    .command("modificar <fecha>")
    .alias("update")
    .description("inicializa modificador de ventas por fecha. 'dd/m/aaa'")
    .action((fecha) => {
        console.clear()
        console.log("\t\t\t*** MODIFICADOR DE VENTAS POR FECHA ***\n")
        prompt(modificadorCategoriasVentas).then(res => updateVentaUnica(fecha, res))
})

//delete
program
    .command("eliminar <option>")
    .alias("delete")
    .description(`inicializa eliminador de caja o ventas por fecha. Los comandos
    son: 'todo' 'caja' o especififcar 'dd/m/aaaa'`)
    .action((option) => {
        console.clear()
        console.log("\t\t\t*******************************************\n")
        console.log("\t\t\t*** ELIMINACIÓN DEL HISTORIAL DE VENTAS ***\n")
        console.log("\t\t\t*******************************************\n")
        if(option == "todo"){
            deleteListaVentas()
        } else if (option == "caja"){
            deleteCaja()
        }else {
            deleteVentaUnica(fecha)
        }
})

/* *** BALANCE por fechas   */

program
    .command("balance")
    .alias("bal")
    .description("inicializa balance de ingresos y egresos")
    .action(() => {
        console.clear()
        console.log("\t\t\t***********************\n")
        console.log("\t\t\t*** BALANCE GENERAL ***\n")
        console.log("\t\t\t***********************\n")
        recuperar()
})

/* *** REGISTRO de efecitvo y caja */
program
    .command("caja")
    .alias("c")
    .description("inicializa documentador de efectivo y caja")
    .action(() => {
        console.clear()
        console.log("\t\t\t*********************************\n")
        console.log("\t\t\t*** CAJA DE GASTOS & EFECTIVO ***\n")
        console.log("\t\t\t*********************************\n")
        prompt([
            {
                type: "number",
                name: "gastos_Efectivo",
                message: "nuevo gasto efectivo a ingresar: ",
                default: 0
            },
            {
                type: "number",
                name: "gastos_Online",
                message: "nuevo gasto online a ingresar: ",
                default: 0
            },
            {
                type: "number",
                name: "ingreso_Efectivo",
                message: "nuevo ingreso efectivo: ",
                default: 0
            }
        ]).then(res => {
            procesador(res.gastos_Efectivo, res.gastos_Online, res.ingreso_Efectivo)
        })
})

program
    .command("celular")
    .alias("cel")
    .description("inicializa acceso rapido por whatsapp")
    .action(() => {
        console.clear()
        console.log("\t\t\t***********************\n")
        console.log("\t\t\t*** ACCESOS DE CELULAR ***\n")
        console.log("\t\t\t***********************\n")
        require("../controllers/celular")
})

program.parse(process.argv)