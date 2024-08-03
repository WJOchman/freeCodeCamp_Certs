let price = 20;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

document.getElementById('purchase-btn').addEventListener('click', processPurchase);
document.getElementById('clear-btn').addEventListener('click', clearInput);
document.getElementById('cash').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        processPurchase();
    }
});

function processPurchase() {
    const inputElement = document.getElementById('cash');
    const resultElement = document.getElementById('change-due');
    const cashProvided = parseFloat(inputElement.value);

    if (isNaN(cashProvided) || cashProvided <= 0) {
        alert('Please provide a valid amount of cash');
        return;
    }

    if (cashProvided < price) {
        alert('Customer does not have enough money to purchase the item');
        return;
    }

    if (cashProvided === price) {
        resultElement.textContent = 'No change due - customer paid with exact cash';
        return;
    }

    const change = cashProvided - price;
    const result = getChange(change, cid);

    resultElement.textContent = result;
}

function clearInput() {
    document.getElementById('change-due').textContent = '';
    document.getElementById('cash').value = '';
}

function getChange(change, cid) {
    const currencyUnits = [
        { name: "ONE HUNDRED", value: 100 },
        { name: "TWENTY", value: 20 },
        { name: "TEN", value: 10 },
        { name: "FIVE", value: 5 },
        { name: "ONE", value: 1 },
        { name: "QUARTER", value: 0.25 },
        { name: "DIME", value: 0.1 },
        { name: "NICKEL", value: 0.05 },
        { name: "PENNY", value: 0.01 }
    ];

    let totalCid = cid.reduce((sum, current) => sum + current[1], 0);
    totalCid = parseFloat(totalCid.toFixed(2));

    if (totalCid < change) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    if (totalCid === change) {
        return `Status: CLOSED ${cid.map(curr => `${curr[0]}: $${curr[1]}`).join(' ')}`;
    }

    let changeDue = [];
    let remainingChange = change;

    for (let unit of currencyUnits) {
        let unitName = unit.name;
        let unitValue = unit.value;
        let amountInDrawer = cid.find(curr => curr[0] === unitName)[1];
        let amountToReturn = 0;

        while (remainingChange >= unitValue && amountInDrawer > 0) {
            remainingChange -= unitValue;
            remainingChange = parseFloat(remainingChange.toFixed(2));
            amountInDrawer -= unitValue;
            amountToReturn += unitValue;
        }

        if (amountToReturn > 0) {
            changeDue.push(`${unitName}: $${amountToReturn.toFixed(2)}`);
        }
    }

    if (remainingChange > 0) {
        return "Status: INSUFFICIENT_FUNDS";
    }

    return `Status: OPEN ${changeDue.join(' ')}`;
}
