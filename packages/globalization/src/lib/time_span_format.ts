import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import * as SR from '@xobin/core/internal/exception-resources';
import type { FormatEmitter } from './format_buffer';
import { FormatException } from '@xobin/core';
import type { IFormatProvider } from '@xobin/core';
import { dateTimeFormatStates, getProviderDateTimeFormat } from './date_time_format_data';
import { getCurrentTimeSpanDecimalSeparator } from './date_time_format_context';
import { TicksPerDay, TicksPerHour, TicksPerMinute, TicksPerSecond } from './var';

/** Formats signed tick intervals using the reference's standard and custom TimeSpan patterns. */
export function formatTimeSpan(ticks: bigint, format?: string | null, provider?: IFormatProvider | null, emit?: FormatEmitter): string {
    format ||= 'c';
    const negative = ticks < 0n;
    const absolute = negative ? -ticks : ticks;
    const days = absolute / TicksPerDay;
    const hours = absolute / TicksPerHour % 24n;
    const minutes = absolute / TicksPerMinute % 60n;
    const seconds = absolute / TicksPerSecond % 60n;
    const fraction = (absolute % TicksPerSecond).toString().padStart(7, '0');
    const pad = (value: bigint, count: number) => value.toString().padStart(count, '0');
    const invalid = (): never => { throw new FormatException(SR.Format_InvalidString); };
    if (format.length === 1) {
        if (!'ctTgG'.includes(format)) invalid();
        const constant = 'ctT'.includes(format);
        const long = format === 'G';
        let separator = '.';
        if (!constant) {
            const info = getProviderDateTimeFormat(provider);
            separator = info ? dateTimeFormatStates.get(info)?.decimalSeparator ?? '.' : getCurrentTimeSpanDecimalSeparator();
        }
        const dayPart = long || days !== 0n ? days + (constant ? '.' : ':') : '';
        const decimal = long || absolute % TicksPerSecond !== 0n
            ? separator + (constant || long ? fraction : fraction.replace(/0+$/, '')) : '';
        return (negative ? '-' : '') + dayPart + pad(hours, constant || long ? 2 : 1)
            + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + decimal;
    }
    // The reference resolves DateTimeFormatInfo even though custom patterns use no culture-specific tokens.
    getProviderDateTimeFormat(provider);
    function custom(pattern: string): string {
        let result = '';
        const append = (text: string, kind: 'text' | 'char' | 'escaped' = 'text') => { result += text; emit?.(text, kind); };
        for (let i = 0; i < pattern.length; i++) {
            const token = pattern[i]!;
            if (token === "'" || token === '"') {
                let closed = false;
                while (++i < pattern.length) {
                    const literal = pattern[i]!;
                    if (literal === token) { closed = true; break; }
                    if (literal === '\\') {
                        if (++i === pattern.length) invalid();
                        append(pattern[i]!, 'escaped');
                    } else append(literal, 'char');
                }
                if (!closed) throw new FormatException(formatExceptionResource(SR.Format_BadQuote, token));
            } else if (token === '\\') {
                if (++i === pattern.length) invalid();
                append(pattern[i]!, 'escaped');
            } else if (token === '%') {
                if (++i === pattern.length || pattern[i] === '%') invalid();
                result += custom(pattern[i]!);
            } else {
                let count = 1;
                while (pattern[i + count] === token) count++;
                i += count - 1;
                switch (token) {
                    case 'd': if (count > 8) invalid(); append(pad(days, count)); break;
                    case 'h': case 'm': case 's':
                        if (count > 2) invalid();
                        append(pad(token === 'h' ? hours : token === 'm' ? minutes : seconds, count)); break;
                    case 'f': case 'F':
                        if (count > 7) invalid();
                        const digits = fraction.slice(0, count);
                        append(token === 'F' ? digits.replace(/0+$/, '') : digits); break;
                    default: invalid();
                }
            }
        }
        return result;
    }
    return custom(format);
}
