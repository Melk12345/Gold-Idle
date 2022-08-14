const buildings = [{
    name: "Printer",
    baseEffect: 1, 
    baseCost: 10,
    costGrowthRate: 1.4,
}, {
    name: "Factory",
    baseEffect: 10, 
    baseCost: 250,
    costGrowthRate: 1.6,
}, {
    name: "Producer",
    baseEffect: 100, 
    baseCost: 10000,
    costGrowthRate: 1.8,
}, {
    name: "Generator",
    baseEffect: 1000, 
    baseCost: 550000,
    costGrowthRate: 2,
}, {
    name: "Booster",
    baseEffect: 2, 
    baseCost: 1e5,
    costGrowthRate: 10,
}];

const upgrades = [{
    description: "Unlocks the Booster Building!",
    effect: 1,
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    effect: 1,
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    effect: 1,
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    effect: 1,
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    unlockCost: 50000
}, {
    description: "Unlocks the Booster Building!",
    unlockCost: 50000
}]

let data = {
    time: Date.now(),
    firstTime: true,
    AFKGains: true,
    gold: 10,
    buildingAmounts: [0, 0, 0, 0, 0],
    buildingUnlocked: [true, false, false, false, false],
    upgradeUnlocked: [false, false, false, false, false, false, false, false]
}