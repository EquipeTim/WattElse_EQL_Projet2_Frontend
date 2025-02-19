export function displayAllTransactions(item, i,tabInfo) {
    const uniqueId = i;  // Utiliser l'index 'i' comme ID unique
 
   
    
    console.log(item)

    if(item.startDateCharging == null && item.endDateCharging== null){
        

        const cardHTML = `
      <div>
            <div class="card border-primary mb-4 shadow-lg">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span>Transaction numéro : ${item.idTransaction}</span>
                    <small class="text-white">${new Date().toLocaleDateString()}</small>
                </div>
                <div id="bodyTransaction_${item.idTransaction}" class="card-body">
                    <h4 class="card-title text-primary">Transaction en attente</h4>
                    <p class="card-text text-muted">Détails de la transaction : <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae justo in eros vestibulum blandit. Curabitur ullamcorper purus nec leo elementum, ut viverra nunc cursus.</p>
                    <div class="d-flex justify-content-center mt-4">
                        <button value="${item.idTransaction}" type="button" class="btn btn-success btn-lg px-5 rounded-pill shadow-sm" id="startTransactionBtn_${i}">
                            <i class="bi bi-arrow-repeat"></i> Démarrer la recharge
                        </button>
                    </div>
                </div>
            </div>
        </div>

        `;
       

        let carsDiv = document.getElementById('informationWaitTransaction');
        carsDiv.insertAdjacentHTML("beforeend", cardHTML) ;

        let carsDivGlobal = document.getElementById('informationAllTransaction');
        carsDivGlobal.insertAdjacentHTML("beforeend", cardHTML) ;
        
        const buttonStartTransaction = document.getElementById(`startTransactionBtn_${i}`);
        buttonStartTransaction.addEventListener('click', function() {
            const value = buttonStartTransaction.value;
            sessionStorage.setItem('start', value);
        });
        
    }
   else if(item.startDateCharging != null && item.endDateCharging== null){
        const cardHTML = `
        <div>
            <div class="card border-primary mb-4 shadow-lg">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span>Transaction numéro : Transaction en cours</span>
                    <small class="text-white">${new Date().toLocaleDateString()}</small>
                </div>
                <div id="bodyTransaction_${item.idTransaction}" class="card-body">
                    <h4 class="card-title text-primary">Transaction à venir </h4>
                    <p class="card-text text-muted">Détails de la transaction : .</p>
                    <div class="d-flex justify-content-center mt-4">
                        <button value="${i}" type="button" class="btn btn-danger btn-lg px-5 rounded-pill shadow-sm" id="stopTransactionBtn_${i}">
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

          
        const buttonStartTransaction = document.getElementById(`stopTransactionBtn_${i}`);
        buttonStartTransaction.addEventListener('click', function() {
            const value = buttonStartTransaction.value;
            sessionStorage.setItem('stop', value);
        });
    }
   
    else if(item.endDateCharging != null){
       
        const cardHTML = `
        <div>
            <div class="card border-primary mb-4 shadow-lg">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span>Transaction numéro : ${item.idTransaction}</span>
                    <small class="text-white">${new Date().toLocaleDateString()}</small>
                </div>
                <div id="bodyTransaction_${item.idTransaction}" class="card-body">
                    <h4 class="card-title text-primary">Transaction terminé</h4>
                    <p class="card-text text-muted">Détails de la transaction : <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae justo in eros vestibulum blandit. Curabitur ullamcorper purus nec leo elementum, ut viverra nunc cursus.</p>
                    <div class="d-flex justify-content-center mt-4">
                        
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