// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "es", 
    lcid: 9226, 
    name: "es-CO", 
    nativeName: "español (Colombia)", 
    englishName: "Spanish (Colombia)", 
    twoLetterISOLanguageName: "es", 
    threeLetterISOLanguageName: "spa", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "$", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: ".", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "dom",
        "lun",
        "mar",
        "mié",
        "jue",
        "vie",
        "sáb"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ene",
        "feb",
        "mar",
        "abr",
        "may",
        "jun",
        "jul",
        "ago",
        "sept",
        "oct",
        "nov",
        "dic",
        ""
      ],
      "abbreviatedMonthNames": [
        "ene.",
        "feb.",
        "mar.",
        "abr.",
        "may.",
        "jun.",
        "jul.",
        "ago.",
        "sept.",
        "oct.",
        "nov.",
        "dic.",
        ""
      ],
      "amDesignator": "a. m.",
      "dateSeparator": "/",
      "dayNames": [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d 'de' MMMM 'de' yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d 'de' MMMM 'de' yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d 'de' MMMM",
      "monthGenitiveNames": [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
        ""
      ],
      "monthNames": [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
        ""
      ],
      "nativeCalendarName": "calendario gregoriano",
      "pmDesignator": "p. m.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/MM/yyyy",
      "shortestDayNames": [
        "d",
        "l",
        "m",
        "m",
        "j",
        "v",
        "s"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM 'de' yyyy",
      "eraNames": [
        "d.C."
      ],
      "abbreviatedEraNames": [
        "d.C."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/MM/yyyy",
          "d/MM/yy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d 'de' MMMM 'de' yyyy",
          "d 'de' MMMM 'de' yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
        ],
        "y": [
          "MMMM 'de' yyyy"
        ],
        "Y": [
          "MMMM 'de' yyyy"
        ],
        "m": [
          "d 'de' MMMM"
        ],
        "M": [
          "d 'de' MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};