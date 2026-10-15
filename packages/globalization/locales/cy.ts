// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 82, 
    name: "cy", 
    nativeName: "Cymraeg", 
    englishName: "Welsh", 
    twoLetterISOLanguageName: "cy", 
    threeLetterISOLanguageName: "cym", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "£", 
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
        "Sul",
        "Llun",
        "Maw",
        "Mer",
        "Iau",
        "Gwe",
        "Sad"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Ion",
        "Chwef",
        "Maw",
        "Ebr",
        "Mai",
        "Meh",
        "Gorff",
        "Awst",
        "Medi",
        "Hyd",
        "Tach",
        "Rhag",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ion",
        "Chw",
        "Maw",
        "Ebr",
        "Mai",
        "Meh",
        "Gor",
        "Awst",
        "Medi",
        "Hyd",
        "Tach",
        "Rhag",
        ""
      ],
      "amDesignator": "yb",
      "dateSeparator": "/",
      "dayNames": [
        "Dydd Sul",
        "Dydd Llun",
        "Dydd Mawrth",
        "Dydd Mercher",
        "Dydd Iau",
        "Dydd Gwener",
        "Dydd Sadwrn"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Ionawr",
        "Chwefror",
        "Mawrth",
        "Ebrill",
        "Mai",
        "Mehefin",
        "Gorffennaf",
        "Awst",
        "Medi",
        "Hydref",
        "Tachwedd",
        "Rhagfyr",
        ""
      ],
      "monthNames": [
        "Ionawr",
        "Chwefror",
        "Mawrth",
        "Ebrill",
        "Mai",
        "Mehefin",
        "Gorffennaf",
        "Awst",
        "Medi",
        "Hydref",
        "Tachwedd",
        "Rhagfyr",
        ""
      ],
      "nativeCalendarName": "Calendr Gregori",
      "pmDesignator": "yh",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "Ll",
        "M",
        "M",
        "I",
        "G",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "OC"
      ],
      "abbreviatedEraNames": [
        "O"
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