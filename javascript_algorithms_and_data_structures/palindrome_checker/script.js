document.getElementById('check-btn').addEventListener('click', checkPalindrome);
document.getElementById('text-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkPalindrome();
    }
});

function checkPalindrome() {
    const inputElement = document.getElementById('text-input');
    const resultElement = document.getElementById('result');
    const text = inputElement.value;

    if (!text) {
        alert('Please input a value');
        return;
    }

    // Function to clean and process the text
    const cleanText = (str) => {
        return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    };

    const originalText = text;
    const cleanedText = cleanText(text);
    const reversedText = cleanedText.split('').reverse().join('');

    if (cleanedText === reversedText) {
        resultElement.textContent = `"${originalText}" is a palindrome`;
    } else {
        resultElement.textContent = `"${originalText}" is not a palindrome`;
    }
}
