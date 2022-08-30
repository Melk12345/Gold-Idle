function revealUnlockables() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        let element = document.getElementById(`unlockable${i}-button`);
        if (element) element.style.display = data.upgradesUnlocked[i] ? "initial" : "none";
    }
}

function buildingMultiplier() {
    let buildingAmounts = 0;
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        buildingAmounts += data.buildingAmounts[i];
    }
    return data.upgradesUnlocked[0] ? Math.sqrt(buildingAmounts + 1) + 1 : 1;
}

const goldPerSecondMultiplier = () => data.upgradesUnlocked[1] ? Math.log(data.gold + 1) + 1 : 1;

function goldMultiplier() {
    return data.upgradesUnlocked[2] ? Math.log(goldPerSecond() + 1 + 1) + 1 : 1;
}

const prestigeMultiplier = () => data.upgradesUnlocked[3] ? Math.sqrt(data.boostLevel + 1) + 1 : 1;

function buildingEffect(buildingID) {
    let baseEffect = buildings[buildingID].baseEffect;
    let amount = data.buildingAmounts[buildingID];
    return amount === 0 ? baseEffect : baseEffect * amount * buildingMultiplier();
}

function updateUpgradeInfo() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        let description = upgrades[i].description;
        let cost = upgrades[i].unlockCost;
        let buildingAmounts = 0;
        for (let i = 0; i < data.buildingAmounts.length; i++) {
            buildingAmounts += data.buildingAmounts[i];
        }
        let buildingMultiplier = Math.sqrt(buildingAmounts + 1) + 1;
        let goldPerSecondMultiplier = Math.log(data.gold + 1) + 1;
        let goldMultiplier =  Math.log(goldPerSecond() + 1 + 1) + 1;
        let prestigeMultiplier = Math.sqrt(data.boostLevel + 1) + 1;
        let effects = [buildingMultiplier, goldPerSecondMultiplier, goldMultiplier, prestigeMultiplier];

        if (upgrades[i].type === "Multiplier") {
            document.getElementById(`upgrade${i}-effect`).textContent = `Currently: ${format(effects[i])}x`;
            document.getElementById(`upgrade${i}-cost`).textContent = data.upgradesUnlocked[i] ? `Cost: [UNLOCKED]` : `Cost: ${format((cost))} gold`;
        } else {
            let effect = data.upgradesUnlocked[i] ? "Currently: [UNLOCKED]" : "Currently: [LOCKED]"
            document.getElementById(`upgrade${i}-effect`).textContent = effect;
            document.getElementById(`upgrade${i}-cost`).textContent = `Cost: ${format((cost))} gold`;
        }

        document.getElementById(`upgrade${i}-description`).textContent = description;
    }
}

function buyUpgrade(upgradeID) {
    if (data.gold < upgrades[upgradeID].unlockCost) return;

    data.gold -= upgrades[upgradeID].unlockCost;
    data.upgradesUnlocked[upgradeID] = true;
    updatePrestigeInfo();
    updateUpgradeInfo();
    revealUnlockables();
    updateBuildingInfo();
}

function updateUpgradesColor() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        if (data.upgradesUnlocked[i] === true) {
            document.getElementById(`upgrade${i}-button`).classList.add("purchased");
            document.getElementById(`upgrade${i}-button`).classList.remove("buyable");
            document.getElementById(`upgrade${i}-button`).classList.remove("notBuyable");
        } else if (data.gold < upgrades[i].unlockCost) {
            document.getElementById(`upgrade${i}-button`).classList.add("notBuyable");
            document.getElementById(`upgrade${i}-button`).classList.remove("buyable");
            document.getElementById(`upgrade${i}-button`).classList.remove("purchased");
        } else {
            document.getElementById(`upgrade${i}-button`).classList.add("buyable");
            document.getElementById(`upgrade${i}-button`).classList.remove("notBuyable");
            document.getElementById(`upgrade${i}-button`).classList.remove("purchased");
        }
    }
}

function updateAutobuyerText() {
    for (let i = 5; i < data.autobuyerToggles.length + 5; i++) {
        document.getElementById(`unlockable${i}-button`).textContent = data.autobuyerToggles[i - 5] ? "Auto: ON" : "Auto: OFF";
    }
}

function toggleAutobuy(autobuyerID) {
    let realAutobuyerID = autobuyerID - 5;
    data.autobuyerToggles[realAutobuyerID] = !data.autobuyerToggles[realAutobuyerID];
    updateAutobuyerText();
}