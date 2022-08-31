"use strict";

const saveName = 'GoldIdleSave';

function saveData() {
    data.time = Date.now();
    window.localStorage.setItem(saveName, JSON.stringify(data));
    alert("Game saved!");
}

function loadSavedData() {
    let savedGame = JSON.parse(localStorage.getItem(saveName));
    if (savedGame !== null) data = savedGame;
}

function resetData() {
    if (!confirm("Are you sure you want to reset your data? ALL of your progress will be lost and you will need to start over!")) return;

    data.time = Date.now();
    data.gold = 10;
    data.buildingAmounts = [0, 0, 0, 0, 0];
    data.boostLevel = 0;
    data.upgradesUnlocked = [false, false, false, false, false, false, false, false];
    data.autobuyerToggles = [false, false, false];
    location.reload();
}

function importData() {
    let importedData = prompt("Paste your save data here");
    if (importedData.length <= 0 || importedData === undefined) {
        alert('Error!');
        return;
    }
    data = JSON.parse((atob(importedData)));
    window.localStorage.setItem(saveName, JSON.stringify(data));

    location.reload();
}

function exportData() {
    window.localStorage.setItem(saveName, JSON.stringify(data));
    let exportedData = btoa(JSON.stringify(data));
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
    alert("Exported Data Copied to Clipboard! Copy and Paste your Save Data String to a safe place so if you lose your data you can get back to where you were!");
}

const toggleAFKGainsButtonElement = document.getElementById("toggle-afk-gains-button");

function updateAFKGainsButtonInfo() {
    toggleAFKGainsButtonElement.textContent = data.AFKGains ? "AFK Gains: ON" : "AFK Gains: OFF";
}

function toggleAFKGains() {
    data.AFKGains = !data.AFKGains;
    updateAFKGainsButtonInfo();
}

