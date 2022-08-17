function prestigeMultiplier() {
    let effect = prestige.baseEffect;
    let amount = data.prestigeLevel;
    return amount === 0 ? 1 : Math.pow(effect, amount);
}

function updatePrestigeInfo() {
    let name = prestige.name;
    let amount = data.prestigeLevel;
    let effect = prestigeMultiplier();
    let cost = prestigeCost();

    document.getElementById(`prestige-name`).textContent = name;
    document.getElementById(`prestige-amount`).textContent = amount;
    document.getElementById(`prestige-effect`).textContent = `Currently: x${format(effect)}`;
    document.getElementById(`prestige-cost`).textContent = `Cost: ${format((cost))} gold`;
}

function updatePrestigeButtonColor() {
    if (data.gold < prestigeCost()) {
        document.getElementById(`prestige-button`).classList.add("notBuyable");
        document.getElementById(`prestige-button`).classList.remove("buyable");
    } else {
        document.getElementById(`prestige-button`).classList.add("buyable");
        document.getElementById(`prestige-button`).classList.remove("notBuyable");
    }
}

function prestigeCost() {
    return prestige.baseCost * Math.pow(prestige.costGrowthRate, data.prestigeLevel);
}

function doPrestige() {
    if (!confirm("Are you sure you want to Prestige? This will double your Multiplier, but reset the number of buildings to 0.")) return;
    
    data.gold = 10;
    data.prestigeLevel++;
    for (let i = 0; i < data.buildingsUnlocked.length; i++) {
        data.buildingAmounts[i] = 0;
    }
    updateGoldPerSecondText();
    updateBuildingInfo();
    updatePrestigeInfo();
    updatePrestigeButtonColor();
}

