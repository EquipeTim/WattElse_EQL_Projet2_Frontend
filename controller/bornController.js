import { displayBorns ,displayBornOfTransaction} from "../view/bornView.js";
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/terminals`;

if (window.location.pathname === '/pages/displayBorns.html') {
    searchAllBorn()
}
else {
    searchBorn()
}
function searchAllBorn(){
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Obtenir les valeurs des paramètres
    const radiusValue = urlParams.get('radius');
    const dateValue = urlParams.get('date');
    const plugTypeValue = urlParams.get('plugType');
    const longitudeValue = urlParams.get('longitude');
    const latitudeValue = urlParams.get('latitude');

   


    fetch(`${backUrl}/find`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
               
            },
            body: JSON.stringify({
                "searchRadius":radiusValue,
                "startingLat":latitudeValue,
                "startingLong": longitudeValue ,
                "plugType" : plugTypeValue
            })
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
                
                addMarker(item.latitude,item.longitude)
                displayBorns(item, i);
                i++;
            });
           
            
        })
    
      
}

function searchBorn(){
    
    const urlParams = new URLSearchParams(window.location.search);


    const idBorn = urlParams.get('idBorn');
    
    fetch(`${backUrl}/info/${idBorn}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
           
        },
      
    })
    .then(response => {
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des marques');
        }
        return response.json();
    })
    .then(data => {
       
        if(window.location.pathname === '/pages/displayTransactionBorn.html'){
            displayBornOfTransaction(data);
        }
        else{
            document.getElementById("idBornValue").textContent = `  ${data.idStation}` ;
            document.getElementById("adressBornValue").innerHTML = ` &nbsp;${data.addressChargingStation}&nbsp;`;
            document.getElementById("priceTypeValue").innerHTML = `&nbsp;${data.pricingType}:&nbsp;`;

            document.getElementById("priceValue").textContent =  `  ${data.price}`;
            
        }
        
        
        
    })

    
}
function redirectForSeeBorn(idBorn){
  
    location.href = 'displayTransactionBorn.html?idBorn=' + idBorn ;
}
  
window.redirectForSeeBorn = redirectForSeeBorn; 
