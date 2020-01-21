import {
    getFuelForModules,
    getFuelForSingleModule,
    getNonNegativeFuelForSingleModule,
    getFuelForModulesAndFuel,
    getFuelForModulesAndFuelPerModule,
} from './fuel';

describe('fuel', () => {
    describe('getFuelForSingleModule', () => {
        test('it is defined', () => {
            expect(getFuelForSingleModule).toBeDefined();
        });

        const dataSet = [
            [12, 2],
            [14, 2],
            [1969, 654],
            [100756, 33583],
            [3, -1],
        ];

        dataSet.forEach(testInput => {
            test(`it returns ${testInput[1]} when given ${testInput[0]}`, () => {
                expect(getFuelForSingleModule(testInput[0])).toBe(testInput[1]);
            });
        });
    });

    describe('getNonNegativeFuelForSingleModule', () => {
        test('it is defined', () => {
            expect(getNonNegativeFuelForSingleModule).toBeDefined();
        });

        const dataSet = [
            [12, 2],
            [14, 2],
            [1969, 654],
            [100756, 33583],
            [3, 0],
        ];

        dataSet.forEach((testInput, index) => {
            test(`[${index}] it returns ${testInput[1]} when given ${testInput[0]}`, () => {
                expect(getNonNegativeFuelForSingleModule(testInput[0])).toBe(testInput[1]);
            });
        });
    });

    describe('getFuelForModules', () => {
        test('it is defined', () => {
            expect(getFuelForModules).toBeDefined();
        });

        const dataSet = [
            {
                input: [12, 14],
                output: 4,
            },
            {
                input: [12, 14, 1969],
                output: 658,
            },
        ];

        dataSet.forEach((testInput, index) => {
            test(`[${index}] returns ${testInput.output}`, () => {
                expect(getFuelForModules(testInput.input)).toBe(testInput.output);
            });
        });
    });

    describe('getFuelForModulesAndFuel', () => {
        test('is defined', () => {
            expect(getFuelForModulesAndFuel).toBeDefined();
        });

        const dataSet = [
            {
                input: [12, 14],
                output: 4,
            },
            {
                input: [1969],
                output: 966,
            },
            {
                input: [100756],
                output: 50346,
            },
        ];

        dataSet.forEach((testInput, index) => {
            test(`[${index}] returns ${testInput.output}`, () => {
                expect(getFuelForModulesAndFuel(testInput.input)).toBe(testInput.output);
                expect(getFuelForModulesAndFuelPerModule(testInput.input)).toBe(testInput.output);
            });
        });
    });
});
