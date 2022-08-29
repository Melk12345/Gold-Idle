function boostMultiplier() {
    let effect = boost.baseEffect;
    let amount = data.boostLevel;
    return amount === 0 ? 1 : Math.pow(effect, amount);
}

function updatePrestigeInfo() {
    let name = boost.name;
    let amount = data.boostLevel;
    let effect = boostMultiplier() * prestigeMultiplier();
    let cost = boostCost();

    document.getElementById(`boost-name`).textContent = name;
    document.getElementById(`boost-amount`).textContent = amount;
    document.getElementById(`boost-effect`).textContent = `Currently: x${format(effect)}`;
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
    if (data.prestigeConfirmation && !confirm("Are you sure you want to Prestige? This will double your Prestige Multiplier, but reset the amount of buildings back to 0.")) return;

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
