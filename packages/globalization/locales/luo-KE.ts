// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "luo", 
    lcid: 4096, 
    name: "luo-KE", 
    nativeName: "Dholuo (Kenya)", 
    englishName: "Luo (Kenya)", 
    twoLetterISOLanguageName: "luo", 
    threeLetterISOLanguageName: "luo", 
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
        currencySymbol: "Ksh", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 1, 
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
        "JMP",
        "WUT",
        "TAR",
        "TAD",
        "TAN",
        "TAB",
        "NGS"
      ],
      "abbreviatedMonthGenitiveNames": [
        "DAC",
        "DAR",
        "DAD",
        "DAN",
        "DAH",
        "DAU",
        "DAO",
        "DAB",
        "DOC",
        "DAP",
        "DGI",
        "DAG",
        ""
      ],
      "abbreviatedMonthNames": [
        "DAC",
        "DAR",
        "DAD",
        "DAN",
        "DAH",
        "DAU",
        "DAO",
        "DAB",
        "DOC",
        "DAP",
        "DGI",
        "DAG",
        ""
      ],
      "amDesignator": "OD",
      "dateSeparator": "/",
      "dayNames": [
        "Jumapil",
        "Wuok Tich",
        "Tich Ariyo",
        "Tich Adek",
        "Tich Ang’wen",
        "Tich Abich",
        "Ngeso"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Dwe mar Achiel",
        "Dwe mar Ariyo",
        "Dwe mar Adek",
        "Dwe mar Ang’wen",
        "Dwe mar Abich",
        "Dwe mar Auchiel",
        "Dwe mar Abiriyo",
        "Dwe mar Aboro",
        "Dwe mar Ochiko",
        "Dwe mar Apar",
        "Dwe mar gi achiel",
        "Dwe mar Apar gi ariyo",
        ""
      ],
      "monthNames": [
        "Dwe mar Achiel",
        "Dwe mar Ariyo",
        "Dwe mar Adek",
        "Dwe mar Ang’wen",
        "Dwe mar Abich",
        "Dwe mar Auchiel",
        "Dwe mar Abiriyo",
        "Dwe mar Aboro",
        "Dwe mar Ochiko",
        "Dwe mar Apar",
        "Dwe mar gi achiel",
        "Dwe mar Apar gi ariyo",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "OT",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "J",
        "W",
        "T",
        "T",
        "T",
        "T",
        "N"
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
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
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