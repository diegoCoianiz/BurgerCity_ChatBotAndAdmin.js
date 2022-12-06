const mongoose = require("mongoose")

const customersSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String}
})

module.exports = mongoose.model("customers", customersSchema)