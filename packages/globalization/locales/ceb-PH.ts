// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    "parent": "ceb",
    "lcid": 4096,
    "name": "ceb-PH",
    "nativeName": "Cebuano (Pilipinas)",
    "englishName": "Cebuano (Philippines)",
    "twoLetterISOLanguageName": "ceb",
    "threeLetterISOLanguageName": "ceb",
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
        "currencySymbol": "₱",
        "naNSymbol": "NaN",
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
        "Dom",
        "Lun",
        "Mar",
        "Miy",
        "Huw",
        "Biy",
        "Sab"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Ene",
        "Peb",
        "Mar",
        "Abr",
        "May",
        "Hun",
        "Hul",
        "Ago",
        "Set",
        "Okt",
        "Nob",
        "Dis",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ene",
        "Peb",
        "Mar",
        "Abr",
        "May",
        "Hun",
        "Hul",
        "Ago",
        "Set",
        "Okt",
        "Nob",
        "Dis",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Domingo",
        "Lunes",
        "Martes",
        "Miyerkules",
        "Huwebes",
        "Biyernes",
        "Sabado"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d, yyyy h:mm:ss tt",
      "longDatePattern": "dddd, MMMM d, yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Enero",
        "Pebrero",
        "Marso",
        "Abril",
        "Mayo",
        "Hunyo",
        "Hulyo",
        "Agosto",
        "Setyembre",
        "Oktubre",
        "Nobyembre",
        "Disyembre",
        ""
      ],
      "monthNames": [
        "Enero",
        "Pebrero",
        "Marso",
        "Abril",
        "Mayo",
        "Hunyo",
        "Hulyo",
        "Agosto",
        "Setyembre",
        "Oktubre",
        "Nobyembre",
        "Disyembre",
        ""
      ],
      "nativeCalendarName": "Gregorian nga Kalendaryo",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "M/d/yyyy",
      "shortestDayNames": [
        "D",
        "L",
        "M",
        "M",
        "H",
        "B",
        "S"
      ],
      "shortTimePattern": "h:mm tt",
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
          "M/d/yyyy",
          "MMM d, yyyy",
          "M/d/yy"
        ],
        "D": [
          "dddd, MMMM d, yyyy",
          "MMMM d, yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
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
