/** Numeric symbols read from the current culture when a resource message is formatted. */
interface ExceptionNumberFormat {
    readonly numberDecimalSeparator: string;
    readonly negativeSign: string;
    readonly positiveSign: string;
    readonly naNSymbol: string;
    readonly negativeInfinitySymbol: string;
    readonly positiveInfinitySymbol: string;
}

let currentNumberFormat: ExceptionNumberFormat | undefined;

/** Updates the numeric symbols when the globalization package changes the current culture. */
export function setExceptionNumberFormat(value: ExceptionNumberFormat): void {
    currentNumberFormat = value;
}

/** Formats values used in exception resource messages, without importing culture data. */
export function formatExceptionValue(value: unknown): string {
    const format = currentNumberFormat;
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    if (typeof value !== 'number' && typeof value !== 'bigint') return value == null ? '' : String(value);
    if (typeof value === 'number') {
        if (Number.isNaN(value)) return format?.naNSymbol ?? 'NaN';
        if (value === Infinity) return format?.positiveInfinitySymbol ?? 'Infinity';
        if (value === -Infinity) return format?.negativeInfinitySymbol ?? '-Infinity';
    }
    const negative = value < 0 || Object.is(value, -0);
    let text = String(negative ? -value : value);
    if (typeof value === 'number') {
        const magnitude = Math.abs(value);
        if (magnitude >= 1e17 || (magnitude > 0 && magnitude < 1e-4)) text = magnitude.toExponential();
        text = text.replace(/e([+-])(\d+)$/, (_, sign: string, exponent: string) =>
            'E' + (sign === '-' ? format?.negativeSign ?? '-' : format?.positiveSign ?? '+') + exponent.padStart(2, '0'));
        text = text.replace('.', format?.numberDecimalSeparator ?? '.');
    }
    return (negative ? format?.negativeSign ?? '-' : '') + text;
}

/** Substitutes arguments in the numbered placeholders of a .NET resource message. */
export function formatExceptionResource(resource: string, ...values: unknown[]): string {
    return resource.replace(/\{(\d+)\}/g, (_, index: string) => formatExceptionValue(values[Number(index)]));
}
