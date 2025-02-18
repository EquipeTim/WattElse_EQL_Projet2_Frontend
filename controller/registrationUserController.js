
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/user`;


const connectionButton = document.getElementById("registrationUserButton");
connectionButton.addEventListener("click", verifyForm);

function verifyForm() {
    
    const firstName = document.getElementById('firstNameValue').value;
    const lastName = document.getElementById('lastNameValue').value;
    const birthdate = document.getElementById('birthdateValue').value;
    const phoneNumber = document.getElementById('phoneNumberValue').value;
    const streetAddress = document.getElementById('streetAddressValue').value;
    const city = document.getElementById('cityValue').value;
    const postalCode = document.getElementById('postalCodeValue').value;
    const email = document.getElementById('emailValue').value;
    const password = document.getElementById('passwordValue').value;
    
    if (!firstName || !lastName || !birthdate || !phoneNumber || !streetAddress || !city || !postalCode || !email || !password) {
        document.getElementById("messageLabel").innerText = "Veuillez remplir tous les champs du formulaire ";
       
    }
    else{
        if(validatePhoneNumber() == true && validateEmail() && validatePassword()  ){
        
            handleFormSubmission();
            
        }
        else{
            document.getElementById("messageLabel").innerText = 
            "Veuillez renseigner des données valides pour chaque champs du formulaire ";
       
        }
       
        
    }
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
        if (response.status === 201) {
            
            sessionStorage.setItem("registered", "true");
            window.location.href = "home.html";
        
        } else {
            document.getElementById("messageLabel").innerText = 
            "L'adresse email existe déjà";
            return Promise.reject(`Erreur HTTP : ${response.status}`);
            
        }
    })
    
}



