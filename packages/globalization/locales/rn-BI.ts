// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "rn", 
    lcid: 4096, 
    name: "rn-BI", 
    nativeName: "Ikirundi (Uburundi)", 
    englishName: "Rundi (Burundi)", 
    twoLetterISOLanguageName: "rn", 
    threeLetterISOLanguageName: "run", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "FBu", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 1, 
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
        "cu.",
        "mbe.",
        "kab.",
        "gtu.",
        "kan.",
        "gnu.",
        "gnd."
      ],
      "abbreviatedMonthGenitiveNames": [
        "Mut.",
        "Gas.",
        "Wer.",
        "Mat.",
        "Gic.",
        "Kam.",
        "Nya.",
        "Kan.",
        "Nze.",
        "Ukw.",
        "Ugu.",
        "Uku.",
        ""
      ],
      "abbreviatedMonthNames": [
        "Mut.",
        "Gas.",
        "Wer.",
        "Mat.",
        "Gic.",
        "Kam.",
        "Nya.",
        "Kan.",
        "Nze.",
        "Ukw.",
        "Ugu.",
        "Uku.",
        ""
      ],
      "amDesignator": "Z.MU.",
      "dateSeparator": "/",
      "dayNames": [
        "Ku w’indwi",
        "Ku wa mbere",
        "Ku wa kabiri",
        "Ku wa gatatu",
        "Ku wa kane",
        "Ku wa gatanu",
        "Ku wa gatandatu"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Nzero",
        "Ruhuhuma",
        "Ntwarante",
        "Ndamukiza",
        "Rusama",
        "Ruheshi",
        "Mukakaro",
        "Nyandagaro",
        "Nyakanga",
        "Gitugutu",
        "Munyonyo",
        "Kigarama",
        ""
      ],
      "monthNames": [
        "Nzero",
        "Ruhuhuma",
        "Ntwarante",
        "Ndamukiza",
        "Rusama",
        "Ruheshi",
        "Mukakaro",
        "Nyandagaro",
        "Nyakanga",
        "Gitugutu",
        "Munyonyo",
        "Kigarama",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "Z.MW.",
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
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "Ny.Y"
      ],
      "abbreviatedEraNames": [
        "Ny.Y"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
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