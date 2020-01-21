import {getArrayOfIntegersFromString} from './parsingInput/parseInput';
import {readFileSync} from 'fs';
import {mainThread} from './computer/main';

const instructions = getArrayOfIntegersFromString(
  readFileSync('./src/input/input.txt', 'utf8'),
);

/**
 * Once you have a working computer, the first step is to restore
 * the gravity assist program (your puzzle input) to the "1202 program alarm" state
 * it had just before the last computer caught fire.
 * To do this, before running the program,
 * replace position 1 with the value 12 and
 * replace position 2 with the value 2.
 */
instructions[1] = 12;
instructions[2] = 2;

mainThread(instructions);

console.log(`The value on position 0 after the program halts is: ${instructions[0]}`);
