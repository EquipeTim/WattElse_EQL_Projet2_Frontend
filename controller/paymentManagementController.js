import { getBackUrl } from "./backUrl.js";
import { displayAllPayments } from "../view/paymentManagementView.js";


const backUrl = `${getBackUrl()}/payment_methods`;
const owner = JSON.parse(sessionStorage.getItem("owner"));

if (window.location.pathname === '/pages/userPaymentInfosManagement.html') {
    showAllCard();
    showAllBankAccount();
};

function showAllCard() {
    fetch(`${backUrl}/card/all`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des cartes bancaires');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let i = 1;
        data.forEach(item => {
            displayAllPayments(i,item,"card")
            i++;
        });        
    })
};

function showAllBankAccount() {
    fetch(`${backUrl}/account/all`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + owner.token,  
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des comptes bancaire');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        let i = 1;
        data.forEach(item => {
            displayAllPayments(i,item,"account")
            i++;
        });        
    })
};
