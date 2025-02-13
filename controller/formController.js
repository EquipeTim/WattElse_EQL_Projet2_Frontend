function validatePhoneNumber() {
    const phoneInput = document.getElementById('phoneNumberValue');
    const phoneHelp = document.getElementById('phoneHelp');
    const phonePattern = /^0[1-9](\s?[0-9]{2}){4}$/;

    if (phonePattern.test(phoneInput.value)) {
        phoneHelp.style.visibility = 'hidden';
        phoneInput.classList.remove('is-invalid');
    } else {
        phoneHelp.style.visibility = 'visible';
        phoneInput.classList.add('is-invalid');
    }
}


function validateEmail() {
    const emailInput = document.getElementById('emailValue');
    const emailHelp = document.getElementById('emailHelp');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,4}$/;

    if (emailPattern.test(emailInput.value)) {
        emailHelp.style.visibility = 'hidden';  // Masquer le message d'erreur
        emailInput.classList.remove('is-invalid');
    } else {
        emailHelp.style.visibility = 'visible';  // Afficher le message d'erreur
        emailInput.classList.add('is-invalid');
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('passwordValue');
    const passwordHelp = document.getElementById('passwordHelp');
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (passwordPattern.test(passwordInput.value)) {
        passwordHelp.style.visibility = 'hidden';
        passwordInput.classList.remove('is-invalid');
    } else {
        passwordHelp.style.visibility = 'visible';
        passwordInput.classList.add('is-invalid');
    }
}