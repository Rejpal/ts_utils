import {validateLoadMonitoringSimulatorInput} from './validations';
import { getRandomNumberFromInterval } from './numberGenerator';
import {ScaleList} from './types/scaling';

export function loadMonitoringSimulator(
    inputMetrics: any,
    outputMetric: any,
    iterationCount: any,
    changeCountLimit: any,
) {
    const args = {inputMetrics, outputMetric, iterationCount, changeCountLimit};

    // in case of invalid input validation function throws an error.
    // we are not catching that to let the logic above us correct the input.
    if (!validateLoadMonitoringSimulatorInput(args)) {
        console.error('input validation error.');
        process.exit(1);
    }

    let inputMetricValues = args.inputMetrics.map((item) => {
        const {minCriticalValue, maxCriticalValue} = item;
        // 10% boundaries above min and 10% below max for starting value counted
        // from their delta to avoid crossing min with max (which would result in an error)
        const delta = (maxCriticalValue - minCriticalValue) * 0.1;
        return getRandomNumberFromInterval(minCriticalValue + delta, maxCriticalValue - delta);
    });

    let credit = outputMetric.credit;
    let price = args.outputMetric.price;
    let changes = 0;
    const {minPrice, priceChangeStep} = args.outputMetric;

    for (let i = 0; i < args.iterationCount; i++) {
        const scaleRequired: ScaleList = {
            upscale: [],
            downscale: [],
        };

        inputMetricValues.forEach((metricValue, index) => {
            const {minCriticalValue, maxCriticalValue} = args.inputMetrics[index];
            const {probabilityOfChange, changeStep} = args.inputMetrics[index];
            const newMetricValue = getNewValue(metricValue, probabilityOfChange, changeStep);

            if (newMetricValue >= maxCriticalValue) {
                scaleRequired.upscale.push(index);
            } else if ( newMetricValue <= minCriticalValue) {
                scaleRequired.downscale.push(index);
            }

            inputMetricValues[index] = newMetricValue;
        });

        // scale architecture based on requirements and possibilities
        const scaleResults = scaleMetrics(inputMetricValues, scaleRequired, credit, price, minPrice, priceChangeStep, changeCountLimit - changes);
        inputMetricValues = scaleResults.inputMetricValues;
        price = scaleResults.price;
        changes += scaleResults.changesMade;

        // pay the price
        credit -= price;

        if (changes >= changeCountLimit) {
            break;
        }
    }

    return {
        inputMetrics: inputMetricValues,
        outputMetric: {credit, price},
        changes,
    };
}

export function getNewValue(currentValue: number, probabilityOfChange: number, changeStep: number): number {
    const diceRoll = Math.random() * 100;
    let newValue = currentValue;
    if (diceRoll <= probabilityOfChange) {
        if (Math.random() > 0.5) {
            // change up
            newValue += changeStep;
            if (newValue > 100) {
                newValue = 100;
            }
        } else {
            // change down
            newValue -= changeStep;
            if (newValue < 0) {
                newValue = 0;
            }
        }
    }

    return newValue;
}

export function scaleMetrics(
    inputMetricValues: number[],
    scaleRequired: ScaleList,
    credit: number,
    price: number,
    minPrice: number,
    priceChangeStep: number,
    maxChanges: number,
): {inputMetricValues: number[], price: number, changesMade: number} {
    let changesMade = 0;
    while (
        (scaleRequired.downscale.length > 0 ||
        scaleRequired.upscale.length > 0) &&
        maxChanges > changesMade
    ) {
        if ((price + priceChangeStep) < credit) {
            // scale up
            const metricIndex = scaleRequired.upscale.pop();
            if (typeof metricIndex === 'number') {
                inputMetricValues[metricIndex] /= 2;
                price += priceChangeStep;

                changesMade++;
            }
        }

        if (maxChanges > changesMade) {
            // scale down
            const metricIndex = scaleRequired.downscale.pop();
            if (typeof metricIndex === 'number') {
                inputMetricValues[metricIndex] *= 2;
                if (price > minPrice) {
                    price -= priceChangeStep;
                    price = price < minPrice ? minPrice : price;
                }

                changesMade++;
            }
        }

        if ((price + priceChangeStep) > credit && price === minPrice) {
            // not possible to scale any more
            scaleRequired.upscale = [];
            scaleRequired.downscale = [];
        }
    }

    return {inputMetricValues, price, changesMade};
}
