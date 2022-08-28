function format(amount) {
    let power = Math.floor(Math.log10(Math.floor(amount)));
    let mantissa = amount/Math.pow(10, power);
    if (power < 6) return formatWithCommas(amount.toFixed(2));
    else return mantissa.toFixed(2) + "e" + power;
}

function formatWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function buildingCost(baseCost, growthRate, currentAmount) {
    return baseCost * Math.pow(growthRate, currentAmount);
}

function buyMax(currentGold, baseCost, growthRate, currentAmount) {
    let temp = currentGold * (growthRate - 1);
    let temp1 = buildingCost(baseCost, growthRate, currentAmount) + (1, growthRate);
    let amountPurchased = Math.floor(Math.log(currentGold * (growthRate - 1) / buildingCost(baseCost, growthRate, currentAmount) + (1, growthRate)));
    let cost = buildingCost(baseCost, growthRate, currentAmount) * ((Math.pow(growthRate, amountPurchased) - 1) / (growthRate - 1));
    console.log(temp);
    console.log(temp1);
    console.log(Math.log(temp/temp1));
    if (currentGold < cost) return;
    currentGold -= cost;
    currentAmount += amountPurchased;
}

function buyMaxBuilding(ID) {
    buyMax(data.gold, buildings[ID].baseCost, buildings[ID].costGrowthRate, data.buildingAmounts[ID]);
}

function buyMaxBuildings() {
    for (let i = data.buildingAmounts.length - 1; i >= 0; i--) {
        buyMaxBuilding(i);
    }
    revealBuildings();
    updateBuildingInfo();
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
