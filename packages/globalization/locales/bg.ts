// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 2, 
    name: "bg", 
    nativeName: "български", 
    englishName: "Bulgarian", 
    twoLetterISOLanguageName: "bg", 
    threeLetterISOLanguageName: "bul", 
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
        currencySymbol: "лв.", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
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
        "нд",
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб"
      ],
      "abbreviatedMonthGenitiveNames": [
        "яну",
        "фев",
        "март",
        "апр",
        "май",
        "юни",
        "юли",
        "авг",
        "сеп",
        "окт",
        "ное",
        "дек",
        ""
      ],
      "abbreviatedMonthNames": [
        "яну",
        "фев",
        "март",
        "апр",
        "май",
        "юни",
        "юли",
        "авг",
        "сеп",
        "окт",
        "ное",
        "дек",
        ""
      ],
      "amDesignator": "пр.об.",
      "dateSeparator": ".",
      "dayNames": [
        "неделя",
        "понеделник",
        "вторник",
        "сряда",
        "четвъртък",
        "петък",
        "събота"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d MMMM yyyy 'г'. H:mm:ss 'ч'.",
      "longDatePattern": "dddd, d MMMM yyyy 'г'.",
      "longTimePattern": "H:mm:ss 'ч'.",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "януари",
        "февруари",
        "март",
        "април",
        "май",
        "юни",
        "юли",
        "август",
        "септември",
        "октомври",
        "ноември",
        "декември",
        ""
      ],
      "monthNames": [
        "януари",
        "февруари",
        "март",
        "април",
        "май",
        "юни",
        "юли",
        "август",
        "септември",
        "октомври",
        "ноември",
        "декември",
        ""
      ],
      "nativeCalendarName": "григориански календар",
      "pmDesignator": "сл.об.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.MM.yyyy 'г'.",
      "shortestDayNames": [
        "н",
        "п",
        "в",
        "с",
        "ч",
        "п",
        "с"
      ],
      "shortTimePattern": "H:mm 'ч'.",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy 'г'.",
      "eraNames": [
        "сл.Хр."
      ],
      "abbreviatedEraNames": [
        "сл.Хр."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.MM.yyyy 'г'.",
          "d.MM.yy 'г'."
        ],
        "D": [
          "dddd, d MMMM yyyy 'г'.",
          "d MMMM yyyy 'г'."
        ],
        "t": [
          "H:mm 'ч'."
        ],
        "T": [
          "H:mm:ss 'ч'."
        ],
        "y": [
          "MMMM yyyy 'г'."
        ],
        "Y": [
          "MMMM yyyy 'г'."
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