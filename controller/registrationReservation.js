
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/transaction`;


const reservationButton = document.getElementById("reservationButton");
reservationButton.addEventListener("click",handleFormSubmission);

const owner = JSON.parse(sessionStorage.getItem("owner"));

function handleFormSubmission() {
    
    const startDateValue = document.getElementById('startDateValue').value;
    const startHourValue = document.getElementById('startHourValue').value;
    const durationReservationValue = document.getElementById('durationReservationValue').value;
   
    console.log(owner)
    console.log(durationReservationValue)
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            "Authorization": "Bearer " + owner.token, 
        },
        body: JSON.stringify({ 
         
            
           "idStation":1,
            "idUser":owner.userId,
            "reservationDate":startDateValue,
            "timeZone": "Europe/Paris",
            "reservationTime":startHourValue,
            "reservationDuration":durationReservationValue,
            "idUserBankAccount":1
        })
    };



    fetch(`${backUrl}/reservation/`, requestOptions)
    .then(response => {
        console.log("Statut HTTP:", response.status); 
        if (response.status === 400) {
            
            sessionStorage.setItem("transaction", "true");
            document.getElementById("messageLabel").innerText = 
            "Veuillez renseigner des données valides pour chaque champs du formulaire ";
            
            
        }
        else{
            window.location.href = "transactionManagement.html";
        }
       
    })
    
}



