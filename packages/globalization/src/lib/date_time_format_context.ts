import type { DateTime } from './date_time';
import type { DateTimeFormatInfo } from './date_time_format_info';
import type { DateTimeFormatData } from './date_time_format_data';

export interface FormatCalendar {
    getYear(date: DateTime): number;
    getMonth(date: DateTime): number;
    getDayOfMonth(date: DateTime): number;
    getEra(date: DateTime): number;
    readonly minSupportedDateTime?: { readonly ticks: bigint };
}
export interface FormatContext {
    readonly dateTimeFormat: DateTimeFormatInfo | DateTimeFormatData;
    readonly calendar: FormatCalendar;
}

// Gregorian variants belong to the locale data, not the public CultureInfo API.
const gregorianFormatInfo = new WeakMap<FormatContext, DateTimeFormatData>();

/**
 * Registers the Gregorian format data used internally by the universal full format.
 * @param context The culture whose Gregorian format data is being registered.
 * @param info The format data extracted with a Gregorian calendar in the reference runtime.
 */
export function setGregorianFormatInfo(context: FormatContext, info: DateTimeFormatData): void {
    gregorianFormatInfo.set(context, info);
}

/**
 * Gets a culture's internal Gregorian format data, falling back to its current format data.
 * @param context The culture whose Gregorian format data is being retrieved.
 */
export function getGregorianFormatInfo(context: FormatContext): DateTimeFormatInfo | DateTimeFormatData {
    return gregorianFormatInfo.get(context) ?? context.dateTimeFormat;
}

export const invariantDateTimeFormat: DateTimeFormatData = {
  "abbreviatedDayNames": [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ],
  "abbreviatedMonthGenitiveNames": [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    ""
  ],
  "abbreviatedMonthNames": [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    ""
  ],
  "amDesignator": "AM",
  "dateSeparator": "/",
  "dayNames": [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  "firstDayOfWeek": 0,
  "calendarWeekRule": 0,
  "fullDateTimePattern": "dddd, dd MMMM yyyy HH:mm:ss",
  "longDatePattern": "dddd, dd MMMM yyyy",
  "longTimePattern": "HH:mm:ss",
  "monthDayPattern": "MMMM dd",
  "monthGenitiveNames": [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ""
  ],
  "monthNames": [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ""
  ],
  "nativeCalendarName": "Gregorian Calendar",
  "pmDesignator": "PM",
  "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
  "shortDatePattern": "MM/dd/yyyy",
  "shortestDayNames": [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa"
  ],
  "shortTimePattern": "HH:mm",
  "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
  "timeSeparator": ":",
  "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
  "yearMonthPattern": "yyyy MMMM",
  "eraNames": [
    "A.D."
  ],
  "allDateTimePatterns": {
    "d": [
      "MM/dd/yyyy",
      "yyyy-MM-dd"
    ],
    "D": [
      "dddd, dd MMMM yyyy"
    ],
    "t": [
      "HH:mm",
      "hh:mm tt",
      "H:mm",
      "h:mm tt"
    ],
    "T": [
      "HH:mm:ss"
    ],
    "y": [
      "yyyy MMMM"
    ],
    "Y": [
      "yyyy MMMM"
    ],
    "m": [
      "MMMM dd"
    ],
    "M": [
      "MMMM dd"
    ]
  }
};

export const gregorianFormatCalendar: FormatCalendar = {
    getYear: date => date.year,
    getMonth: date => date.month,
    getDayOfMonth: date => date.day,
    getEra: () => 1,
};
const invariantContext: FormatContext = { dateTimeFormat: invariantDateTimeFormat, calendar: gregorianFormatCalendar };
let currentContext = invariantContext;

/**
 * Gets the formatting context of the current culture.
 */
export function getCurrentFormatContext(): FormatContext {
    return currentContext;
}

/**
 * Updates the formatting context when the current culture changes.
 * @param context The culture that supplies the current formatting information.
 */
export function setCurrentFormatContext(context: FormatContext): void {
    currentContext = context;
}
