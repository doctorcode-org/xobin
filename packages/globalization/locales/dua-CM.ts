// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "dua", 
    lcid: 4096, 
    name: "dua-CM", 
    nativeName: "duálá (Cameroun)", 
    englishName: "Duala (Cameroon)", 
    twoLetterISOLanguageName: "dua", 
    threeLetterISOLanguageName: "dua", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "FCFA", 
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
        "ét",
        "mɔ́s",
        "kwa",
        "muk",
        "ŋgi",
        "ɗón",
        "esa"
      ],
      "abbreviatedMonthGenitiveNames": [
        "di",
        "ŋgɔn",
        "sɔŋ",
        "diɓ",
        "emi",
        "esɔ",
        "mad",
        "diŋ",
        "nyɛt",
        "may",
        "tin",
        "elá",
        ""
      ],
      "abbreviatedMonthNames": [
        "di",
        "ŋgɔn",
        "sɔŋ",
        "diɓ",
        "emi",
        "esɔ",
        "mad",
        "diŋ",
        "nyɛt",
        "may",
        "tin",
        "elá",
        ""
      ],
      "amDesignator": "idiɓa",
      "dateSeparator": "/",
      "dayNames": [
        "éti",
        "mɔ́sú",
        "kwasú",
        "mukɔ́sú",
        "ŋgisú",
        "ɗónɛsú",
        "esaɓasú"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "dimɔ́di",
        "ŋgɔndɛ",
        "sɔŋɛ",
        "diɓáɓá",
        "emiasele",
        "esɔpɛsɔpɛ",
        "madiɓɛ́díɓɛ́",
        "diŋgindi",
        "nyɛtɛki",
        "mayésɛ́",
        "tiníní",
        "eláŋgɛ́",
        ""
      ],
      "monthNames": [
        "dimɔ́di",
        "ŋgɔndɛ",
        "sɔŋɛ",
        "diɓáɓá",
        "emiasele",
        "esɔpɛsɔpɛ",
        "madiɓɛ́díɓɛ́",
        "diŋgindi",
        "nyɛtɛki",
        "mayésɛ́",
        "tiníní",
        "eláŋgɛ́",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "ebyámu",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "e",
        "m",
        "k",
        "m",
        "ŋ",
        "ɗ",
        "e"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "mb.Ys"
      ],
      "abbreviatedEraNames": [
        "mb.Ys"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
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