//#region ACORDEON de prueba
const accordionTest = document.getElementById("accordion")
shortFrom = "cliente_de_prueba"
data = {
    "transactionMessage":"este es un mensaje de prueba"
}

functionShorFrom = () => {
    console.log("")
}

accordionTest.innerHTML = 
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
//#endregion