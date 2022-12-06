const mongoose = require("mongoose")
const Customer = require("../models/customers")

//post
const addCustomer = (customer) => {
    Customer.create(customer).then( customer => {
        console.info("Nuevo usuario añadido", customer)
        mongoose.connection.close()
    })
}

//get
const findCustomer = (name) => {
    const search = new RegExp(name, "i") // Make upper - lower case insensitive
    Customer.find({$or: [{firstName: search}, {lastName: search}]})
        .then(customer => {
            console.info(customer)
            console.info(`encontrados: ${customer.length}`)
            mongoose.connection.close()
        })
}

//get all
const listCustomer = () => {
    Customer.find()
        .then(customers => {
            console.info(`cantidad de usuarios: ${customers.length}`)
            console.info(customers)
            console.info(`cantidad de usuarios: ${customers.length}`)
            mongoose.connection.close()
        })
}

//update
const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer)
        .then(customer => {
            console.info("Datos del usuario modificados")
            mongoose.connection.close()
        })
}

//delete
const deleteCustomer = (_id) => {
    Customer.deleteOne({_id})
        .then(customer => {
            console.info("Usuario eliminado con exito")
            mongoose.connection.close()
        })
}

//delete all
const deleteAllCustomer = () => {
    Customer.deleteMany()
        .then(customer => {
            console.info("La base de datos a sido completamente eliminada")
            console.info(`cantidad de usuarios: ${customer.length == undefined ? 0: null}`)
            mongoose.connection.close()
        })
} 

/*   export methods   */
module.exports = {
    addCustomer,
    findCustomer,
    listCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomer
}