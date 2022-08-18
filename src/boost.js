function buildingCost(buildingID) {
    let baseCost = buildings[buildingID].baseCost;
    let growthRate = buildings[buildingID].costGrowthRate;
    let amount = data.buildingAmounts[buildingID];
    return baseCost * Math.pow(growthRate, amount);
} 

function buildingEffect(buildingID) {
    let baseEffect = buildings[buildingID].baseEffect;
    let amount = data.buildingAmounts[buildingID];
    return amount === 0 ? baseEffect : baseEffect * amount;
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
        let effect = buildings[i].baseEffect * upgradeEffect(0);
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
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        let element = document.getElementById(`building${i}-row`);
        element.style.display = data.buildingsUnlocked[i] ? "table-row" : "none";
    }
}

function buyBuilding(buildingID) {
    if (data.gold < buildingCost(buildingID)) return;

    data.gold -= buildingCost(buildingID);
    data.buildingAmounts[buildingID]++;
    if (data.buildingsUnlocked[data.buildingsUnlocked.length - 1] === false) {
        data.buildingsUnlocked[buildingID + 1] = true;
    }

    // //test
    // data.gold += 1e50;

    let amount = data.buildingAmounts[buildingID];
    let cost = buildingCost(buildingID);
    document.getElementById(`building${buildingID}-amount`).textContent = formatWithCommas(amount);
    document.getElementById(`building${buildingID}-cost`).textContent = `${format((cost))}`;
    updateGoldPerSecondText();
    revealBuildings();
}