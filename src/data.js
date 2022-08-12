const buildings = [{
    name: "Generator",
    baseEffect: 1, 
    baseCost: 10,
    costGrowthRate: 1.4
}, {
    name: "Producer",
    baseEffect: 30, 
    baseCost: 10,
    costGrowthRate: 1.6
}, {
    name: "Factory",
    baseEffect: 100, 
    baseCost: 10,
    costGrowthRate: 1.8
}, {
    name: "Printer",
    baseEffect: 3000, 
    baseCost: 1e8,
    costGrowthRate: 2
}, {
    name: "Booster",
    baseEffect: 2, 
    baseCost: 1e6,
    costGrowthRate: 10
}];

const data = {
    time: Date.now(),
    firstTime: true,
    AFKGains: true,
    gold: 10,
    buildingAmounts: [0, 0, 0, 0, 0]
}