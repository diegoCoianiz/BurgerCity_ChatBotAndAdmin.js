const { prompt } = require("inquirer")
const program = require("commander")
const customerQuestions = require("../inquirer/customerQuestions")
const {addCustomer , findCustomer, updateCustomer, deleteCustomer, deleteAllCustomer, listCustomer} = require("../controllers/customers")

program
    .command("crear")
    .alias("c")
    .description("crear un nuevo usuario")
    .action(() => {
        prompt(customerQuestions).then(answers => addCustomer(answers))
})

program
    .command("encontrar <name>")
    .alias("e")
    .description("encontrar usuario")
    .action(name => findCustomer(name)
)

program
    .command("ver")
    .alias("v")
    .description("ver lista de usuarios")
    .action(() => listCustomer()
)

program
    .command("modificar <_id>")
    .alias("m")
    .description("modificar datos del usuario")
    .action(_id => {
        prompt(customerQuestions).then(answers => updateCustomer(_id, answers))
})

program
    .command("eliminar <_id>")
    .alias("x")
    .description("eliminar datos de usuario")
    .action(_id => deleteCustomer(_id)
)

program
    .command("eliminar-todo")
    .alias("XX")
    .description("eliminar base de datos")
    .action(() => deleteAllCustomer()
)

program.parse(process.argv)