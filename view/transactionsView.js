export function displayAllTransactions(item, i,tabInfo) {
    const uniqueId = i;  // Utiliser l'index 'i' comme ID unique
    
    const updatedDate = item.reservationDate.replace('T', ' ');
    const words = item.priceType.split(' ');

  



    

    const consumeQuantityInformation = words[2]; 
    

    
    if(item.startDateCharging == null && item.endDateCharging== null){
        

        const cardHTML = `
        <div>
          <div class="card border-primary mb-4 shadow-lg">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <span>Transaction numéro : ${item.idTransaction}</span>
              <small class="text-white">Date de réservation : ${updatedDate}</small>
            </div>
            <div id="bodyTransaction_${item.idTransaction}" class="card-body">
              <h4 class="card-title text-primary">Transaction en attente</h4>
              <ul class="list-unstyled d-flex m-0">
                <li class="text-muted">${item.priceType}&nbsp;:&nbsp;</li>
                <li>${item.price} €</li>
              </ul>
              <ul class="list-unstyled d-flex m-0">
                <li class="text-muted">Quantité consomées&nbsp;:&nbsp;</li>
                <li>${item.consumeQuantity} ${consumeQuantityInformation}</li>
              </ul>
              <ul class="list-unstyled d-flex">
                <li class="text-muted">Montant à régler&nbsp;:&nbsp;</li>
                <li>${item.monetaryAmount} €</li>
              </ul>
              <div class="d-flex justify-content-center text-danger col-12"><p id="messageLabel_${item.idTransaction}"></p></div>
              <div class="d-flex justify-content-center mt">
               
                <button value="${item.idTransaction}" type="button" class="btn btn-success btn-lg px-5 rounded-pill shadow-sm startTransactionBtn" id="startTransactionBtn_${item.idTransaction}">
                  <i class="bi bi-arrow-repeat"></i> Démarrer la recharge
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      let carsDiv = document.getElementById('informationWaitTransaction');
      carsDiv.insertAdjacentHTML("beforeend", cardHTML);
      
      let carsDivGlobal = document.getElementById('informationAllTransaction');
      carsDivGlobal.insertAdjacentHTML("beforeend", cardHTML);
      
      const buttonsStartTransaction = document.querySelectorAll(".startTransactionBtn");
      
      buttonsStartTransaction.forEach(button => {
        button.addEventListener('click', function(event) {
          const value = event.target.value; 
         
          sessionStorage.setItem('start', value)
        });
      });
          
    }
   else if(item.startDateCharging != null && item.endDateCharging== null){
    const updatedStartDate = item.startDateCharging.replace('T', ' ');
        const cardHTML = `
        <div>
            <div class="card border-primary mb-4 shadow-lg">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span>Transaction numéro : ${item.idTransaction} </span>
                    <small class="text-white">Date de réservation ${updatedDate}</small>
                </div>
                <div id="bodyTransaction_${item.idTransaction}" class="card-body">
                    <h4 class="card-title text-primary">Transaction en cours </h4>
                    <ul class="list-unstyled d-flex m-0">
                      <li class="text-muted">${item.priceType}&nbsp;:&nbsp;</li>
                      <li>${item.price} €</li>
                    </ul>
                    <ul class="list-unstyled d-flex m-0">
                      <li class="text-muted">Quantité consomées&nbsp;:&nbsp;</li>
                      <li>${item.consumeQuantity} ${consumeQuantityInformation}</li>
                    </ul>
                    <ul class="list-unstyled d-flex m-0">
                      <li class="text-muted">Montant à régler&nbsp;:&nbsp;</li>
                      <li>${item.monetaryAmount} €</li>
                    </ul>
                    <ul class="list-unstyled d-flex m-0">
                      <li class="text-muted">Recharge debuté le :&nbsp;&nbsp;</li>
                      <li>${ updatedStartDate}</li>
                    </ul>
               
                    <div class="d-flex justify-content-center text-danger col-12"><p id="messageLabel_${i}"></p></div>
                    <div class="d-flex justify-content-center mt-4">
                      
                        <button value="${item.idTransaction}" type="button" class="btn btn-danger btn-lg px-5 rounded-pill shadow-sm stopTransactionBtn">
                            <i class="bi bi-arrow-repeat"></i> Stopper la recharge
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
   
        let carsDiv = document.getElementById('informationCurrentTransaction');
        carsDiv.insertAdjacentHTML("beforeend", cardHTML) ;
        let carsDivGlobal = document.getElementById('informationAllTransaction');
        carsDivGlobal.insertAdjacentHTML("beforeend", cardHTML) ;


         
      const buttonsEndTransaction = document.querySelectorAll(".stopTransactionBtn");
      
      buttonsEndTransaction.forEach(button => {
        button.addEventListener('click', function(event) {
          const value = event.target.value; 
         
          sessionStorage.setItem('stop', value);
        });
      });
      
       
    }
    
    else if(item.endDateCharging != null){
      const updatedStartDate = item.startDateCharging.replace('T', ' ');
      const updatedEndDate = item.endDateCharging.replace('T', ' ');
      
        if(item.paymentDate==null){
          
          const cardHTML = `
          <div>
              <div class="card border-primary mb-4 shadow-lg">
                  <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                      <span>Transaction numéro : ${item.idTransaction}</span>
                      <small class="text-white">Date de réservation ${updatedDate}</small>
                  </div>
                  <div id="bodyTransaction_${item.idTransaction}" class="card-body">
                      <h4 class="card-title text-primary">Transaction terminé</h4>
                      
                       <ul class=" list-unstyled d-flex m-0" >
              
                          <li class="text-muted">${item.priceType}&nbsp;:&nbsp;</li>
                          <li>${item.price} €</li>
                      </ul>
                       <ul class=" list-unstyled d-flex m-0" >
                      
                          <li class="text-muted">Quantité consomées&nbsp;:&nbsp;</li>
                          <li>${item.consumeQuantity} ${consumeQuantityInformation} </li>
                      </ul>
                      <ul class=" list-unstyled d-flex m-0" >
                          <li class="text-muted">Montant régler&nbsp;:&nbsp;</li>
                          <li>${item.monetaryAmount} €</li>
                      </ul>
                      <ul class="list-unstyled d-flex m-0">
                        <li class="text-muted">Recharge debuté le :&nbsp;&nbsp;</li>
                        <li>${updatedStartDate}</li>
                      </ul>
                         <ul class="list-unstyled d-flex m-0">
                        <li class="text-muted">Recharge terminé le :&nbsp;&nbsp;</li>
                        <li>${updatedEndDate}</li>
                      </ul>
                      <div class="d-flex justify-content-center mt-4" id="divButton_${i}">
                        <button value="${item.idTransaction}" type="button" class="btn btn-primary btn-lg px-5 rounded-pill shadow-sm payTransactionBtn">
                          <i class="bi bi-arrow-repeat"></i> Payer la recharge
                        </button>                
                      </div>
                  </div>
              </div>
          </div>
          `;
          let carsDiv = document.getElementById('informationCompletedTransaction');
          carsDiv.insertAdjacentHTML("beforeend", cardHTML) ;
          let carsDivGlobal = document.getElementById('informationAllTransaction');
          carsDivGlobal.insertAdjacentHTML("beforeend", cardHTML) ;
        
          const buttonPayTransaction = document.querySelectorAll(".payTransactionBtn");
              
          buttonPayTransaction.forEach(button => {
            button.addEventListener('click', function(event) {
              const value = event.target.value; 
              
              sessionStorage.setItem('payement', value);
            });
          });
          
        }
        else{
          const cardHTML = `
          <div>
              <div class="card border-primary mb-4 shadow-lg">
                  <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                      <span>Transaction numéro : ${item.idTransaction}</span>
                      <small class="text-white">Date de réservation ${updatedDate}</small>
                  </div>
                  <div id="bodyTransaction_${item.idTransaction}" class="card-body">
                      <h4 class="card-title text-primary">Transaction terminé</h4>
                      
                       <ul class=" list-unstyled d-flex m-0" >
              
                          <li class="text-muted">${item.priceType}&nbsp;:&nbsp;</li>
                          <li>${item.price} €</li>
                      </ul>
                       <ul class=" list-unstyled d-flex m-0" >
                      
                          <li class="text-muted">Quantité consomées&nbsp;:&nbsp;</li>
                          <li>${item.consumeQuantity} ${consumeQuantityInformation} </li>
                      </ul>
                      <ul class=" list-unstyled d-flex m-0" >
                          <li class="text-muted">Montant régler&nbsp;:&nbsp;</li>
                          <li>${item.monetaryAmount} €</li>
                      </ul>
                       <ul class="list-unstyled d-flex m-0">
                        <li class="text-muted">Recharge debuté le :&nbsp;&nbsp;</li>
                        <li>${updatedStartDate}</li>
                      </ul>
                         <ul class="list-unstyled d-flex m-0">
                        <li class="text-muted">Recharge terminé le :&nbsp;&nbsp;</li>
                        <li>${updatedEndDate}</li>
                      </ul>
                      <div class="d-flex justify-content-center mt-4" id="divButton_${i}">
                       
                      </div>
                  </div>
              </div>
          </div>
          `;

          let carsDiv = document.getElementById('informationCompletedTransaction');
          carsDiv.insertAdjacentHTML("beforeend", cardHTML) ;
          let carsDivGlobal = document.getElementById('informationAllTransaction');
          carsDivGlobal.insertAdjacentHTML("beforeend", cardHTML) ;


        } 
         

       
    }

}