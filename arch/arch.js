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


let owner =false;
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
  
   