import type { DayOfWeek } from './day_of_week';
import { NullReferenceException } from '@xobin/core';
import type { IFormatProvider } from '@xobin/core';
import type { CalendarWeekRule } from './calendar_week_rule';
import type { FormatCalendar } from './date_time_format_context';
import type { Calendar } from './calendar';
import { getCalendarIdentity } from './calendar_identity';

/** Locale format data used internally by formatting and DateTimeFormatInfo. */
export interface DateTimeFormatData {
    leapYearMonthNames?: ReadonlyArray<string> | null;
    eraNames?: ReadonlyArray<string>;
    abbreviatedEraNames?: ReadonlyArray<string>;
    abbreviatedEnglishEraNames?: ReadonlyArray<string>;
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
    cultureName: string;
    decimalSeparator: string;
    calendarFormats: ReadonlyMap<number, DateTimeFormatData>;
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

/** Restores calendar-dependent fields while preserving explicitly customized time information. */
export function getCalendarFormatData(state: DateTimeFormatState, id: number): DateTimeFormatData | undefined {
    const original = state.calendarFormats.get(id);
    if (!original) return undefined;
    const data = { ...state.data };
    for (const key of [
        'leapYearMonthNames', 'eraNames', 'abbreviatedEraNames', 'abbreviatedEnglishEraNames', 'monthDayPattern', 'dayNames', 'abbreviatedDayNames', 'shortestDayNames',
        'monthNames', 'abbreviatedMonthNames', 'monthGenitiveNames', 'abbreviatedMonthGenitiveNames',
        'longDatePattern', 'shortDatePattern', 'yearMonthPattern', 'dateSeparator', 'nativeCalendarName',
        'allDateTimePatterns',
    ] as const) {
        (data as unknown as Record<string, unknown>)[key] = original[key];
    }
    data.fullDateTimePattern = data.longDatePattern + ' ' + data.longTimePattern;
    return data;
}

/** Gets the data used by the universal full format after its Gregorian-calendar transition. */
export function getUniversalDateTimeFormatData(info: object): DateTimeFormatData {
    const state = dateTimeFormatStates.get(info);
    if (!state || getCalendarIdentity(state.calendar as Calendar).isGregorian) {
        return getDateTimeFormatData(info);
    }
    return getCalendarFormatData(state, 1) ?? state.data;
}


const monthFormatFlags = new WeakMap<DateTimeFormatData, { useGenitiveMonth: boolean }>();

/** Initializes the reference's cached month-format flags, preserving caller-array mutation behavior. */
export function getMonthFormatFlags(data: DateTimeFormatData): { useGenitiveMonth: boolean } {
    let flags = monthFormatFlags.get(data);
    if (!flags) {
        for (const names of [data.monthNames, data.monthGenitiveNames,
            data.abbreviatedMonthNames, data.abbreviatedMonthGenitiveNames,
            data.dayNames, data.abbreviatedDayNames]) {
            for (const name of names) if (name == null) throw new NullReferenceException();
        }
        flags = { useGenitiveMonth: data.monthNames.some((name, i) => name !== data.monthGenitiveNames[i])
            || data.abbreviatedMonthNames.some((name, i) => name !== data.abbreviatedMonthGenitiveNames[i]) };
        monthFormatFlags.set(data, flags);
    }
    return flags;
}

/** Invalidates cached flags when a setter clears the reference's token table. */
export function clearMonthFormatFlags(data: DateTimeFormatData): void {
    monthFormatFlags.delete(data);
}

/** Copies initialized flags during the reference's memberwise clone operation. */
export function copyMonthFormatFlags(source: DateTimeFormatData, target: DateTimeFormatData): void {
    const flags = monthFormatFlags.get(source);
    if (flags) monthFormatFlags.set(target, flags);
}
