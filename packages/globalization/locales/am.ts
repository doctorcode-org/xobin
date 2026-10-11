// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 94, 
    name: "am", 
    nativeName: "አማርኛ", 
    englishName: "Amharic", 
    twoLetterISOLanguageName: "am", 
    threeLetterISOLanguageName: "amh", 
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
        currencySymbol: "ብር", 
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
        "እሑድ",
        "ሰኞ",
        "ማክሰ",
        "ረቡዕ",
        "ሐሙስ",
        "ዓርብ",
        "ቅዳሜ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ጃንዩ",
        "ፌብሩ",
        "ማርች",
        "ኤፕሪ",
        "ሜይ",
        "ጁን",
        "ጁላይ",
        "ኦገስ",
        "ሴፕቴ",
        "ኦክቶ",
        "ኖቬም",
        "ዲሴም",
        ""
      ],
      "abbreviatedMonthNames": [
        "ጃንዩ",
        "ፌብሩ",
        "ማርች",
        "ኤፕሪ",
        "ሜይ",
        "ጁን",
        "ጁላይ",
        "ኦገስ",
        "ሴፕቴ",
        "ኦክቶ",
        "ኖቬም",
        "ዲሴም",
        ""
      ],
      "amDesignator": "ጥዋት",
      "dateSeparator": "/",
      "dayNames": [
        "እሑድ",
        "ሰኞ",
        "ማክሰኞ",
        "ረቡዕ",
        "ሐሙስ",
        "ዓርብ",
        "ቅዳሜ"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd h:mm:ss tt",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "ጃንዩወሪ",
        "ፌብሩወሪ",
        "ማርች",
        "ኤፕሪል",
        "ሜይ",
        "ጁን",
        "ጁላይ",
        "ኦገስት",
        "ሴፕቴምበር",
        "ኦክቶበር",
        "ኖቬምበር",
        "ዲሴምበር",
        ""
      ],
      "monthNames": [
        "ጃንዩወሪ",
        "ፌብሩወሪ",
        "ማርች",
        "ኤፕሪል",
        "ሜይ",
        "ጁን",
        "ጁላይ",
        "ኦገስት",
        "ሴፕቴምበር",
        "ኦክቶበር",
        "ኖቬምበር",
        "ዲሴምበር",
        ""
      ],
      "nativeCalendarName": "የግሪጎሪያን የቀን አቆጣጠር",
      "pmDesignator": "ከሰዓት",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "እ",
        "ሰ",
        "ማ",
        "ረ",
        "ሐ",
        "ዓ",
        "ቅ"
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
          "d/M/yyyy"
        ],
        "D": [
          "yyyy MMMM d, dddd",
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
          "MMMM d"
        ],
        "M": [
          "MMMM d"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};