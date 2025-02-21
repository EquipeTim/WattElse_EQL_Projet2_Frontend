if (!window.hasLoaded) {
    document.addEventListener('DOMContentLoaded', function () {
        window.hasLoaded = true;
        const urlParams = new URLSearchParams(window.location.search);
        const idBornValue = urlParams.get('idBorn');

        const timeInput = document.getElementById('startHourValue');

        

        if (!document.querySelector("#startDateValue")._flatpickr) { 
            flatpickr("#startDateValue", {
                dateFormat: "Y-m-d",
                disable: [],
                onDayCreate: function(dObj, dStr, fp, dayElem) {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + -1);
                    const dayDate = dayElem.dateObj;

                    if (dayDate < currentDate) {
                        dayElem.style.color = "red";
                        if (timeInput) {
                            timeInput.placeholder = "Pas d'horaires disponibles";
                        }
                    }

                   
                    fetch(`http://127.0.0.1:8080/api/rest/terminals/info/day/occupied/${idBornValue}`, {
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

                        
                        unavailableDates.forEach(({ startDate, endDate }) => {
                            if (dayDate >= startDate && dayDate <= endDate) {
                                dayElem.style.color = "red";
                              
                            }
                        });
                    })
                    .catch(error => {
                        console.error('Erreur avec la requête fetch :', error);
                    });
                },

                onChange: function(selectedDate, dateStr, instance) {
                    const days = instance.calendarContainer.querySelectorAll('.flatpickr-day');
                    const selectedDayElem = Array.from(days).find(day => day.classList.contains('selected'));
                                        
                    var inlineColor = selectedDayElem.style.color;

                    if (inlineColor) {
                        const hour = "red";
                        
                        if (timeInput) {
                            timeInput.placeholder = "Pas d'horaires disponibles";
                        }
                      updateAvailableHours(dateStr,hour);
                    } else {
                        const hour = "black";
                        
                        updateAvailableHours(dateStr,hour);
                    }

                   
                  
                    
                }
            });
        }

        function updateAvailableHours(date,hour) {
            const hoursSelect = document.getElementById('availableHours');
        
            if (hoursSelect) hoursSelect.innerHTML = '';
           
                searchHourForDate(date, hour,function(hours) {
                    
                    if (hours.length === 0 ) {
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

        function searchHourForDate(date,hour, callback) {
           
            fetch('http://127.0.0.1:8080/api/rest/terminals/info/day/available', {
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
                console.log(data)
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
                    let endMinutes = timeToMinutes(endHour)  ; 

                    for (let currentMinutes = startMinutes; currentMinutes <= endMinutes; currentMinutes += 10) {
                        hours.push(minutesToTime(currentMinutes));
                    }
                }

                if (hours.length === 0 || hour ==="red") {
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
