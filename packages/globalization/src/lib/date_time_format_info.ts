import { DayOfWeek } from './day_of_week';

export interface DateTimeFormatInfo {
    abbreviatedDayNames: ReadonlyArray<string>;
    abbreviatedMonthGenitiveNames: ReadonlyArray<string>;
    abbreviatedMonthNames: ReadonlyArray<string>;
    amDesignator: string;
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