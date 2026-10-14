// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ebu", 
    lcid: 4096, 
    name: "ebu-KE", 
    nativeName: "Kĩembu (Kenya)", 
    englishName: "Embu (Kenya)", 
    twoLetterISOLanguageName: "ebu", 
    threeLetterISOLanguageName: "ebu", 
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
        "Kma",
        "Tat",
        "Ine",
        "Tan",
        "Arm",
        "Maa",
        "NMM"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Mbe",
        "Kai",
        "Kat",
        "Kan",
        "Gat",
        "Gan",
        "Mug",
        "Knn",
        "Ken",
        "Iku",
        "Imw",
        "Igi",
        ""
      ],
      "abbreviatedMonthNames": [
        "Mbe",
        "Kai",
        "Kat",
        "Kan",
        "Gat",
        "Gan",
        "Mug",
        "Knn",
        "Ken",
        "Iku",
        "Imw",
        "Igi",
        ""
      ],
      "amDesignator": "KI",
      "dateSeparator": "/",
      "dayNames": [
        "Kiumia",
        "Njumatatu",
        "Njumaine",
        "Njumatano",
        "Aramithi",
        "Njumaa",
        "NJumamothii"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Mweri wa mbere",
        "Mweri wa kaĩri",
        "Mweri wa kathatũ",
        "Mweri wa kana",
        "Mweri wa gatano",
        "Mweri wa gatantatũ",
        "Mweri wa mũgwanja",
        "Mweri wa kanana",
        "Mweri wa kenda",
        "Mweri wa ikũmi",
        "Mweri wa ikũmi na ũmwe",
        "Mweri wa ikũmi na Kaĩrĩ",
        ""
      ],
      "monthNames": [
        "Mweri wa mbere",
        "Mweri wa kaĩri",
        "Mweri wa kathatũ",
        "Mweri wa kana",
        "Mweri wa gatano",
        "Mweri wa gatantatũ",
        "Mweri wa mũgwanja",
        "Mweri wa kanana",
        "Mweri wa kenda",
        "Mweri wa ikũmi",
        "Mweri wa ikũmi na ũmwe",
        "Mweri wa ikũmi na Kaĩrĩ",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "UT",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "K",
        "N",
        "N",
        "N",
        "A",
        "M",
        "N"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "TK"
      ],
      "abbreviatedEraNames": [
        "TK"
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