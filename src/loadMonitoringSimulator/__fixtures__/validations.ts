export const dataSet2 = [
    {input: 0, min: 0, max: 0, expectedResult: true},
    {input: 0, min: 0, max: 100, expectedResult: true},
    {input: 0, min: -100, max: 0, expectedResult: true},
    {input: 0, min: -100, max: 100, expectedResult: true},
    {input: -1, min: 0, max: 10, expectedResult: false},
    {input: 11, min: 0, max: 10, expectedResult: false},
    {input: undefined, min: 0, max: 10, expectedResult: false},
    {input: 'invalid', min: 0, max: 10, expectedResult: false},
];

export const dataSet1 = [
    {metric: {}, expectedResult: false},
    {metric: undefined, expectedResult: false},
    {
        metric: {
            name: 'cpu',
            changeStep: 3,
            probabilityOfChange: 50,
            minCriticalValue: 15,
            maxCriticalValue: 85,
        },
        expectedResult: true,
    },
    {
        metric: {
            name: 'cpu',
            changeStep: 3,
            probabilityOfChange: 50,
            minCriticalValue: -101,
            maxCriticalValue: 85,
        },
        expectedResult: false,
    },
    {
        metric: {
            name: 12,
            changeStep: 3,
            probabilityOfChange: 50,
            minCriticalValue: 0,
            maxCriticalValue: 85,
        },
        expectedResult: false,
    },
];

export const dataSet3 = [
    {metric: {}, expectedResult: false},
    {
        metric: {
            name: 'test',
            credit: 2000,
            minPrice: -10,
            price: -10,
        },
        expectedResult: true,
    },
    {
        metric: {
            name: 'test',
            credit: 2000,
            minPrice: -10,
            price: -15,
        },
        expectedResult: true,
    },
    {
        metric: {
            name: 12,
            credit: 2000,
            minPrice: -10,
            price: -10,
        },
        expectedResult: false,
    },
    {
        metric: {
            name: 'test',
            credit: -1,
            minPrice: -10,
            price: -10,
        },
        expectedResult: false,
    },
    {
        metric: {
            name: 'test',
            credit: 2000,
            minPrice: 10,
            price: -10,
        },
        expectedResult: false,
    },
    {
        metric: {
            name: 'test',
            credit: 2000,
            minPrice: -10,
            price: 'ahoj',
        },
        expectedResult: false,
    },
    {
        metric: {
            name: 'test',
            credit: 2000,
            minPrice: -10,
            price: -9,
        },
        expectedResult: false,
    },
];
