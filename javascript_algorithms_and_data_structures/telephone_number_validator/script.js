document.getElementById('check-btn').addEventListener('click', function() {
    const inputElement = document.getElementById('user-input');
    const outputElement = document.getElementById('results-div');
    const phoneNumber = inputElement.value.trim();

    if (!phoneNumber) {
        alert('Please provide a phone number');
        return;
    }

    const isValid = validateUSPhoneNumber(phoneNumber);
    if (isValid) {
        outputElement.textContent = `Valid US number: ${phoneNumber}`;
    } else {
        outputElement.textContent = `Invalid US number: ${phoneNumber}`;
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('results-div').textContent = '';
    document.getElementById('user-input').value = '';
});

function validateUSPhoneNumber(phone) {
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-])?\d{3}([\s\-])?\d{4}$/;
    return phoneRegex.test(phone);
}
