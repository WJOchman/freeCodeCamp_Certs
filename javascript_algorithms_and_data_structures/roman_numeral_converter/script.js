document.getElementById('convert-btn').addEventListener('click', convertToRoman);
document.getElementById('number-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        convertToRoman();
    }
});

function convertToRoman() {
    const inputElement = document.getElementById('number-input');
    const resultElement = document.getElementById('result');
    const number = parseInt(inputElement.value);

    if (isNaN(number)) {
        alert('Please input a valid number');
        return;
    }

    resultElement.textContent = `${number} in Roman numerals is ${toRoman(number)}`;
}

function toRoman(num) {
    const romanNumeralMap = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = '';

    for (const { value, numeral } of romanNumeralMap) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }

    return result;
}
