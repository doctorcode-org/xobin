// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ug", 
    lcid: 1152, 
    name: "ug-CN", 
    nativeName: "ئۇيغۇرچە (جۇڭخۇا خەلق جۇمھۇرىيىتى)", 
    englishName: "Uyghur (China)", 
    twoLetterISOLanguageName: "ug", 
    threeLetterISOLanguageName: "uig", 
    listSeparator: ",", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "¥", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
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
        "يە",
        "دۈ",
        "سە",
        "چا",
        "پە",
        "جۈ",
        "شە"
      ],
      "abbreviatedMonthGenitiveNames": [
        "يانۋار",
        "فېۋرال",
        "مارت",
        "ئاپرېل",
        "ماي",
        "ئىيۇن",
        "ئىيۇل",
        "ئاۋغۇست",
        "سېنتەبىر",
        "ئۆكتەبىر",
        "نويابىر",
        "دېكابىر",
        ""
      ],
      "abbreviatedMonthNames": [
        "يانۋار",
        "فېۋرال",
        "مارت",
        "ئاپرېل",
        "ماي",
        "ئىيۇن",
        "ئىيۇل",
        "ئاۋغۇست",
        "سېنتەبىر",
        "ئۆكتەبىر",
        "نويابىر",
        "دېكابىر",
        ""
      ],
      "amDesignator": "چۈشتىن بۇرۇن",
      "dateSeparator": "-",
      "dayNames": [
        "يەكشەنبە",
        "دۈشەنبە",
        "سەيشەنبە",
        "چارشەنبە",
        "پەيشەنبە",
        "جۈمە",
        "شەنبە"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy d-MMMM، dddd HH:mm:ss",
      "longDatePattern": "yyyy d-MMMM، dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d-MMMM",
      "monthGenitiveNames": [
        "يانۋار",
        "فېۋرال",
        "مارت",
        "ئاپرېل",
        "ماي",
        "ئىيۇن",
        "ئىيۇل",
        "ئاۋغۇست",
        "سېنتەبىر",
        "ئۆكتەبىر",
        "نويابىر",
        "دېكابىر",
        ""
      ],
      "monthNames": [
        "يانۋار",
        "فېۋرال",
        "مارت",
        "ئاپرېل",
        "ماي",
        "ئىيۇن",
        "ئىيۇل",
        "ئاۋغۇست",
        "سېنتەبىر",
        "ئۆكتەبىر",
        "نويابىر",
        "دېكابىر",
        ""
      ],
      "nativeCalendarName": "مىلادىيە يىلنامەسى",
      "pmDesignator": "چۈشتىن كېيىن",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "ي",
        "د",
        "س",
        "چ",
        "پ",
        "ج",
        "ش"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "مىلادىيە"
      ],
      "abbreviatedEraNames": [
        "مىلادىيە"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd",
          "d-MMM، yyyy",
          "yyyy-d-M"
        ],
        "D": [
          "yyyy d-MMMM، dddd",
          "d-MMMM، yyyy"
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
          "d-MMMM"
        ],
        "M": [
          "d-MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};