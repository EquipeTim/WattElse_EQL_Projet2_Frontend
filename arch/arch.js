
'use strict';


fetch("../arch/linkHead.html")
  .then(response => response.text())  
  .then(html => {
    var head = document.getElementsByTagName('head')[0];  
    head.insertAdjacentHTML('beforeend', html);
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier HTML:', error);
  });


const owner = sessionStorage.getItem("owner");


const navigationHtml = owner
                            ? "../arch/ownerNavigation.html"
                            : "../arch/guestNavigation.html"
                           

fetch("../arch/header.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("header").innerHTML = html
        fetch(navigationHtml)
        .then(response => response.text())
        .then(html => {document.getElementById("navigation").innerHTML = html


          let userName = JSON.parse(owner);
      
          if(userName){
           
            
            document.getElementById('profilLink').innerHTML = ` ${userName.name}`
            
          }
        })
    }
)

    
fetch("../arch/footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html)



function disconnect(){

  sessionStorage.setItem("disconnected", "true");
  sessionStorage.removeItem("owner");

}


document.addEventListener('DOMContentLoaded', function() {
  whatAlert();
  function whatAlert() {
    if (sessionStorage.getItem("disconnected") === "true") {
      console.log("d")
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Information :</strong> Vous êtes actuellement déconnecté
      `;
      showAlert(alert);
      sessionStorage.removeItem("disconnected");
    }
    if (sessionStorage.getItem("connected") === "true") {
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Information :</strong> Vous êtes connecté
      `;
      showAlert(alert);
      sessionStorage.removeItem("connected");
    }
    if (sessionStorage.getItem("registered") === "true") {
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong>Félicitation :</strong> Vous êtes désormais inscrit sur notre site
      `;
      showAlert(alert);
      sessionStorage.removeItem("registered");
    }
    if (sessionStorage.getItem("closedAccount") === "true") {
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong> Réussite de la procédure :</strong> Vous avez fermer votre compte
      `;
      showAlert(alert);
      sessionStorage.removeItem("closedAccount");
    }
    if (sessionStorage.getItem("modifiedAccount") === "true") {
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong> Réussite de la procédure :</strong> Vous avez bien modifié votre compte
      `;
      showAlert(alert);
      sessionStorage.removeItem("modifiedAccount");
    }
    if (sessionStorage.getItem("addedCar") === "true") {
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong> Réussite de la procédure :</strong> Vous avez ajouté une voiture
      `;
      showAlert(alert);
      sessionStorage.removeItem("addedCard");
    }
    if (sessionStorage.getItem("addedCreditCard") === "true") {
      var alert = `
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        <strong> Réussite de la procédure :</strong> Vous avez ajouté une carte de crédit
      `;
      showAlert(alert);
      sessionStorage.removeItem("addedCreditCard");
    }
    
  }

  function showAlert(alert) {
    var alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', 'alert-dismissible', 'alert-success');
    alertDiv.innerHTML = alert;
    var alertContainer = document.getElementById('alert');
    
    if (alertContainer) {
      alertContainer.appendChild(alertDiv);

      setTimeout(function() {
        alertDiv.style.display = 'none';
      }, 4000);
    } else {
      console.error("Alert container with id 'alert' not found in the DOM.");
    }
  }

 
  whatAlert();
});