import { incorrectLoginDisplay } from "../view/connectionView.js";
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/connection`;

addActionToConnectionButton();


function addActionToConnectionButton() {
    const connectionButton = document.getElementById("connectionButton");
    connectionButton.addEventListener("click", authenticate);
}


function authenticate() {
       
    const email = document.getElementById('emailValue').value;
    const password = document.getElementById('passwordValue').value;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ email: email, password: password })
        
    };
    fetch(`${backUrl}/authenticate`, requestOptions)
        .then(response => response.ok ? response.text() : Promise.reject(response))
        .then(data => {
            sessionStorage.setItem("owner", data);
            sessionStorage.setItem("connected", "true");
            window.location.href = "home.html";
            
        })
        .catch(response => {
            incorrectLoginDisplay();
            console.error("Une erreur s'est produite lors de l'authentification",)
        });
}

