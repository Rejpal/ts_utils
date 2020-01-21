export function getArrayOfIntegersFromString(input: string): number[] {
    const arrayOfInputStrings = input.split(',');
    return arrayOfInputStrings.map(singleInput => Number(singleInput));
}
