// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "gv", 
    lcid: 4096, 
    name: "gv-IM", 
    nativeName: "Gaelg (Ellan Vannin)", 
    englishName: "Manx (Isle of Man)", 
    twoLetterISOLanguageName: "gv", 
    threeLetterISOLanguageName: "glv", 
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
        currencySymbol: "£", 
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
        "Jed",
        "Jel",
        "Jem",
        "Jerc",
        "Jerd",
        "Jeh",
        "Jes"
      ],
      "abbreviatedMonthGenitiveNames": [
        "J-guer",
        "T-arree",
        "Mayrnt",
        "Avrril",
        "Boaldyn",
        "M-souree",
        "J-souree",
        "Luanistyn",
        "M-fouyir",
        "J-fouyir",
        "M-Houney",
        "M-Nollick",
        ""
      ],
      "abbreviatedMonthNames": [
        "J-guer",
        "T-arree",
        "Mayrnt",
        "Avrril",
        "Boaldyn",
        "M-souree",
        "J-souree",
        "Luanistyn",
        "M-fouyir",
        "J-fouyir",
        "M-Houney",
        "M-Nollick",
        ""
      ],
      "amDesignator": "a.m.",
      "dateSeparator": "-",
      "dayNames": [
        "Jedoonee",
        "Jelhein",
        "Jemayrt",
        "Jercean",
        "Jerdein",
        "Jeheiney",
        "Jesarn"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Jerrey-geuree",
        "Toshiaght-arree",
        "Mayrnt",
        "Averil",
        "Boaldyn",
        "Mean-souree",
        "Jerrey-souree",
        "Luanistyn",
        "Mean-fouyir",
        "Jerrey-fouyir",
        "Mee Houney",
        "Mee ny Nollick",
        ""
      ],
      "monthNames": [
        "Jerrey-geuree",
        "Toshiaght-arree",
        "Mayrnt",
        "Averil",
        "Boaldyn",
        "Mean-souree",
        "Jerrey-souree",
        "Luanistyn",
        "Mean-fouyir",
        "Jerrey-fouyir",
        "Mee Houney",
        "Mee ny Nollick",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "p.m.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
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
          "yyyy-MM-dd",
          "yyyy MMM d",
          "yyyy-M-d"
        ],
        "D": [
          "yyyy MMMM d, dddd",
          "yyyy MMMM d"
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