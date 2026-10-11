// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "lt", 
    lcid: 1063, 
    name: "lt-LT", 
    nativeName: "lietuvių (Lietuva)", 
    englishName: "Lithuanian (Lithuania)", 
    twoLetterISOLanguageName: "lt", 
    threeLetterISOLanguageName: "lit", 
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
        currencySymbol: "€", 
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
        "sk",
        "pr",
        "an",
        "tr",
        "kt",
        "pn",
        "št"
      ],
      "abbreviatedMonthGenitiveNames": [
        "saus.",
        "vas.",
        "kov.",
        "bal.",
        "geg.",
        "birž.",
        "liep.",
        "rugp.",
        "rugs.",
        "spal.",
        "lapkr.",
        "gruod.",
        ""
      ],
      "abbreviatedMonthNames": [
        "saus.",
        "vas.",
        "kov.",
        "bal.",
        "geg.",
        "birž.",
        "liep.",
        "rugp.",
        "rugs.",
        "spal.",
        "lapkr.",
        "gruod.",
        ""
      ],
      "amDesignator": "priešpiet",
      "dateSeparator": "-",
      "dayNames": [
        "sekmadienis",
        "pirmadienis",
        "antradienis",
        "trečiadienis",
        "ketvirtadienis",
        "penktadienis",
        "šeštadienis"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "yyyy 'm'. MMMM d 'd'., dddd HH:mm:ss",
      "longDatePattern": "yyyy 'm'. MMMM d 'd'., dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d 'd'.",
      "monthGenitiveNames": [
        "sausio",
        "vasario",
        "kovo",
        "balandžio",
        "gegužės",
        "birželio",
        "liepos",
        "rugpjūčio",
        "rugsėjo",
        "spalio",
        "lapkričio",
        "gruodžio",
        ""
      ],
      "monthNames": [
        "sausis",
        "vasaris",
        "kovas",
        "balandis",
        "gegužė",
        "birželis",
        "liepa",
        "rugpjūtis",
        "rugsėjis",
        "spalis",
        "lapkritis",
        "gruodis",
        ""
      ],
      "nativeCalendarName": "Grigaliaus kalendorius",
      "pmDesignator": "popiet",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "P",
        "A",
        "T",
        "K",
        "P",
        "Š"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy 'm'. MMMM",
      "eraNames": [
        "po Kr."
      ],
      "abbreviatedEraNames": [
        "po Kr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd"
        ],
        "D": [
          "yyyy 'm'. MMMM d 'd'., dddd",
          "yyyy 'm'. MMMM d 'd'."
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy 'm'. MMMM"
        ],
        "Y": [
          "yyyy 'm'. MMMM"
        ],
        "m": [
          "MMMM d 'd'."
        ],
        "M": [
          "MMMM d 'd'."
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};