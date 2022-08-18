function revealUnlockables() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        let element = document.getElementById(`unlockable${i}-button`);
        if (element) element.style.display = data.upgradesUnlocked[i] ? "initial" : "none";
    }
}

function upgradeEffect(upgradeID, currentGps = goldPerSecond() + 1) {
    let buildingAmounts = 0;
    switch (upgradeID) {
        case 0:
            for (let i = 0; i < data.buildingAmounts.length; i++) {
                buildingAmounts += data.buildingAmounts[i];
            }
            return data.upgradesUnlocked[0] ? Math.sqrt(buildingAmounts + 1) + 1 : 1;
        case 1:
            return data.upgradesUnlocked[1] ? Math.log(data.gold + 1) + 1 : 1;
        case 2:
            return data.upgradesUnlocked[2] ? Math.log(currentGps + 1) + 1 : 1;
        case 3:
            return data.upgradesUnlocked[3] ? Math.sqrt(data.boostLevel + 1) + 1 : 1;
    }
}

function updateUpgradeInfO() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        let description = upgrades[i].description;
        let cost = upgrades[i].unlockCost;
        let buildingAmounts = 0;
        for (let i = 0; i < data.buildingAmounts.length; i++) {
            buildingAmounts += data.buildingAmounts[i];
        }
        let multiplier1 = Math.sqrt(buildingAmounts + 1) + 1;
        let multiplier2 = Math.log(data.gold + 1) + 1;
        let multiplier3 = Math.log(goldPerSecond() + 1) + 1;
        let multiplier4 = Math.sqrt(data.boostLevel + 1) + 1;
        const effects = [multiplier1, multiplier2, multiplier3, multiplier4];

        if (upgrades[i].type === "Multiplier") {

            document.getElementById(`upgrade${i}-description`).textContent = description;
            document.getElementById(`upgrade${i}-effect`).textContent = `Currently: ${format(effects[i])}x`;
            document.getElementById(`upgrade${i}-cost`).textContent = data.upgradesUnlocked[i] ? `Cost: [UNLOCKED]` : `Cost: ${format((cost))} gold`;
        } else {
            let effect = data.upgradesUnlocked[i] ? "Currently: [UNLOCKED]" : "Currently: [LOCKED]"

            document.getElementById(`upgrade${i}-description`).textContent = description;
            document.getElementById(`upgrade${i}-effect`).textContent = effect;
            document.getElementById(`upgrade${i}-cost`).textContent = `Cost: ${format((cost))} gold`;
        }
    }
}

function buyUpgrade(upgradeID) {
    if (data.gold < upgrades[upgradeID].unlockCost) return;

    data.gold -= upgrades[upgradeID].unlockCost;
    data.upgradesUnlocked[upgradeID] = true;
    updateUpgradeInfO();
    updateGoldPerSecondText();
    revealUnlockables();
}

function updateUpgradesColor() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        if (data.gold < buildingCost(i)) {
            document.getElementById(`building${i}-button`).classList.add("notBuyable");
            document.getElementById(`building${i}-button`).classList.remove("buyable");
        } else {
            document.getElementById(`building${i}-button`).classList.add("buyable");
            document.getElementById(`building${i}-button`).classList.remove("notBuyable");
        }
    }
}