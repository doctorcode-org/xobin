// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sr-Latn", 
    lcid: 4096, 
    name: "sr-Latn-XK", 
    nativeName: "srpski (Kosovo)", 
    englishName: "Serbian (Latin, Kosovo)", 
    twoLetterISOLanguageName: "sr", 
    threeLetterISOLanguageName: "srp", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "€", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: ".", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "ned",
        "pon",
        "uto",
        "sre",
        "čet",
        "pet",
        "sub"
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan",
        "feb",
        "mart",
        "apr",
        "maj",
        "jun",
        "jul",
        "avg",
        "sept",
        "okt",
        "nov",
        "dec",
        ""
      ],
      "abbreviatedMonthNames": [
        "jan",
        "feb",
        "mart",
        "apr",
        "maj",
        "jun",
        "jul",
        "avg",
        "sept",
        "okt",
        "nov",
        "dec",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ".",
      "dayNames": [
        "nedelja",
        "ponedeljak",
        "utorak",
        "sreda",
        "četvrtak",
        "petak",
        "subota"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d. MMMM yyyy. HH:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy.",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "januar",
        "februar",
        "mart",
        "april",
        "maj",
        "jun",
        "jul",
        "avgust",
        "septembar",
        "oktobar",
        "novembar",
        "decembar",
        ""
      ],
      "monthNames": [
        "januar",
        "februar",
        "mart",
        "april",
        "maj",
        "jun",
        "jul",
        "avgust",
        "septembar",
        "oktobar",
        "novembar",
        "decembar",
        ""
      ],
      "nativeCalendarName": "gregorijanski kalendar",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy.",
      "shortestDayNames": [
        "n",
        "p",
        "u",
        "s",
        "č",
        "p",
        "s"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy.",
      "eraNames": [
        "n. e."
      ],
      "abbreviatedEraNames": [
        "n. e."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.M.yyyy.",
          "d. M. yyyy.",
          "d.M.yy."
        ],
        "D": [
          "dddd, d. MMMM yyyy.",
          "d. MMMM yyyy."
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM yyyy."
        ],
        "Y": [
          "MMMM yyyy."
        ],
        "m": [
          "d. MMMM"
        ],
        "M": [
          "d. MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};