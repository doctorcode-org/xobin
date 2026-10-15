// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "tg", 
    lcid: 31784, 
    name: "tg-Cyrl", 
    nativeName: "тоҷикӣ", 
    englishName: "Tajik (Cyrillic)", 
    twoLetterISOLanguageName: "tg", 
    threeLetterISOLanguageName: "tgk", 
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
        currencySymbol: "смн", 
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
        "Яшб",
        "Дшб",
        "Сшб",
        "Чшб",
        "Пшб",
        "Ҷмъ",
        "Шнб"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
        ""
      ],
      "abbreviatedMonthNames": [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Якшанбе",
        "Душанбе",
        "Сешанбе",
        "Чоршанбе",
        "Панҷшанбе",
        "Ҷумъа",
        "Шанбе"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, dd MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, dd MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Январ",
        "Феврал",
        "Март",
        "Апрел",
        "Май",
        "Июн",
        "Июл",
        "Август",
        "Сентябр",
        "Октябр",
        "Ноябр",
        "Декабр",
        ""
      ],
      "monthNames": [
        "Январ",
        "Феврал",
        "Март",
        "Апрел",
        "Май",
        "Июн",
        "Июл",
        "Август",
        "Сентябр",
        "Октябр",
        "Ноябр",
        "Декабр",
        ""
      ],
      "nativeCalendarName": "Тақвими грегорианӣ",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "Я",
        "Д",
        "С",
        "Ч",
        "П",
        "Ҷ",
        "Ш"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ПаМ"
      ],
      "abbreviatedEraNames": [
        "ПаМ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "dd MMM yyyy",
          "d/M/yyyy",
          "dd/MM/yy"
        ],
        "D": [
          "dddd, dd MMMM yyyy",
          "dd MMMM yyyy"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};