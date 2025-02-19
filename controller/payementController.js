
import { getBackUrl } from "./backUrl.js";
import { displayPayments } from "../view/payementView.js";
const backUrl = `${getBackUrl()}/payment_methods`;


const owner = JSON.parse(sessionStorage.getItem("owner"));
if (window.location.pathname === '/pages/popupReservation.html') {
    getPayementMethod();
    

}else{
    const creditCardAddButton = document.getElementById("creditCardAddButton");
    creditCardAddButton.addEventListener("click", creditCardHandleFormSubmission);
    const accountBankAddButton = document.getElementById("accountBankAddButton");
    accountBankAddButton.addEventListener("click",accountBankHandleFormSubmission);
}

function creditCardHandleFormSubmission() {

    const userBankCardValue = document.getElementById('userBankCardValue').value;
    const numberBankCardValue = document.getElementById('numberBankCardValue').value;
    const dateBankCardValue = document.getElementById('dateBankCardValue').value;
    const cvvCardValue = document.getElementById('cvvCardValue').value;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": "Bearer " + owner.token, 
         },
        body: JSON.stringify({ 
            cardHolderName: userBankCardValue,
            numberCard : numberBankCardValue,
            expirationDate: dateBankCardValue,
            cvvNumber: cvvCardValue,

        })
    };



    fetch(`${backUrl}/card/add`, requestOptions)
    .then(response => {
        console.log("Statut HTTP:", response.status); 
        if (response.status === 200) {
             sessionStorage.setItem("addedCreditCard","true")
             window.location.href = "home.html"
         
            
        
        } else {
            document.getElementById("messageLabel").innerText = 
            "L'adresse email existe déjà";
            return Promise.reject(`Erreur HTTP : ${response.status}`);
            
        }
    })
    
}


function accountBankHandleFormSubmission() {

    const userBankAccountValue = document.getElementById('userBankAccountValue').value;
    const ibanValue = document.getElementById('ibanValue').value;
    const swiftValue = document.getElementById('swiftValue').value;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "Authorization": "Bearer " + owner.token, 
         },
        body: JSON.stringify({ 
          
            iban :ibanValue,
            ownerName : userBankAccountValue,
            swift : swiftValue,
            userId : owner.userId
        
        
        })
    };

    fetch(`${backUrl}/account/add`, requestOptions)
    .then(response => {
        console.log("Statut HTTP:", response.status); 
        if (response.status === 200) {
             sessionStorage.setItem("addedCreditCard","true")
             window.location.href = "home.html"
         
            
        
        } else {
            document.getElementById("messageLabel").innerText = 
            "L'adresse email existe déjà";
            return Promise.reject(`Erreur HTTP : ${response.status}`);
            
        }
    })
    
}
function getPayementMethod(){
    
    fetch(`${backUrl}/card/all`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des comptes bancaire');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        let i = 1;
        
          data.forEach(item => {
            displayPayments(i,item,"card")
            i++;
        });
                   
    })
    
   
    fetch(`${backUrl}/account/all`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cartes bancaire');
        }
        return response.json();
    })
    .then(data => {
        let i = 1;
        
          data.forEach(item => {
            displayPayments(i,item,"account")
            i++;
        });
                   
    })
    
}

