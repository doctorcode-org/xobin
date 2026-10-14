// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "bem", 
    lcid: 4096, 
    name: "bem-ZM", 
    nativeName: "Ichibemba (Zambia)", 
    englishName: "Bemba (Zambia)", 
    twoLetterISOLanguageName: "bem", 
    threeLetterISOLanguageName: "bem", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "K", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Pa Mulungu",
        "Palichimo",
        "Palichibuli",
        "Palichitatu",
        "Palichine",
        "Palichisano",
        "Pachibelushi"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Feb",
        "Mac",
        "Epr",
        "Mei",
        "Jun",
        "Jul",
        "Oga",
        "Sep",
        "Okt",
        "Nov",
        "Dis",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Feb",
        "Mac",
        "Epr",
        "Mei",
        "Jun",
        "Jul",
        "Oga",
        "Sep",
        "Okt",
        "Nov",
        "Dis",
        ""
      ],
      "amDesignator": "uluchelo",
      "dateSeparator": "/",
      "dayNames": [
        "Pa Mulungu",
        "Palichimo",
        "Palichibuli",
        "Palichitatu",
        "Palichine",
        "Palichisano",
        "Pachibelushi"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Januari",
        "Februari",
        "Machi",
        "Epreo",
        "Mei",
        "Juni",
        "Julai",
        "Ogasti",
        "Septemba",
        "Oktoba",
        "Novemba",
        "Disemba",
        ""
      ],
      "monthNames": [
        "Januari",
        "Februari",
        "Machi",
        "Epreo",
        "Mei",
        "Juni",
        "Julai",
        "Ogasti",
        "Septemba",
        "Oktoba",
        "Novemba",
        "Disemba",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "akasuba",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
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
          "dd/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};