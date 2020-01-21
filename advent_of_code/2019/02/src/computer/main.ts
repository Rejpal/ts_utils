
enum OPCODES {
    ADD = 1,
    MULTIPLY = 2,
    END = 99,
}

export function mainThread(initState: number[]): number[] {
    let currentIndex = 0;
    while (initState[currentIndex] !== OPCODES.END) {
        switch (initState[currentIndex]) {
            case OPCODES.ADD:
                currentIndex = add(initState, currentIndex);
                break;
            case OPCODES.MULTIPLY:
                currentIndex = multiply(initState, currentIndex);
                break;
            default:
                throw new Error(`unknown operation ${initState[currentIndex]} on index ${currentIndex}`);
        }
    }
    return initState;
}

export function add(state: number[], index: number): number {
    state[state[index + 3]] = state[state[index + 1]] + state[state[index + 2]];
    return index + 4;
}

export function multiply(state: number[], index: number): number {
    state[state[index + 3]] = state[state[index + 1]] * state[state[index + 2]];
    return index + 4;
}
