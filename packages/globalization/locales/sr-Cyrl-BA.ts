// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sr-Cyrl", 
    lcid: 7194, 
    name: "sr-Cyrl-BA", 
    nativeName: "српски (Босна и Херцеговина)", 
    englishName: "Serbian (Cyrillic, Bosnia and Herzegovina)", 
    twoLetterISOLanguageName: "sr", 
    threeLetterISOLanguageName: "srp", 
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
        currencySymbol: "КМ", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
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
        "нед",
        "пон",
        "уто",
        "сри",
        "чет",
        "пет",
        "суб"
      ],
      "abbreviatedMonthGenitiveNames": [
        "јан",
        "феб",
        "мар",
        "апр",
        "мај",
        "јун",
        "јул",
        "авг",
        "сеп",
        "окт",
        "нов",
        "дец",
        ""
      ],
      "abbreviatedMonthNames": [
        "јан",
        "феб",
        "мар",
        "апр",
        "мај",
        "јун",
        "јул",
        "авг",
        "сеп",
        "окт",
        "нов",
        "дец",
        ""
      ],
      "amDesignator": "прије подне",
      "dateSeparator": ".",
      "dayNames": [
        "недјеља",
        "понедјељак",
        "уторак",
        "сриједа",
        "четвртак",
        "петак",
        "субота"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d. MMMM yyyy. HH:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy.",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "јануар",
        "фебруар",
        "март",
        "април",
        "мај",
        "јун",
        "јул",
        "август",
        "септембар",
        "октобар",
        "новембар",
        "децембар",
        ""
      ],
      "monthNames": [
        "јануар",
        "фебруар",
        "март",
        "април",
        "мај",
        "јун",
        "јул",
        "август",
        "септембар",
        "октобар",
        "новембар",
        "децембар",
        ""
      ],
      "nativeCalendarName": "грегоријански календар",
      "pmDesignator": "по подне",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy.",
      "shortestDayNames": [
        "н",
        "п",
        "у",
        "с",
        "ч",
        "п",
        "с"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy.",
      "eraNames": [
        "н. е."
      ],
      "abbreviatedEraNames": [
        "н. е."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.M.yyyy.",
          "d. M. yyyy.",
          "d.M.yy."
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};