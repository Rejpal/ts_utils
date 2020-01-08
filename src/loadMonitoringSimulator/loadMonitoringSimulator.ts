import {InputMetric, OutputMetric} from './types/metrics';
import {validateLoadMonitoringSimulatorInput} from './validations';
/*
​
Napiste funkci splnujici nasledujici zadani
Vstup:
K vstupnich  metrik (například cpu, ram, disk) < 0, 100 >, krok zmeny <-100, 100 >, pravdepodobnost zmeny metriky < 0 , 100, minimalni a maximalni kriticke hodnoty metriky, jejichz prekroceni  zpusobi opacnou akci na vystupni metrice
pocatecni hodnota vstupni metriky je v intervalu  minimalni + 10% a maximalni - 10% kriticke hodnoty
jedna vystupni metrika (například penize) < 0, oo >, krok zmeny < -oo, 00 >  minimalne vsak  -1 * aktualni hodnota metriky, navyseni metriky zpusobni opacnou akci na vstupni metrice o polovinu
pocet hodnot v case: N
pocet zmen: Z
Vystup:
rada hodnot pro kazdou vstupni a vystupni metriku.
​
*/

const inputMetric: InputMetric = {
    name: 'cpu',
    changeStep: 3,
    probabilityOfChange: 50,
    minCriticalValue: 15,
    maxCriticalValue: 85,
    currentValue: 50,
};

const oMetric: OutputMetric = {
    name: 'money',
    credit: 2000,
    price: 10,
    minPrice: -10,
};

export function loadMonitoringSimulator(
    inputMetrics: any,
    outputMetric: OutputMetric,
    iterationCount: number,
    changeCountLimit: number,
) {
    const args = {inputMetrics, outputMetric, iterationCount, changeCount: changeCountLimit};

    try {
        validateLoadMonitoringSimulatorInput(args);
    } catch (err) {
        console.error('input validation error:', err);
        process.exit(1);
    }

    // TODO 1) generate currentValue for each input metric (keep it in separate array to not polute args data)

    // TODO 3) iteration cycle

    // TODO 2) print out results


}
