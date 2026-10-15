// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "se", 
    lcid: 3131, 
    name: "se-FI", 
    nativeName: "davvisámegiella (Suopma)", 
    englishName: "Sami, Northern (Finland)", 
    twoLetterISOLanguageName: "se", 
    threeLetterISOLanguageName: "sme", 
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
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
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
        "so",
        "má",
        "di",
        "ga",
        "du",
        "be",
        "lá"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ođđj",
        "guov",
        "njuk",
        "cuoŋ",
        "mies",
        "geas",
        "suoi",
        "borg",
        "čakč",
        "golg",
        "skáb",
        "juov",
        ""
      ],
      "abbreviatedMonthNames": [
        "ođđj",
        "guov",
        "njuk",
        "cuoŋ",
        "mies",
        "geas",
        "suoi",
        "borg",
        "čakč",
        "golg",
        "skáb",
        "juov",
        ""
      ],
      "amDesignator": "ib",
      "dateSeparator": ".",
      "dayNames": [
        "sotnabeaivi",
        "mánnodat",
        "disdat",
        "gaskavahkku",
        "duorastat",
        "bearjadat",
        "lávvordat"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "ođđajagemánnu",
        "guovvamánnu",
        "njukčamánnu",
        "cuoŋománnu",
        "miessemánnu",
        "geassemánnu",
        "suoidnemánnu",
        "borgemánnu",
        "čakčamánnu",
        "golggotmánnu",
        "skábmamánnu",
        "juovlamánnu",
        ""
      ],
      "monthNames": [
        "ođđajagemánnu",
        "guovvamánnu",
        "njukčamánnu",
        "cuoŋománnu",
        "miessemánnu",
        "geassemánnu",
        "suoidnemánnu",
        "borgemánnu",
        "čakčamánnu",
        "golggotmánnu",
        "skábmamánnu",
        "juovlamánnu",
        ""
      ],
      "nativeCalendarName": "gregorialaš kalendar",
      "pmDesignator": "eb",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "D",
        "G",
        "D",
        "B",
        "L"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "mKr."
      ],
      "abbreviatedEraNames": [
        "mKr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d MMM yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
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