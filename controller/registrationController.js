
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


    console.log("First Name: ", firstName);
console.log("Last Name: ", lastName);
console.log("Birthdate: ", birthdate);
console.log("Phone Number: ", phoneNumber);
console.log("Street Address: ", streetAddress);
console.log("City: ", city);
console.log("Postal Code: ", postalCode);
console.log("Email: ", email);
console.log("Password: ", password);


  
   

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



    fetch(`${backUrl}/registration/`, requestOptions )
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            console.log(data)
        })
        .catch(response => {
            console.error(
                "Une erreur s'est produite lors de l'envoi des informations",
                `${response.status} ${response.statusText}`
            );
        });
}


