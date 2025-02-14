export function displayUserStatut(data) {
    console.log(data)
    document.getElementById("lastNameDisplay").innerHTML = `${data.name}`;
    document.getElementById("firstNameDisplay").innerHTML = `${data.surname}`;
    document.getElementById("birthdateDisplay").innerHTML = `${data.birthdate}`;
    document.getElementById("addressUserDisplay").innerHTML = `${data.address}`;
    document.getElementById("cityUserDisplay").innerHTML = `${data.city}`;
    document.getElementById("postalCodeUserDisplay").innerHTML = `${data.postCode}`;
    document.getElementById("phoneUserDisplay").innerHTML = `${data.phone}`;
    document.getElementById("emailUserDisplay").innerHTML = `${data.email}`;
    document.getElementById("passwordUserDisplay").innerHTML = "********";
}
