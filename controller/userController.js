
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/user`;


const connectionButton = document.getElementById("registrationButton");
connectionButton.addEventListener("click", verifyForm);


const owner = JSON.parse(sessionStorage.getItem("owner"));


fetchUser()
function fetchUser() {
    fetch(`${backUrl}/details`, {
        method: "GET",
        headers: {
            "Authorizatison": "Bearer " + owner.token,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error("Erreur lors du chargement des utilisateurs :", error);
    });
    
}



