// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "to", 
    lcid: 4096, 
    name: "to-TO", 
    nativeName: "lea fakatonga (Tonga)", 
    englishName: "Tongan (Tonga)", 
    twoLetterISOLanguageName: "to", 
    threeLetterISOLanguageName: "ton", 
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
        currencySymbol: "T$", 
        naNSymbol: "TF", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
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
        "Sāp",
        "Mōn",
        "Tūs",
        "Pul",
        "Tuʻa",
        "Fal",
        "Tok"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Sān",
        "Fēp",
        "Maʻa",
        "ʻEpe",
        "Mē",
        "Sun",
        "Siu",
        "ʻAok",
        "Sep",
        "ʻOka",
        "Nōv",
        "Tīs",
        ""
      ],
      "abbreviatedMonthNames": [
        "Sān",
        "Fēp",
        "Maʻa",
        "ʻEpe",
        "Mē",
        "Sun",
        "Siu",
        "ʻAok",
        "Sep",
        "ʻOka",
        "Nōv",
        "Tīs",
        ""
      ],
      "amDesignator": "hengihengi",
      "dateSeparator": "/",
      "dayNames": [
        "Sāpate",
        "Mōnite",
        "Tūsite",
        "Pulelulu",
        "Tuʻapulelulu",
        "Falaite",
        "Tokonaki"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Sānuali",
        "Fēpueli",
        "Maʻasi",
        "ʻEpeleli",
        "Mē",
        "Sune",
        "Siulai",
        "ʻAokosi",
        "Sepitema",
        "ʻOkatopa",
        "Nōvema",
        "Tīsema",
        ""
      ],
      "monthNames": [
        "Sānuali",
        "Fēpueli",
        "Maʻasi",
        "ʻEpeleli",
        "Mē",
        "Sune",
        "Siulai",
        "ʻAokosi",
        "Sepitema",
        "ʻOkatopa",
        "Nōvema",
        "Tīsema",
        ""
      ],
      "nativeCalendarName": "fakakelekolia",
      "pmDesignator": "efiafi",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "P",
        "T",
        "F",
        "T"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "TS"
      ],
      "abbreviatedEraNames": [
        "TS"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM yyyy",
          "d/M/yy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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