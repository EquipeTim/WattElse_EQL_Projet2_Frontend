import { displayCarsAddAttribute, displayCars } from "../view/carView.js";
import { getBackUrl } from "./backUrl.js";

const backUrlComponents = `${getBackUrl()}/components`;
const backUrlCar = `${getBackUrl()}/car`;
const owner = JSON.parse(sessionStorage.getItem("owner"));
sessionStorage.setItem("verify","true")
if (window.location.pathname === '/pages/carAdd.html') {
    let i = 1;
    const selectedBrand = document.getElementById(`brandCarValue_${i}`);
    const selectedModel = document.getElementById(`modelCarValue_${i}`);
    setupCarFields(selectedBrand, selectedModel, i);
}

if (window.location.pathname === '/pages/carInfosManagement.html') {
    fetch(`${backUrlCar}/get/all`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + owner.token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des marques');
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
        let i = 1;
        data.forEach(item => {
            displayCars(item, i);
            
            const selectedBrand = document.getElementById(`brandCarValue_${i}`);
            const selectedModel = document.getElementById(`modelCarValue_${i}`);
            
            setupCarFields(selectedBrand, selectedModel, i); 
            i++;
        });
        
    })
   
    .catch(error => {
        console.error('Erreur:', error);
    });
}

function setupCarFields(selectedBrand, selectedModel, uniqueId) {
    
    fetchBrand(selectedBrand, selectedModel, uniqueId);
    
    
    selectedBrand.addEventListener('change', function() {
        fetchModelsForBrand(selectedBrand.value, selectedModel, selectedBrand, uniqueId);
    });
}

function fetchBrand(selectedBrand, selectedModel, uniqueId) {
    fetch(`${backUrlComponents}/brands`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des marques');
        }
        return response.json();
    })
    .then(data => {
        selectedBrand.innerHTML = '';  // Clear previous brands
        data.forEach(item => {
            displayCarsAddAttribute(item, selectedBrand);
           
            
        });
       
        
        // Now that brands are available, fetch the models for the selected brand
        fetchModelsForBrand(selectedBrand.value, selectedModel, selectedBrand, uniqueId);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

function fetchModelsForBrand(brand, selectedModel, selectedBrand, uniqueId) {
    fetch(`${backUrlComponents}/${brand}/models/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des modèles');
        }
        return response.json();
    })
    .then(data => {
        selectedModel.innerHTML = '';  // Clear previous models
        data.forEach(item => {
            displayCarsAddAttribute(item, selectedModel);
        });
        
        
        fetchPlugsForModel(selectedBrand, selectedModel, uniqueId);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

function fetchPlugsForModel(selectedBrand, selectedModel, uniqueId) {
  
        
        const selectedPlug = document.getElementById(`plugTypeValue_${uniqueId}`);
        fetch(`${backUrlComponents}/plugs/by_car`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "brand": selectedBrand.value,
                "carModel": selectedModel.value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des types de prise');
            }
            return response.json();
        })
        .then(data => {
            selectedPlug.innerHTML = '';  // Clear previous plugs
            data.forEach(item => {
                displayCarsAddAttribute(item, selectedPlug);
                
            });
    
            fetch(`${backUrlCar}/get/all`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + owner.token
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des marques');
                }
                return response.json();
            })
            .then(data => {
                let i = 1;
                data.forEach(item => {
                   
                    if (sessionStorage.getItem("verify") === "true" && window.location.pathname === '/pages/carInfosManagement.html'){
                    
                        const selectedBrand = document.getElementById(`brandCarValue_${i}`);
                        selectedBrand.value = item.brand;
                        const selectedModel = document.getElementById(`modelCarValue_${i}`);
                        fetchModelsForBrand(selectedBrand.value, selectedModel, selectedBrand, i)
                        selectedModel.value = item.carModel;
                    
                        
                        const selectedPlug = document.getElementById(`plugTypeValue_${i}`);
                        selectedPlug.innerHTML =""
                        fetchPlugsForModel(selectedBrand, selectedModel, i)
                        
                    

                        
                    
                    }
            
                    
                    i++;
                });
                sessionStorage.setItem("verify","false")
            
            
            
                
            })
       

   

       
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}

