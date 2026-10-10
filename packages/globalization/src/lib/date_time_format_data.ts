import type { DayOfWeek } from './day_of_week';
import type { IFormatProvider } from '@xobin/core';
import type { CalendarWeekRule } from './calendar_week_rule';
import type { FormatCalendar } from './date_time_format_context';

/** Locale format data used internally by formatting and DateTimeFormatInfo. */
export interface DateTimeFormatData {
    eraNames?: ReadonlyArray<string>;
    allDateTimePatterns?: Readonly<Record<string, ReadonlyArray<string>>>;
    abbreviatedDayNames: ReadonlyArray<string>;
    abbreviatedMonthGenitiveNames: ReadonlyArray<string>;
    abbreviatedMonthNames: ReadonlyArray<string>;
    amDesignator: string;
    calendarWeekRule?: CalendarWeekRule;
    dateSeparator: string;
    dayNames: ReadonlyArray<string>;
    firstDayOfWeek: DayOfWeek;
    fullDateTimePattern: string;
    longDatePattern: string;
    longTimePattern: string;
    monthDayPattern: string;
    monthGenitiveNames: ReadonlyArray<string>;
    monthNames: ReadonlyArray<string>;
    nativeCalendarName: string;
    pmDesignator: string;
    rfC1123Pattern: string;
    shortDatePattern: string;
    shortestDayNames: ReadonlyArray<string>;
    shortTimePattern: string;
    sortableDateTimePattern: string;
    timeSeparator: string;
    universalSortableDateTimePattern: string;
    yearMonthPattern: string;
}

/** Private instance state; it is not exported through the package API. */
export interface DateTimeFormatState {
    data: DateTimeFormatData;
    calendar: FormatCalendar;
    isReadOnly: boolean;
}

export const dateTimeFormatStates = new WeakMap<object, DateTimeFormatState>();
let formatInfoType: (new () => object) | undefined;

/** Registers the provider type when the format-info class module is loaded. */
export function registerDateTimeFormatInfoType(type: new () => object): void {
    formatInfoType = type;
}

/** Resolves providers without introducing a runtime dependency on calendar implementations. */
export function getProviderDateTimeFormat(provider?: IFormatProvider | null): object | null | undefined {
    if (provider == null) return undefined;
    if (formatInfoType && provider instanceof formatInfoType) return provider;
    const info = provider.getFormat(formatInfoType ?? 'DateTimeFormatInfo');
    return formatInfoType && info instanceof formatInfoType ? info : undefined;
}

/** Gets the internal data of an instance, or explicitly registered locale data. */
export function getDateTimeFormatData(info: object): DateTimeFormatData {
    return dateTimeFormatStates.get(info)?.data ?? info as DateTimeFormatData;
}

