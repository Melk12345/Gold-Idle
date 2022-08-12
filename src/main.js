"use strict";

const goldTextElement = document.getElementById("gold-text");
const goldPerSecondTextElement = document.getElementById("goldPerSecond-text");

function headerInfo() {
    goldTextElement.innerHTML = format(data.gold);
    goldPerSecondTextElement.innerHTML = format(goldPerSecond());
}

function goldPerSecond() {
    let goldPerSecond = 0;
    for (let i = 0; i < buildings.length; i++) {
        goldPerSecond += buildings[i].baseEffect * data.buildingAmounts[i];
    }
    return goldPerSecond;
}

function productionLoop(deltaTime) {
    data.gold += goldPerSecond() * deltaTime;
}

function calculateAFKGains() {
    if (data.firstTime) {
        data.firstTime = false;
        return;
    }

    if (!data.AFKGains) return;

    const now = Date.now();
    let delta = now - data.time;
    data.gold += goldPerSecond();

    const seconds = Math.floor((delta / 1000) % 60);
    const minutes = Math.floor((delta / (1000 * 60)) % 60);
    const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    console.log(`You were gone for ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`); 
}

let lastUpdate = Date.now();

function mainLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;
    productionLoop(deltaTime);
}

function load() {
    loadSavedData();
    headerInfo();
}

window.onload = function() {
    load();
    calculateAFKGains();
}

window.onbeforeunload = function() { 
    autoSaveData();
}

function autoSaveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
}

setInterval(mainLoop, 50);
setInterval(autoSaveData, 15000); // saves every 15s