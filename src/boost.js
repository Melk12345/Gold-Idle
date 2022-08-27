function buildingCost(buildingID) {
    let baseCost = buildings[buildingID].baseCost;
    let growthRate = buildings[buildingID].costGrowthRate;
    let amount = data.buildingAmounts[buildingID];
    return baseCost * Math.pow(growthRate, amount);
}

function updateBuildingPurchaseColor() {
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        if (data.gold < buildingCost(i)) {
            document.getElementById(`building${i}-button`).classList.add("notBuyable");
            document.getElementById(`building${i}-button`).classList.remove("buyable");
        } else {
            document.getElementById(`building${i}-button`).classList.add("buyable");
            document.getElementById(`building${i}-button`).classList.remove("notBuyable");
        }
    }
}

function updateBuildingInfo() {
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        let name = buildings[i].name;
        let amount = data.buildingAmounts[i];
        let effect = buildings[i].baseEffect * buildingMultiplier();
        let cost = buildingCost(i);

        document.getElementById(`building${i}-name`).textContent = name;
        document.getElementById(`building${i}-amount`).textContent = formatWithCommas(amount);
        document.getElementById(`building${i}-effect`).textContent = `+${format(effect)}/s`;
        document.getElementById(`building${i}-cost`).textContent = `${format((cost))}`;
    }
}

function updateGoldPerSecondText() {
    goldPerSecondTextElement.textContent = format(goldPerSecond());
}

function revealBuildings() {
    for (let i = 1; i < data.buildingAmounts.length + 1; i++) {
        let element = document.getElementById(`building${i - 1}-row`);
        if (i - 1 === 0) element.style.display = "table-row";
        else element.style.display = data.buildingAmounts[i - 2] > 0 ? "table-row" : "none";
    }
}

function buyBuilding(buildingID) {
    if (data.gold < buildingCost(buildingID)) return;

    data.gold -= buildingCost(buildingID);
    data.buildingAmounts[buildingID]++;

    let amount = data.buildingAmounts[buildingID];
    let cost = buildingCost(buildingID);
    document.getElementById(`building${buildingID}-amount`).textContent = formatWithCommas(amount);
    document.getElementById(`building${buildingID}-cost`).textContent = `${format((cost))}`;
    revealBuildings();
    updateBuildingInfo();
}