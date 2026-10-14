// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "haw", 
    lcid: 1141, 
    name: "haw-US", 
    nativeName: "ʻŌlelo Hawaiʻi (ʻAmelika Hui Pū ʻIa)", 
    englishName: "Hawaiian (United States)", 
    twoLetterISOLanguageName: "haw", 
    threeLetterISOLanguageName: "haw", 
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
        currencySymbol: "$", 
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
        "LP",
        "P1",
        "P2",
        "P3",
        "P4",
        "P5",
        "P6"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Ian.",
        "Pep.",
        "Mal.",
        "ʻAp.",
        "Mei",
        "Iun.",
        "Iul.",
        "ʻAu.",
        "Kep.",
        "ʻOk.",
        "Now.",
        "Kek.",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ian.",
        "Pep.",
        "Mal.",
        "ʻAp.",
        "Mei",
        "Iun.",
        "Iul.",
        "ʻAu.",
        "Kep.",
        "ʻOk.",
        "Now.",
        "Kek.",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Lāpule",
        "Poʻakahi",
        "Poʻalua",
        "Poʻakolu",
        "Poʻahā",
        "Poʻalima",
        "Poʻaono"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Ianuali",
        "Pepeluali",
        "Malaki",
        "ʻApelila",
        "Mei",
        "Iune",
        "Iulai",
        "ʻAukake",
        "Kepakemapa",
        "ʻOkakopa",
        "Nowemapa",
        "Kekemapa",
        ""
      ],
      "monthNames": [
        "Ianuali",
        "Pepeluali",
        "Malaki",
        "ʻApelila",
        "Mei",
        "Iune",
        "Iulai",
        "ʻAukake",
        "Kepakemapa",
        "ʻOkakopa",
        "Nowemapa",
        "Kekemapa",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
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
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "CE"
      ],
      "abbreviatedEraNames": [
        "CE"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM yyyy",
          "d/M/yy"
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