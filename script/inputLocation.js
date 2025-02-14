let debounceTimeout;

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;

    // Si l'utilisateur n'a pas encore écrit assez de caractères, ou s'il supprime, on cache les résultats
    if (query.length > 2) {
        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(function() {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&countrycodes=FR`)
                .then(response => response.json())
                .then(data => {
                    const resultsDiv = document.getElementById('results');
                    resultsDiv.innerHTML = ''; // Clear previous results

                    if (data.length > 0) {
                        resultsDiv.style.display = 'block';
                        data.forEach(item => {
                            const resultItem = document.createElement('div');
                            resultItem.classList.add('result-item');

                            // Récupération du numéro de la rue, de la voie, de la rue et du code postal
                            const streetNumber = item.address.house_number || '';
                            const postalRoad = item.address.road || '';
                            const postalPlace = item.address.amenity || ''; // Parfois la voie peut être une place, etc.
                            const street = item.address.road || item.address.footway || '';
                            const postcode = item.address.postcode || 'Non disponible';
                            
                            // Afficher le numéro de la rue, la voie postale, puis la rue
                            let displayText = '';
                            if (streetNumber) {
                                displayText += `${streetNumber} `;
                            }
                            if (postalPlace) {
                                displayText += `${postalPlace} `;
                            }
                            displayText += `${street}`;

                            // Affichage avec le code postal
                            resultItem.innerHTML = `${displayText} <strong>${postcode}</strong>`;
                            
                            resultItem.addEventListener('click', function() {
                                // Mettre à jour le champ de recherche avec le numéro de rue, voie postale, rue et code postal
                                document.getElementById('searchInput').value = `${displayText}, ${postcode}`;
                                resultsDiv.style.display = 'none';

                                // Récupérer la latitude et la longitude et les afficher dans la console
                                const latitude = item.lat;
                                const longitude = item.lon;
                                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                            });
                            
                            resultsDiv.appendChild(resultItem);
                        });
                    } else {
                        resultsDiv.style.display = 'none';
                    }
                })
                .catch(error => console.error('Erreur:', error));
        }, 300); // Délai de 300ms avant d'envoyer la requête
    } else {
        document.getElementById('results').style.display = 'none';
    }
});