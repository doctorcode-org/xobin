// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ti", 
    lcid: 1139, 
    name: "ti-ET", 
    nativeName: "ትግርኛ (ኢትዮጵያ)", 
    englishName: "Tigrinya (Ethiopia)", 
    twoLetterISOLanguageName: "ti", 
    threeLetterISOLanguageName: "tir", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Br", 
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
        "ሰን",
        "ሰኑ",
        "ሰሉ",
        "ረቡ",
        "ሓሙ",
        "ዓር",
        "ቀዳ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ጥሪ",
        "ለካ",
        "መጋ",
        "ሚያ",
        "ግን",
        "ሰነ",
        "ሓም",
        "ነሓ",
        "መስ",
        "ጥቅ",
        "ሕዳ",
        "ታሕ",
        ""
      ],
      "abbreviatedMonthNames": [
        "ጥሪ",
        "ለካ",
        "መጋ",
        "ሚያ",
        "ግን",
        "ሰነ",
        "ሓም",
        "ነሓ",
        "መስ",
        "ጥቅ",
        "ሕዳ",
        "ታሕ",
        ""
      ],
      "amDesignator": "ቅ.ቀ.",
      "dateSeparator": "/",
      "dayNames": [
        "ሰንበት",
        "ሰኑይ",
        "ሰሉስ",
        "ረቡዕ",
        "ሓሙስ",
        "ዓርቢ",
        "ቀዳም"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd፣ d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd፣ d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "ጥሪ",
        "ለካቲት",
        "መጋቢት",
        "ሚያዝያ",
        "ግንቦት",
        "ሰነ",
        "ሓምለ",
        "ነሓሰ",
        "መስከረም",
        "ጥቅምቲ",
        "ሕዳር",
        "ታሕሳስ",
        ""
      ],
      "monthNames": [
        "ጥሪ",
        "ለካቲት",
        "መጋቢት",
        "ሚያዝያ",
        "ግንቦት",
        "ሰነ",
        "ሓምለ",
        "ነሓሰ",
        "መስከረም",
        "ጥቅምቲ",
        "ሕዳር",
        "ታሕሳስ",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "ድ.ቀ.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "ሰ",
        "ሰ",
        "ሰ",
        "ረ",
        "ሓ",
        "ዓ",
        "ቀ"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ዓ/ም"
      ],
      "abbreviatedEraNames": [
        "ዓ/ም"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy",
          "dd/MM/yy"
        ],
        "D": [
          "dddd፣ d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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