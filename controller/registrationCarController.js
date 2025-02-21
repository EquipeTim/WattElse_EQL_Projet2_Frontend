import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/car`;


const registeredButton = document.getElementById("addCarButton");
registeredButton.addEventListener("click", verifyCarFormAddInfo);

const owner = JSON.parse(sessionStorage.getItem("owner"));

//Fonction qui permet de vérifier que tous les champs sont remplis correctement 
function verifyCarFormAddInfo() {
    const licensePlateNumber = document.getElementById('licenseCarValue').value;
    const brandCar = document.getElementById('brandCarValue_1').value;
    const modelCar = document.getElementById('modelCarValue_1').value;
    const plugType = document.getElementById('plugTypeValue_1').value;
    const maxElectricPower = document.getElementById('maxElectricPowerValue').value;
    const currentDate = new Date();
    const addDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    
    if (!licensePlateNumber || !brandCar || !modelCar || !plugType || !maxElectricPower || !currentDate || !addDate) {
        document.getElementById("messageErrorEmpty").innerText = "Attention ! Veuillez remplir tous les champs du formulaire";
    } else {
        if(validateLicenseCar() == true)  {
            handleFormSubmission();
        }
        else {
            document.getElementById("messageLabelLicenseCar").innerText = " ";
        }
    }
}

//Fonction qui permet de récupérer les valeurs ajoutées dans le formulaire, et permet de les envoyer dans la BDD
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
            if (response.status === 400) {
                document.getElementById("messageErrorCarAdd").innerText = "Tous les champs ne sont pas remplis correctement";
                return Promise.reject(`Erreur HTTP : ${response.status}`);
            } 
            else {
                sessionStorage.setItem("added", "true");
                window.location.href = "chargingStationInfosManagement.html";
            }
        })
        .catch(error => {
            console.error("Erreur de requête:", error);
        });
  
}


 
