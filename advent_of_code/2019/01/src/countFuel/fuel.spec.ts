import {getFuelForModules, getFuelForSingleModule} from './fuel';

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
        ];

        dataSet.forEach(testInput => {
            test(`it returns ${testInput[1]} when given ${testInput[0]}`, () => {
                expect(getFuelForSingleModule(testInput[0])).toBe(testInput[1]);
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
            test(`[${index} returns ${testInput.output}`, () => {
                expect(getFuelForModules(testInput.input)).toBe(testInput.output);
            });
        });
    });
});
