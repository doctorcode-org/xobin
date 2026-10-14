// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ks-Arab", 
    lcid: 4096, 
    name: "ks-Arab-IN", 
    nativeName: "کٲشُر (اَربی)", 
    englishName: "Kashmiri (Perso-Arabic)", 
    twoLetterISOLanguageName: "ks", 
    threeLetterISOLanguageName: "kas", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3, 2], 
        numberGroupSizes: [3, 2], 
        percentGroupSizes: [3, 2], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₹", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
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
        "آتھوار",
        "ژٔندٕروار",
        "بۆموار",
        "بودوار",
        "برؠسوار",
        "جُمہ",
        "بٹوار"
      ],
      "abbreviatedMonthGenitiveNames": [
        "جنؤری",
        "فرؤری",
        "مارٕچ",
        "اپریل",
        "مئی",
        "جوٗن",
        "جوٗلایی",
        "اگست",
        "ستمبر",
        "اکتوٗبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "abbreviatedMonthNames": [
        "جنؤری",
        "فرؤری",
        "مارٕچ",
        "اپریل",
        "مئی",
        "جوٗن",
        "جوٗلایی",
        "اگست",
        "ستمبر",
        "اکتوٗبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "amDesignator": "اے ایم",
      "dateSeparator": "/",
      "dayNames": [
        "اَتھوار",
        "ژٔندرٕروار",
        "بۆموار",
        "بودوار",
        "برؠسوار",
        "جُمہ",
        "بٹوار"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d, yyyy h:mm:ss tt",
      "longDatePattern": "dddd, MMMM d, yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "جنؤری",
        "فرؤری",
        "مارٕچ",
        "اپریل",
        "مئی",
        "جوٗن",
        "جوٗلایی",
        "اگست",
        "ستمبر",
        "اکتوٗبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "monthNames": [
        "جنؤری",
        "فرؤری",
        "مارٕچ",
        "اپریل",
        "مئی",
        "جوٗن",
        "جوٗلایی",
        "اگست",
        "ستمبر",
        "اکتوٗبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "nativeCalendarName": "گرگوریَن کیلنڑَر",
      "pmDesignator": "پی ایم",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "M/d/yyyy",
      "shortestDayNames": [
        "ا",
        "ژ",
        "ب",
        "ب",
        "ب",
        "ج",
        "ب"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "اے ڈی"
      ],
      "abbreviatedEraNames": [
        "اے ڈی"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "M/d/yyyy",
          "MMM d, yyyy",
          "M/d/yy"
        ],
        "D": [
          "dddd, MMMM d, yyyy",
          "MMMM d, yyyy"
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