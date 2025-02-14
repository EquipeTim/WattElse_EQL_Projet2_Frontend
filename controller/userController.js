
import { getBackUrl } from "./backUrl.js";
import { displayUserStatut } from "../view/userView.js";

const backUrl = `${getBackUrl()}/user`;

const owner = JSON.parse(sessionStorage.getItem("owner"));

const connectionButton = document.getElementById("deleteUserButton");
connectionButton.addEventListener("click", deleteUser);

fetchUser()
function fetchUser() {

    fetch(`${backUrl}/details`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + owner.token,  // Le token dans l'en-tête
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
    console.log(owner.userId )
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
        sessionStorage.setItem("closeAccount","true")
        window.location.href = "home.html"
        sessionStorage.removeItem("owner");
    })
   
}