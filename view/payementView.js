export function displayPayments( i,item,type) {
    const uniqueId = i;  // Utiliser l'index 'i' comme ID unique
   
    
    if(type==="card"){
        
        const cardHTML = `
        <input class="form-check-input mt-2" type="radio" name="optionsRadios" id="radioButtonPayment1" value="option1" checked="">
                    <div class="row">
                        <label for="radioButtonPayment1" class="fw-bold mt-1">Carte bancaire : ${item.numberCard} </label>
                        <div>
       
        `;
        const carsDiv = document.getElementById('payementInformation');
        carsDiv.insertAdjacentHTML("beforeend", cardHTML) 
    }
        
    if(type==="account"){
        
        const cardHTML = `
       <input class="form-check-input mt-2" type="radio" name="optionsRadios" id="radioButtonPayment_${uniqueId}" value="iban_${uniqueId}" checked>
<div class="row">
    <label for="radioButtonPayment_${uniqueId}" class="fw-bold mt-1">Compte bancaire : ${item.iban}</label>
</div>

       
        `;
        const carsDiv = document.getElementById('payementInformation');
        carsDiv.insertAdjacentHTML("beforeend", cardHTML) 
    }

  

  

}