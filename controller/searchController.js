import { getBackUrl } from "./backUrl.js";
const backUrlComponents = `${getBackUrl()}/components`;
fetchBorn()

function fetchBorn(){
    fetch(`${backUrlComponents}/plugs/all`, {
        method: 'GET',
        headers: { 
            
            "Content-Type": "application/json" 
        }
    })
    .then(response => {
 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des plugs');
        }
        return response.json();  
    })
    .then(data => {
        
        const selectElement = document.getElementById('plugTypeValue'); 
     
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.choiceId;  
            option.textContent = item.choice; 
            selectElement.appendChild(option); 
        });
    
    })
   
}