export function getArrayOfIntegersFromString(input: string): number[] {
    const arrayOfInputStrings = input.split('\n');
    return arrayOfInputStrings.map(singleInput => Number(singleInput));
}
