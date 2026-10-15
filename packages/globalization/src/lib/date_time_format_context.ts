import { dateTimeFormatStates } from './date_time_format_data';
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

export const invariantDateTimeFormat: DateTimeFormatData = {
  "leapYearMonthNames": null,
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
  "abbreviatedEraNames": [
    "AD"
  ],
  "abbreviatedEnglishEraNames": [
    "AD"
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
let currentContext: FormatContext | undefined;

/**
 * Gets the formatting context of the current culture.
 */
export function getCurrentFormatContext(): FormatContext {
    return currentContext ?? invariantContext;
}

/**
 * Updates the formatting context when the current culture changes.
 * @param context The culture that supplies the current formatting information.
 */
export function setCurrentFormatContext(context: FormatContext): void {
    currentContext = context;
}

/** Gets the current culture's private interval separator without retaining invariant date format tables. */
export function getCurrentTimeSpanDecimalSeparator(): string {
    return currentContext ? dateTimeFormatStates.get(currentContext.dateTimeFormat)?.decimalSeparator ?? '.' : '.';
}
