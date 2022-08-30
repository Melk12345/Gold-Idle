"use strict";

const goldTextElement = document.getElementById("gold-text");
const goldPerSecondTextElement = document.getElementById("goldPerSecond-text");

function updateGoldText() {
    goldTextElement.textContent = format(data.gold);
}

function goldPerSecond() {
    let goldPerSecond = 0;
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        goldPerSecond += buildings[i].baseEffect * data.buildingAmounts[i] * buildingMultiplier();
    }
    goldPerSecond *= boostMultiplier() * goldPerSecondMultiplier();
    return goldPerSecond;
}

function productionLoop(deltaTime) {
    data.gold += goldPerSecond() * goldMultiplier() * deltaTime;
    updateGoldText();
    updateGoldPerSecondText();
    updateBuildingPurchaseColor();
    updatePrestigeButtonColor();
    updateUpgradesColor();
    updateUpgradeInfo();
}

function calculateAFKGains() {
    if (data.firstTime) {
        data.firstTime = false;
        return;
    }

    if (!data.AFKGains) return;

    const now = Date.now();
    let delta = now - data.time;
    let timeAwayInSeconds = delta / 1000;
    let goldGained = goldPerSecond() * timeAwayInSeconds;
    data.gold += goldGained;

    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    console.log(`You were gone for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`); 
    console.log(`goldGained = ${goldPerSecond()} (gold/s) * ${format(timeAwayInSeconds)} (time away in seconds)`);
    console.log(`You gained ${format(goldGained)} gold while you were away!`);
}

let lastUpdate = Date.now();

function mainLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;
    productionLoop(deltaTime);
    handlePrestigeAutobuying();
    handleUpgradeAutobuying();
    handleBuildingAutobuying()
}

function handlePrestigeAutobuying() {
    if (data.upgradesUnlocked[4] === false) return;
    if (data.autobuyerToggles[1] === false) return;
    
    doPrestige();
}

function handleUpgradeAutobuying() {
    if (data.autobuyerToggles[2] === false) return;
    
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        if (data.upgradesUnlocked[i]) continue;
        buyUpgrade(i);
    }
}

function handleBuildingAutobuying() {
    if (buyMaxInProgress || data.autobuyerToggles[0]) {
        if (data.gold >= getLowestBuildingCost()) {
            for (let i = 0; i < data.buildingAmounts.length; i++) {
                buyBuilding(i);
            }
        } else {
            buyMaxInProgress = false;
        }
    }
}

function getLowestBuildingCost() {
    let lowestCost = Infinity;
    for (let i = data.buildingAmounts.length - 1; i >= 0; i--) {
        if (lowestCost > buildingCost(buildings[i].baseCost, buildings[i].costGrowthRate, data.buildingAmounts[i])) {
            lowestCost = buildingCost(buildings[i].baseCost, buildings[i].costGrowthRate, data.buildingAmounts[i]);
        }
    }
    return lowestCost;
}

function load() {
    loadSavedData();
    calculateAFKGains();
    updateGoldText();
    revealBuildings();
    updateBuildingInfo();
    revealUnlockables();
    updateUpgradeInfo();
    updateAutobuyerText();
    updatePrestigeInfo();
    updateAFKGainsButtonInfo();
}

window.onload = function() {
    load();
}

window.onbeforeunload = function() { 
    data.previousGold = data.gold;
    autoSaveData();
}

function autoSaveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
}

setInterval(mainLoop, 50);
setInterval(autoSaveData, 15000); // saves every 15s