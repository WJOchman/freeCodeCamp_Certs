document.getElementById('convert-btn').addEventListener('click', convertToRoman);
document.getElementById('number').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        convertToRoman();
    }
});

function convertToRoman() {
    const inputElement = document.getElementById('number');
    const outputElement = document.getElementById('output');
    const num = parseInt(inputElement.value);

    if (isNaN(num)) {
        outputElement.textContent = 'Please enter a valid number';
        return;
    }

    if (num < 1) {
        outputElement.textContent = 'Please enter a number greater than or equal to 1';
        return;
    }

    if (num >= 4000) {
        outputElement.textContent = 'Please enter a number less than or equal to 3999';
        return;
    }

    const romanNumerals = [
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
    ];

    let roman = '';
    let remaining = num;

    for (const [letter, value] of romanNumerals) {
        while (remaining >= value) {
            roman += letter;
            remaining -= value;
        }
    }

    outputElement.textContent = roman;
}
