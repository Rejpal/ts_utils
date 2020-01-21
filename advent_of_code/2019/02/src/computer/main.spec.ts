import {mainThread, add} from './main';

describe('computer', () => {
    describe('mainThread', () => {
        test('is defined', () => {
            expect(mainThread).toBeDefined();
        });

        const dataset = [
            {
                initState: [99],
                finalState: [99],
            },
            {
                initState: [1, 1, 1, 1, 99],
                finalState: [1, 2, 1, 1, 99],
            },
            {
                initState: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
                finalState: [3500, 9, 10, 70,
                    2, 3, 11, 0,
                    99,
                    30, 40, 50],
            },
            {
                initState: [1, 0, 0, 0, 99],
                finalState: [2, 0, 0, 0, 99],
            },
            {
                initState: [2, 3, 0, 3, 99],
                finalState: [2, 3, 0, 6, 99],
            },
            {
                initState: [2, 4, 4, 5, 99, 0],
                finalState: [2, 4, 4, 5, 99, 9801],
            },
            {
                initState: [1, 1, 1, 4, 99, 5, 6, 0, 99],
                finalState: [30, 1, 1, 4, 2, 5, 6, 0, 99],
            },
        ];

        dataset.forEach(({initState, finalState}, index) => {
            test(`[${index}] gives expected finalState`, () => {
                expect(mainThread(initState)).toEqual(finalState);
            });
        });
    });

    describe('add', () => {
        const dataset = [
            {
                initState: [1, 1, 1, 1, 99],
                finalState: [1, 2, 1, 1, 99],
                currentIndex: 0,
                finalIndex: 4,
            },
            {
                initState: [1, 1, 4, 1, 99],
                finalState: [1, 100, 4, 1, 99],
                currentIndex: 0,
                finalIndex: 4,
            },
        ];

        dataset.forEach((testInput, index) => {
            const {currentIndex, initState, finalIndex, finalState} = testInput;
            test(`[${index}] returns expected final state and index`, () => {
                expect(add(initState, currentIndex)).toEqual(finalIndex);
                expect(initState).toEqual(finalState);
            });
        });
    });
});
