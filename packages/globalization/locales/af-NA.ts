// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "af", 
    lcid: 4096, 
    name: "af-NA", 
    nativeName: "Afrikaans (Namibië)", 
    englishName: "Afrikaans (Namibia)", 
    twoLetterISOLanguageName: "af", 
    threeLetterISOLanguageName: "afr", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "$", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "So.",
        "Ma.",
        "Di.",
        "Wo.",
        "Do.",
        "Vr.",
        "Sa."
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan.",
        "Feb.",
        "Mrt.",
        "Apr.",
        "Mei",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Okt.",
        "Nov.",
        "Des.",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan.",
        "Feb.",
        "Mrt.",
        "Apr.",
        "Mei",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Okt.",
        "Nov.",
        "Des.",
        ""
      ],
      "amDesignator": "vm.",
      "dateSeparator": "-",
      "dayNames": [
        "Sondag",
        "Maandag",
        "Dinsdag",
        "Woensdag",
        "Donderdag",
        "Vrydag",
        "Saterdag"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd dd MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd dd MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Januarie",
        "Februarie",
        "Maart",
        "April",
        "Mei",
        "Junie",
        "Julie",
        "Augustus",
        "September",
        "Oktober",
        "November",
        "Desember",
        ""
      ],
      "monthNames": [
        "Januarie",
        "Februarie",
        "Maart",
        "April",
        "Mei",
        "Junie",
        "Julie",
        "Augustus",
        "September",
        "Oktober",
        "November",
        "Desember",
        ""
      ],
      "nativeCalendarName": "Gregoriaanse kalender",
      "pmDesignator": "nm.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "M",
        "D",
        "W",
        "D",
        "V",
        "S"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "n.C."
      ],
      "abbreviatedEraNames": [
        "n.C."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd",
          "dd MMM yyyy"
        ],
        "D": [
          "dddd dd MMMM yyyy",
          "dd MMMM yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "d MMMM"
        ],
        "M": [
          "d MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};