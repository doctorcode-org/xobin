import * as SR from '@xobin/core/internal/exception-resources';
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
        const message = invalid ? SR.Argument_InvalidDateTimeStyles
            : conflictingAssumptions ? SR.Argument_ConflictingDateTimeStyles
            : SR.Argument_ConflictingDateTimeRoundtripStyles;
        throw new ArgumentException(message, styles ? 'styles' : 'style');
    }
}
