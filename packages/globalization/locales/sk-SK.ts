// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sk", 
    lcid: 1051, 
    name: "sk-SK", 
    nativeName: "slovenčina (Slovensko)", 
    englishName: "Slovak (Slovakia)", 
    twoLetterISOLanguageName: "sk", 
    threeLetterISOLanguageName: "slk", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "€", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
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
        "ne",
        "po",
        "ut",
        "st",
        "št",
        "pi",
        "so"
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan",
        "feb",
        "mar",
        "apr",
        "máj",
        "jún",
        "júl",
        "aug",
        "sep",
        "okt",
        "nov",
        "dec",
        ""
      ],
      "abbreviatedMonthNames": [
        "jan",
        "feb",
        "mar",
        "apr",
        "máj",
        "jún",
        "júl",
        "aug",
        "sep",
        "okt",
        "nov",
        "dec",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ". ",
      "dayNames": [
        "nedeľa",
        "pondelok",
        "utorok",
        "streda",
        "štvrtok",
        "piatok",
        "sobota"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd d. MMMM yyyy H:mm:ss",
      "longDatePattern": "dddd d. MMMM yyyy",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "januára",
        "februára",
        "marca",
        "apríla",
        "mája",
        "júna",
        "júla",
        "augusta",
        "septembra",
        "októbra",
        "novembra",
        "decembra",
        ""
      ],
      "monthNames": [
        "január",
        "február",
        "marec",
        "apríl",
        "máj",
        "jún",
        "júl",
        "august",
        "september",
        "október",
        "november",
        "december",
        ""
      ],
      "nativeCalendarName": "gregoriánsky kalendár",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d. M. yyyy",
      "shortestDayNames": [
        "n",
        "p",
        "u",
        "s",
        "š",
        "p",
        "s"
      ],
      "shortTimePattern": "H:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "po Kr."
      ],
      "abbreviatedEraNames": [
        "po Kr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d. M. yyyy"
        ],
        "D": [
          "dddd d. MMMM yyyy",
          "d. MMMM yyyy"
        ],
        "t": [
          "H:mm"
        ],
        "T": [
          "H:mm:ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
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