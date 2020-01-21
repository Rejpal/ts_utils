import {getArrayOfIntegersFromString} from './parseInput';

describe('parseInput', () => {
    describe('getArrayOfIntegersFromString', () => {
        test('function is defined', () => {
            expect(getArrayOfIntegersFromString).toBeDefined();
        });

        const dataSet1 = [
            {input: '1', expectedResult: [1]},
            {input: '1\n2', expectedResult: [1, 2]},
            {input: '12345\n12345', expectedResult: [12345, 12345]},
        ];

        dataSet1.forEach((testInput, index) => {
            test(`[${index}] returns ${testInput.expectedResult}`, () => {
                expect(getArrayOfIntegersFromString(testInput.input)).toEqual(testInput.expectedResult);
            });
        });
    });
});
