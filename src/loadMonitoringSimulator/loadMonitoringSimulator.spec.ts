import { loadMonitoringSimulator, getNewValue } from './loadMonitoringSimulator';
describe('loadMonitoringSimulator', () => {
    describe('loadMonitoringSimulator', () => {
        const inputMetrics = [
            {
                name: 'cpu',
                changeStep: 3,
                probabilityOfChange: 80,
                minCriticalValue: 15,
                maxCriticalValue: 85,
            },
            {
                name: 'ram',
                changeStep: 5,
                probabilityOfChange: 80,
                minCriticalValue: 25,
                maxCriticalValue: 75,
            },
        ];
        const outputMetric = {
            name: 'money',
            credit: 2000,
            price: 20,
            minPrice: 10,
            priceChangeStep: 5,
        };

        test('function is defined', () => {
            expect(loadMonitoringSimulator).toBeDefined();
        });

        // we are testing a generated numbers here therefore in order to
        // have a real chance of getting an error we increase the run count of this test.
        for (let i = 0; i < 1000; i++) {

            test('it returns init values of inputMetric upon calling with 0 iterations', () => {
                const result = loadMonitoringSimulator(
                    inputMetrics,
                    outputMetric,
                    0,
                    20,
                );

                // 10% boundaries above min and 10% below max for starting value counted
                // from their delta to avoid crossing min with max (which would result in an error)
                inputMetrics.forEach((metric, index) => {
                    const {minCriticalValue, maxCriticalValue} = metric;
                    const delta = (maxCriticalValue - minCriticalValue) * 0.1;
                    expect(result.inputMetrics[index]).toBeGreaterThanOrEqual(metric.minCriticalValue + delta);
                    expect(result.inputMetrics[index]).toBeLessThanOrEqual(metric.maxCriticalValue - delta);
                });
            });
        }

        test('it returns init credit of outputMetric upon calling with 0 iterations', () => {
            const result = loadMonitoringSimulator(
                inputMetrics,
                outputMetric,
                0,
                20,
            );
            expect(result.outputMetric.credit).toBe(outputMetric.credit);
        });

        test('it returns something with single iteration', () => {
            const result = loadMonitoringSimulator(
                inputMetrics,
                outputMetric,
                1,
                20,
            );
            expect(result.inputMetrics[0]).toBeGreaterThanOrEqual(0);
            expect(result.inputMetrics[0]).toBeLessThanOrEqual(100);
            expect(result.inputMetrics[1]).toBeGreaterThanOrEqual(0);
            expect(result.inputMetrics[1]).toBeLessThanOrEqual(100);
            expect(result.outputMetric.credit).toBe(1980);
            expect(result.outputMetric.price).toBe(20);
        });

        test('it returns something with single iteration', () => {
            const result = loadMonitoringSimulator(
                [
                    {
                        name: 'cpu',
                        changeStep: 10,
                        probabilityOfChange: 100,
                        minCriticalValue: 40,
                        maxCriticalValue: 50,
                    },
                    {
                        name: 'ram',
                        changeStep: 10,
                        probabilityOfChange: 80,
                        minCriticalValue: 25,
                        maxCriticalValue: 75,
                    },
                ],
                {
                    name: 'money',
                    credit: 2000000,
                    price: 20,
                    minPrice: 10,
                    priceChangeStep: 5,
                },
                10,
                20,
            );
            expect(result.inputMetrics[0]).toBeGreaterThanOrEqual(0);
            expect(result.inputMetrics[0]).toBeLessThanOrEqual(100);
            expect(result.inputMetrics[1]).toBeGreaterThanOrEqual(0);
            expect(result.inputMetrics[1]).toBeLessThanOrEqual(100);
        });
    });

    describe('getNewValue', () => {
        // chance of passing false positive in 10 iterations is 0.09% which is low enough
        for ( let i = 0; i < 10; i++) {
            test('changes one step', () => {
                expect([45, 55]).toContain(getNewValue(50, 100, 5));
            });

            test('changes one step but not go over 100', () => {
                expect([94, 100]).toContain(getNewValue(99, 100, 5));
            });

            test('changes one step but not go below 0', () => {
                expect([0, 6]).toContain(getNewValue(1, 100, 5));
            });
        }

        test('keeps same value', () => {
            expect(getNewValue(50, 0, 5)).toBe(50);
        });
    });
});
