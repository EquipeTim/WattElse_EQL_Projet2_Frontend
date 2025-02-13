export function incorrectLoginDisplay() {
    
    document.getElementById("messageLabel").innerText = 
        "Identifiant et/ou mot de passe incorrect(s)";
    document.getElementById("connexionForm").reset();
   
}