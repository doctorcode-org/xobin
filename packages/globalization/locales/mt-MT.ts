// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "mt", 
    lcid: 1082, 
    name: "mt-MT", 
    nativeName: "Malti (Malta)", 
    englishName: "Maltese (Malta)", 
    twoLetterISOLanguageName: "mt", 
    threeLetterISOLanguageName: "mlt", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "€", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Ħad",
        "Tne",
        "Tli",
        "Erb",
        "Ħam",
        "Ġim",
        "Sib"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Fra",
        "Mar",
        "Apr",
        "Mej",
        "Ġun",
        "Lul",
        "Aww",
        "Set",
        "Ott",
        "Nov",
        "Diċ",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Fra",
        "Mar",
        "Apr",
        "Mej",
        "Ġun",
        "Lul",
        "Aww",
        "Set",
        "Ott",
        "Nov",
        "Diċ",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Il-Ħadd",
        "It-Tnejn",
        "It-Tlieta",
        "L-Erbgħa",
        "Il-Ħamis",
        "Il-Ġimgħa",
        "Is-Sibt"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d 'ta'’ MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d 'ta'’ MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d 'ta'’ MMMM",
      "monthGenitiveNames": [
        "Jannar",
        "Frar",
        "Marzu",
        "April",
        "Mejju",
        "Ġunju",
        "Lulju",
        "Awwissu",
        "Settembru",
        "Ottubru",
        "Novembru",
        "Diċembru",
        ""
      ],
      "monthNames": [
        "Jannar",
        "Frar",
        "Marzu",
        "April",
        "Mejju",
        "Ġunju",
        "Lulju",
        "Awwissu",
        "Settembru",
        "Ottubru",
        "Novembru",
        "Diċembru",
        ""
      ],
      "nativeCalendarName": "Kalendarju Gregorjan",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "Ħd",
        "Tn",
        "Tl",
        "Er",
        "Ħm",
        "Ġm",
        "Sb"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "WK"
      ],
      "abbreviatedEraNames": [
        "WK"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "dd MMM yyyy",
          "M/d/yyyy"
        ],
        "D": [
          "dddd, d 'ta'’ MMMM yyyy",
          "d 'ta'’ MMMM yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "d 'ta'’ MMMM"
        ],
        "M": [
          "d 'ta'’ MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};