// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 95, 
    name: "tzm", 
    nativeName: "Tamaziɣt n laṭlaṣ", 
    englishName: "Central Atlas Tamazight", 
    twoLetterISOLanguageName: "tzm", 
    threeLetterISOLanguageName: "tzm", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "DA", 
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
        "Asa",
        "Ayn",
        "Asn",
        "Akr",
        "Akw",
        "Asm",
        "Asḍ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Yen",
        "Yeb",
        "Mar",
        "Ibr",
        "May",
        "Yun",
        "Yul",
        "Ɣuc",
        "Cut",
        "Kṭu",
        "Nwa",
        "Duj",
        ""
      ],
      "abbreviatedMonthNames": [
        "Yen",
        "Yeb",
        "Mar",
        "Ibr",
        "May",
        "Yun",
        "Yul",
        "Ɣuc",
        "Cut",
        "Kṭu",
        "Nwa",
        "Duj",
        ""
      ],
      "amDesignator": "Zdat azal",
      "dateSeparator": "/",
      "dayNames": [
        "Asamas",
        "Aynas",
        "Asinas",
        "Akras",
        "Akwas",
        "Asimwas",
        "Asiḍyas"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Yennayer",
        "Yebrayer",
        "Mars",
        "Ibrir",
        "Mayyu",
        "Yunyu",
        "Yulyuz",
        "Ɣuct",
        "Cutanbir",
        "Kṭuber",
        "Nwanbir",
        "Dujanbir",
        ""
      ],
      "monthNames": [
        "Yennayer",
        "Yebrayer",
        "Mars",
        "Ibrir",
        "Mayyu",
        "Yunyu",
        "Yulyuz",
        "Ɣuct",
        "Cutanbir",
        "Kṭuber",
        "Nwanbir",
        "Dujanbir",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "Ḍeffir aza",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ḌƐ"
      ],
      "abbreviatedEraNames": [
        "ḌƐ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
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