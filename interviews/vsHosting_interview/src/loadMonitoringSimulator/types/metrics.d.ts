/** 
 * name: string describing the metric - currently not used
 * changeStep: -100..100
 * probabilityOfChange 0..100
 * minCriticalValue - when reached return downscale
 * maxCriticalValue - when reached return upscale
 */
export interface InputMetric {
    name: string;
    changeStep: number;
    probabilityOfChange: number;
    minCriticalValue: number;
    maxCriticalValue: number;
}

/**
 * name: string describing the metric - currently not used
 * credit 0..oo
 * price 0..oo
 * priceChangeStep 0..oo
 * minStep 1 * currentValue - changed from -1 * currentValue because the credit operations would be counterintuitive (newCredit = credit + price)
 */
export interface OutputMetric {
    name: string;
    credit: number;
    price: number;
    minPrice: number;
    priceChangeStep: number;
}
