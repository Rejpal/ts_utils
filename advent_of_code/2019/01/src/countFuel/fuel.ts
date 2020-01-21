export function getFuelForSingleModule(moduleMass: number): number {
    return Math.floor(moduleMass / 3) - 2;
}

export function getFuelForSingleModuleAndItsFuel(moduleMass: number): number {
    let totalFuel =  getNonNegativeFuelForSingleModule(moduleMass);
    let fuel = getNonNegativeFuelForSingleModule(totalFuel);
    while (fuel > 0) {
        totalFuel += fuel;
        fuel = getNonNegativeFuelForSingleModule(fuel);
    }

    return totalFuel;
}

export function getNonNegativeFuelForSingleModule(moduleMass: number): number {
    const result = getFuelForSingleModule(moduleMass);
    return result <= 0 ? 0 : result;
}

export function getFuelForModules(moduleMasses: number[]): number {
    return moduleMasses.reduce((previousTotal, currentMass) => {
        return previousTotal + getFuelForSingleModule(currentMass);
    }, 0);
}

export function getFuelForModulesAndFuel(moduleMasses: number[]): number {
    const fuelForModules = getFuelForModules(moduleMasses);
    let fuel = getNonNegativeFuelForSingleModule(fuelForModules);
    let totalRequiredFuel = fuelForModules;
    while (fuel > 0) {
        totalRequiredFuel += fuel;
        fuel = getNonNegativeFuelForSingleModule(fuel);
    }

    return totalRequiredFuel;
}

export function getFuelForModulesAndFuelPerModule(moduleMasses: number[]): number {
    return moduleMasses.reduce((previousTotal, currentMass) => {
        return previousTotal + getFuelForSingleModuleAndItsFuel(currentMass);
    }, 0);
}
