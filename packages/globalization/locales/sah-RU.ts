// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sah", 
    lcid: 1157, 
    name: "sah-RU", 
    nativeName: "Саха (Россия)", 
    englishName: "Sakha (Russia)", 
    twoLetterISOLanguageName: "sah", 
    threeLetterISOLanguageName: "sah", 
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
        currencySymbol: "₽", 
        naNSymbol: "чыыһыла буотах", 
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
        "бс",
        "бн",
        "оп",
        "сэ",
        "чп",
        "бэ",
        "сб"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Тохс",
        "Олун",
        "Клн",
        "Мсу",
        "Ыам",
        "Бэс",
        "Отй",
        "Атр",
        "Блҕ",
        "Алт",
        "Сэт",
        "Ахс",
        ""
      ],
      "abbreviatedMonthNames": [
        "Тохс",
        "Олун",
        "Клн",
        "Мсу",
        "Ыам",
        "Бэс",
        "Отй",
        "Атр",
        "Блҕ",
        "Алт",
        "Сэт",
        "Ахс",
        ""
      ],
      "amDesignator": "ЭИ",
      "dateSeparator": "/",
      "dayNames": [
        "баскыһыанньа",
        "бэнидиэнньик",
        "оптуорунньук",
        "сэрэдэ",
        "чэппиэр",
        "Бээтиҥсэ",
        "субуота"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "yyyy 'сыл' MMMM d 'күнэ', dddd HH:mm:ss",
      "longDatePattern": "yyyy 'сыл' MMMM d 'күнэ', dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Тохсунньу",
        "Олунньу",
        "Кулун тутар",
        "Муус устар",
        "Ыам ыйын",
        "Бэс ыйын",
        "От ыйын",
        "Атырдьых ыйын",
        "Балаҕан ыйын",
        "Алтынньы",
        "Сэтинньи",
        "ахсынньы",
        ""
      ],
      "monthNames": [
        "тохсунньу",
        "олунньу",
        "кулун тутар",
        "муус устар",
        "ыам ыйа",
        "бэс ыйа",
        "от ыйа",
        "атырдьых ыйа",
        "балаҕан ыйа",
        "алтынньы",
        "сэтинньи",
        "ахсынньы",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "ЭК",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy/M/d",
      "shortestDayNames": [
        "Б",
        "Б",
        "О",
        "С",
        "Ч",
        "Б",
        "С"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "б. э"
      ],
      "abbreviatedEraNames": [
        "б. э"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy/M/d",
          "yyyy, MMM d",
          "yyyy-MM-dd",
          "yy/M/d"
        ],
        "D": [
          "yyyy 'сыл' MMMM d 'күнэ', dddd",
          "yyyy, MMMM d"
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