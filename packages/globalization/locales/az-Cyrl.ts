// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "az", 
    lcid: 29740, 
    name: "az-Cyrl", 
    nativeName: "Азәрбајҹан дили", 
    englishName: "Azerbaijani (Cyrillic)", 
    twoLetterISOLanguageName: "az", 
    threeLetterISOLanguageName: "aze", 
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
        currencySymbol: "₼", 
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
        "Б.",
        "Б.Е.",
        "Ч.А.",
        "Ч.",
        "Ҹ.А.",
        "Ҹ.",
        "Ш."
      ],
      "abbreviatedMonthGenitiveNames": [
        "јан",
        "фев",
        "мар",
        "апр",
        "май",
        "ијн",
        "ијл",
        "авг",
        "сен",
        "окт",
        "ној",
        "дек",
        ""
      ],
      "abbreviatedMonthNames": [
        "јан",
        "фев",
        "мар",
        "апр",
        "май",
        "ијн",
        "ијл",
        "авг",
        "сен",
        "окт",
        "ној",
        "дек",
        ""
      ],
      "amDesignator": "АМ",
      "dateSeparator": ".",
      "dayNames": [
        "базар",
        "базар ертәси",
        "чәршәнбә ахшамы",
        "чәршәнбә",
        "ҹүмә ахшамы",
        "ҹүмә",
        "шәнбә"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "d MMMM yyyy, dddd HH:mm:ss",
      "longDatePattern": "d MMMM yyyy, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "јанвар",
        "феврал",
        "март",
        "апрел",
        "май",
        "ијун",
        "ијул",
        "август",
        "сентјабр",
        "октјабр",
        "нојабр",
        "декабр",
        ""
      ],
      "monthNames": [
        "Јанвар",
        "Феврал",
        "Март",
        "Апрел",
        "Май",
        "Ијун",
        "Ијул",
        "Август",
        "Сентјабр",
        "Октјабр",
        "Нојабр",
        "Декабр",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "ПМ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "7",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "ј.е."
      ],
      "abbreviatedEraNames": [
        "ј.е."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d MMM yyyy",
          "dd.MM.yy"
        ],
        "D": [
          "d MMMM yyyy, dddd",
          "d MMMM yyyy"
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