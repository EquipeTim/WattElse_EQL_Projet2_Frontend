function validatePhoneNumber() {
    const phoneInput = document.getElementById('phoneNumberValue');
    const phoneHelp = document.getElementById('phoneHelp');
    const phonePattern = /^0[1-9](\s?[0-9]{2}){4}$/;

    if (phonePattern.test(phoneInput.value)) {
        phoneHelp.style.visibility = 'hidden';
        phoneInput.classList.remove('is-invalid');
        return true;
    } else {
        phoneHelp.style.visibility = 'visible';
        phoneInput.classList.add('is-invalid');
        return false;
    }
    
}


function validateEmail() {
    const emailInput = document.getElementById('emailValue');
    const emailHelp = document.getElementById('emailHelp');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,4}$/;

    if (emailPattern.test(emailInput.value)) {
        emailHelp.style.visibility = 'hidden';  // Masquer le message d'erreur
        emailInput.classList.remove('is-invalid');
        return true;
    } else {
        emailHelp.style.visibility = 'visible';  // Afficher le message d'erreur
        emailInput.classList.add('is-invalid');
        return false;
    }
   
}

function validatePassword() {
    const passwordInput = document.getElementById('passwordValue');
    const passwordHelp = document.getElementById('passwordHelp');
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (passwordPattern.test(passwordInput.value)) {
        passwordHelp.style.visibility = 'hidden';
        passwordInput.classList.remove('is-invalid');
        return true;
    } else {
        passwordHelp.style.visibility = 'visible';
        passwordInput.classList.add('is-invalid');
        return false;
    }
}

function validateLicenseCar() {
    const licenseCarInput = document.getElementById('licenseCarValue');
    const licenseCarHelp = document.getElementById('licenseCarHelp');
    const licenseCarPattern = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;

    if (licenseCarPattern.test(licenseCarInput.value)) {
        licenseCarHelp.style.visibility = 'hidden';
        licenseCarInput.classList.remove('is-invalid');
        return true;
    } else {
        licenseCarHelp.style.visibility = 'visible';
        licenseCarInput.classList.add('is-invalid');
        return false;
    }
}