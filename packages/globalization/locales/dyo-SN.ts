// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "dyo", 
    lcid: 4096, 
    name: "dyo-SN", 
    nativeName: "joola (Senegal)", 
    englishName: "Jola-Fonyi (Senegal)", 
    twoLetterISOLanguageName: "dyo", 
    threeLetterISOLanguageName: "dyo", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "CFA", 
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
        "Dim",
        "Ten",
        "Tal",
        "Ala",
        "Ara",
        "Arj",
        "Sib"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Sa",
        "Fe",
        "Ma",
        "Ab",
        "Me",
        "Su",
        "Sú",
        "Ut",
        "Se",
        "Ok",
        "No",
        "De",
        ""
      ],
      "abbreviatedMonthNames": [
        "Sa",
        "Fe",
        "Ma",
        "Ab",
        "Me",
        "Su",
        "Sú",
        "Ut",
        "Se",
        "Ok",
        "No",
        "De",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Dimas",
        "Teneŋ",
        "Talata",
        "Alarbay",
        "Aramisay",
        "Arjuma",
        "Sibiti"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Sanvie",
        "Fébirie",
        "Mars",
        "Aburil",
        "Mee",
        "Sueŋ",
        "Súuyee",
        "Ut",
        "Settembar",
        "Oktobar",
        "Novembar",
        "Disambar",
        ""
      ],
      "monthNames": [
        "Sanvie",
        "Fébirie",
        "Mars",
        "Aburil",
        "Mee",
        "Sueŋ",
        "Súuyee",
        "Ut",
        "Settembar",
        "Oktobar",
        "Novembar",
        "Disambar",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "D",
        "T",
        "T",
        "A",
        "A",
        "A",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "AtY"
      ],
      "abbreviatedEraNames": [
        "AtY"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};