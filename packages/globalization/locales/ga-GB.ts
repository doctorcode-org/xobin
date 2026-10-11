// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    "parent": "ga",
    "lcid": 4096,
    "name": "ga-GB",
    "nativeName": "Gaeilge (an Ríocht Aontaithe)",
    "englishName": "Irish (United Kingdom)",
    "twoLetterISOLanguageName": "ga",
    "threeLetterISOLanguageName": "gle",
    "listSeparator": ",",
    "isRightToLeft": false,
    "isNeutralCulture": false,
    "numberFormat": {
        "currencyDecimalDigits": 2,
        "currencyDecimalSeparator": ".",
        "currencyGroupSizes": [
            3
        ],
        "numberGroupSizes": [
            3
        ],
        "percentGroupSizes": [
            3
        ],
        "currencyGroupSeparator": ",",
        "currencySymbol": "£",
        "naNSymbol": "Nuimh",
        "currencyNegativePattern": 1,
        "numberNegativePattern": 1,
        "percentPositivePattern": 1,
        "percentNegativePattern": 1,
        "negativeInfinitySymbol": "-∞",
        "negativeSign": "-",
        "numberDecimalDigits": 3,
        "numberDecimalSeparator": ".",
        "numberGroupSeparator": ",",
        "currencyPositivePattern": 0,
        "positiveInfinitySymbol": "∞",
        "positiveSign": "+",
        "percentDecimalDigits": 3,
        "percentDecimalSeparator": ".",
        "percentGroupSeparator": ",",
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
        "Domh",
        "Luan",
        "Máirt",
        "Céad",
        "Déar",
        "Aoine",
        "Sath"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Ean",
        "Feabh",
        "Márta",
        "Aib",
        "Beal",
        "Meith",
        "Iúil",
        "Lún",
        "MFómh",
        "DFómh",
        "Samh",
        "Noll",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ean",
        "Feabh",
        "Márta",
        "Aib",
        "Beal",
        "Meith",
        "Iúil",
        "Lún",
        "MFómh",
        "DFómh",
        "Samh",
        "Noll",
        ""
      ],
      "amDesignator": "r.n.",
      "dateSeparator": "/",
      "dayNames": [
        "Dé Domhnaigh",
        "Dé Luain",
        "Dé Máirt",
        "Dé Céadaoin",
        "Déardaoin",
        "Dé hAoine",
        "Dé Sathairn"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Eanáir",
        "Feabhra",
        "Márta",
        "Aibreán",
        "Bealtaine",
        "Meitheamh",
        "Iúil",
        "Lúnasa",
        "Meán Fómhair",
        "Deireadh Fómhair",
        "Samhain",
        "Nollaig",
        ""
      ],
      "monthNames": [
        "Eanáir",
        "Feabhra",
        "Márta",
        "Aibreán",
        "Bealtaine",
        "Meitheamh",
        "Iúil",
        "Lúnasa",
        "Meán Fómhair",
        "Deireadh Fómhair",
        "Samhain",
        "Nollaig",
        ""
      ],
      "nativeCalendarName": "Féilire Ghréagóra",
      "pmDesignator": "i.n.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "D",
        "L",
        "M",
        "C",
        "D",
        "A",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "AD"
      ],
      "abbreviatedEraNames": [
        "AD"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d MMM yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};
