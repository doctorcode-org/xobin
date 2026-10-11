// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "eu", 
    lcid: 1069, 
    name: "eu-ES", 
    nativeName: "euskara (euskara)", 
    englishName: "Basque (Basque)", 
    twoLetterISOLanguageName: "eu", 
    threeLetterISOLanguageName: "eus", 
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
        percentPositivePattern: 3, 
        percentNegativePattern: 7, 
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
        "ig.",
        "al.",
        "ar.",
        "az.",
        "og.",
        "or.",
        "lr."
      ],
      "abbreviatedMonthGenitiveNames": [
        "urt.",
        "ots.",
        "mar.",
        "api.",
        "mai.",
        "eka.",
        "uzt.",
        "abu.",
        "ira.",
        "urr.",
        "aza.",
        "abe.",
        ""
      ],
      "abbreviatedMonthNames": [
        "urt.",
        "ots.",
        "mar.",
        "api.",
        "mai.",
        "eka.",
        "uzt.",
        "abu.",
        "ira.",
        "urr.",
        "aza.",
        "abe.",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "igandea",
        "astelehena",
        "asteartea",
        "asteazkena",
        "osteguna",
        "ostirala",
        "larunbata"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "yyyy('e')'ko' MMMM'ren' d('a'), dddd HH:mm:ss",
      "longDatePattern": "yyyy('e')'ko' MMMM'ren' d('a'), dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM'ren' d('a')",
      "monthGenitiveNames": [
        "urtarrila",
        "otsaila",
        "martxoa",
        "apirila",
        "maiatza",
        "ekaina",
        "uztaila",
        "abuztua",
        "iraila",
        "urria",
        "azaroa",
        "abendua",
        ""
      ],
      "monthNames": [
        "urtarrila",
        "otsaila",
        "martxoa",
        "apirila",
        "maiatza",
        "ekaina",
        "uztaila",
        "abuztua",
        "iraila",
        "urria",
        "azaroa",
        "abendua",
        ""
      ],
      "nativeCalendarName": "Egutegi gregoriarra",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy/M/d",
      "shortestDayNames": [
        "I",
        "A",
        "A",
        "A",
        "O",
        "O",
        "L"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy('e')'ko' MMMM",
      "eraNames": [
        "K.o."
      ],
      "abbreviatedEraNames": [
        "o"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy/M/d",
          "yyyy('e')'ko' MMM d('a')",
          "yy/M/d"
        ],
        "D": [
          "yyyy('e')'ko' MMMM'ren' d('a'), dddd",
          "yyyy('e')'ko' MMMM'ren' d('a')"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy('e')'ko' MMMM"
        ],
        "Y": [
          "yyyy('e')'ko' MMMM"
        ],
        "m": [
          "MMMM'ren' d('a')"
        ],
        "M": [
          "MMMM'ren' d('a')"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};