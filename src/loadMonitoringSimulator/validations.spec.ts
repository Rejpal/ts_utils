import {isValidInputMetric, isNumberInsideBoundaries, isValidOutputMetric, isPositiveInteger} from './validations';
import {dataSet1, dataSet2, dataSet3} from './__fixtures__/validations';

describe('validations', () => {
    describe('isValidInputMetric', () => {
        dataSet1.forEach((testInput, index) => {
            test(`[${index}] returns ${testInput.expectedResult}. Input: ${JSON.stringify(testInput.metric)}`, () => {
                expect(isValidInputMetric(testInput.metric)).toBe(testInput.expectedResult);
            });
        });
    });

    describe('isNumberInsideBoundaries', () => {
        dataSet2.forEach((testInput, index) => {
            test(`[${index}] returns ${testInput.expectedResult}. Input: ${JSON.stringify(testInput)}`, () => {
                const {input, min, max, expectedResult} = testInput;
                expect(isNumberInsideBoundaries(input, min, max)).toBe(expectedResult);
            });
        });
    });

    describe('isValidOutputMetric', () => {
        dataSet3.forEach((testInput, index) => {
            test(`[${index}] ${testInput.description} returns ${testInput.expectedResult}. Input ${JSON.stringify(testInput.metric)}`, () => {
                const {metric, expectedResult} = testInput;
                expect(isValidOutputMetric(metric)).toBe(expectedResult);
            });
        });
    });

    describe('isPositiveInteger', () => {
        const successDataset = [0, 1, 2000];
        const failDataset = [-1, 'invalid', false, -1500, 2.5];

        successDataset.forEach(value => {
            test('confirms a valid value', () => {
                expect(isPositiveInteger(value)).toBe(true);
            });
        });
        failDataset.forEach(value => {
            test('fails upon an invalid value', () => {
                expect(isPositiveInteger(value)).toBe(false);
            });
        });
    });
});
