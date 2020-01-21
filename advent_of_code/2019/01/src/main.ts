import {readFileSync} from 'fs';
import {getArrayOfIntegersFromString} from './parsingInput/parseInput';
import {getFuelForModules} from './countFuel/fuel';

const input = readFileSync('./src/input/input.txt', 'utf8');

const moduleMasses = getArrayOfIntegersFromString(input);
const requiredFuel = getFuelForModules(moduleMasses);

console.log(`Required fuel for start is ${requiredFuel}`);