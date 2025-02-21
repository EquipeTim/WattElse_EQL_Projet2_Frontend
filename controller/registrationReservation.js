
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/transaction`;


const reservationButton = document.getElementById("reservationButton");
reservationButton.addEventListener("click",handleFormSubmission);

const owner = JSON.parse(sessionStorage.getItem("owner"));
const urlParams = new URLSearchParams(window.location.search);
function handleFormSubmission() {
    
    const startDateValue = document.getElementById('startDateValue').value;
    
    const startHourValue = document.getElementById('availableHours').value;
    const durationReservationValue = document.getElementById('durationReservationValue').value;
   
    const idBornValue = urlParams.get('idBorn');


    if(owner !=null){

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" ,
                "Authorization": "Bearer " + owner.token, 
            },
            body: JSON.stringify({ 
             
                
                "idStation": idBornValue ,
                "idUser":owner.userId,
                "reservationDate":startDateValue,
                "timeZone": "Europe/Paris",
                "reservationTime":startHourValue,
                "reservationDuration":durationReservationValue,
                "idUserBankAccount":idBornValue
            })
        };
        
        fetch(`${backUrl}/reservation/`, requestOptions)
        .then(response => {
            
            if (response.status === 400) {
                
                sessionStorage.setItem("transaction", "true");
                document.getElementById("messageLabel").innerText = 
                "Les données ne sont pas respectées pour la borne";
                
                
            }
            else{
                window.location.href = "transactionManagement.html";
            }
        
        })
    }
    else{
        document.getElementById("messageLabel").innerText = 
                "Veuillez d'abord vous connecter avant de réserver une borne";
    }
    
    
}




