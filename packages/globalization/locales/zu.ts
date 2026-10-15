// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 53, 
    name: "zu", 
    nativeName: "isiZulu", 
    englishName: "isiZulu", 
    twoLetterISOLanguageName: "zu", 
    threeLetterISOLanguageName: "zul", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "R", 
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
        "Son",
        "Mso",
        "Bil",
        "Tha",
        "Sin",
        "Hla",
        "Mgq"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Feb",
        "Mas",
        "Eph",
        "Mey",
        "Jun",
        "Jul",
        "Aga",
        "Sep",
        "Okt",
        "Nov",
        "Dis",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Feb",
        "Mas",
        "Eph",
        "Mey",
        "Jun",
        "Jul",
        "Aga",
        "Sep",
        "Okt",
        "Nov",
        "Dis",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "ISonto",
        "UMsombuluko",
        "ULwesibili",
        "ULwesithathu",
        "ULwesine",
        "ULwesihlanu",
        "UMgqibelo"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d, yyyy HH:mm:ss",
      "longDatePattern": "dddd, MMMM d, yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Januwari",
        "Februwari",
        "Mashi",
        "Ephreli",
        "Meyi",
        "Juni",
        "Julayi",
        "Agasti",
        "Septhemba",
        "Okthoba",
        "Novemba",
        "Disemba",
        ""
      ],
      "monthNames": [
        "Januwari",
        "Februwari",
        "Mashi",
        "Ephreli",
        "Meyi",
        "Juni",
        "Julayi",
        "Agasti",
        "Septhemba",
        "Okthoba",
        "Novemba",
        "Disemba",
        ""
      ],
      "nativeCalendarName": "ikhalenda lesi-Gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "M/d/yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "B",
        "T",
        "S",
        "H",
        "M"
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
          "M/d/yyyy",
          "MMM d, yyyy",
          "yyyy-MM-dd",
          "M/d/yy"
        ],
        "D": [
          "dddd, MMMM d, yyyy",
          "MMMM d, yyyy"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};