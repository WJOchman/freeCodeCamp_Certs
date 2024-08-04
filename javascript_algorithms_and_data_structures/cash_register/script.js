let price = 0;
let cid = [];

document.getElementById('purchase-btn').addEventListener('click', function () {
    let cash = parseFloat(document.getElementById('cash').value);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let change = cash - price;
    let changeDueElement = document.getElementById('change-due');

    if (change === 0) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    }

    let changeArray = getChange(change);

    if (changeArray === "INSUFFICIENT_FUNDS") {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (changeArray.status === "CLOSED") {
        changeDueElement.textContent = "Status: CLOSED " + formatChange(changeArray.change);
    } else {
        changeDueElement.textContent = "Status: OPEN " + formatChange(changeArray);
    }
});

function getChange(change) {
    const denominations = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["ONE HUNDRED", 100]
    ];

    let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0);

    if (totalCid < change) {
        return "INSUFFICIENT_FUNDS";
    }

    let changeArray = [];
    let remainingChange = change;

    for (let i = denominations.length - 1; i >= 0; i--) {
        let denomName = denominations[i][0];
        let denomValue = denominations[i][1];
        let denomInDrawer = cid.find(curr => curr[0] === denomName)[1];

        if (remainingChange >= denomValue && denomInDrawer > 0) {
            let denomToReturn = 0;
            while (remainingChange >= denomValue && denomInDrawer > 0) {
                denomToReturn += denomValue;
                remainingChange -= denomValue;
                remainingChange = Math.round(remainingChange * 100) / 100; // Fix floating-point issue
                denomInDrawer -= denomValue;
            }
            changeArray.push([denomName, denomToReturn]);
        }
    }

    if (remainingChange > 0) {
        return "INSUFFICIENT_FUNDS";
    }

    if (totalCid === change) {
        return { status: "CLOSED", change: changeArray };
    }

    return changeArray;
}

function formatChange(changeArray) {
    if (typeof changeArray === "string") {
        return changeArray;
    }

    return changeArray.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ");
}

// Sample data for testing
price = 19.5;
cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
