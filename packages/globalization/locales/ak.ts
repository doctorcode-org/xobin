// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "ak", 
    nativeName: "Akan", 
    englishName: "Akan", 
    twoLetterISOLanguageName: "ak", 
    threeLetterISOLanguageName: "aka", 
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
        currencySymbol: "GH₵", 
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
        "Kwe",
        "Dwo",
        "Ben",
        "Wuk",
        "Yaw",
        "Fia",
        "Mem"
      ],
      "abbreviatedMonthGenitiveNames": [
        "S-Ɔ",
        "K-Ɔ",
        "E-Ɔ",
        "E-O",
        "E-K",
        "O-A",
        "A-K",
        "D-Ɔ",
        "F-Ɛ",
        "Ɔ-A",
        "Ɔ-O",
        "M-Ɔ",
        ""
      ],
      "abbreviatedMonthNames": [
        "S-Ɔ",
        "K-Ɔ",
        "E-Ɔ",
        "E-O",
        "E-K",
        "O-A",
        "A-K",
        "D-Ɔ",
        "F-Ɛ",
        "Ɔ-A",
        "Ɔ-O",
        "M-Ɔ",
        ""
      ],
      "amDesignator": "AN",
      "dateSeparator": "/",
      "dayNames": [
        "Kwesida",
        "Dwowda",
        "Benada",
        "Wukuda",
        "Yawda",
        "Fida",
        "Memeneda"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, yyyy MMMM dd h:mm:ss tt",
      "longDatePattern": "dddd, yyyy MMMM dd",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Sanda-Ɔpɛpɔn",
        "Kwakwar-Ɔgyefuo",
        "Ebɔw-Ɔbenem",
        "Ebɔbira-Oforisuo",
        "Esusow Aketseaba-Kɔtɔnimba",
        "Obirade-Ayɛwohomumu",
        "Ayɛwoho-Kitawonsa",
        "Difuu-Ɔsandaa",
        "Fankwa-Ɛbɔ",
        "Ɔbɛsɛ-Ahinime",
        "Ɔberɛfɛw-Obubuo",
        "Mumu-Ɔpɛnimba",
        ""
      ],
      "monthNames": [
        "Sanda-Ɔpɛpɔn",
        "Kwakwar-Ɔgyefuo",
        "Ebɔw-Ɔbenem",
        "Ebɔbira-Oforisuo",
        "Esusow Aketseaba-Kɔtɔnimba",
        "Obirade-Ayɛwohomumu",
        "Ayɛwoho-Kitawonsa",
        "Difuu-Ɔsandaa",
        "Fankwa-Ɛbɔ",
        "Ɔbɛsɛ-Ahinime",
        "Ɔberɛfɛw-Obubuo",
        "Mumu-Ɔpɛnimba",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "EW",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy/MM/dd",
      "shortestDayNames": [
        "K",
        "D",
        "B",
        "W",
        "Y",
        "F",
        "M"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "KE"
      ],
      "abbreviatedEraNames": [
        "KE"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy/MM/dd",
          "yyyy MMM d",
          "yyyy/M/d",
          "yy/MM/dd"
        ],
        "D": [
          "dddd, yyyy MMMM dd",
          "yyyy MMMM d"
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