export class UnknownOperationError extends Error {
    constructor(operationName: string) {
        super(`Called an unknown operation '${operationName}'.`);
    }
}
