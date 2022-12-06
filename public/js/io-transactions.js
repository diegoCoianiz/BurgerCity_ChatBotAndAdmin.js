/* CONSTANTES */
//#region CONSTANTES
var io = io();
const screen = document.getElementById("Screen")
const nuevaVentana = document.getElementById("nuevaVentana")
const accordion = document.getElementById("accordion")
const wsNumber = document.getElementById("wsNumber")
//#endregion

/* SOCKET IO */
//#region SOCKET IO

let phoneNumbersArray = []

io.on("transactionFromServer", data => {
    
    data = JSON.parse(data)
    shortFrom = String(data.transactionNumber.substr(3,10))

    if(phoneNumbersArray.length == 0){

        phoneNumbersArray.push(String(shortFrom))
        accordion.innerHTML += newAcordionInnerHtml(data)
    }

    newNumber = true
    for(index in phoneNumbersArray){
        if (phoneNumbersArray[index] == shortFrom){
            element = document.getElementById(`body-for-${shortFrom}`)
            element.innerHTML += "<br>" + data.transactionMessage
            newNumber = false
            break
        }
    }

    if (newNumber) {
        phoneNumbersArray.push(String(shortFrom))
        accordion.innerHTML += newAcordionInnerHtml(data)
    }

    wsNumber.innerHTML = phoneNumbersArray.length
})

//nuevo acordeon
const newAcordionInnerHtml = (data) => {
    shortFrom = String(data.transactionNumber.substr(3,10))
    functionShorFrom = String(data.transactionNumber.substr(0,13))
    
    render =
    `
    <div class="accordion-item border">
        <form onkeydown="return event.key != 'Enter';" id="form-for-${shortFrom}"  action="#" border>
            <h2 class="accordion-header" id="flush-for-${shortFrom}">
                <button class="accordion-button collapsed" 
                    type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-for-${shortFrom}" 
                    aria-expanded="false" aria-controls="flush-collapse-for-${shortFrom}"">
                    ${shortFrom}
                </button>
            </h2>
            <div id="flush-collapse-for-${shortFrom}" class="accordion-collapse collapse" 
                    aria-labelledby="flush-for-${shortFrom}" 
                    data-bs-parent="#accordion">
                <div class="accordion-body" style="color: black" id="body-for-${shortFrom}">
                    ${data.transactionMessage}
                </div>
                <div class="row">
                    <div class="col-sm-10 col-md-9 col-lg-10 col-xl-11">
                        <input type="text" class="form-control" name="res-for-${shortFrom}" 
                        id="res-for-${shortFrom}" placeholder="responder">
                    </div>
                    <div class="col text-end">
                        <a class="btn btn-primary" id="sendTransaction" type="submit" 
                            onclick="sendMessageToServer(${functionShorFrom})"> > </a>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `
return render
}

//enviar mensaje al server
const sendMessageToServer = (data) => {
    data = String(data)
    shortFrom = data.substr(3,13)
    transactionValue = document.getElementById(`res-for-${shortFrom}`).value
    form = document.querySelector(`#form-for-${shortFrom}`)
    form.addEventListener("click", function (e) {
        e.preventDefault()
        if(transactionValue != ""){
            io.emit("transactionFromClient", {
                to: `${data}@c.us`,
                body: transactionValue
            })
        }
        transactionValue = ""
        form.reset()
    })    
}

//#endregion
