// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "nyn", 
    nativeName: "Runyankore", 
    englishName: "Nyankole", 
    twoLetterISOLanguageName: "nyn", 
    threeLetterISOLanguageName: "nyn", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "USh", 
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
        "SAN",
        "ORK",
        "OKB",
        "OKS",
        "OKN",
        "OKT",
        "OMK"
      ],
      "abbreviatedMonthGenitiveNames": [
        "KBZ",
        "KBR",
        "KST",
        "KKN",
        "KTN",
        "KMK",
        "KMS",
        "KMN",
        "KMW",
        "KKM",
        "KNK",
        "KNB",
        ""
      ],
      "abbreviatedMonthNames": [
        "KBZ",
        "KBR",
        "KST",
        "KKN",
        "KTN",
        "KMK",
        "KMS",
        "KMN",
        "KMW",
        "KKM",
        "KNK",
        "KNB",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "Sande",
        "Orwokubanza",
        "Orwakabiri",
        "Orwakashatu",
        "Orwakana",
        "Orwakataano",
        "Orwamukaaga"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Okwokubanza",
        "Okwakabiri",
        "Okwakashatu",
        "Okwakana",
        "Okwakataana",
        "Okwamukaaga",
        "Okwamushanju",
        "Okwamunaana",
        "Okwamwenda",
        "Okwaikumi",
        "Okwaikumi na kumwe",
        "Okwaikumi na ibiri",
        ""
      ],
      "monthNames": [
        "Okwokubanza",
        "Okwakabiri",
        "Okwakashatu",
        "Okwakana",
        "Okwakataana",
        "Okwamukaaga",
        "Okwamushanju",
        "Okwamunaana",
        "Okwamwenda",
        "Okwaikumi",
        "Okwaikumi na kumwe",
        "Okwaikumi na ibiri",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "K",
        "R",
        "S",
        "N",
        "T",
        "M"
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
        "AD"
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