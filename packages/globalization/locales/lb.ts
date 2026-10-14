// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 110, 
    name: "lb", 
    nativeName: "Lëtzebuergesch", 
    englishName: "Luxembourgish", 
    twoLetterISOLanguageName: "lb", 
    threeLetterISOLanguageName: "ltz", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
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
        "Son",
        "Méi",
        "Dën",
        "Mët",
        "Don",
        "Fre",
        "Sam"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan.",
        "Feb.",
        "Mäe.",
        "Abr.",
        "Mee",
        "Juni",
        "Juli",
        "Aug.",
        "Sep.",
        "Okt.",
        "Nov.",
        "Dez.",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Feb",
        "Mäe",
        "Abr",
        "Mee",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
        ""
      ],
      "amDesignator": "moies",
      "dateSeparator": ".",
      "dayNames": [
        "Sonndeg",
        "Méindeg",
        "Dënschdeg",
        "Mëttwoch",
        "Donneschdeg",
        "Freideg",
        "Samschdeg"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, d. MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d. MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "Januar",
        "Februar",
        "Mäerz",
        "Abrëll",
        "Mee",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
        ""
      ],
      "monthNames": [
        "Januar",
        "Februar",
        "Mäerz",
        "Abrëll",
        "Mee",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
        ""
      ],
      "nativeCalendarName": "Gregorianesche Kalenner",
      "pmDesignator": "nomëttes",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "D",
        "M",
        "D",
        "F",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "n. Chr."
      ],
      "abbreviatedEraNames": [
        "n. Chr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d. MMM yyyy",
          "d.M.yyyy",
          "dd.MM.yy"
        ],
        "D": [
          "dddd, d. MMMM yyyy",
          "d. MMMM yyyy"
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