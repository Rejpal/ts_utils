import {cloneDeep} from 'lodash';
import {UnknownOperationError} from './errors/unknownOperation';

enum OPCODES {
    ADD = 1,
    MULTIPLY = 2,
    END = 99,
}

export class Computer {
    public memory: number[];
    private instructionPointer = 0;

    constructor(initMemory: number[]) {
        this.memory = initMemory;
    }

    intCodeProgram(): number[] {
        this.instructionPointer = 0;
        while (this.memory[this.instructionPointer] !== OPCODES.END) {
            switch (this.memory[this.instructionPointer]) {
                case OPCODES.ADD:
                    this.add();
                    break;
                case OPCODES.MULTIPLY:
                    this.multiply();
                    break;
                default:
                    throw new UnknownOperationError(this.memory[this.instructionPointer].toString());
            }
        }
        return this.memory;
    }

    findNounAndVerb(finalValue: number, initMemory: number[]): [number, number] {
        let noun = 0;
        let verb = 0;
        this.memory = cloneDeep(initMemory);
        this.instructionPointer = 0;
        this.memory[1] = noun;
        this.memory[2] = verb;
        this.intCodeProgram();

        while (this.memory[0] !== finalValue) {
            // set new noun and verb
            noun++;
            if (noun === 100) {
                noun = 0;
                verb++;
            }

            if (verb === 100) {
                throw new Error ('Unable to find solution');
            }

            // init memory (instructionPointer is reset by intCodeProgram already)
            this.memory = cloneDeep(initMemory);
            this.memory[1] = noun;
            this.memory[2] = verb;

            // try to run the program
            try {
                this.intCodeProgram();
            } catch (err) {
                if (!(err instanceof UnknownOperationError)) {
                    throw err;
                }
            }
        }

        return [noun, verb];
    }

    add() {
        const operand1 = this.memory[this.memory[this.instructionPointer + 1]];
        const operand2 = this.memory[this.memory[this.instructionPointer + 2]];
        const storeAddr = this.memory[this.instructionPointer + 3];

        this.memory[storeAddr] = operand1 + operand2;

        this.instructionPointer += 4;
    }

    multiply() {
        const operand1 = this.memory[this.memory[this.instructionPointer + 1]];
        const operand2 = this.memory[this.memory[this.instructionPointer + 2]];
        const storeAddr = this.memory[this.instructionPointer + 3];

        this.memory[storeAddr] = operand1 * operand2;

        this.instructionPointer += 4;
    }
}
