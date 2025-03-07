import { displayBorns ,displayBornOfTransaction,displayOpeningHour,displayNoneBorn} from "../view/bornView.js";
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/terminals`;
const urlParams = new URLSearchParams(window.location.search);
if (window.location.pathname === '/pages/displayBorns.html') {
    searchAllBorn()
}
else {
    searchBorn()
}
function searchAllBorn(){
    


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
                "plugId" : plugTypeValue,
                "timeZone":"Europe/Paris",
                "date":dateValue ,
                "time": "14:00"
            })
            
        })
        
        .then(response => {
           
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des bornes');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            let i = 1;
            data.forEach(item => {
                
                addMarker(item.latitude,item.longitude)
                displayBorns(item, i);
                i++;
            });
            if(data.length ===0){
                displayNoneBorn()
            }
           
            
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
            fetch(`${backUrl}/info/hours`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  stationId: 1,
                  timeZone: 'Europe/Paris'
                })
              })
              .then(response => response.json())
              .then(data => {
                let i=1;
                
                data.forEach(item => {
                
                    displayOpeningHour(item,i)
                    
                    i++;
                });
               
                
              })
              .catch(error => {
                console.error('Error:', error);
              });
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
