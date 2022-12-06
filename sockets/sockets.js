const transactionFromServerToClient = (io, number, message) => {
    transaction = {
      transactionNumber: number,
      transactionMessage: message
    }
    transactionJSON = JSON.stringify(transaction)

  io.on("connection", socket => {
    socket.emit("transaction", transactionJSON)
  })
}

module.exports = {
  transactionFromServerToClient
}