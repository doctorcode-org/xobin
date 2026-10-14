// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "kln", 
    lcid: 4096, 
    name: "kln-KE", 
    nativeName: "Kalenjin (Emetab Kenya)", 
    englishName: "Kalenjin (Kenya)", 
    twoLetterISOLanguageName: "kln", 
    threeLetterISOLanguageName: "kln", 
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
        currencySymbol: "Ksh", 
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
        "Kts",
        "Kot",
        "Koo",
        "Kos",
        "Koa",
        "Kom",
        "Kol"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Mul",
        "Ngat",
        "Taa",
        "Iwo",
        "Mam",
        "Paa",
        "Nge",
        "Roo",
        "Bur",
        "Epe",
        "Kpt",
        "Kpa",
        ""
      ],
      "abbreviatedMonthNames": [
        "Mul",
        "Ngat",
        "Taa",
        "Iwo",
        "Mam",
        "Paa",
        "Nge",
        "Roo",
        "Bur",
        "Epe",
        "Kpt",
        "Kpa",
        ""
      ],
      "amDesignator": "karoon",
      "dateSeparator": "/",
      "dayNames": [
        "Kotisap",
        "Kotaai",
        "Koaeng’",
        "Kosomok",
        "Koang’wan",
        "Komuut",
        "Kolo"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Mulgul",
        "Ng’atyaato",
        "Kiptaamo",
        "Iwootkuut",
        "Mamuut",
        "Paagi",
        "Ng’eiyeet",
        "Rooptui",
        "Bureet",
        "Epeeso",
        "Kipsuunde ne taai",
        "Kipsuunde nebo aeng’",
        ""
      ],
      "monthNames": [
        "Mulgul",
        "Ng’atyaato",
        "Kiptaamo",
        "Iwootkuut",
        "Mamuut",
        "Paagi",
        "Ng’eiyeet",
        "Rooptui",
        "Bureet",
        "Epeeso",
        "Kipsuunde ne taai",
        "Kipsuunde nebo aeng’",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "kooskoliny",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "T",
        "T",
        "O",
        "S",
        "A",
        "M",
        "L"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "KO"
      ],
      "abbreviatedEraNames": [
        "KO"
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
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
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