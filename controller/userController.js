
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/user`;

const owner = JSON.parse(sessionStorage.getItem("owner"));


fetchUser()
function fetchUser() {
    console.log(owner.token)
    fetch(`${backUrl}/details`, {
        method: "POST",
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
        console.log(data);
    })
    .catch(error => {
        console.error("Erreur lors du chargement des utilisateurs :", error);
    });
    
}



