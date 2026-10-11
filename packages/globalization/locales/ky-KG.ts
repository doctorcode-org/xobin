// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ky", 
    lcid: 1088, 
    name: "ky-KG", 
    nativeName: "кыргызча (Кыргызстан)", 
    englishName: "Kyrgyz (Kyrgyzstan)", 
    twoLetterISOLanguageName: "ky", 
    threeLetterISOLanguageName: "kir", 
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
        currencySymbol: "сом", 
        naNSymbol: "сан эмес", 
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
        "жек.",
        "дүй.",
        "шейш.",
        "шарш.",
        "бейш.",
        "жума",
        "ишм."
      ],
      "abbreviatedMonthGenitiveNames": [
        "янв.",
        "фев.",
        "мар.",
        "апр.",
        "май",
        "июн.",
        "июл.",
        "авг.",
        "сен.",
        "окт.",
        "ноя.",
        "дек.",
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
      "amDesignator": "таңкы",
      "dateSeparator": "/",
      "dayNames": [
        "жекшемби",
        "дүйшөмбү",
        "шейшемби",
        "шаршемби",
        "бейшемби",
        "жума",
        "ишемби"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy-'ж'., d-MMMM, dddd HH:mm:ss",
      "longDatePattern": "yyyy-'ж'., d-MMMM, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d-MMMM",
      "monthGenitiveNames": [
        "январь",
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
        "Январь",
        "Февраль",
        "Март",
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
      "nativeCalendarName": "Григориан жылнаамасы",
      "pmDesignator": "түштөн кийинки",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "Ж",
        "Д",
        "Ш",
        "Ш",
        "Б",
        "Ж",
        "И"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy-'ж'., MMMM",
      "eraNames": [
        "б.з."
      ],
      "abbreviatedEraNames": [
        "б.з."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "yyyy-'ж'., d-MMM",
          "yyyy-dd-MM",
          "d/M/yy"
        ],
        "D": [
          "yyyy-'ж'., d-MMMM, dddd",
          "yyyy-'ж'., d-MMMM"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy-'ж'., MMMM"
        ],
        "Y": [
          "yyyy-'ж'., MMMM"
        ],
        "m": [
          "d-MMMM"
        ],
        "M": [
          "d-MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};