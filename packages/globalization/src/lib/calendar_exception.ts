import { ArgumentOutOfRangeException } from '@xobin/core';
import type { DateTime } from './date_time';

export function calendarRangeMessage(min: number | string, max: number | string): string {
    return `Valid values are between ${min} and ${max}, inclusive.`;
}

export function throwIfNegativeYear(year: number): never {
    throw new ArgumentOutOfRangeException('year', year, `year ('${year}') must be a non-negative value.`);
}

export function throwIfYearGreaterThan(year: number, maxYear: number): never {
    throw new ArgumentOutOfRangeException('year', year, `year ('${year}') must be less than or equal to '${maxYear}'.`);
}

export function formatGregorianDateTime(value: DateTime): string {
    const twoDigits = (part: number) => String(part).padStart(2, '0');
    return `${twoDigits(value.month)}/${twoDigits(value.day)}/${String(value.year).padStart(4, '0')} `
        + `${twoDigits(value.hour)}:${twoDigits(value.minute)}:${twoDigits(value.second)}`;
}
