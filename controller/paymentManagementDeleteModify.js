import { getBackUrl } from "./backUrl.js";
import { displayAllPayments } from "../view/paymentManagementView.js";


const backUrl = `${getBackUrl()}/payment_methods`;
const owner = JSON.parse(sessionStorage.getItem("owner"));

//const modificationButton = document.getElementById("modificationUserButton");
//modificationButton.addEventListener("click",  modificationUser);

if (window.location.pathname === '/pages/userPaymentInfosManagement.html') {
    showAllCard();
    showAllBankAccount();
    const deleteButtonCard = document.getElementById("deleteCardButton");
    deleteButtonCard.addEventListener("click", deleteCard);
};


//deleteCard → Permet de fermer la carte bancaire du compte !!! NE MARCHE PASSSSSS
function deleteCard() {
    fetch(`${backUrl}/card/close`, {
        method: "POST", 
        headers: {
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            userId: owner.userId,
            token : owner.token
        })
    })
    .then(data => {
        console.log("Carte fermée avec succès :", data);
        sessionStorage.removeItem("bankCardId");
        sessionStorage.setItem("closedCard", "true");
        setTimeout(() => {
            window.location.href = "home.html";
        }, 500);
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
}