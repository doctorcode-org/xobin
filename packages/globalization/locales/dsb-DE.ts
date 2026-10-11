// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "dsb", 
    lcid: 2094, 
    name: "dsb-DE", 
    nativeName: "dolnoserbšćina (Nimska)", 
    englishName: "Lower Sorbian (Germany)", 
    twoLetterISOLanguageName: "dsb", 
    threeLetterISOLanguageName: "dsb", 
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
        "nje",
        "pón",
        "wał",
        "srj",
        "stw",
        "pět",
        "sob"
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan.",
        "feb.",
        "měr.",
        "apr.",
        "maj.",
        "jun.",
        "jul.",
        "awg.",
        "sep.",
        "okt.",
        "now.",
        "dec.",
        ""
      ],
      "abbreviatedMonthNames": [
        "jan",
        "feb",
        "měr",
        "apr",
        "maj",
        "jun",
        "jul",
        "awg",
        "sep",
        "okt",
        "now",
        "dec",
        ""
      ],
      "amDesignator": "dopołdnja",
      "dateSeparator": ".",
      "dayNames": [
        "njeźela",
        "pónjeźele",
        "wałtora",
        "srjoda",
        "stwórtk",
        "pětk",
        "sobota"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d. MMMM yyyy H:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "januara",
        "februara",
        "měrca",
        "apryla",
        "maja",
        "junija",
        "julija",
        "awgusta",
        "septembra",
        "oktobra",
        "nowembra",
        "decembra",
        ""
      ],
      "monthNames": [
        "januar",
        "februar",
        "měrc",
        "apryl",
        "maj",
        "junij",
        "julij",
        "awgust",
        "september",
        "oktober",
        "nowember",
        "december",
        ""
      ],
      "nativeCalendarName": "gregoriański kalender",
      "pmDesignator": "wótpołdnja",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy",
      "shortestDayNames": [
        "n",
        "p",
        "w",
        "s",
        "s",
        "p",
        "s"
      ],
      "shortTimePattern": "H:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "pó Chr.n."
      ],
      "abbreviatedEraNames": [
        "pó Chr.n."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.M.yyyy",
          "d.M.yy"
        ],
        "D": [
          "dddd, d. MMMM yyyy",
          "d. MMMM yyyy"
        ],
        "t": [
          "H:mm"
        ],
        "T": [
          "H:mm:ss"
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};