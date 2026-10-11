// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "se", 
    lcid: 1083, 
    name: "se-NO", 
    nativeName: "davvisámegiella (Norga)", 
    englishName: "Sami, Northern (Norway)", 
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
        currencySymbol: "kr", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
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
        "sotn",
        "vuos",
        "maŋ",
        "gask",
        "duor",
        "bear",
        "láv"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ođđj",
        "guov",
        "njuk",
        "cuo",
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
        "cuo",
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
      "amDesignator": "iđitbeaivet",
      "dateSeparator": "-",
      "dayNames": [
        "sotnabeaivi",
        "vuossárga",
        "maŋŋebárga",
        "gaskavahkku",
        "duorasdat",
        "bearjadat",
        "lávvardat"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
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
      "nativeCalendarName": "gregoria kaleander",
      "pmDesignator": "eahketbeaivet",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "V",
        "M",
        "G",
        "D",
        "B",
        "L"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "m.Kr."
      ],
      "abbreviatedEraNames": [
        "m.Kr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd",
          "yyyy MMM d"
        ],
        "D": [
          "yyyy MMMM d, dddd",
          "yyyy MMMM d"
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};