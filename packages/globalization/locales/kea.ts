// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "kea", 
    nativeName: "kabuverdianu", 
    englishName: "Kabuverdianu", 
    twoLetterISOLanguageName: "kea", 
    threeLetterISOLanguageName: "kea", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: "$", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "​", 
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
        "dum",
        "sig",
        "ter",
        "kua",
        "kin",
        "ses",
        "sab"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Feb",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Otu",
        "Nuv",
        "Diz",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Feb",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Otu",
        "Nuv",
        "Diz",
        ""
      ],
      "amDesignator": "am",
      "dateSeparator": "/",
      "dayNames": [
        "dumingu",
        "sigunda-fera",
        "tersa-fera",
        "kuarta-fera",
        "kinta-fera",
        "sesta-fera",
        "sábadu"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d 'di' MMMM 'di' yyyy HH:mm:ss",
      "longDatePattern": "dddd, d 'di' MMMM 'di' yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d 'di' MMMM",
      "monthGenitiveNames": [
        "Janeru",
        "Febreru",
        "Marsu",
        "Abril",
        "Maiu",
        "Junhu",
        "Julhu",
        "Agostu",
        "Setenbru",
        "Otubru",
        "Nuvenbru",
        "Dizenbru",
        ""
      ],
      "monthNames": [
        "Janeru",
        "Febreru",
        "Marsu",
        "Abril",
        "Maiu",
        "Junhu",
        "Julhu",
        "Agostu",
        "Setenbru",
        "Otubru",
        "Nuvenbru",
        "Dizenbru",
        ""
      ],
      "nativeCalendarName": "Kalendáriu Gregorianu",
      "pmDesignator": "pm",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "D",
        "S",
        "T",
        "K",
        "K",
        "S",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM 'di' yyyy",
      "eraNames": [
        "DK"
      ],
      "abbreviatedEraNames": [
        "DK"
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
          "dddd, d 'di' MMMM 'di' yyyy",
          "d 'di' MMMM 'di' yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM 'di' yyyy"
        ],
        "Y": [
          "MMMM 'di' yyyy"
        ],
        "m": [
          "d 'di' MMMM"
        ],
        "M": [
          "d 'di' MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};