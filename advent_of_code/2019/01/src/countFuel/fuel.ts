export function getFuelForSingleModule(moduleMass: number): number {
    return Math.floor(moduleMass / 3) - 2;
}

export function getFuelForModules(moduleMasses: number[]): number {
    return moduleMasses.reduce((previousTotal, currentMass) => {
        return previousTotal + getFuelForSingleModule(currentMass);
    }, 0);
}
