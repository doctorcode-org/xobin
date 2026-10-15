// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "dav", 
    lcid: 4096, 
    name: "dav-KE", 
    nativeName: "Kitaita (Kenya)", 
    englishName: "Taita (Kenya)", 
    twoLetterISOLanguageName: "dav", 
    threeLetterISOLanguageName: "dav", 
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
        "Jum",
        "Jim",
        "Kaw",
        "Kad",
        "Kan",
        "Kas",
        "Ngu"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Imb",
        "Kaw",
        "Kad",
        "Kan",
        "Kas",
        "Kar",
        "Mfu",
        "Wun",
        "Ike",
        "Iku",
        "Imw",
        "Iwi",
        ""
      ],
      "abbreviatedMonthNames": [
        "Imb",
        "Kaw",
        "Kad",
        "Kan",
        "Kas",
        "Kar",
        "Mfu",
        "Wun",
        "Ike",
        "Iku",
        "Imw",
        "Iwi",
        ""
      ],
      "amDesignator": "Luma lwa K",
      "dateSeparator": "/",
      "dayNames": [
        "Ituku ja jumwa",
        "Kuramuka jimweri",
        "Kuramuka kawi",
        "Kuramuka kadadu",
        "Kuramuka kana",
        "Kuramuka kasanu",
        "Kifula nguwo"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Mori ghwa imbiri",
        "Mori ghwa kawi",
        "Mori ghwa kadadu",
        "Mori ghwa kana",
        "Mori ghwa kasanu",
        "Mori ghwa karandadu",
        "Mori ghwa mfungade",
        "Mori ghwa wunyanya",
        "Mori ghwa ikenda",
        "Mori ghwa ikumi",
        "Mori ghwa ikumi na imweri",
        "Mori ghwa ikumi na iwi",
        ""
      ],
      "monthNames": [
        "Mori ghwa imbiri",
        "Mori ghwa kawi",
        "Mori ghwa kadadu",
        "Mori ghwa kana",
        "Mori ghwa kasanu",
        "Mori ghwa karandadu",
        "Mori ghwa mfungade",
        "Mori ghwa wunyanya",
        "Mori ghwa ikenda",
        "Mori ghwa ikumi",
        "Mori ghwa ikumi na imweri",
        "Mori ghwa ikumi na iwi",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "luma lwa p",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "J",
        "J",
        "K",
        "K",
        "K",
        "K",
        "N"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "BK"
      ],
      "abbreviatedEraNames": [
        "BK"
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