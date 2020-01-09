import {getRandomNumberFromInterval} from './numberGenerator';

describe('numberGenerator', () => {
    describe('getRandomNumberFromInterval', () => {
        test('returns number from interval', () => {
            const x = getRandomNumberFromInterval(0, 20);
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(20);
        });

        test('returns x when both min and max equals x', () => {
            expect(getRandomNumberFromInterval(20, 20)).toBe(20);
        });

        test('returns NaN when min is bigger than max', () => {
            expect(getRandomNumberFromInterval(20, 0)).toBeNaN();
        });
    });
});
