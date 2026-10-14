// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "gl", 
    lcid: 1110, 
    name: "gl-ES", 
    nativeName: "galego (galego)", 
    englishName: "Galician (Galician)", 
    twoLetterISOLanguageName: "gl", 
    threeLetterISOLanguageName: "glg", 
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
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
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
        "Dom.",
        "Luns",
        "Mar.",
        "Mér.",
        "Xov.",
        "Ven.",
        "Sáb."
      ],
      "abbreviatedMonthGenitiveNames": [
        "xan.",
        "feb.",
        "mar.",
        "abr.",
        "maio",
        "xuño",
        "xul.",
        "ago.",
        "set.",
        "out.",
        "nov.",
        "dec.",
        ""
      ],
      "abbreviatedMonthNames": [
        "Xan.",
        "Feb.",
        "Mar.",
        "Abr.",
        "Maio",
        "Xuño",
        "Xul.",
        "Ago.",
        "Set.",
        "Out.",
        "Nov.",
        "Dec.",
        ""
      ],
      "amDesignator": "a.m.",
      "dateSeparator": "/",
      "dayNames": [
        "Domingo",
        "Luns",
        "Martes",
        "Mércores",
        "Xoves",
        "Venres",
        "Sábado"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d 'de' MMMM 'de' yyyy HH:mm:ss",
      "longDatePattern": "dddd, d 'de' MMMM 'de' yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d 'de' MMMM",
      "monthGenitiveNames": [
        "xaneiro",
        "febreiro",
        "marzo",
        "abril",
        "maio",
        "xuño",
        "xullo",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "decembro",
        ""
      ],
      "monthNames": [
        "Xaneiro",
        "Febreiro",
        "Marzo",
        "Abril",
        "Maio",
        "Xuño",
        "Xullo",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Decembro",
        ""
      ],
      "nativeCalendarName": "calendario gregoriano",
      "pmDesignator": "p.m.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "D",
        "L",
        "M",
        "M",
        "X",
        "V",
        "S"
      ],
      "shortTimePattern": "HH:mm",
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
          "dd/MM/yyyy",
          "d 'de' MMM 'de' yyyy",
          "d/M/yyyy",
          "dd/MM/yy"
        ],
        "D": [
          "dddd, d 'de' MMMM 'de' yyyy",
          "d 'de' MMMM 'de' yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
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