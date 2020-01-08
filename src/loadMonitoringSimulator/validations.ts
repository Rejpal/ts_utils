import {InputMetric, OutputMetric} from './types/metrics';

export interface ValidInput {
    inputMetrics: InputMetric[];
    outputMetric: OutputMetric;
    iterationCount: number;
    changeCountLimit: number;
}

// changeStep: -100..100
// probabilityOfChange 0..100
// minCriticalValue - when reached return downscale
// maxCriticalValue - when reached return upscale
// init value of metric is between (minCriticalValue + 10%) AND (maxCriticalValue -10%)

export function isNumberInsideBoundaries(input: any, min: number, max: number): input is number {
    return typeof input === 'number' && input >= min && input <= max;
}

export function isValidInputMetric(metric): metric is InputMetric {
    if (!metric) {
        return false;
    }

    const { changeStep, probabilityOfChange, minCriticalValue, maxCriticalValue, name, currentValue } = metric;

    return (
        typeof name === 'string' &&
        isNumberInsideBoundaries(changeStep, -100, 100) &&
        isNumberInsideBoundaries(probabilityOfChange, 0, 100) &&
        isNumberInsideBoundaries(minCriticalValue, -100, 100) &&
        isNumberInsideBoundaries(maxCriticalValue, -100, 100)
    );
}

export function isValidOutputMetric(metric): metric is OutputMetric {
    if (!metric) {
        return false;
    }

    const {name, credit, price, minPrice} = metric;

    return (
        typeof name === 'string' &&
        typeof credit === 'number' && credit >= 0 &&
        typeof minPrice === 'number' && minPrice <= 0 &&
        typeof price === 'number' && price <= minPrice
    );
}

export function isPositiveInteger(input: any): input is number {
    return typeof input === 'number' && input >= 0 && Number.isInteger(input);
}

export function validateLoadMonitoringSimulatorInput(
    args: any,
 ): args is ValidInput {
     const {inputMetrics, outputMetric, iterationCount, changeCountLimit } = args;

     inputMetrics.forEach((metric, index) => {
         if (!isValidInputMetric(metric)) {
             throw new Error(`InputMetric ${index} is not valid.`);
         }
     });

     if (!isValidOutputMetric(outputMetric)) {
         throw new Error(`Output Metric is not valid.`);
     }

     if (!(isPositiveInteger(iterationCount))) {
         throw new Error(`IterationCount is not valid.`);
     }

     if (!(isPositiveInteger(changeCountLimit))) {
         throw new Error(`changeCountLimit is not valid.`);
     }

     return true;
 }
