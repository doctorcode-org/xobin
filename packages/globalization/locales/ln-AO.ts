// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ln", 
    lcid: 4096, 
    name: "ln-AO", 
    nativeName: "lingála (Angóla)", 
    englishName: "Lingala (Angola)", 
    twoLetterISOLanguageName: "ln", 
    threeLetterISOLanguageName: "lin", 
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
        currencySymbol: "Kz", 
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
        "eye",
        "ybo",
        "mbl",
        "mst",
        "min",
        "mtn",
        "mps"
      ],
      "abbreviatedMonthGenitiveNames": [
        "yan",
        "fbl",
        "msi",
        "apl",
        "mai",
        "yun",
        "yul",
        "agt",
        "stb",
        "ɔtb",
        "nvb",
        "dsb",
        ""
      ],
      "abbreviatedMonthNames": [
        "yan",
        "fbl",
        "msi",
        "apl",
        "mai",
        "yun",
        "yul",
        "agt",
        "stb",
        "ɔtb",
        "nvb",
        "dsb",
        ""
      ],
      "amDesignator": "ntɔ́ngɔ́",
      "dateSeparator": "/",
      "dayNames": [
        "eyenga",
        "mokɔlɔ mwa yambo",
        "mokɔlɔ mwa míbalé",
        "mokɔlɔ mwa mísáto",
        "mokɔlɔ ya mínéi",
        "mokɔlɔ ya mítáno",
        "mpɔ́sɔ"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "sánzá ya yambo",
        "sánzá ya míbalé",
        "sánzá ya mísáto",
        "sánzá ya mínei",
        "sánzá ya mítáno",
        "sánzá ya motóbá",
        "sánzá ya nsambo",
        "sánzá ya mwambe",
        "sánzá ya libwa",
        "sánzá ya zómi",
        "sánzá ya zómi na mɔ̌kɔ́",
        "sánzá ya zómi na míbalé",
        ""
      ],
      "monthNames": [
        "sánzá ya yambo",
        "sánzá ya míbalé",
        "sánzá ya mísáto",
        "sánzá ya mínei",
        "sánzá ya mítáno",
        "sánzá ya motóbá",
        "sánzá ya nsambo",
        "sánzá ya mwambe",
        "sánzá ya libwa",
        "sánzá ya zómi",
        "sánzá ya zómi na mɔ̌kɔ́",
        "sánzá ya zómi na míbalé",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "mpókwa",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "e",
        "y",
        "m",
        "m",
        "m",
        "m",
        "p"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "nsima ya Y"
      ],
      "abbreviatedEraNames": [
        "nsima ya Y"
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