const semana = document.getElementById("colSemana")
const mes = document.getElementById("colMes")
const caja = document.getElementById("colCaja")
const trimestre = document.getElementById("colTrimestre")
const todo = document.getElementById("colTodo")
port = 3000

const fetchFunctionSemana = async () => {
    await fetch(`http://localhost:${port}/api/balance/semana`)
  .then((resp) => resp.json())
  .then(function(data) {
      semana.innerHTML = `semana: (${data.semana.cantidad_Ventas} pedidos) - 
      $${data.semana.ganancia_Total} de ganancia`
  })
  .catch(function(error) {
    console.log(error);
  });
}

const fetchFunctionMes = async () => {
  await fetch(`http://localhost:${port}/api/balance/mes`)
  .then((resp) => resp.json())
  .then(function(data) {
      mes.innerHTML = `mes: (${data.mes.cantidad_Ventas} pedidos) -
        $${data.mes.ganancia_Total} de ganancia`
  })
  .catch(function(error) {
    console.log(error);
  });
}

const fetchFunctionTrimestre = async () => {
  await fetch(`http://localhost:${port}/api/balance/trimestre`)
  .then((resp) => resp.json())
  .then(function(data) {
      trimestre.innerHTML = `trimestre: (${data.trimestre.cantidad_Ventas} pedidos) -
       $${data.trimestre.ganancia_Total} de ganancia`
  })
  .catch(function(error) {
    console.log(error);
  });
}

const fetchFunctionTodo = async () => {
  await fetch(`http://localhost:${port}/api/balance/todo`)
  .then((resp) => resp.json())
  .then(function(data) {
      todo.innerHTML = `absoluto: (${data.todo.cantidad_Ventas} pedidos) -
       $${data.todo.ganancia_Total} de ganancia`
  })
  .catch(function(error) {
    console.log(error);
  });
}

const fetchFunctionCaja = async () => {
    await fetch("http://localhost:3000/api/caja")
    .then((resp) => resp.json())
    .then(function(data) {
        caja.innerHTML = `ingresos efectivo: $${data.caja[0].ingresos_Efectivo} -
         egresos efectivo: $${data.caja[0].egresos_Efectivo} ($${data.caja[0].egresos_Total} total) -
         total efectivo en caja: $${data.caja[0].total_enEfectivo}`
    })
    .catch(function(error) {
      console.log(error);
    });
}

fetchFunctionSemana()
fetchFunctionMes()
fetchFunctionTrimestre()
fetchFunctionTodo()
fetchFunctionCaja()
//#endregion