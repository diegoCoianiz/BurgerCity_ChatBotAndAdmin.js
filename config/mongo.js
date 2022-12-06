const mongoose = require("mongoose")
require('dotenv').config()

const dbConnect = async () => {
    uri = process.env.mongoAtlasDB_URI
    mongoose.connect(uri, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err, res) => {
        if(err){
            console.log("*** DB no conectada ***")
        } else {
            //console.log("*** DB ATLAS conectada")
        }
    })
}

module.exports = dbConnect