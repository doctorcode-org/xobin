// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 34, 
    name: "uk", 
    nativeName: "українська", 
    englishName: "Ukrainian", 
    twoLetterISOLanguageName: "uk", 
    threeLetterISOLanguageName: "ukr", 
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
        currencySymbol: "₴", 
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
        "січ.",
        "лют.",
        "бер.",
        "квіт.",
        "трав.",
        "черв.",
        "лип.",
        "серп.",
        "вер.",
        "жовт.",
        "лист.",
        "груд.",
        ""
      ],
      "abbreviatedMonthNames": [
        "січ",
        "лют",
        "бер",
        "кві",
        "тра",
        "чер",
        "лип",
        "сер",
        "вер",
        "жов",
        "лис",
        "гру",
        ""
      ],
      "amDesignator": "дп",
      "dateSeparator": ".",
      "dayNames": [
        "неділя",
        "понеділок",
        "вівторок",
        "середа",
        "четвер",
        "пʼятниця",
        "субота"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy 'р'. HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy 'р'.",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "січня",
        "лютого",
        "березня",
        "квітня",
        "травня",
        "червня",
        "липня",
        "серпня",
        "вересня",
        "жовтня",
        "листопада",
        "грудня",
        ""
      ],
      "monthNames": [
        "січень",
        "лютий",
        "березень",
        "квітень",
        "травень",
        "червень",
        "липень",
        "серпень",
        "вересень",
        "жовтень",
        "листопад",
        "грудень",
        ""
      ],
      "nativeCalendarName": "григоріанський календар",
      "pmDesignator": "пп",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "Н",
        "П",
        "В",
        "С",
        "Ч",
        "П",
        "С"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy 'р'.",
      "eraNames": [
        "н. е."
      ],
      "abbreviatedEraNames": [
        "н.е."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d MMM yyyy 'р'.",
          "dd.MM.yy"
        ],
        "D": [
          "dddd, d MMMM yyyy 'р'.",
          "d MMMM yyyy 'р'."
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM yyyy 'р'."
        ],
        "Y": [
          "MMMM yyyy 'р'."
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