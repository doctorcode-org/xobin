// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 145, 
    name: "gd", 
    nativeName: "Gàidhlig", 
    englishName: "Scottish Gaelic", 
    twoLetterISOLanguageName: "gd", 
    threeLetterISOLanguageName: "gla", 
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
        "DiD",
        "DiL",
        "DiM",
        "DiC",
        "Dia",
        "Dih",
        "DiS"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Faoi",
        "Gearr",
        "Màrt",
        "Gibl",
        "Cèit",
        "Ògmh",
        "Iuch",
        "Lùna",
        "Sult",
        "Dàmh",
        "Samh",
        "Dùbh",
        ""
      ],
      "abbreviatedMonthNames": [
        "Faoi",
        "Gearr",
        "Màrt",
        "Gibl",
        "Cèit",
        "Ògmh",
        "Iuch",
        "Lùna",
        "Sult",
        "Dàmh",
        "Samh",
        "Dùbh",
        ""
      ],
      "amDesignator": "m",
      "dateSeparator": "/",
      "dayNames": [
        "DiDòmhnaich",
        "DiLuain",
        "DiMàirt",
        "DiCiadain",
        "DiarDaoin",
        "DihAoine",
        "DiSathairne"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d'mh' MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d'mh' MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d'mh' MMMM",
      "monthGenitiveNames": [
        "dhen Fhaoilleach",
        "dhen Ghearran",
        "dhen Mhàrt",
        "dhen Ghiblean",
        "dhen Chèitean",
        "dhen Ògmhios",
        "dhen Iuchar",
        "dhen Lùnastal",
        "dhen t-Sultain",
        "dhen Dàmhair",
        "dhen t-Samhain",
        "dhen Dùbhlachd",
        ""
      ],
      "monthNames": [
        "Am Faoilleach",
        "An Gearran",
        "Am Màrt",
        "An Giblean",
        "An Cèitean",
        "An t-Ògmhios",
        "An t-Iuchar",
        "An Lùnastal",
        "An t-Sultain",
        "An Dàmhair",
        "An t-Samhain",
        "An Dùbhlachd",
        ""
      ],
      "nativeCalendarName": "Am Mìosachan Griogarach",
      "pmDesignator": "f",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "D",
        "L",
        "M",
        "C",
        "A",
        "H",
        "S"
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
        "A"
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
          "dddd, d'mh' MMMM yyyy",
          "d'mh' MMMM yyyy"
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
          "d'mh' MMMM"
        ],
        "M": [
          "d'mh' MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};