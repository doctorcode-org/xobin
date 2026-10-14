// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "wae", 
    lcid: 4096, 
    name: "wae-CH", 
    nativeName: "Walser (Schwiz)", 
    englishName: "Walser (Switzerland)", 
    twoLetterISOLanguageName: "wae", 
    threeLetterISOLanguageName: "wae", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: "’", 
        currencySymbol: "CHF", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: "’", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: "’", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Sun",
        "Män",
        "Ziš",
        "Mit",
        "Fró",
        "Fri",
        "Sam"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jen",
        "Hor",
        "Mär",
        "Abr",
        "Mei",
        "Brá",
        "Hei",
        "Öig",
        "Her",
        "Wím",
        "Win",
        "Chr",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jen",
        "Hor",
        "Mär",
        "Abr",
        "Mei",
        "Brá",
        "Hei",
        "Öig",
        "Her",
        "Wím",
        "Win",
        "Chr",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Sunntag",
        "Mäntag",
        "Zištag",
        "Mittwuč",
        "Fróntag",
        "Fritag",
        "Samštag"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d. MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Jenner",
        "Hornig",
        "Märze",
        "Abrille",
        "Meije",
        "Bráčet",
        "Heiwet",
        "Öigšte",
        "Herbštmánet",
        "Wímánet",
        "Wintermánet",
        "Chrištmánet",
        ""
      ],
      "monthNames": [
        "Jenner",
        "Hornig",
        "Märze",
        "Abrille",
        "Meije",
        "Bráčet",
        "Heiwet",
        "Öigšte",
        "Herbštmánet",
        "Wímánet",
        "Wintermánet",
        "Chrištmánet",
        ""
      ],
      "nativeCalendarName": "Gregorianišä Kaländer",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "M",
        "Z",
        "M",
        "F",
        "F",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "n. Chr"
      ],
      "abbreviatedEraNames": [
        "n. Chr"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd",
          "d. MMM yyyy",
          "yyyy-M-d"
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
          "yyyy MMMM"
        ],
        "Y": [
          "yyyy MMMM"
        ],
        "m": [
          "MMMM d"
        ],
        "M": [
          "MMMM d"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};