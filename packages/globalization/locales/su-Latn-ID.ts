// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    "parent": "su-Latn",
    "lcid": 4096,
    "name": "su-Latn-ID",
    "nativeName": "Basa Sunda (Latin, Indonesia)",
    "englishName": "Sundanese (Latin, Indonesia)",
    "twoLetterISOLanguageName": "su",
    "threeLetterISOLanguageName": "sun",
    "listSeparator": ",",
    "isRightToLeft": false,
    "isNeutralCulture": false,
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
        "currencySymbol": "Rp",
        "naNSymbol": "NaN",
        "currencyNegativePattern": 1,
        "numberNegativePattern": 1,
        "percentPositivePattern": 1,
        "percentNegativePattern": 1,
        "negativeInfinitySymbol": "-∞",
        "negativeSign": "-",
        "numberDecimalDigits": 3,
        "numberDecimalSeparator": ",",
        "numberGroupSeparator": ".",
        "currencyPositivePattern": 0,
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
        "Mng",
        "Sen",
        "Sal",
        "Reb",
        "Kem",
        "Jum",
        "Sap"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Péb",
        "Mar",
        "Apr",
        "Méi",
        "Jun",
        "Jul",
        "Ags",
        "Sép",
        "Okt",
        "Nop",
        "Dés",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Péb",
        "Mar",
        "Apr",
        "Méi",
        "Jun",
        "Jul",
        "Ags",
        "Sép",
        "Okt",
        "Nop",
        "Dés",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Minggu",
        "Senén",
        "Salasa",
        "Rebo",
        "Kemis",
        "Jumaah",
        "Saptu"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy H.mm.ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "H.mm.ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Januari",
        "Pébruari",
        "Maret",
        "April",
        "Méi",
        "Juni",
        "Juli",
        "Agustus",
        "Séptémber",
        "Oktober",
        "Nopémber",
        "Désémber",
        ""
      ],
      "monthNames": [
        "Januari",
        "Pébruari",
        "Maret",
        "April",
        "Méi",
        "Juni",
        "Juli",
        "Agustus",
        "Séptémber",
        "Oktober",
        "Nopémber",
        "Désémber",
        ""
      ],
      "nativeCalendarName": "Kalénder Grégorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "M",
        "S",
        "S",
        "R",
        "K",
        "J",
        "S"
      ],
      "shortTimePattern": "H.mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ".",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "M"
      ],
      "abbreviatedEraNames": [
        "M"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM yyyy",
          "d/M/yy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "H.mm"
        ],
        "T": [
          "H.mm.ss"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};
