import { incorrectLoginDisplay } from "../view/connectionView.js";
import { getBackUrl } from "./backUrl.js";

const backUrl = `${getBackUrl()}/connection`;

addActionToConnectionButton();

function addActionToConnectionButton() {
    const connectionButton = document.getElementById("connectionButton");
    connectionButton.addEventListener("click", authenticate);
}

function authenticate(event) {
    const login = this.form.loginInput.value;
    const password = event.target.form.passwordInput.value;
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ login: login, password: password })
        
    };
    fetch(`${backUrl}/authenticate`, requestOptions)
        .then(response => response.ok ? response.text() : Promise.reject(response))
        .then(text => {
            sessionStorage.setItem("owner", text);
            window.location.href = "home.html";
        })
        .catch(response => {
            incorrectLoginDisplay();
            console.error(
            "Une erreur s'est produite lors de l'authentification",
            `${response.status} ${response.statusText}`);
        });
}