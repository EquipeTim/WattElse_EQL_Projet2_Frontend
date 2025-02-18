

export function displayCarsAddAttribute(item,select) {
  
    const option = document.createElement('option');
   
    option.value = item.choice;
    option.textContent = item.choice;
    select.appendChild(option);
  
}
export function displayCars(item, i) {
    const uniqueId = i;  // Utiliser l'index 'i' comme ID unique
   
    const cardHTML = `
    <div class="card row mt-3 mb-4">
        <div class="card-header justify-content-center bg-secondary text-white">
            <h4>Voiture ${i} </h4>
        </div>

        <div class="card-body row d-flex">
            <div class="col-9">
                <div>
                    <div class="mt-3 mb-3 d-flex">
                        <div class="w-50">
                            <i class="fa fa-pencil mx-1"></i>
                            <label class="text-primary" for="licenseCarValue_${uniqueId}"><strong>Immatriculation :</strong></label>
                            <input id="licenseCarValue_${uniqueId}" type="text" class="form-control col-8" placeholder="AA-001-AA" value="${item.licensePlate}"/>
                        </div>

                        <div class="mx-5 w-50">
                            <i class="fa fa-car mx-1"></i>
                            <label class="text-primary" for="brandCarValue_${uniqueId}"><strong>Marque :</strong></label>
                            <select id="brandCarValue_${uniqueId}" class="form-select form-control col-8" > </select>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mt-3 mb-3 d-flex">
                        <div class="w-50">
                            <i class="fa fa-car mx-1"></i>
                            <label class="text-primary" for="modelCarValue_${uniqueId}"><strong>Modèle :</strong></label>
                            <select id="modelCarValue_${uniqueId}" class="form-select form-control col-8"></select>
                        </div>

                        <div class="mx-5 w-50">
                            <i class="fa fa-plug mx-1"></i>
                            <label class="text-primary" for="plugTypeValue_${uniqueId}"><strong>Type de prise :</strong></label>
                            <select id="plugTypeValue_${uniqueId}" class="form-select form-control col-8"></select>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="mt-3 mb-3 d-flex justify-content-center">
                        <div class="w-50">
                            <i class="fa fa-battery mx-1"></i>
                            <label class="text-primary" for="powerCarValue_${uniqueId}"><strong>Puissance maximum de la charge:</strong></label>
                            <input id="powerCarValue_${uniqueId}" type="text" class="form-control col-8" placeholder="0.0 kWh" value="${item.maxElectricPower}"/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-3 justify-content-center align-self-center">
                <button class="btn btn-lg btn-primary col-12 w-100 mb-4 p-2">Modifier</button>
                <button class="btn btn-lg btn-danger col-12 p-2">Retirer</button>
            </div>
        </div>
    </div>
    `;


    const carsDiv = document.getElementById('informationCars');
    carsDiv.insertAdjacentHTML("beforeend", cardHTML) 



    
 


   

   
  
}
