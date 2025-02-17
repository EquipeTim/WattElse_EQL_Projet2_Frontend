import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/car`;


const registeredButton = document.getElementById("addCarButton");
registeredButton.addEventListener("click", handleFormSubmission);

const owner = JSON.parse(sessionStorage.getItem("owner"));

function verifyForm() {
    
    const licensePlateNumber = document.getElementById('licensePlateNumberValue').value;
    const brandCar = document.getElementById('brandCarValue').value;
    const modelCar = document.getElementById('modelCarValue').value;
    const plugType = document.getElementById('plugTypeValue').value;
    const maxElectricPower = document.getElementById('maxElectricPowerValue').value;
    
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
    
    const licensePlateNumber = document.getElementById('licensePlateNumberValue').value;
    const brandCar = document.getElementById('brandCarValue').value;
    const modelCar = document.getElementById('modelCarValue').value;
    const plugType = document.getElementById('plugTypeValue').value;
    const maxElectricPower = document.getElementById('maxElectricPowerValue').value;
    const currentDate = new Date();
    const addDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log(addDate,owner.userId)
    const requestOptions = {
        method: "POST",
        headers: { 
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            licensePlateNumber: licensePlateNumber,
            registrationDateCar:  addDate,
            removeDateCar:"2025-02-25 16:16:37",
            maxElectricPower:maxElectricPower,
            idModelCar: 1,
            userId: owner.userId
        })
    };
    
    fetch(`${backUrl}/add/`, requestOptions)
        .then(response => {
            console.log("Statut HTTP:", response.status); 
            if (response.status === 200) {
                sessionStorage.setItem("modifiedAccount","true")
             window.location.href = "home.html"
           
            } 
            else{
                console.log("erreur")
            }
        })
        .catch(error => {
            console.error("Erreur de requête:", error);
        });
    
    
}


 
