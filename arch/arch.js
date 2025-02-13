//import{showAlert} from '../view/alert.js'
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


let owner = sessionStorage.getItem("owner");


const navigationHtml = owner
                            ? "../arch/ownerNavigation.html"
                            : "../arch/guestNavigation.html"
  
fetch("../arch/header.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("header").innerHTML = html
        fetch(navigationHtml)
        .then(response => response.text())
        .then(html => document.getElementById("navigation").innerHTML = html)
    }
)

    
fetch("../arch/footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html)



function disconnect(){

  sessionStorage.setItem("disconnected", "true");
  sessionStorage.removeItem("owner");

}

whatAlert()

function whatAlert(){
  if (sessionStorage.getItem("disconnected") === "true") {
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
          <strong>Félication :</strong> Vous êtes désormais inscrit sur notre site
      `;
    showAlert(alert);
    sessionStorage.removeItem("registered");
  }
}




function showAlert(alert) {
   
  var alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', 'alert-dismissible', 'alert-success'); 


  alertDiv.innerHTML = alert;

  document.getElementById('alert').appendChild(alertDiv);

  setTimeout(function() {
      alertDiv.style.display = 'none'; 
  }, 2000);

}



