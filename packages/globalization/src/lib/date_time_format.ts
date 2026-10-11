import { formatHebrewNumber } from './hebrew_number';
import type { Calendar } from './calendar';
import { getCalendarIdentity } from './calendar_identity';
import { FormatException, IFormatProvider } from '@xobin/core';
import type { CultureInfo } from './culture_info';
import { DateTime, getDateTimeOffset } from './date_time';
import { DateTimeFormatData, getDateTimeFormatData, getProviderDateTimeFormat, getUniversalDateTimeFormatData, getMonthFormatFlags } from './date_time_format_data';
import { getCurrentFormatContext, invariantDateTimeFormat, gregorianFormatCalendar, FormatCalendar, FormatContext } from './date_time_format_context';
import { TicksPerSecond, TicksPerMinute } from './var';

type FormatInfo = DateTimeFormatData;

/**
 * Formats DateTime values using .NET standard and custom format tokens.
 */
export class DateTimeFormat {
    /**
     * Formats a date and time using the specified format and culture.
     * @param date The DateTime to format.
     * @param format A standard or custom date and time format string.
     * @param culture The culture that supplies formatting information.
     */
    formatInput(date: DateTime, format: string, culture?: CultureInfo): string {
        return DateTimeFormat.format(date, format, culture);
    }

    /**
     * Formats a date and time using a standard or custom format string.
     * @param date The DateTime to format.
     * @param format A standard or custom date and time format string.
     * @param provider An object that supplies culture-specific formatting information.
     */
    static format(date: DateTime, format?: string | null, provider?: IFormatProvider | null): string {
        const candidate = provider as (IFormatProvider & Partial<FormatContext>) | null | undefined;
        const culture = candidate?.dateTimeFormat && candidate.calendar ? candidate as FormatContext : getCurrentFormatContext();
        const source = getProviderDateTimeFormat(provider) ?? culture.dateTimeFormat;
        let info: FormatInfo = getDateTimeFormatData(source);
        let calendar = (source as { calendar?: FormatCalendar }).calendar ?? culture.calendar;
        format = format || (date.ticks < 864000000000n && (calendar.minSupportedDateTime?.ticks ?? 0n) > date.ticks ? 's' : 'G');
        if (format.length === 1) {
            switch (format) {
                case 'o': case 'O':
                    info = invariantDateTimeFormat;
                    calendar = gregorianFormatCalendar;
                    format = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffK";
                    break;
                case 'r': case 'R': case 's': case 'u': {
                    const standard = format;
                    info = invariantDateTimeFormat;
                    calendar = gregorianFormatCalendar;
                    format = standard === 's' ? info.sortableDateTimePattern
                        : standard === 'u' ? info.universalSortableDateTimePattern : info.rfC1123Pattern;
                    break;
                }
                case 'U':
                    date = date.toUniversalTime();
                    info = getUniversalDateTimeFormatData(source);
                    calendar = gregorianFormatCalendar;
                    format = info.fullDateTimePattern;
                    break;
                case 'd': format = info.shortDatePattern; break;
                case 'D': format = info.longDatePattern; break;
                case 't': format = info.shortTimePattern; break;
                case 'T': format = info.longTimePattern; break;
                case 'f': format = info.longDatePattern + ' ' + info.shortTimePattern; break;
                case 'F': format = info.fullDateTimePattern; break;
                case 'g': format = info.shortDatePattern + ' ' + info.shortTimePattern; break;
                case 'G': format = info.shortDatePattern + ' ' + info.longTimePattern; break;
                case 'm': case 'M': format = info.monthDayPattern; break;
                case 'y': case 'Y': format = info.yearMonthPattern; break;
                default: throw invalidFormat();
            }
        }
        return customized(date, format, info, calendar);
    }

    /**
     * Returns the string representations associated with standard date and time formats.
     * @param date The DateTime to format.
     * @param format A single standard format specifier, or null for all standard formats.
     * @param provider An object that supplies culture-specific formatting information.
     */
    static getAllFormats(date: DateTime, format?: string | null, provider?: IFormatProvider | null): string[] {
        const candidate = provider as (IFormatProvider & Partial<FormatContext>) | null | undefined;
        const culture = candidate?.dateTimeFormat && candidate.calendar ? candidate as FormatContext : getCurrentFormatContext();
        const source = getProviderDateTimeFormat(provider) ?? culture.dateTimeFormat;
        const info: FormatInfo = getDateTimeFormatData(source);
        const calendar = (source as { calendar?: FormatCalendar }).calendar ?? culture.calendar;
        if (format == null) return [...'dDfFgGmMoOrRstTuUyY'].flatMap(value => DateTimeFormat.getAllFormats(date, value, provider));
        if (format.length !== 1 || !'dDfFgGmMoOrRstTuUyY'.includes(format)) throw invalidFormat();
        if ('oOrRsu'.includes(format)) return [DateTimeFormat.format(date, format, provider)];
        const patterns = (value: string): readonly string[] => {
            const active = value === 'd' ? info.shortDatePattern : value === 'D' ? info.longDatePattern
                : value === 't' ? info.shortTimePattern : value === 'T' ? info.longTimePattern
                : 'mM'.includes(value) ? info.monthDayPattern : info.yearMonthPattern;
            const previous = info.allDateTimePatterns?.[value] ?? [];
            if (previous[0] === active) return previous.slice();
            const index = previous.indexOf(active);
            if (index < 0) return [active, ...previous];
            const merged = previous.slice();
            merged[index] = merged[0]!;
            merged[0] = active;
            return merged;
        };
        let selected: readonly string[];
        if ('fFgGU'.includes(format)) {
            const dates = patterns(format === 'g' || format === 'G' ? 'd' : 'D');
            const times = patterns(format === 'f' || format === 'g' ? 't' : 'T');
            selected = dates.flatMap(day => times.map(time => day + ' ' + time));
        } else selected = patterns(format);
        const value = format === 'U' ? date.toUniversalTime() : date;
        return selected.map(pattern => customized(value, pattern, info, calendar));
    }
}

function customized(date: DateTime, pattern: string, info: FormatInfo, calendar: FormatCalendar): string {
    let output = '';
    let timeOnly = true;
    const calendarId = getCalendarIdentity(calendar as Calendar).id;
    for (let i = 0; i < pattern.length;) {
        const c = pattern[i]!;
        if (c === "'" || c === '"') {
            const quoted = quote(pattern, i);
            output += quoted.text;
            i = quoted.end + 1;
            continue;
        }
        if (c === '\\') {
            if (++i === pattern.length) throw invalidFormat();
            output += pattern[i++];
            continue;
        }
        if (c === '%') {
            if (++i === pattern.length || pattern[i] === '%') throw invalidFormat();
            const token = pattern[i++]!;
            const formatted = customized(date, token, info, calendar);
            if (token === 'F' && !formatted && output.endsWith('.')) output = output.slice(0, -1);
            if ('yMd'.includes(token)) timeOnly = false;
            output += formatted;
            continue;
        }
        let count = 1;
        if ('yMdHhmsftFzg'.includes(c)) while (pattern[i + count] === c) count++;
        const pad = (value: number, minimum = count) => String(value).padStart(minimum, '0');
        switch (c) {
            case 'y': {
                timeOnly = false;
                const year = calendar.getYear(date);
                if (calendarId === 3 && year === 1 && (pattern[i + count] === '年'
                    || pattern[i + count] === "'" && pattern[i + count + 1] === '年')) {
                    output += '元';
                } else if (calendarId === 3 || calendarId === 4) {
                    output += pad(year, Math.min(count, 2));
                } else output += calendarId === 8 ? formatHebrewNumber(year) : pad(count <= 2 ? year % 100 : year);
                break;
            }
            case 'M': {
                timeOnly = false;
                let month = calendar.getMonth(date);
                if (calendarId === 8) {
                    if (count <= 2) output += formatHebrewNumber(month);
                    else if ((calendar as Calendar).isLeapYear(calendar.getYear(date))) {
                        output += info.leapYearMonthNames?.[month - 1] ?? info.monthNames[month - 1] ?? '';
                    } else {
                        if (month >= 7) month++;
                        output += (count === 3 ? info.abbreviatedMonthNames : info.monthNames)[month - 1] ?? '';
                    }
                    break;
                }
                const genitive = count >= 3 && getMonthFormatFlags(info).useGenitiveMonth && usesGenitiveMonth(pattern, i, count);
                output += count <= 2 ? pad(month)
                    : (count === 3 ? genitive ? info.abbreviatedMonthGenitiveNames : info.abbreviatedMonthNames
                        : genitive ? info.monthGenitiveNames : info.monthNames)[month - 1] ?? '';
                break;
            }
            case 'd':
                timeOnly = false;
                output += count <= 2 ? calendarId === 8 ? formatHebrewNumber(calendar.getDayOfMonth(date)) : pad(calendar.getDayOfMonth(date))
                    : (count === 3 ? info.abbreviatedDayNames : info.dayNames)[date.dayOfWeek] ?? '';
                break;
            case 'H': output += pad(date.hour, Math.min(count, 2)); break;
            case 'h': output += pad(date.hour % 12 || 12, Math.min(count, 2)); break;
            case 'm': output += pad(date.minute, Math.min(count, 2)); break;
            case 's': output += pad(date.second, Math.min(count, 2)); break;
            case 'f': case 'F': {
                if (count > 7) throw invalidFormat();
                let fraction = (date.ticks % TicksPerSecond).toString().padStart(7, '0').slice(0, count);
                if (c === 'F') fraction = fraction.replace(/0+$/, '');
                if (!fraction && output.endsWith('.')) output = output.slice(0, -1);
                output += fraction;
                break;
            }
            case 't': {
                const designator = date.hour < 12 ? info.amDesignator : info.pmDesignator;
                output += count === 1 ? designator.slice(0, 1) : designator;
                break;
            }
            case 'z': {
                const offset = timeOnly && date.ticks < 864000000000n ? getDateTimeOffset(DateTime.now)
                    : date.kind.value === 1 ? 0n : getDateTimeOffset(date);
                output += offsetText(offset, count);
                break;
            }
            case 'K': output += date.kind.value === 1 ? 'Z' : date.kind.value === 2 ? offsetText(getDateTimeOffset(date), 3) : ''; break;
            case 'g': output += info.eraNames?.[calendar.getEra(date) - 1] ?? 'A.D.'; break;
            case ':': output += info.timeSeparator; break;
            case '/': output += info.dateSeparator; break;
            default: output += c;
        }
        i += count;
    }
    return output;
}

/**
 * Matches .NET's raw scan for a nearby one- or two-character day token.
 * @param pattern The complete custom format, including quoted and escaped text.
 * @param index The position of the month token.
 * @param count The length of the month token.
 */
function usesGenitiveMonth(pattern: string, index: number, count: number): boolean {
    let i = index - 1;
    while (i >= 0 && pattern[i] !== 'd') i--;
    if (i >= 0) {
        let repeat = 0;
        while (--i >= 0 && pattern[i] === 'd') repeat++;
        if (repeat <= 1) return true;
    }
    i = index + count;
    while (i < pattern.length && pattern[i] !== 'd') i++;
    if (i < pattern.length) {
        let repeat = 0;
        while (++i < pattern.length && pattern[i] === 'd') repeat++;
        if (repeat <= 1) return true;
    }
    return false;
}

function offsetText(offset: bigint, count: number): string {
    const minutes = Math.abs(Number(offset / TicksPerMinute));
    const hours = Math.floor(minutes / 60).toString();
    return (offset < 0n ? '-' : '+') + (count === 1 ? hours : hours.padStart(2, '0'))
        + (count >= 3 ? ':' + (minutes % 60).toString().padStart(2, '0') : '');
}

function quote(pattern: string, start: number): { text: string; end: number } {
    let text = '';
    for (let i = start + 1; i < pattern.length; i++) {
        const c = pattern[i]!;
        if (c === pattern[start]) return { text, end: i };
        if (c === '\\') {
            if (++i === pattern.length) throw invalidFormat();
            text += pattern[i];
        } else text += c;
    }
    throw new FormatException(`Cannot find a matching quote character for the character '${pattern[start]}'.`);
}

function invalidFormat(): FormatException { return new FormatException('Input string was not in a correct format.'); }
