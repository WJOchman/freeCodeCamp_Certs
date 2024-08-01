document.getElementById('check-btn').addEventListener('click', validatePhoneNumber);
document.getElementById('clear-btn').addEventListener('click', clearInput);
document.getElementById('phone-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        validatePhoneNumber();
    }
});

function validatePhoneNumber() {
    const inputElement = document.getElementById('phone-input');
    const resultElement = document.getElementById('result');
    const phoneNumber = inputElement.value;

    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

    if (!phoneNumber) {
        alert('Please input a phone number');
        return;
    }

    if (phoneRegex.test(phoneNumber)) {
        resultElement.textContent = `"${phoneNumber}" is a valid US phone number`;
    } else {
        resultElement.textContent = `"${phoneNumber}" is not a valid US phone number`;
    }
}

function clearInput() {
    document.getElementById('phone-input').value = '';
    document.getElementById('result').textContent = '';
}
