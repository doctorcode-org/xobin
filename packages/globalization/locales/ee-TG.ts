// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ee", 
    lcid: 4096, 
    name: "ee-TG", 
    nativeName: "Eʋegbe (Togo nutome)", 
    englishName: "Ewe (Togo)", 
    twoLetterISOLanguageName: "ee", 
    threeLetterISOLanguageName: "ewe", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "CFA", 
        naNSymbol: "mnn", 
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
        "kɔs",
        "dzo",
        "bla",
        "kuɖ",
        "yaw",
        "fiɖ",
        "mem"
      ],
      "abbreviatedMonthGenitiveNames": [
        "dzv",
        "dzd",
        "ted",
        "afɔ",
        "dam",
        "mas",
        "sia",
        "dea",
        "any",
        "kel",
        "ade",
        "dzm",
        ""
      ],
      "abbreviatedMonthNames": [
        "dzv",
        "dzd",
        "ted",
        "afɔ",
        "dam",
        "mas",
        "sia",
        "dea",
        "any",
        "kel",
        "ade",
        "dzm",
        ""
      ],
      "amDesignator": "ŋdi",
      "dateSeparator": "/",
      "dayNames": [
        "kɔsiɖa",
        "dzoɖa",
        "blaɖa",
        "kuɖa",
        "yawoɖa",
        "fiɖa",
        "memleɖa"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d 'lia' yyyy HH:mm:ss",
      "longDatePattern": "dddd, MMMM d 'lia' yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d 'lia'",
      "monthGenitiveNames": [
        "dzove",
        "dzodze",
        "tedoxe",
        "afɔfĩe",
        "dama",
        "masa",
        "siamlɔm",
        "deasiamime",
        "anyɔnyɔ",
        "kele",
        "adeɛmekpɔxe",
        "dzome",
        ""
      ],
      "monthNames": [
        "dzove",
        "dzodze",
        "tedoxe",
        "afɔfĩe",
        "dama",
        "masa",
        "siamlɔm",
        "deasiamime",
        "anyɔnyɔ",
        "kele",
        "adeɛmekpɔxe",
        "dzome",
        ""
      ],
      "nativeCalendarName": "Gregorian kalenda",
      "pmDesignator": "ɣetrɔ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "M/d/yyyy",
      "shortestDayNames": [
        "k",
        "d",
        "b",
        "k",
        "y",
        "f",
        "m"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "Yŋ"
      ],
      "abbreviatedEraNames": [
        "Yŋ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "M/d/yyyy",
          "MMM d 'lia', yyyy",
          "M/d/yy"
        ],
        "D": [
          "dddd, MMMM d 'lia' yyyy",
          "MMMM d 'lia' yyyy"
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
          "MMMM d 'lia'"
        ],
        "M": [
          "MMMM d 'lia'"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};