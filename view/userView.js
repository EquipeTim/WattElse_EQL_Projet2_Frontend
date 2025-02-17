export function displayUserStatut(data) {
   
    document.getElementById("lastNameValue").value = `${data.name}`;
    document.getElementById("firstNameValue").value = `${data.surname}`;
    document.getElementById("birthdateValue").value = `${data.birthdate}`;
    document.getElementById("addressUserValue").value = `${data.address}`;
    document.getElementById("cityUserValue").value = `${data.city}`;
    document.getElementById("postalCodeUserValue").value = `${data.postCode}`;
    document.getElementById("phoneUserValue").value = `${data.phone}`;
    document.getElementById("emailValue").value = `${data.email}`;
    


}
