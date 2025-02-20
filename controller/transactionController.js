import { getBackUrl } from "./backUrl.js";
import {displayAllTransactions} from "../view/transactionsView.js"
const backUrl = `${getBackUrl()}/transaction`;
const backUrlPayment = `${getBackUrl()}/payment`;

const owner = JSON.parse(sessionStorage.getItem("owner"));

fetchAllTransactions("all")

document.addEventListener('click', function() {
    if (sessionStorage.getItem('start')) {
      
        startTransaction(sessionStorage.getItem('start'))
        sessionStorage.removeItem('start');
    }
    if (sessionStorage.getItem('stop')) {
       
        stopTransaction(sessionStorage.getItem('stop'))
        sessionStorage.removeItem('stop');
    }
    if (sessionStorage.getItem('payement')) {
        
       
        payTransaction(sessionStorage.getItem('payement'));
        sessionStorage.removeItem('payement');
    }
});


function payTransaction(idTransaction)
{   
   
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            "Authorization": "Bearer " + owner.token, 
        },
        body: JSON.stringify({ 
                "idReservation":idTransaction,
                "idAccountForPayment":1
            })
        };

    fetch(`${backUrl}/pay`, requestOptions)
    .then(response => {
        if(response.status ===200){
            console.log("dzadaz")
            
        }
        return response.json();  
            
    })
   
    .then(data => {
        console.log("Payment successful:", data);
        //window.location.href = "transactionManagement.html";  
    })
  

    
}

function startTransaction(idTransaction)
{   
   
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            "Authorization": "Bearer " + owner.token, 
        },
        body: JSON.stringify({ 
                "idReservation":idTransaction
            })
        };

    fetch(`${backUrl}/start`, requestOptions)
    .then(response => {
        console.log(response); 
        if(response.status ===200){
           
            window.location.href = "transactionManagement.html";
        }
            
    })
    
}



function stopTransaction(idTransaction){
    
const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" ,
        "Authorization": "Bearer " + owner.token, 
    },
    body: JSON.stringify({ 
            "idReservation": idTransaction
        })
    };



    fetch(`${backUrl}/stop`, requestOptions)
    .then(response => {
        if(response.status ===200){
            window.location.href = "transactionManagement.html";
        }
        
})

}

function fetchAllTransactions(){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            "Authorization": "Bearer " + owner.token, 
        },
        body: JSON.stringify({ 
                "userId":owner.userId,
                "date":"2024-02-18"
            })
        };

        fetch(`${backUrl}/info/user/history/`, requestOptions)
        .then(response => {
            console.log("Statut HTTP:", response.status);
            return response.json();
        })
        .then(data => {
            let i =1;
            data.forEach(item => {
                        
                displayAllTransactions(item,i)
                    
                
                
                i++;
            });
        })
        
    
}
 

