import { getBackUrl } from "./backUrl.js";
const backUrl = `${getBackUrl()}/components`;


fetch(`${backUrl}/plug_type`, {
    method: 'GET',
    headers: { 
        "Content-Type": "application/json" }
})
.then(response => {
    console.log(response)
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des plugs');
    }
    return response.json();  
})
.then(data => {

    const selectElement = document.getElementById('selectPrise'); // Assurez-vous que votre <select> a cet ID
    
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.idPlugType;  
        option.textContent = item.plugType; 
        selectElement.appendChild(option); 
    });
   
})
.catch(error => {
    console.error('Erreur:', error);
});
