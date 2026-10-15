// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "shi-Latn", 
    lcid: 4096, 
    name: "shi-Latn-MA", 
    nativeName: "Tashelḥiyt (lmɣrib)", 
    englishName: "Tachelhit (Latin, Morocco)", 
    twoLetterISOLanguageName: "shi", 
    threeLetterISOLanguageName: "shi", 
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
        currencySymbol: "MAD", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 1, 
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
        "asa",
        "ayn",
        "asi",
        "akṛ",
        "akw",
        "asim",
        "asiḍ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "inn",
        "bṛa",
        "maṛ",
        "ibr",
        "may",
        "yun",
        "yul",
        "ɣuc",
        "cut",
        "ktu",
        "nuw",
        "duj",
        ""
      ],
      "abbreviatedMonthNames": [
        "inn",
        "bṛa",
        "maṛ",
        "ibr",
        "may",
        "yun",
        "yul",
        "ɣuc",
        "cut",
        "ktu",
        "nuw",
        "duj",
        ""
      ],
      "amDesignator": "tifawt",
      "dateSeparator": "/",
      "dayNames": [
        "asamas",
        "aynas",
        "asinas",
        "akṛas",
        "akwas",
        "asimwas",
        "asiḍyas"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "innayr",
        "bṛayṛ",
        "maṛṣ",
        "ibrir",
        "mayyu",
        "yunyu",
        "yulyuz",
        "ɣuct",
        "cutanbir",
        "ktubr",
        "nuwanbir",
        "dujanbir",
        ""
      ],
      "monthNames": [
        "innayr",
        "bṛayṛ",
        "maṛṣ",
        "ibrir",
        "mayyu",
        "yunyu",
        "yulyuz",
        "ɣuct",
        "cutanbir",
        "ktubr",
        "nuwanbir",
        "dujanbir",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "tadggʷat",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "dfɛ"
      ],
      "abbreviatedEraNames": [
        "dfɛ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM, yyyy"
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