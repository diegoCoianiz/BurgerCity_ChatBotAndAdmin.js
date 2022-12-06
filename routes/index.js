const express = require('express')
const router = express.Router()

const fs = require('fs')
const removeExtension = (fileName) => {
    return fileName.split(".").shift()
}

const path_routes = __dirname

fs.readdirSync(path_routes).filter(file => {
    const name = removeExtension(file)
    if(name !== "index"){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router