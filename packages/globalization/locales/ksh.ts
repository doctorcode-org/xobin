// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "ksh", 
    nativeName: "Kölsch", 
    englishName: "Colognian", 
    twoLetterISOLanguageName: "ksh", 
    threeLetterISOLanguageName: "ksh", 
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
        negativeInfinitySymbol: "−∞",
        negativeSign: "−",
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
        "Su.",
        "Mo.",
        "Di.",
        "Me.",
        "Du.",
        "Fr.",
        "Sa."
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Fäb",
        "Mäz",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Ouj",
        "Säp",
        "Okt",
        "Nov",
        "Dez",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan.",
        "Fäb.",
        "Mäz.",
        "Apr.",
        "Mai",
        "Jun.",
        "Jul.",
        "Ouj.",
        "Säp.",
        "Okt.",
        "Nov.",
        "Dez.",
        ""
      ],
      "amDesignator": "Uhr vörmiddaachs",
      "dateSeparator": ". ",
      "dayNames": [
        "Sunndaach",
        "Mohndaach",
        "Dinnsdaach",
        "Metwoch",
        "Dunnersdaach",
        "Friidaach",
        "Samsdaach"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd, 'dä' d. MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, 'dä' d. MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "Jannewa",
        "Fäbrowa",
        "Määz",
        "Aprell",
        "Mai",
        "Juuni",
        "Juuli",
        "Oujoß",
        "Septämber",
        "Oktohber",
        "Novämber",
        "Dezämber",
        ""
      ],
      "monthNames": [
        "Jannewa",
        "Fäbrowa",
        "Määz",
        "Aprell",
        "Mai",
        "Juuni",
        "Juuli",
        "Oujoß",
        "Septämber",
        "Oktohber",
        "Novämber",
        "Dezämber",
        ""
      ],
      "nativeCalendarName": "jrejorejahnesche Kalännder",
      "pmDesignator": "Uhr nommendaachs",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d. M. yyyy",
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
        "nC"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d. M. yyyy",
          "d. MMM. yyyy",
          "yyyy-MM-dd"
        ],
        "D": [
          "dddd, 'dä' d. MMMM yyyy",
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};