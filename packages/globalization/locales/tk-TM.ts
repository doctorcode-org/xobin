// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "tk", 
    lcid: 1090, 
    name: "tk-TM", 
    nativeName: "Türkmen dili (Türkmenistan)", 
    englishName: "Turkmen (Turkmenistan)", 
    twoLetterISOLanguageName: "tk", 
    threeLetterISOLanguageName: "tuk", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "m.", 
        naNSymbol: "san däl", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 1, 
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
        "Ýek",
        "Duş",
        "Siş",
        "Çar",
        "Pen",
        "Ann",
        "Şen"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ýan",
        "few",
        "mart",
        "apr",
        "maý",
        "iýun",
        "iýul",
        "awg",
        "sen",
        "okt",
        "noý",
        "dek",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ýan",
        "Few",
        "Mar",
        "Apr",
        "Maý",
        "Iýun",
        "Iýul",
        "Awg",
        "Sen",
        "Okt",
        "Noý",
        "Dek",
        ""
      ],
      "amDesignator": "günortadan öň",
      "dateSeparator": ".",
      "dayNames": [
        "Ýekşenbe",
        "Duşenbe",
        "Sişenbe",
        "Çarşenbe",
        "Penşenbe",
        "Anna",
        "Şenbe"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "d MMMM yyyy dddd HH:mm:ss",
      "longDatePattern": "d MMMM yyyy dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "ýanwar",
        "fewral",
        "mart",
        "aprel",
        "maý",
        "iýun",
        "iýul",
        "awgust",
        "sentýabr",
        "oktýabr",
        "noýabr",
        "dekabr",
        ""
      ],
      "monthNames": [
        "Ýanwar",
        "Fewral",
        "Mart",
        "Aprel",
        "Maý",
        "Iýun",
        "Iýul",
        "Awgust",
        "Sentýabr",
        "Oktýabr",
        "Noýabr",
        "Dekabr",
        ""
      ],
      "nativeCalendarName": "Grigorian senenamasy",
      "pmDesignator": "günortadan soň",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "Ý",
        "D",
        "S",
        "Ç",
        "P",
        "A",
        "Ş"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "B.e."
      ],
      "abbreviatedEraNames": [
        "B.e."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d MMM yyyy"
        ],
        "D": [
          "d MMMM yyyy dddd",
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