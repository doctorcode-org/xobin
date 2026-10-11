// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "os", 
    lcid: 4096, 
    name: "os-GE", 
    nativeName: "ирон (Гуырдзыстон)", 
    englishName: "Ossetic (Georgia)", 
    twoLetterISOLanguageName: "os", 
    threeLetterISOLanguageName: "oss", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "₾", 
        naNSymbol: "НН", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 2, 
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
        "Хцб",
        "Крс",
        "Дцг",
        "Ӕрт",
        "Цпр",
        "Мрб",
        "Сбт"
      ],
      "abbreviatedMonthGenitiveNames": [
        "янв.",
        "фев.",
        "мар.",
        "апр.",
        "майы",
        "июны",
        "июлы",
        "авг.",
        "сен.",
        "окт.",
        "ноя.",
        "дек.",
        ""
      ],
      "abbreviatedMonthNames": [
        "Янв.",
        "Февр.",
        "Март.",
        "Апр.",
        "Май",
        "Июнь",
        "Июль",
        "Авг.",
        "Сент.",
        "Окт.",
        "Нояб.",
        "Дек.",
        ""
      ],
      "amDesignator": "ӕмбисбоны размӕ",
      "dateSeparator": ".",
      "dayNames": [
        "Хуыцаубон",
        "Къуырисӕр",
        "Дыццӕг",
        "Ӕртыццӕг",
        "Цыппӕрӕм",
        "Майрӕмбон",
        "Сабат"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM, yyyy 'аз' HH:mm:ss",
      "longDatePattern": "dddd, d MMMM, yyyy 'аз'",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "январы",
        "февралы",
        "мартъийы",
        "апрелы",
        "майы",
        "июны",
        "июлы",
        "августы",
        "сентябры",
        "октябры",
        "ноябры",
        "декабры",
        ""
      ],
      "monthNames": [
        "Январь",
        "Февраль",
        "Мартъи",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
        ""
      ],
      "nativeCalendarName": "Грегориан къӕлиндар",
      "pmDesignator": "ӕмбисбоны фӕстӕ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "Х",
        "К",
        "Д",
        "Ӕ",
        "Ц",
        "М",
        "С"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "н.д."
      ],
      "abbreviatedEraNames": [
        "н.д."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "dd MMM yyyy 'аз'",
          "d.M.yyyy",
          "dd.MM.yy"
        ],
        "D": [
          "dddd, d MMMM, yyyy 'аз'",
          "d MMMM, yyyy 'аз'"
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