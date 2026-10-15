// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "seh", 
    lcid: 4096, 
    name: "seh-MZ", 
    nativeName: "sena (Moçambique)", 
    englishName: "Sena (Mozambique)", 
    twoLetterISOLanguageName: "seh", 
    threeLetterISOLanguageName: "seh", 
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
        currencySymbol: "MTn", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 1, 
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
        "Dim",
        "Pos",
        "Pir",
        "Tat",
        "Nai",
        "Sha",
        "Sab"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Set",
        "Otu",
        "Nov",
        "Dec",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Set",
        "Otu",
        "Nov",
        "Dec",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Dimingu",
        "Chiposi",
        "Chipiri",
        "Chitatu",
        "Chinai",
        "Chishanu",
        "Sabudu"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d 'de' MMMM 'de' yyyy HH:mm:ss",
      "longDatePattern": "dddd, d 'de' MMMM 'de' yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Janeiro",
        "Fevreiro",
        "Marco",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Augusto",
        "Setembro",
        "Otubro",
        "Novembro",
        "Decembro",
        ""
      ],
      "monthNames": [
        "Janeiro",
        "Fevreiro",
        "Marco",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Augusto",
        "Setembro",
        "Otubro",
        "Novembro",
        "Decembro",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "D",
        "P",
        "C",
        "T",
        "N",
        "S",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM 'de' yyyy",
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
          "d/M/yyyy",
          "d 'de' MMM 'de' yyyy"
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