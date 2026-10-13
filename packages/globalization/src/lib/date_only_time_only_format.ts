import type { FormatEmitter } from './format_buffer';
import { FormatException } from '@xobin/core';
import type { IFormatProvider } from '@xobin/core';
import type { DateTime } from './date_time';
import { formatDateTime, formatInvariantDateTime } from './date_time_format';

/** Validates restricted date-only and time-only tokens before using the common formatter. */
export function formatDateOnlyTimeOnly(date: DateTime, format: string | null | undefined, provider: IFormatProvider | null | undefined, dateOnly: boolean, tryFormat: boolean = false, emit?: FormatEmitter): string {
    format ||= dateOnly ? 'd' : 't';
    const invalid = (): never => { throw new FormatException('Input string was not in a correct format.'); };
    if (format.length === 1) {
        if (!(dateOnly ? 'dDmMyYoOrR' : 'tToOrR').includes(format)) {
            if (tryFormat) throw new FormatException('Format specifier was invalid.');
            invalid();
        }
        const standard = format.toLowerCase();
        if (standard === 'o') return formatInvariantDateTime(date, dateOnly ? 'yyyy-MM-dd' : 'HH:mm:ss.fffffff');
        if (standard === 'r') return formatInvariantDateTime(date, dateOnly ? 'ddd, dd MMM yyyy' : 'HH:mm:ss');
    } else {
        const rejected = dateOnly ? ':tfFhHmszK' : 'dMy/zk';
        const invalidCustom = (): never => {
            if (tryFormat) throw new FormatException("String '" + format + "' contains parts which are not specific to the " + (dateOnly ? 'DateOnly' : 'TimeOnly') + '.');
            return invalid();
        };
        for (let i = 0; i < format.length; i++) {
            const token = format[i]!;
            if (token === '\\') { if (++i === format.length) invalidCustom(); }
            else if (token === "'" || token === '"') {
                const end = format.indexOf(token, i + 1);
                if (end < 0) {
                    if (tryFormat) invalidCustom();
                    throw new FormatException("Cannot find a matching quote character for the character '" + token + "'.");
                }
                i = end;
            } else if (rejected.includes(token)) invalidCustom();
        }
    }
    return formatDateTime(date, format, provider, emit);
}
