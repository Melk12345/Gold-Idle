function format(amount) {
    let power = Math.floor(Math.log10(Math.floor(amount)));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return formatWithCommas(amount.toFixed(2));
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function buyX(numberToBuy, baseCost, growthRate, currentAmount) {
    return baseCost * Math.pow(growthRate, currentAmount) * ((Math.pow(growthRate, numberToBuy) - 1) / (growthRate - 1));
}

function calculateMaxAmountAffordable(currentGold, baseCost, growthRate, currentAmount) {
    return Math.floor(Math.log((currentGold * (growthRate - 1)) / (baseCost * Math.pow(growthRate, currentAmount)) + 1, growthRate));
}

function buyMaxBuildings() {
    for (let i = data.buildingAmounts.length; i <= 0; i--) {
        let cost = buyX(calculateMaxAmountAffordable(data.gold, buildings[i].baseCost, buildings[i].costGrowthRate, data.buildingAmounts[i]), buildings[i].baseCost, buildings[i].costGrowthRate, data.buildingAmounts[i]);
        let amountPurchased = calculateMaxAmountAffordable(data.gold, buildings[i].baseCost, buildings[i].costGrowthRate, data.buildingAmounts[i]);
        data.gold -= cost;
        data.buildingAmounts[i] += amountPurchased;
    }
}

function revealBuildings() {
    for (let i = 1; i < data.buildingAmounts.length + 1; i++) {
        let element = document.getElementById(`building${i - 1}-row`);
        if (i - 1 === 0) element.style.display = "table-row";
        else element.style.display = data.buildingAmounts[i - 2] > 0 ? "table-row" : "none";
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'm') buyMaxBuildings();
});
