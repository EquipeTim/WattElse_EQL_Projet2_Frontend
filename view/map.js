

var map = L.map('map').setView([48.8566, 2.3522], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function getAddress(latitude, longitude) {
    return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(data => data.display_name)
        .catch(error => {
            console.error('Error:', error);
            return "Adresse non trouvée";
        });
}

function addMarker(latitude, longitude) {
    getAddress(latitude, longitude).then(address => {
        var marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}<br>Adresse: ${address}`);
    });
}
