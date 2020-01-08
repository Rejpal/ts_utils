// changeStep: -100..100
// probabilityOfChange 0..100
// minCriticalValue - when reached return downscale
// maxCriticalValue - when reached return upscale
// init value of metric is between (minCriticalValue + 10%) AND (maxCriticalValue -10%)
export interface InputMetric {
    name: string;
    changeStep: number;
    probabilityOfChange: number;
    minCriticalValue: number;
    maxCriticalValue: number;
    currentValue: number;
}

/**
 * currentValue 0..oo
 * changeStep -oo..0
 * minStep -1 * currentValue
 * when currentValue increases it will decrease one input metric by half of it's value.
 */
export interface OutputMetric {
    name: string;
    credit: number;
    price: number;
    minPrice: number;
}