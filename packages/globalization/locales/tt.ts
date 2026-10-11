// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 68, 
    name: "tt", 
    nativeName: "Татар", 
    englishName: "Tatar", 
    twoLetterISOLanguageName: "tt", 
    threeLetterISOLanguageName: "tat", 
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
        currencySymbol: "₽", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
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
        "якш.",
        "дүш.",
        "сиш.",
        "чәр.",
        "пәнҗ.",
        "җом.",
        "шим."
      ],
      "abbreviatedMonthGenitiveNames": [
        "гыйн.",
        "фев.",
        "мар.",
        "апр.",
        "май",
        "июнь",
        "июль",
        "авг.",
        "сент.",
        "окт.",
        "нояб.",
        "дек.",
        ""
      ],
      "abbreviatedMonthNames": [
        "гыйн.",
        "фев.",
        "мар.",
        "апр.",
        "май",
        "июнь",
        "июль",
        "авг.",
        "сент.",
        "окт.",
        "нояб.",
        "дек.",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ".",
      "dayNames": [
        "якшәмбе",
        "дүшәмбе",
        "сишәмбе",
        "чәршәмбе",
        "пәнҗешәмбе",
        "җомга",
        "шимбә"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "d MMMM, yyyy 'ел', dddd H:mm:ss",
      "longDatePattern": "d MMMM, yyyy 'ел', dddd",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "гыйнвар",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
        ""
      ],
      "monthNames": [
        "гыйнвар",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
        ""
      ],
      "nativeCalendarName": "григориан ел исәбе",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "Я",
        "Д",
        "С",
        "Ч",
        "П",
        "Җ",
        "Ш"
      ],
      "shortTimePattern": "H:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy 'ел', MMMM",
      "eraNames": [
        "милади"
      ],
      "abbreviatedEraNames": [
        "милади"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d MMM, yyyy 'ел'"
        ],
        "D": [
          "d MMMM, yyyy 'ел', dddd",
          "d MMMM, yyyy 'ел'"
        ],
        "t": [
          "H:mm"
        ],
        "T": [
          "H:mm:ss"
        ],
        "y": [
          "yyyy 'ел', MMMM"
        ],
        "Y": [
          "yyyy 'ел', MMMM"
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