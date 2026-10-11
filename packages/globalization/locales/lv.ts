// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 38, 
    name: "lv", 
    nativeName: "latviešu", 
    englishName: "Latvian", 
    twoLetterISOLanguageName: "lv", 
    threeLetterISOLanguageName: "lav", 
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
        currencySymbol: "€", 
        naNSymbol: "NS", 
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
        "Svētd.",
        "Pirmd.",
        "Otrd.",
        "Trešd.",
        "Ceturtd.",
        "Piektd.",
        "Sestd."
      ],
      "abbreviatedMonthGenitiveNames": [
        "janv.",
        "febr.",
        "marts",
        "apr.",
        "maijs",
        "jūn.",
        "jūl.",
        "aug.",
        "sept.",
        "okt.",
        "nov.",
        "dec.",
        ""
      ],
      "abbreviatedMonthNames": [
        "janv.",
        "febr.",
        "marts",
        "apr.",
        "maijs",
        "jūn.",
        "jūl.",
        "aug.",
        "sept.",
        "okt.",
        "nov.",
        "dec.",
        ""
      ],
      "amDesignator": "priekšpusdienā",
      "dateSeparator": ".",
      "dayNames": [
        "Svētdiena",
        "Pirmdiena",
        "Otrdiena",
        "Trešdiena",
        "Ceturtdiena",
        "Piektdiena",
        "Sestdiena"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, yyyy. 'gada' d. MMMM HH:mm:ss",
      "longDatePattern": "dddd, yyyy. 'gada' d. MMMM",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "janvāris",
        "februāris",
        "marts",
        "aprīlis",
        "maijs",
        "jūnijs",
        "jūlijs",
        "augusts",
        "septembris",
        "oktobris",
        "novembris",
        "decembris",
        ""
      ],
      "monthNames": [
        "janvāris",
        "februāris",
        "marts",
        "aprīlis",
        "maijs",
        "jūnijs",
        "jūlijs",
        "augusts",
        "septembris",
        "oktobris",
        "novembris",
        "decembris",
        ""
      ],
      "nativeCalendarName": "Gregora kalendārs",
      "pmDesignator": "pēcpusdienā",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "S",
        "P",
        "O",
        "T",
        "C",
        "P",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy. 'g'. MMMM",
      "eraNames": [
        "m.ē."
      ],
      "abbreviatedEraNames": [
        "m.ē."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "yyyy. 'gada' d. MMM",
          "d.MM.yyyy.",
          "dd.MM.yy"
        ],
        "D": [
          "dddd, yyyy. 'gada' d. MMMM",
          "yyyy. 'gada' d. MMMM"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy. 'g'. MMMM"
        ],
        "Y": [
          "yyyy. 'g'. MMMM"
        ],
        "m": [
          "d. MMMM"
        ],
        "M": [
          "d. MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};