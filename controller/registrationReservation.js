
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/transaction`;


const reservationButton = document.getElementById("reservationButton");
reservationButton.addEventListener("click",handleFormSubmission);

const owner = JSON.parse(sessionStorage.getItem("owner"));

function handleFormSubmission() {
    
    const startDateValue = document.getElementById('startDateValue').value;
    const startHourValue = document.getElementById('startHourValue').value;
    const durationReservationValue = document.getElementById('durationReservationValue').value;
    


  

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
            "Authorization": "Bearer " + owner.token, 
        },
        body: JSON.stringify({ 
          "idStation":1,
           "idUser":"2",
            "reservationDate":startDateValue,
            "reservationStart": startHourValue,
            "reservationDuration":durationReservationValue,
            "idUserBankAccount":1,
            "timestamp": new Date().toISOString()
        })
    };



    fetch(`${backUrl}/reservation/`, requestOptions)
    .then(response => {
        console.log("Statut HTTP:", response.status); 
        if (response.status === 201) {
            
            sessionStorage.setItem("registered", "true");
            window.location.href = "home.html";
        
        } else {
            document.getElementById("messageLabel").innerText = 
            "La réservation n'est pas possible";
            return Promise.reject(`Erreur HTTP : ${response.status}`);
            
        }
    })
    
}



