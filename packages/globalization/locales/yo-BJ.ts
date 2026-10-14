// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "yo", 
    lcid: 4096, 
    name: "yo-BJ", 
    nativeName: "Èdè Yorùbá (Orílɛ́ède Bɛ̀nɛ̀)", 
    englishName: "Yoruba (Benin)", 
    twoLetterISOLanguageName: "yo", 
    threeLetterISOLanguageName: "yor", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "CFA", 
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
        "Àìk",
        "Aj",
        "Ìsɛ́g",
        "Ɔjɔ́r",
        "Ɔjɔ́b",
        "Ɛt",
        "Àbám"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Shɛ́r",
        "Èrèl",
        "Ɛrɛ̀n",
        "Ìgb",
        "Ɛ̀bi",
        "Òkú",
        "Agɛ",
        "Ògú",
        "Owe",
        "Ɔ̀wà",
        "Bél",
        "Ɔ̀pɛ",
        ""
      ],
      "abbreviatedMonthNames": [
        "Shɛ́",
        "Èr",
        "Ɛr",
        "Ìg",
        "Ɛ̀b",
        "Òk",
        "Ag",
        "Òg",
        "Ow",
        "Ɔ̀w",
        "Bé",
        "Ɔ̀p",
        ""
      ],
      "amDesignator": "Àárɔ̀",
      "dateSeparator": "/",
      "dayNames": [
        "Àìkú",
        "Ajé",
        "Ìsɛ́gun",
        "Ɔjɔ́rú",
        "Ɔjɔ́bɔ",
        "Ɛtì",
        "Àbámɛ́ta"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMM yyyy H:m:s",
      "longDatePattern": "dddd, d MMM yyyy",
      "longTimePattern": "H:m:s",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Oshù Shɛ́rɛ́",
        "Oshù Èrèlè",
        "Oshù Ɛrɛ̀nà",
        "Oshù Ìgbé",
        "Oshù Ɛ̀bibi",
        "Oshù Òkúdu",
        "Oshù Agɛmɔ",
        "Oshù Ògún",
        "Oshù Owewe",
        "Oshù Ɔ̀wàrà",
        "Oshù Bélú",
        "Oshù Ɔ̀pɛ̀",
        ""
      ],
      "monthNames": [
        "Shɛ́rɛ́",
        "Èrèlè",
        "Ɛrɛ̀nà",
        "Ìgbé",
        "Ɛ̀bibi",
        "Òkúdu",
        "Agɛmɔ",
        "Ògún",
        "Owewe",
        "Ɔ̀wàrà",
        "Bélú",
        "Ɔ̀pɛ̀",
        ""
      ],
      "nativeCalendarName": "Kàlɛ́ńdà Gregory",
      "pmDesignator": "Ɔ̀sán",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "À",
        "A",
        "Ì",
        "Ɔ",
        "Ɔ",
        "Ɛ",
        "À"
      ],
      "shortTimePattern": "H:m",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "AD"
      ],
      "abbreviatedEraNames": [
        "AD"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MM yyyy"
        ],
        "D": [
          "dddd, d MMM yyyy",
          "d MMM yyyy"
        ],
        "t": [
          "H:m"
        ],
        "T": [
          "H:m:s"
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