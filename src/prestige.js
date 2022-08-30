function boostMultiplier() {
    let effect = boost.baseEffect;
    let amount = data.boostLevel;
    return amount === 0 ? 1 * prestigeMultiplier() : Math.pow(effect, amount) * prestigeMultiplier();
}

function updatePrestigeInfo() {
    let description = boost.description;
    let amount = data.boostLevel;
    let effect = boostMultiplier();
    let cost = boostCost();

    document.getElementById(`boost-description`).textContent = description;
    document.getElementById(`boost-amount`).textContent = `Level: ${amount}`;
    document.getElementById(`boost-effect`).textContent = `Currently: ${format(effect)}x`;
    document.getElementById(`boost-cost`).textContent = `Cost: ${format((cost))} gold`;
}

function updatePrestigeButtonColor() {
    if (data.gold < boostCost()) {
        document.getElementById(`unlockable4-button`).classList.add("notBuyable");
        document.getElementById(`unlockable4-button`).classList.remove("buyable");
    } else {
        document.getElementById(`unlockable4-button`).classList.add("buyable");
        document.getElementById(`unlockable4-button`).classList.remove("notBuyable");
    }
}

function boostCost() {
    return boost.baseCost * Math.pow(boost.costGrowthRate, data.boostLevel);
}

function doPrestige() {
    if (data.gold < boostCost()) return;
    
    buyMaxInProgress = false;
    data.gold = 10;
    data.boostLevel++;
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        data.buildingAmounts[i] = 0;
    }
    for (let i = 0; i < data.upgradesUnlocked.length / 2; i++) {
        data.upgradesUnlocked[i] = false;
    }
    revealBuildings();
    updateBuildingInfo();
    updatePrestigeInfo();
    updatePrestigeButtonColor();
}
