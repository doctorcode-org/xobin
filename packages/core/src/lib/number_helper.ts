
/**
 * 
 * @param value
 */
export function int(value: number): number {
    if (Math.trunc)
        return Math.trunc(value);

    value = +value;
    if (!isFinite(value)) return value;

    return (value - value % 1) || (value < 0 ? -0 : value === 0 ? value : 0);
}

/**
 * 
 * @param value
 */
export function uint(value: number): number {
    return value >>> 0;
}

/**
 * 
 * @param value
 */
export function isInteger(value: number): boolean {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
}