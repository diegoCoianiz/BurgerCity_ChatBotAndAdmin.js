const express = require('express')
const router = express.Router()
const { getCaja } = require("../controllers/fullStack/caja")

router.get("/", getCaja)

module.exports = router