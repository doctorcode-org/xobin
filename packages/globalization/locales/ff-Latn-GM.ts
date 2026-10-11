// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ff-Latn", 
    lcid: 4096, 
    name: "ff-Latn-GM", 
    nativeName: "Pulaar (Gammbi)", 
    englishName: "Fulah (Latin, Gambia)", 
    twoLetterISOLanguageName: "ff", 
    threeLetterISOLanguageName: "ful", 
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
        currencySymbol: "D", 
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
        "dew",
        "aaɓ",
        "maw",
        "nje",
        "naa",
        "mwd",
        "hbi"
      ],
      "abbreviatedMonthGenitiveNames": [
        "sii",
        "col",
        "mbo",
        "see",
        "duu",
        "kor",
        "mor",
        "juk",
        "slt",
        "yar",
        "jol",
        "bow",
        ""
      ],
      "abbreviatedMonthNames": [
        "sii",
        "col",
        "mbo",
        "see",
        "duu",
        "kor",
        "mor",
        "juk",
        "slt",
        "yar",
        "jol",
        "bow",
        ""
      ],
      "amDesignator": "subaka",
      "dateSeparator": "/",
      "dayNames": [
        "dewo",
        "aaɓnde",
        "mawbaare",
        "njeslaare",
        "naasaande",
        "mawnde",
        "hoore-biir"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "siilo",
        "colte",
        "mbooy",
        "seeɗto",
        "duujal",
        "korse",
        "morso",
        "juko",
        "siilto",
        "yarkomaa",
        "jolal",
        "bowte",
        ""
      ],
      "monthNames": [
        "siilo",
        "colte",
        "mbooy",
        "seeɗto",
        "duujal",
        "korse",
        "morso",
        "juko",
        "siilto",
        "yarkomaa",
        "jolal",
        "bowte",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "kikiiɗe",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "d",
        "a",
        "m",
        "n",
        "n",
        "m",
        "h"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "C-I"
      ],
      "abbreviatedEraNames": [
        "C-I"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM, yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
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
          "d MMMM"
        ],
        "M": [
          "d MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};