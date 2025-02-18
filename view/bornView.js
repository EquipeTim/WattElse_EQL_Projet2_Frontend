export function displayBorns(item,i){
   
    
    const cardHTML = `
    <div class="card row mt-3 mb-4 w-75">
        <div class="card-header justify-content-center bg-secondary text-white">
            <h4>Borne ${i} </h4>
        </div>

        <div class="card-body row d-flex">
            <div class="col-9">
                <div>
                    <div class="mt-3  d-flex">
                        <div class="w-100 d-flex justify-content-center">
                          
                            <p> ${item.addressChargingStation} | ${item.plugType} </p>
                        </div>

                     
                    </div>
                </div>

              
            </div>

            <div class="col-3 justify-content-center align-self-center">
                <button class="btn btn-lg btn-primary col-12 w-100 p-2" onclick="redirectForSeeBorn(${item.idStation})" >Réserver</button>
                  
            </div>
        </div>
    </div>
    `;


    const carsDiv = document.getElementById('informationBorns');
    carsDiv.insertAdjacentHTML("beforeend", cardHTML) 
    

}


export function displayBornOfTransaction(item){
   
    
    const cardHTML = `
    <section class="container d-flex mt-2  mb-2">

        <article class="container col-lg-3 ">
            <div clas="row">
                <!-- A REMPLACER PAR LA MAP -->
                <div class="card-body d-flex justify-content-center">
                    <div class="card border-secondary mb-5" style="width: 50 rem;">
                        <div class="card-header">EMPLACEMENT DE LA MAP </div>
                        <div class="card-body">
                          <h4 class="card-title">EMPLACEMENT DE LA MAP </h4>
                          <p class="card-text">EMPLACEMENT DE LA MAP </p>
                        </div>
                      </div>
                </div>

                <hr>

                <div class="card border-dark mb-3">
                    <div class="card-header  bg-primary text-white text-center">
                        <h6>Information supplémentaires:</h6>
                    </div>
                    <div class="card-body">
                        <p>  Numéro d'urgence : ${item.emergencyPhone} </p>
                        <p>  Type de prise : ${item.plugType} </p>
                    </div>
                </div>
                  
            </div>
        </article>




        <article class="col-lg-8 mt-4 ">
            <div class="d-flex justify-content-center">
                <div class="card col-md-6 d-flex justify-content-center align-items-center border-secondary rounded-5 mt">
                    <div class="d-flex mb-2 mt-3">
                        <i class="fa fa-plug mx-1"></i>
                        <label class="text-secondary fw-bold mx-2">Borne n°  ${item.idStation}</label>
                        
                    </div>
                    <div class="d-flex mb-2">
                        <label class="text-secondary fw-bold mx-2">Adresse de la borne : ${item.addressChargingStation} </label>
                       
                    </div>
                    <div class="d-flex mb-2">
                        <label class="text-secondary fw-bold mx-2"> ${item.pricingType} : ${item.price} €</label>
                    </div>
              </div>
            </div>

            <div class="container justify-content-center align-items-center  mt-2 mb-2">
                <div class="row justify-content-center">
                    


                    <!--CARTE n°2-->
                    <div class="col-md-4 mt-4">
                        <div class="card border-secondary mb-3">
                            <div class="card-header bg-primary text-white text-center">Horaire de la borne : </div>
                            <div class="card-body">
                             
                            </div>
                        </div>    
                    </div>
                    
                </div>

            
            </div>

            <div class="d-flex justify-content-center mb-2 row"> 
                <button type="button" id="validateTransaction" class="btn btn-lg btn-success col-lg-4 col-sm-12 mt-3">Confirmer réservation</button>
            </div>
    

        </article>

    </section>

    `;


    const carsDiv = document.getElementById('informationBorn');
    carsDiv.insertAdjacentHTML("beforeend", cardHTML) 
    document.getElementById('validateTransaction').addEventListener('click', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const idBorn = urlParams.get('idBorn');
        var url = "popupReservation.html?idBorn=" + encodeURIComponent(idBorn);
        window.location.href = url;
    });

}