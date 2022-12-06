const express = require('express')
const router = express.Router()
const { getBalanceSemana,getBalanceMes, getBalanceTrimestre, getBalanceTodo } = require("../controllers/fullStack/balance")

router.get("/semana", getBalanceSemana)
router.get("/mes", getBalanceMes)
router.get("/trimestre", getBalanceTrimestre)
router.get("/todo", getBalanceTodo)

module.exports = router