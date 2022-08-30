const buildings = [{
    name: "Factory",
    baseEffect: 1, 
    baseCost: 10,
    costGrowthRate: 1.2,
}, {
    name: "Printer",
    baseEffect: 8, 
    baseCost: 250,
    costGrowthRate: 1.4,
}, {
    name: "Shipment",
    baseEffect: 64, 
    baseCost: 10000,
    costGrowthRate: 1.6,
}, {
    name: "Producer",
    baseEffect: 512, 
    baseCost: 550000,
    costGrowthRate: 1.8,
}, {
    name: "Generator",
    baseEffect: 4096, 
    baseCost: 38500000,
    costGrowthRate: 2,
}];

const boost = {
    description: "Double your boost multiplier, but reset building and upgrades 1-4 back to level 0",
    baseEffect: 2, 
    baseCost: 1e6,
    costGrowthRate: 10,
}

const upgrades = [{
    description: "Increase your buildings effect based on buildings owned!",
    type: "Multiplier",
    unlockCost: 1000
}, {
    description: "Increase your gold/s multiplier based on your gold!",
    type: "Multiplier",
    unlockCost: 10000
}, {
    description: "Increase your gold multiplier based on your gold/s!",
    type: "Multiplier",
    unlockCost: 1e5
}, {
    description: "Increase your boost multiplier based on your boost level!",
    type: "Multiplier",
    unlockCost: 1e10
}, {
    description: "Unlocks the Boost Multiplier button!",
    type: "Unlockable",
    unlockCost: 50000
}, { 
    description: "Unlocks the Buildings Autobuyer button!",
    type: "Unlockable",
    unlockCost: 1e13
}, {
    description: "Unlocks the Boost Autobuyer button!",
    type: "Unlockable",
    unlockCost: 1e14
}, {
    description: "Unlocks the Upgrades Autobuyer button!",
    type: "Unlockable",
    unlockCost: 1e15
}]

let data = {
    time: Date.now(),
    firstTime: true,
    AFKGains: true,
    gold: 10,
    buildingAmounts: [0, 0, 0, 0, 0],
    boostLevel: 0,
    upgradesUnlocked: [false, false, false, false, false, false, false, false],
    autobuyerToggles: [false, false, false]
}