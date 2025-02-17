
import { getBackUrl } from "./backUrl.js";
import { displayUserStatut } from "../view/userView.js";

const backUrl = `${getBackUrl()}/user`;

const owner = JSON.parse(sessionStorage.getItem("owner"));

const deleteButton = document.getElementById("deleteUserButton");
deleteButton.addEventListener("click", deleteUser);
const modificationButton = document.getElementById("modificationUserButton");
modificationButton.addEventListener("click",  modificationUser);

fetchUser()
function fetchUser() {

    fetch(`${backUrl}/details`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + owner.token, 
            "Content-Type": "application/json"
        },
       
       
    })
    .then(response => {
        
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }
        return response.json();
    })
    .then(data => {
        
        displayUserStatut(data)
        
    })
    
    
}

function deleteUser() {
    
    fetch(`${backUrl}/close`, {
        method: "POST", 
        headers: {
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            userId: owner.userId,
            reasonId: 1,
            token : owner.token
        })
    })
    .then(response => {
        sessionStorage.setItem("closedAccount","true")
        window.location.href = "home.html"
        sessionStorage.removeItem("owner");
    })
   
}

function modificationUser() {

  
    const firstName = document.getElementById('firstNameValue').value;
    const lastName = document.getElementById('lastNameValue').value;
    const birthdate = document.getElementById('birthdateValue').value;
    const phoneNumber =     document.getElementById("phoneUserValue").value ;
    const streetAddress = document.getElementById("addressUserValue").value ;
    const city =  document.getElementById("cityUserValue").value ;
    const postalCode = document.getElementById('postalCodeUserValue').value;
    const email = document.getElementById("emailValue").value ;
    const password = document.getElementById('passwordValue').value;

    const requestOptions = {
        method: "POST",
        headers: { 
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json" },
        body: JSON.stringify({ 
            id : owner.userId,
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

    console.log(owner.token)
    fetch(`${backUrl}/modify/`, requestOptions)
    .then(response => {
        console.log(response.status); 
        if (response.status === 200) {

            sessionStorage.setItem("modifiedAccount","true")
            window.location.href = "home.html"
        } else if (response.status === 403) {
            
            document.getElementById("messageLabel").innerText = 
                "Vous n'êtes pas autorisé à modifier cet utilisateur.";
        } else {
            
            document.getElementById("messageLabel").innerText = 
                "Une erreur est survenue. Code erreur: " + response.status;
        }
    })
    .catch(error => {
        console.error("Erreur:", error);
      
    });

   
}