export function displayPaymentsAttribute(item,select) {
  
    const option = document.createElement('option');
    option.value = item.choice;
    option.textContent = item.choice;
    select.appendChild(option);
  
}

export function displayAllPayments(i,item,type) {
    const uniqueId = i;

    if(type ==="card"){
        const cardHTML = `
                    <div class="row">
                <div class="d-flex">
                    <h3 class="fw-bold text-primary">Cartes bancaires : </h4>
                </div>
            </div>

            <div class="card row mb-4">
                <div class="card-header justify-content-center bg-primary text-white">
                    <h4>Gestion de la carte n°${uniqueId}</h4>
                </div>

                <div class="card-body row d-flex">
                    <div class="col-md-9">
                        <div>
                            <div class="mt-3 mb-3 d-flex">
                                <div class="w-50">
                                    <label class="text-primary fw-bold" for="bankCardValue-${uniqueId}-card">Nom du titulaire :</label>
                                    <input id="bankCardValue-${uniqueId}-card" type="text" class="form-control" placeholder="John Doe" value="${item.cardHolderName}"/> 
                                </div>
        
                                <div class="mx-5 w-50">
                                    <label class="text-primary fw-bold" for="numberBankCardValue-${uniqueId}-card">Numéro de carte :</label>
                                    <input id="numberBankCardValue-${uniqueId}-card" type="text" class="form-control" placeholder="1234 5678 9102 3456" value="${item.numberCard}"/> 
                                </div>
                            </div>
                        </div>
        
                        <div>
                            <div class="mt-3 mb-3 d-flex">
                                <div class="w-50">
                                    <label class="text-primary fw-bold" for="dateExpCardValue-${uniqueId}-card">Date d'expiration</label>
                                    <input id="dateExpCardValue-${uniqueId}-card" type="date" class="form-control" value="${item.expirationDate}"/> 
                                </div>
        
                                <div class="mx-5 w-50">
                                    <label class="text-primary fw-bold" for="cvvNumberValue-${uniqueId}-card">Numéro CVV : </label>
                                    <input id="cvvNumberValue-${uniqueId}-card" type="text" class="form-control" placeholder="123" value="${item.cvvNumber}"/> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 justify-content-center align-self-center">
                        <button id="modificationCardButton" class="btn btn-lg btn-primary col-12 w-100 mb-4 p-2">Modifier</button>
                        <button id="deleteCardButton" class="btn btn-lg btn-danger col-12 p-2">Retirer</button>
                    </div>
                </div>
            </div>

            <hr>
        `;
        const carsDiv = document.getElementById('allPaymentViewDiv');
        carsDiv.insertAdjacentHTML("beforeend", cardHTML) 
    }

    if (type==="account"){
        const cardHTML = `
                    <div class="row">
                <div class="d-flex mt-3">
                    <h3 class="fw-bold text-dark">Comptes bancaires : </h4>
                </div>
            </div>

            <div class="card row">
                <div class="card-header justify-content-center bg-dark text-white">
                    <h4>Gestion du compte bancaire n°${uniqueId}</h4>
                </div>

                <div class="card-body row d-flex">
                    <div class="col-md-9">
                        <div>
                            <div class="mt-3 mb-3 d-flex">
                                <div class="w-50">
                                    <label class="text-dark fw-bold" for="userBankAccountValue-${uniqueId}-account">Nom du titulaire :</label>
                                    <input id="userBankAccountValue-${uniqueId}-account" type="text" class="form-control" placeholder="John Doe" value="${item.accountOwnerName}"/> 
                                </div>
        
                                <div class="mx-5 w-50">
                                    <label class="text-dark fw-bold" for="ibanBankAccountValue-${uniqueId}-account">IBAN :</label>
                                    <input id="ibanBankAccountValue-${uniqueId}-account" type="text" class="form-control" placeholder="FR00 0000 0000 0000" value="${item.iban}"/> 
                                </div>
                            </div>
                        </div>
        
                        <div>
                            <div class="mt-3 mb-3 d-flex">
                                <div class="w-50">
                                    <label class="text-dark fw-bold" for="swiftValue-${uniqueId}-account">BIC/SWIFT :</label>
                                    <input id="swiftValue-${uniqueId}-account" type="text" class="form-control" placeholder="BICXXXXXX" value="${item.bicSwift}"/> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 justify-content-center align-self-center">
                        <button  id="modificationBankButton" class="btn btn-lg btn-primary col-12 w-100 mb-4 p-2">Modifier</button>
                        <button  id="deleteBankButton" class="btn btn-lg btn-danger col-12 p-2">Retirer</button>
                    </div>
                </div>
            </div>
    `;
    const carsDiv = document.getElementById('allPaymentViewDiv');
    carsDiv.insertAdjacentHTML("beforeend", cardHTML)
    }
}