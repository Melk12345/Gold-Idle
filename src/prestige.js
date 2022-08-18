function boostMultiplier() {
    let effect = boost.baseEffect;
    let amount = data.boostLevel;
    return amount === 0 ? 1 : Math.pow(effect, amount);
}

function updatePrestigeInfo() {
    let name = boost.name;
    let amount = data.boostLevel;
    let effect = boostMultiplier() * upgradeEffect(3);
    let cost = boostCost();

    document.getElementById(`boost-name`).textContent = name;
    document.getElementById(`boost-amount`).textContent = amount;
    document.getElementById(`boost-effect`).textContent = `Currently: x${format(effect)}`;
    document.getElementById(`boost-cost`).textContent = `Cost: ${format((cost))} gold`;
}

function updatePrestigeButtonColor() {
    if (data.gold < boostCost()) {
        document.getElementById(`unlockable2-button`).classList.add("notBuyable");
        document.getElementById(`unlockable2-button`).classList.remove("buyable");
    } else {
        document.getElementById(`unlockable2-button`).classList.add("buyable");
        document.getElementById(`unlockable2-button`).classList.remove("notBuyable");
    }
}

function boostCost() {
    return boost.baseCost * Math.pow(boost.costGrowthRate, data.boostLevel);
}

function doPrestige() {
    if (!confirm("Are you sure you want to Prestige? This will double your Multiplier, but reset the number of buildings to 0.")) return;
    
    data.gold = 10;
    data.boostLevel++;
    for (let i = 0; i < data.buildingsUnlocked.length; i++) {
        data.buildingAmounts[i] = 0;
    }
    updateGoldPerSecondText();
    updateBuildingInfo();
    updatePrestigeInfo();
    updatePrestigeButtonColor();
}

