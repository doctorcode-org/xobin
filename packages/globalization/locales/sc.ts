// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    "parent": "",
    "lcid": 4096,
    "name": "sc",
    "nativeName": "sardu",
    "englishName": "Sardinian",
    "twoLetterISOLanguageName": "sc",
    "threeLetterISOLanguageName": "srd",
    "listSeparator": ",",
    "isRightToLeft": false,
    "isNeutralCulture": true,
    "numberFormat": {
        "currencyDecimalDigits": 2,
        "currencyDecimalSeparator": ",",
        "currencyGroupSizes": [
            3
        ],
        "numberGroupSizes": [
            3
        ],
        "percentGroupSizes": [
            3
        ],
        "currencyGroupSeparator": ".",
        "currencySymbol": "¤",
        "naNSymbol": "NaN",
        "currencyNegativePattern": 8,
        "numberNegativePattern": 1,
        "percentPositivePattern": 1,
        "percentNegativePattern": 1,
        "negativeInfinitySymbol": "-∞",
        "negativeSign": "-",
        "numberDecimalDigits": 3,
        "numberDecimalSeparator": ",",
        "numberGroupSeparator": ".",
        "currencyPositivePattern": 3,
        "positiveInfinitySymbol": "∞",
        "positiveSign": "+",
        "percentDecimalDigits": 3,
        "percentDecimalSeparator": ",",
        "percentGroupSeparator": ".",
        "percentSymbol": "%",
        "perMilleSymbol": "‰",
        "nativeDigits": [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ],
        "digitSubstitution": 1
    },
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "dom",
        "lun",
        "mar",
        "mèr",
        "giò",
        "che",
        "sàb"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ghe",
        "fre",
        "mar",
        "abr",
        "maj",
        "làm",
        "trì",
        "aus",
        "cab",
        "stG",
        "stA",
        "nad",
        ""
      ],
      "abbreviatedMonthNames": [
        "ghe",
        "fre",
        "mar",
        "abr",
        "maj",
        "làm",
        "trì",
        "aus",
        "cab",
        "stG",
        "stA",
        "nad",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "domìniga",
        "lunis",
        "martis",
        "mèrcuris",
        "giòbia",
        "chenàbura",
        "sàbadu"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd d 'de' MMMM 'de' 'su' yyyy HH:mm:ss",
      "longDatePattern": "dddd d 'de' MMMM 'de' 'su' yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d 'de' MMMM",
      "monthGenitiveNames": [
        "ghennàrgiu",
        "freàrgiu",
        "martzu",
        "abrile",
        "maju",
        "làmpadas",
        "trìulas",
        "austu",
        "cabudanni",
        "santugaine",
        "santandria",
        "nadale",
        ""
      ],
      "monthNames": [
        "ghennàrgiu",
        "freàrgiu",
        "martzu",
        "abrile",
        "maju",
        "làmpadas",
        "trìulas",
        "austu",
        "cabudanni",
        "santugaine",
        "santandria",
        "nadale",
        ""
      ],
      "nativeCalendarName": "calendàriu gregorianu",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "D",
        "L",
        "M",
        "M",
        "G",
        "C",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM 'de' 'su' yyyy",
      "eraNames": [
        "p.C."
      ],
      "abbreviatedEraNames": [
        "p.C."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d 'de' MMM yyyy"
        ],
        "D": [
          "dddd d 'de' MMMM 'de' 'su' yyyy",
          "d 'de' MMMM 'de' 'su' yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM 'de' 'su' yyyy"
        ],
        "Y": [
          "MMMM 'de' 'su' yyyy"
        ],
        "m": [
          "d 'de' MMMM"
        ],
        "M": [
          "d 'de' MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};
