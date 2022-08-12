const buildings = [{
    name: "Printer",
    baseEffect: 1, 
    baseCost: 10,
    costGrowthRate: 1.4
}, {
    name: "Factory",
    baseEffect: 10, 
    baseCost: 250,
    costGrowthRate: 1.6
}, {
    name: "Producer",
    baseEffect: 100, 
    baseCost: 10000,
    costGrowthRate: 1.8
}, {
    name: "Generator",
    baseEffect: 1000, 
    baseCost: 1e8,
    costGrowthRate: 2
}, {
    name: "Booster",
    baseEffect: 2, 
    baseCost: 1e5,
    costGrowthRate: 10
}];

let data = {
    time: Date.now(),
    firstTime: true,
    AFKGains: true,
    gold: 10,
    buildingAmounts: [0, 0, 0, 0, 0],
}