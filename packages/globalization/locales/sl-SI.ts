// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sl", 
    lcid: 1060, 
    name: "sl-SI", 
    nativeName: "slovenščina (Slovenija)", 
    englishName: "Slovenian (Slovenia)", 
    twoLetterISOLanguageName: "sl", 
    threeLetterISOLanguageName: "slv", 
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
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "−∞",
        negativeSign: "−",
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
        "ned.",
        "pon.",
        "tor.",
        "sre.",
        "čet.",
        "pet.",
        "sob."
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan.",
        "feb.",
        "mar.",
        "apr.",
        "maj",
        "jun.",
        "jul.",
        "avg.",
        "sep.",
        "okt.",
        "nov.",
        "dec.",
        ""
      ],
      "abbreviatedMonthNames": [
        "jan.",
        "feb.",
        "mar.",
        "apr.",
        "maj",
        "jun.",
        "jul.",
        "avg.",
        "sep.",
        "okt.",
        "nov.",
        "dec.",
        ""
      ],
      "amDesignator": "dop.",
      "dateSeparator": ". ",
      "dayNames": [
        "nedelja",
        "ponedeljek",
        "torek",
        "sreda",
        "četrtek",
        "petek",
        "sobota"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d. MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "januar",
        "februar",
        "marec",
        "april",
        "maj",
        "junij",
        "julij",
        "avgust",
        "september",
        "oktober",
        "november",
        "december",
        ""
      ],
      "monthNames": [
        "januar",
        "februar",
        "marec",
        "april",
        "maj",
        "junij",
        "julij",
        "avgust",
        "september",
        "oktober",
        "november",
        "december",
        ""
      ],
      "nativeCalendarName": "gregorijanski koledar",
      "pmDesignator": "pop.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d. MM. yyyy",
      "shortestDayNames": [
        "n",
        "p",
        "t",
        "s",
        "č",
        "p",
        "s"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "po Kr."
      ],
      "abbreviatedEraNames": [
        "po Kr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d. MM. yyyy",
          "d. MMM yyyy",
          "d. M. yyyy",
          "d. MM. yy"
        ],
        "D": [
          "dddd, d. MMMM yyyy",
          "d. MMMM yyyy"
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
          "d. MMMM"
        ],
        "M": [
          "d. MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};