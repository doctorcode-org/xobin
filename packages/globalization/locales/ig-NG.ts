// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ig", 
    lcid: 1136, 
    name: "ig-NG", 
    nativeName: "Asụsụ Igbo (Naịjịrịa)", 
    englishName: "Igbo (Nigeria)", 
    twoLetterISOLanguageName: "ig", 
    threeLetterISOLanguageName: "ibo", 
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
        currencySymbol: "₦", 
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
        "Sọn",
        "Mọn",
        "Tiu",
        "Wen",
        "Tọọ",
        "Fraị",
        "Sat"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jen",
        "Feb",
        "Maa",
        "Epr",
        "Mee",
        "Juu",
        "Jul",
        "Ọgọ",
        "Sep",
        "Ọkt",
        "Nov",
        "Dis",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jen",
        "Feb",
        "Maa",
        "Epr",
        "Mee",
        "Juu",
        "Jul",
        "Ọgọ",
        "Sep",
        "Ọkt",
        "Nov",
        "Dis",
        ""
      ],
      "amDesignator": "N’ụtụtụ",
      "dateSeparator": "/",
      "dayNames": [
        "Sọndee",
        "Mọnde",
        "Tiuzdee",
        "Wenezdee",
        "Tọọzdee",
        "Fraịdee",
        "Satọdee"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Jenụwarị",
        "Febrụwarị",
        "Maachị",
        "Epreel",
        "Mee",
        "Juun",
        "Julaị",
        "Ọgọọst",
        "Septemba",
        "Ọktoba",
        "Novemba",
        "Disemba",
        ""
      ],
      "monthNames": [
        "Jenụwarị",
        "Febrụwarị",
        "Maachị",
        "Epreel",
        "Mee",
        "Juun",
        "Julaị",
        "Ọgọọst",
        "Septemba",
        "Ọktoba",
        "Novemba",
        "Disemba",
        ""
      ],
      "nativeCalendarName": "Kalenda Gregory",
      "pmDesignator": "N’abali",
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
        "A.K."
      ],
      "abbreviatedEraNames": [
        "A.K."
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
          "d MMMM"
        ],
        "M": [
          "d MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};