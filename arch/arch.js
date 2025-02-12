'use strict';

fetch("../arch/header.html")
    .then(response => response.text())
    .then(html => document.getElementById("header").innerHTML = html)



let owner = false;
const navigationHtml = owner
                            ? "../arch/ownerNavigation.html"
                            : "../arch/guestNavigation.html"

fetch(navigationHtml)
    .then(response => response.text())
    .then(html => document.getElementById("navigation").innerHTML = html)

    
fetch("../arch/footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html)