'use strict';

fetch("./arch/header.html")
    .then(response => response.text())
    .then(html => document.getElementById("header").innerHTML = html)


    
fetch("./arch/footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html)