export function getRandomNumberFromInterval(min: number, max: number): number {
    if (min > max) {
        return NaN;
    }
    return Math.random() * (max - min) + min;
}
