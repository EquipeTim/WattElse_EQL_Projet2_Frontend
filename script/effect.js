if (!window.hasLoaded) {
    document.addEventListener('DOMContentLoaded', function () {
        window.hasLoaded = true;

        const timeInput = document.getElementById('startHourValue');

        if (!document.querySelector("#startDateValue")._flatpickr) { 
            flatpickr("#startDateValue", {
                dateFormat: "Y-m-d",
                disable: [],
                onDayCreate: function(dObj, dStr, fp, dayElem) {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + -1); // Date d'hier
                    const dayDate = dayElem.dateObj;

                    // Si la date est passée, la marquer en rouge
                    if (dayDate < currentDate) {
                        dayElem.style.color = "red";
                        if (timeInput) {
                            timeInput.placeholder = "Pas d'horaires disponibles";
                        }
                    }

                    // Vérification des jours d'indisponibilité via la requête fetch
                    fetch('http://127.0.0.1:8080/api/rest/terminals/info/day/occupied/3', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        const unavailableDates = data.map(item => {
                            const startDate = new Date(item.startDateUnavailability);
                            const endDate = new Date(item.endDateUnavailability);
                            return { startDate, endDate };
                        });

                        // Comparer chaque jour du calendrier avec les dates d'indisponibilité
                        unavailableDates.forEach(({ startDate, endDate }) => {
                            if (dayDate >= startDate && dayDate <= endDate) {
                                dayElem.style.color = "red";
                                if (timeInput) {
                                    timeInput.placeholder = "Pas d'horaires disponibles";
                                }
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Erreur avec la requête fetch :', error);
                    });
                },

                onChange: function(selectedDates, dateStr, instance) {
                    // Mettre à jour les horaires disponibles lors du changement de date
                    updateAvailableHours(dateStr);
                }
            });
        }

        function updateAvailableHours(date) {
            const hoursSelect = document.getElementById('availableHours');

            if (hoursSelect) hoursSelect.innerHTML = '';

            searchHourForDate(date, function(hours) {
                if (hours.length === 0) {
                    if (timeInput) {
                        timeInput.placeholder = "Pas d'horaires disponibles";
                    }
                }

                if (hoursSelect) {
                    hours.forEach(function(hour) {
                        const option = document.createElement('option');
                        option.value = hour;
                        option.textContent = hour;
                        hoursSelect.appendChild(option);
                    });
                }
            });
        }

        function searchHourForDate(date, callback) {
            const urlParams = new URLSearchParams(window.location.search);
            const idBornValue = urlParams.get('idBorn');

            fetch('http://127.0.0.1:8080/api/rest/terminals/info/day/hours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "stationId": idBornValue,
                    "date": date
                })
            })
            .then(response => response.json())
            .then(data => {
                let hours = [];
                for (let i = 0; i < data.length; i++) {
                    let startHour = data[i].startHour;
                    let endHour = data[i].endHour;

                    function timeToMinutes(time) {
                        let [hours, minutes] = time.split(":").map(Number);
                        return hours * 60 + minutes;
                    }

                    function minutesToTime(minutes) {
                        let hours = Math.floor(minutes / 60);
                        let mins = minutes % 60;
                        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
                    }

                    let startMinutes = timeToMinutes(startHour);
                    let endMinutes = timeToMinutes(endHour) - 45; 

                    for (let currentMinutes = startMinutes; currentMinutes <= endMinutes; currentMinutes += 10) {
                        hours.push(minutesToTime(currentMinutes));
                    }
                }

                if (hours.length === 0) {
                    hours = ["Aucun horaire disponible"];
                }
                callback(hours);
            })
            .catch(error => {
                console.error('Erreur:', error);
                callback([]); 
            });
        }
    });
}
