
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}`;

addActionToRegistrationButton();


function addActionToRegistrationButton() {
    const connectionButton = document.getElementById("registrationButton");
    connectionButton.addEventListener("click", handleFormSubmission);
}

function handleFormSubmission() {
    
    const firstName = document.getElementById('firstNameValue').value;
    const lastName = document.getElementById('lastNameValue').value;
    const birthdate = document.getElementById('birthdateValue').value;
    const phoneNumber = document.getElementById('phoneNumberValue').value;
    const streetAddress = document.getElementById('streetAddressValue').value;
    const city = document.getElementById('cityValue').value;
    const postalCode = document.getElementById('postalCodeValue').value;
    const email = document.getElementById('emailValue').value;
    const password = document.getElementById('passwordValue').value;
   
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            name: firstName,
            surname: lastName,
            birthdate: birthdate,
            email: email,
            password: password,
            address : streetAddress,
            phone_number: phoneNumber,
            city: city,
            postal_code: postalCode, 
        })
    };



    fetch(`${backUrl}/registration/`, requestOptions)
    .then(response => {
        console.log("Statut HTTP:", response.status); 
        if (response.status === 200) {
            
            sessionStorage.setItem("registered", "true");
            window.location.href = "home.html";
        
        } else {
            return Promise.reject(`Erreur HTTP : ${response.status}`);
        }
    })
    
}



