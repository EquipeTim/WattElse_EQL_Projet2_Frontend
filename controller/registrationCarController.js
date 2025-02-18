import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/car`;


const registeredButton = document.getElementById("addCarButton");
registeredButton.addEventListener("click", handleFormSubmission);

const owner = JSON.parse(sessionStorage.getItem("owner"));


function handleFormSubmission() {
    
    const licensePlateNumber = document.getElementById('licenseCarValue').value;
    const brandCar = document.getElementById('brandCarValue_1').value;
    const modelCar = document.getElementById('modelCarValue_1').value;
    const plugType = document.getElementById('plugTypeValue_1').value;
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
            brand: brandCar,
            carModel:modelCar,
            plug : plugType,
            maxElectricPower : maxElectricPower,
            userId: owner.userId
            
        })
    };
    
    fetch(`${backUrl}/add/`, requestOptions)
        .then(response => {
            console.log("Statut HTTP:", response.status); 
            if (response.status === 200) {
                sessionStorage.setItem("modifiedAccount","true")
            
           
            } 
            else{
                console.log("erreur")
            }
        })
        .catch(error => {
            console.error("Erreur de requête:", error);
        });
    
    
}


 
