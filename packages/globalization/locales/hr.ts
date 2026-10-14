// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 26, 
    name: "hr", 
    nativeName: "hrvatski", 
    englishName: "Croatian", 
    twoLetterISOLanguageName: "hr", 
    threeLetterISOLanguageName: "hrv", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "kn", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 2, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "−∞",
        negativeSign: "−",
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
        "ned",
        "pon",
        "uto",
        "sri",
        "čet",
        "pet",
        "sub"
      ],
      "abbreviatedMonthGenitiveNames": [
        "sij",
        "velj",
        "ožu",
        "tra",
        "svi",
        "lip",
        "srp",
        "kol",
        "ruj",
        "lis",
        "stu",
        "pro",
        ""
      ],
      "abbreviatedMonthNames": [
        "sij",
        "velj",
        "ožu",
        "tra",
        "svi",
        "lip",
        "srp",
        "kol",
        "ruj",
        "lis",
        "stu",
        "pro",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ". ",
      "dayNames": [
        "nedjelja",
        "ponedjeljak",
        "utorak",
        "srijeda",
        "četvrtak",
        "petak",
        "subota"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d. MMMM yyyy. HH:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy.",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "siječnja",
        "veljače",
        "ožujka",
        "travnja",
        "svibnja",
        "lipnja",
        "srpnja",
        "kolovoza",
        "rujna",
        "listopada",
        "studenoga",
        "prosinca",
        ""
      ],
      "monthNames": [
        "siječanj",
        "veljača",
        "ožujak",
        "travanj",
        "svibanj",
        "lipanj",
        "srpanj",
        "kolovoz",
        "rujan",
        "listopad",
        "studeni",
        "prosinac",
        ""
      ],
      "nativeCalendarName": "gregorijanski kalendar",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd. MM. yyyy.",
      "shortestDayNames": [
        "n",
        "p",
        "u",
        "s",
        "č",
        "p",
        "s"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy.",
      "eraNames": [
        "po. Kr."
      ],
      "abbreviatedEraNames": [
        "AD"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd. MM. yyyy.",
          "d. MMM yyyy."
        ],
        "D": [
          "dddd, d. MMMM yyyy.",
          "d. MMMM yyyy."
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM yyyy."
        ],
        "Y": [
          "MMMM yyyy."
        ],
        "m": [
          "d. MMMM"
        ],
        "M": [
          "d. MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};