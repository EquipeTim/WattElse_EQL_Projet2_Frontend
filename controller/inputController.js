const inputElement = document.getElementById('placeValue');
const suggestionsContainer = document.getElementById('suggestions');

inputElement.addEventListener('input', async function() {
    const query = inputElement.value.trim();

    // Si la requête est vide, on arrête la recherche
    if (query.length < 3) {
        suggestionsContainer.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();

        // Afficher les résultats sous forme de suggestions
        suggestionsContainer.innerHTML = '';
        if (data.features.length > 0) {
            data.features.forEach(feature => {
                const suggestionElement = document.createElement('div');
                suggestionElement.classList.add('suggestion');
                suggestionElement.textContent = feature.properties.label;
                suggestionElement.addEventListener('click', () => {
                    inputElement.value = feature.properties.label;
                    suggestionsContainer.innerHTML = '';
                });
                suggestionsContainer.appendChild(suggestionElement);
            });
        } else {
            suggestionsContainer.innerHTML = '<div class="suggestion">Aucune adresse trouvée</div>';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
});
