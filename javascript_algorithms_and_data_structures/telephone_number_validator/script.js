document.getElementById('check-btn').addEventListener('click', validatePhoneNumber);
document.getElementById('clear-btn').addEventListener('click', clearInput);
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        validatePhoneNumber();
    }
});

function validatePhoneNumber() {
    const inputElement = document.getElementById('user-input');
    const resultElement = document.getElementById('results-div');
    const phoneNumber = inputElement.value.trim();

    if (!phoneNumber) {
        alert('Please provide a phone number');
        return;
    }

    const validPattern = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

    if (validPattern.test(phoneNumber)) {
        resultElement.textContent = `Valid US number: ${phoneNumber}`;
    } else {
        resultElement.textContent = `Invalid US number: ${phoneNumber}`;
    }
}

function clearInput() {
    document.getElementById('user-input').value = '';
    document.getElementById('results-div').textContent = '';
}
