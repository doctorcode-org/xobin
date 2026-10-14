// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 46, 
    name: "hsb", 
    nativeName: "hornjoserbšćina", 
    englishName: "Upper Sorbian", 
    twoLetterISOLanguageName: "hsb", 
    threeLetterISOLanguageName: "hsb", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
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
        "wut",
        "srj",
        "štw",
        "pja",
        "sob"
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan.",
        "feb.",
        "měr.",
        "apr.",
        "mej.",
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
        "mej",
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
        "njedźela",
        "póndźela",
        "wutora",
        "srjeda",
        "štwórtk",
        "pjatk",
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
        "meje",
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
        "meja",
        "junij",
        "julij",
        "awgust",
        "september",
        "oktober",
        "nowember",
        "december",
        ""
      ],
      "nativeCalendarName": "gregorianska protyka",
      "pmDesignator": "popołdnju",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy",
      "shortestDayNames": [
        "n",
        "p",
        "w",
        "s",
        "š",
        "p",
        "s"
      ],
      "shortTimePattern": "H:mm 'hodź'.",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "po Chr.n."
      ],
      "abbreviatedEraNames": [
        "po Chr.n."
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
          "H:mm 'hodź'."
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};