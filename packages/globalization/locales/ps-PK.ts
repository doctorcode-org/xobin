// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ps", 
    lcid: 4096, 
    name: "ps-PK", 
    nativeName: "پښتو (پاکستان)", 
    englishName: "Pashto (Pakistan)", 
    twoLetterISOLanguageName: "ps", 
    threeLetterISOLanguageName: "pus", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "Rs", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "‎-‎∞",
        negativeSign: "‎-‎",
        numberDecimalDigits: 2, 
        numberDecimalSeparator: "٫",
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "‎+‎",
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: ".", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "يونۍ",
        "دونۍ",
        "درېنۍ",
        "څلرنۍ",
        "پينځنۍ",
        "جمعه",
        "اونۍ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "جنوري",
        "فبروري",
        "مارچ",
        "اپریل",
        "مۍ",
        "جون",
        "جولای",
        "اګست",
        "سېپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "abbreviatedMonthNames": [
        "جنوري",
        "فبروري",
        "مارچ",
        "اپریل",
        "مۍ",
        "جون",
        "جولای",
        "اګست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "amDesignator": "غ.م.",
      "dateSeparator": "/",
      "dayNames": [
        "يونۍ",
        "دونۍ",
        "درېنۍ",
        "څلرنۍ",
        "پينځنۍ",
        "جمعه",
        "اونۍ"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd د yyyy د MMMM d h:mm:ss tt",
      "longDatePattern": "dddd د yyyy د MMMM d",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "جنوري",
        "فبروري",
        "مارچ",
        "اپریل",
        "مۍ",
        "جون",
        "جولای",
        "اګست",
        "سېپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "monthNames": [
        "جنوري",
        "فېبروري",
        "مارچ",
        "اپریل",
        "مۍ",
        "جون",
        "جولای",
        "اګست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "nativeCalendarName": "ګريګورين جنتري",
      "pmDesignator": "غ.و.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy/M/d",
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
        "م."
      ],
      "abbreviatedEraNames": [
        "م."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy/M/d",
          "yyyy MMM d",
          "yyyy-MM-dd"
        ],
        "D": [
          "dddd د yyyy د MMMM d",
          "د yyyy د MMMM d"
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