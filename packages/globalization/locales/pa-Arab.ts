// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "pa", 
    lcid: 31814, 
    name: "pa-Arab", 
    nativeName: "پنجابی", 
    englishName: "Punjabi", 
    twoLetterISOLanguageName: "pa", 
    threeLetterISOLanguageName: "pan", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Rs", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 2, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "‎-‎∞",
        negativeSign: "‎-‎",
        numberDecimalDigits: 2, 
        numberDecimalSeparator: "٫",
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "‎+‎",
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "اتوار",
        "پیر",
        "منگل",
        "بُدھ",
        "جمعرات",
        "جمعہ",
        "ہفتہ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئ",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "abbreviatedMonthNames": [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئ",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "اتوار",
        "پیر",
        "منگل",
        "بُدھ",
        "جمعرات",
        "جمعہ",
        "ہفتہ"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, dd MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, dd MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئ",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "monthNames": [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئ",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "سں"
      ],
      "abbreviatedEraNames": [
        "سں"
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
          "dddd, dd MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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