// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "smn", 
    lcid: 9275, 
    name: "smn-FI", 
    nativeName: "anarâškielâ (Suomâ)", 
    englishName: "Sami, Inari (Finland)", 
    twoLetterISOLanguageName: "smn", 
    threeLetterISOLanguageName: "smn", 
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
        naNSymbol: "epiloho", 
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
        "pas",
        "vuo",
        "maj",
        "kos",
        "tuo",
        "vás",
        "láv"
      ],
      "abbreviatedMonthGenitiveNames": [
        "uđiv",
        "kuovâ",
        "njuhčâ",
        "cuáŋui",
        "vyesi",
        "kesi",
        "syeini",
        "porge",
        "čohčâ",
        "roovvâd",
        "skammâ",
        "juovlâ",
        ""
      ],
      "abbreviatedMonthNames": [
        "uđiv",
        "kuovâ",
        "njuhčâ",
        "cuáŋui",
        "vyesi",
        "kesi",
        "syeini",
        "porge",
        "čohčâ",
        "roovvâd",
        "skammâ",
        "juovlâ",
        ""
      ],
      "amDesignator": "ip.",
      "dateSeparator": ".",
      "dayNames": [
        "pasepeivi",
        "vuossargâ",
        "majebargâ",
        "koskokko",
        "tuorâstâh",
        "vástuppeivi",
        "lávurdâh"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, MMMM d. yyyy H.mm.ss",
      "longDatePattern": "dddd, MMMM d. yyyy",
      "longTimePattern": "H.mm.ss",
      "monthDayPattern": "MMMM d.",
      "monthGenitiveNames": [
        "uđđâivemáánu",
        "kuovâmáánu",
        "njuhčâmáánu",
        "cuáŋuimáánu",
        "vyesimáánu",
        "kesimáánu",
        "syeinimáánu",
        "porgemáánu",
        "čohčâmáánu",
        "roovvâdmáánu",
        "skammâmáánu",
        "juovlâmáánu",
        ""
      ],
      "monthNames": [
        "uđđâivemáánu",
        "kuovâmáánu",
        "njuhčâmáánu",
        "cuáŋuimáánu",
        "vyesimáánu",
        "kesimáánu",
        "syeinimáánu",
        "porgemáánu",
        "čohčâmáánu",
        "roovvâdmáánu",
        "skammâmáánu",
        "juovlâmáánu",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "ep.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "shortTimePattern": "H.mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ".",
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
          "d.M.yyyy",
          "MMM d. yyyy"
        ],
        "D": [
          "dddd, MMMM d. yyyy",
          "MMMM d. yyyy"
        ],
        "t": [
          "H.mm"
        ],
        "T": [
          "H.mm.ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "MMMM d."
        ],
        "M": [
          "MMMM d."
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};