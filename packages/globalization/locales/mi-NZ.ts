// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "mi", 
    lcid: 1153, 
    name: "mi-NZ", 
    nativeName: "te reo Māori (Aotearoa)", 
    englishName: "Maori (New Zealand)", 
    twoLetterISOLanguageName: "mi", 
    threeLetterISOLanguageName: "mri", 
    listSeparator: ",", 
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
        percentPositivePattern: 2, 
        percentNegativePattern: 2, 
        negativeInfinitySymbol: "-Infinity", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "Infinity", 
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
        "Rāt",
        "Mane",
        "Tūr",
        "Wene",
        "Tāit",
        "Par",
        "Rāh"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Hān",
        "Pēp",
        "Māe",
        "Āpe",
        "Mei",
        "Hune",
        "Hūr",
        "Āku",
        "Hep",
        "Oke",
        "Noem",
        "Tīhe",
        ""
      ],
      "abbreviatedMonthNames": [
        "Hān",
        "Pēp",
        "Māe",
        "Āpe",
        "Mei",
        "Hune",
        "Hūr",
        "Āku",
        "Hep",
        "Oke",
        "Noem",
        "Tīhe",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Rātapu",
        "Mane",
        "Tūrei",
        "Wenerei",
        "Tāite",
        "Paraire",
        "Rāhoroi"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Hānuere",
        "Pēpuere",
        "Māehe",
        "Āpereira",
        "Mei",
        "Hune",
        "Hūrae",
        "Ākuhata",
        "Hepetema",
        "Oketopa",
        "Noema",
        "Tīhema",
        ""
      ],
      "monthNames": [
        "Hānuere",
        "Pēpuere",
        "Māehe",
        "Āpereira",
        "Mei",
        "Hune",
        "Hūrae",
        "Ākuhata",
        "Hepetema",
        "Oketopa",
        "Noema",
        "Tīhema",
        ""
      ],
      "nativeCalendarName": "Maramataka Pākehā",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd-MM-yyyy",
      "shortestDayNames": [
        "Rt",
        "M",
        "T",
        "W",
        "T",
        "P",
        "Rh"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
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
          "dd-MM-yyyy",
          "d MMM yyyy"
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