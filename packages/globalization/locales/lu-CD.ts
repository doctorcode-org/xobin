// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "lu", 
    lcid: 4096, 
    name: "lu-CD", 
    nativeName: "Tshiluba (Ditunga wa Kongu)", 
    englishName: "Luba-Katanga (Congo DRC)", 
    twoLetterISOLanguageName: "lu", 
    threeLetterISOLanguageName: "lub", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "FC", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
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
        "Lum",
        "Nko",
        "Ndy",
        "Ndg",
        "Njw",
        "Ngv",
        "Lub"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Cio",
        "Lui",
        "Lus",
        "Muu",
        "Lum",
        "Luf",
        "Kab",
        "Lush",
        "Lut",
        "Lun",
        "Kas",
        "Cis",
        ""
      ],
      "abbreviatedMonthNames": [
        "Cio",
        "Lui",
        "Lus",
        "Muu",
        "Lum",
        "Luf",
        "Kab",
        "Lush",
        "Lut",
        "Lun",
        "Kas",
        "Cis",
        ""
      ],
      "amDesignator": "Dinda",
      "dateSeparator": "/",
      "dayNames": [
        "Lumingu",
        "Nkodya",
        "Ndàayà",
        "Ndangù",
        "Njòwa",
        "Ngòvya",
        "Lubingu"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Ciongo",
        "Lùishi",
        "Lusòlo",
        "Mùuyà",
        "Lumùngùlù",
        "Lufuimi",
        "Kabàlàshìpù",
        "Lùshìkà",
        "Lutongolo",
        "Lungùdi",
        "Kaswèkèsè",
        "Ciswà",
        ""
      ],
      "monthNames": [
        "Ciongo",
        "Lùishi",
        "Lusòlo",
        "Mùuyà",
        "Lumùngùlù",
        "Lufuimi",
        "Kabàlàshìpù",
        "Lùshìkà",
        "Lutongolo",
        "Lungùdi",
        "Kaswèkèsè",
        "Ciswà",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "Dilolo",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "L",
        "N",
        "N",
        "N",
        "N",
        "N",
        "L"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "kny. Y. K."
      ],
      "abbreviatedEraNames": [
        "kny. Y. K."
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