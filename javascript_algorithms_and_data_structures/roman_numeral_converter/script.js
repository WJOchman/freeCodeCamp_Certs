document.getElementById('convert-btn').addEventListener('click', function() {
    const inputElement = document.getElementById('number');
    const outputElement = document.getElementById('output');
    const number = parseInt(inputElement.value);

    if (isNaN(number)) {
        outputElement.textContent = 'Please enter a valid number';
        return;
    }

    if (number < 1) {
        outputElement.textContent = 'Please enter a number greater than or equal to 1';
        return;
    }

    if (number >= 4000) {
        outputElement.textContent = 'Please enter a number less than or equal to 3999';
        return;
    }

    const romanNumeral = convertToRoman(number);
    outputElement.textContent = romanNumeral;
    
});

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let roman = '';
    for (let i = 0; i < romanNumerals.length; i++) {
        while (num >= romanNumerals[i].value) {
            roman += romanNumerals[i].symbol;
            num -= romanNumerals[i].value;
        }
    }
    return roman;
}
