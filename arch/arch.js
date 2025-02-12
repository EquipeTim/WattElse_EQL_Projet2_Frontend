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


<<<<<<< HEAD
=======
    
>>>>>>> b94ac1129a517b4210094246b07fdd6db83183e9
fetch("../arch/footer.html")
    .then(response => response.text())
    .then(html => document.getElementById("footer").innerHTML = html)