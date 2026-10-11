// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "kk", 
    lcid: 1087, 
    name: "kk-KZ", 
    nativeName: "қазақ тілі (Қазақстан)", 
    englishName: "Kazakh (Kazakhstan)", 
    twoLetterISOLanguageName: "kk", 
    threeLetterISOLanguageName: "kaz", 
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
        currencySymbol: "₸", 
        naNSymbol: "сан емес", 
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
        "жс",
        "дс",
        "сс",
        "ср",
        "бс",
        "жм",
        "сб"
      ],
      "abbreviatedMonthGenitiveNames": [
        "қаң.",
        "ақп.",
        "нау.",
        "сәу.",
        "мам.",
        "мау.",
        "шіл.",
        "там.",
        "қыр.",
        "қаз.",
        "қар.",
        "жел.",
        ""
      ],
      "abbreviatedMonthNames": [
        "қаң.",
        "ақп.",
        "нау.",
        "сәу.",
        "мам.",
        "мау.",
        "шіл.",
        "там.",
        "қыр.",
        "қаз.",
        "қар.",
        "жел.",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ".",
      "dayNames": [
        "жексенбі",
        "дүйсенбі",
        "сейсенбі",
        "сәрсенбі",
        "бейсенбі",
        "жұма",
        "сенбі"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy 'ж'. d MMMM, dddd HH:mm:ss",
      "longDatePattern": "yyyy 'ж'. d MMMM, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "қаңтар",
        "ақпан",
        "наурыз",
        "сәуір",
        "мамыр",
        "маусым",
        "шілде",
        "тамыз",
        "қыркүйек",
        "қазан",
        "қараша",
        "желтоқсан",
        ""
      ],
      "monthNames": [
        "Қаңтар",
        "Ақпан",
        "Наурыз",
        "Сәуір",
        "Мамыр",
        "Маусым",
        "Шілде",
        "Тамыз",
        "Қыркүйек",
        "Қазан",
        "Қараша",
        "Желтоқсан",
        ""
      ],
      "nativeCalendarName": "Грегориандық күнтізбе",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "Ж",
        "Д",
        "С",
        "С",
        "Б",
        "Ж",
        "С"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy 'ж'. MMMM",
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
          "dd.MM.yyyy",
          "yyyy 'ж'. dd MMM",
          "dd.MM.yy"
        ],
        "D": [
          "yyyy 'ж'. d MMMM, dddd",
          "yyyy 'ж'. d MMMM"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy 'ж'. MMMM"
        ],
        "Y": [
          "yyyy 'ж'. MMMM"
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