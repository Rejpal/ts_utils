import {readFileSync} from 'fs';
import {getArrayOfIntegersFromString} from './parsingInput/parseInput';
import {getFuelForModules, getFuelForModulesAndFuel, getFuelForModulesAndFuelPerModule} from './countFuel/fuel';

const input = readFileSync('./src/input/input.txt', 'utf8');

const moduleMasses = getArrayOfIntegersFromString(input);
const part1correct = getFuelForModules(moduleMasses);
const part2wrong = getFuelForModulesAndFuel(moduleMasses);
const part2correct = getFuelForModulesAndFuelPerModule(moduleMasses)

console.log(`Required fuel for start is ${part1correct}`);
console.log(`Total required fuel for start is ${part2wrong}`);
console.log(`Total required fuel for start is ${part2correct}`);