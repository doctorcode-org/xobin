import { ArgumentException } from '@xobin/core';
import { DateTimeStyles } from './date_time_styles';

/**
 * Validates parsing flags using DateTimeFormatInfo.ValidateStyles from .NET 10.
 * @param style The parsing flags to validate.
 * @param styles Whether the parameter is named styles instead of style.
 * @internal
 */
export function validateDateTimeStyles(style: DateTimeStyles, styles = false): void {
    const localUniversal = DateTimeStyles.AssumeLocal | DateTimeStyles.AssumeUniversal;
    const validStyles = DateTimeStyles.AllowWhiteSpaces | DateTimeStyles.NoCurrentDateDefault |
        DateTimeStyles.AdjustToUniversal | localUniversal | DateTimeStyles.RoundtripKind;
    const invalid = (style & ~validStyles) !== 0;
    const conflictingAssumptions = (style & localUniversal) === localUniversal;
    const conflictingRoundtrip = (style & (DateTimeStyles.RoundtripKind | localUniversal |
        DateTimeStyles.AdjustToUniversal)) > DateTimeStyles.RoundtripKind;

    if (invalid || conflictingAssumptions || conflictingRoundtrip) {
        const message = invalid ? 'An undefined DateTimeStyles value is being used.'
            : conflictingAssumptions ? 'The DateTimeStyles values AssumeLocal and AssumeUniversal cannot be used together.'
            : 'The DateTimeStyles value RoundtripKind cannot be used with the values AssumeLocal, AssumeUniversal or AdjustToUniversal.';
        throw new ArgumentException(message, styles ? 'styles' : 'style');
    }
}
