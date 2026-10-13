import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import * as SR from '@xobin/core/internal/exception-resources';
import { ArgumentOutOfRangeException } from '@xobin/core';
import type { DateTime } from './date_time';

export function calendarRangeMessage(min: number | string, max: number | string): string {
    return formatExceptionResource(SR.ArgumentOutOfRange_Range, min, max);
}

export function throwIfNegativeYear(year: number): never {
    throw new ArgumentOutOfRangeException('year', year, formatExceptionResource(SR.ArgumentOutOfRange_Generic_MustBeNonNegative, 'year', year));
}

export function throwIfYearGreaterThan(year: number, maxYear: number): never {
    throw new ArgumentOutOfRangeException('year', year, formatExceptionResource(SR.ArgumentOutOfRange_Generic_MustBeLessOrEqual, 'year', year, maxYear));
}

export function formatGregorianDateTime(value: DateTime): string {
    const twoDigits = (part: number) => String(part).padStart(2, '0');
    return `${twoDigits(value.month)}/${twoDigits(value.day)}/${String(value.year).padStart(4, '0')} `
        + `${twoDigits(value.hour)}:${twoDigits(value.minute)}:${twoDigits(value.second)}`;
}
