// Initialisation de la carte
var map = L.map('map').setView([48.8566, 2.3522], 13);  // Coordonnées de Paris et zoom initial

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Ajout d'un marqueur à Paris
L.marker([48.8566, 2.3522]).addTo(map)
    .bindPopup("Paris")
    .openPopup();
