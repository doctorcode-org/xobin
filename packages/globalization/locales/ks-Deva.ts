// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ks", 
    lcid: 4096, 
    name: "ks-Deva", 
    nativeName: "कॉशुर", 
    englishName: "Kashmiri (Devanagari)", 
    twoLetterISOLanguageName: "ks", 
    threeLetterISOLanguageName: "kas", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3, 2], 
        numberGroupSizes: [3, 2], 
        percentGroupSizes: [3, 2], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₹", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 12, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "आथवार",
        "चंदिरवार",
        "बुवार",
        "बोदवार",
        "ब्रेसवार",
        "जुम्मा",
        "बटवार"
      ],
      "abbreviatedMonthGenitiveNames": [
        "जनवरी",
        "फ़रवरी",
        "मार्च",
        "अप्रैल",
        "मे",
        "जून",
        "जुलाई",
        "अगस्त",
        "सतुंबर",
        "अकतुम्बर",
        "नवूमबर",
        "दसूमबर",
        ""
      ],
      "abbreviatedMonthNames": [
        "जनवरी",
        "फ़रवरी",
        "मार्च",
        "अप्रैल",
        "मे",
        "जून",
        "जुलाई",
        "अगस्त",
        "सतुंबर",
        "अकतुम्बर",
        "नवूमबर",
        "दसूमबर",
        ""
      ],
      "amDesignator": "ये एम",
      "dateSeparator": "/",
      "dayNames": [
        "आथवार",
        "चंदिरवार",
        "बुवार",
        "बोदवार",
        "ब्रेसवार",
        "जुम्मा",
        "बटवार"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy tt h:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "tt h:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "जनवरी",
        "फ़रवरी",
        "मार्च",
        "अप्रैल",
        "मे",
        "जून",
        "जुलाई",
        "अगस्त",
        "सतुंबर",
        "अकतुम्बर",
        "नवूमबर",
        "दसूमबर",
        ""
      ],
      "monthNames": [
        "जनवरी",
        "फ़रवरी",
        "मार्च",
        "अप्रैल",
        "मे",
        "जून",
        "जुलाई",
        "अगस्त",
        "सतुंबर",
        "अकतुम्बर",
        "नवूमबर",
        "दसूमबर",
        ""
      ],
      "nativeCalendarName": "ग्रिगोरियन कैलंडर",
      "pmDesignator": "पी एम",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "अ",
        "च",
        "ब",
        "ब",
        "ब",
        "ज",
        "ब"
      ],
      "shortTimePattern": "tt h:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
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
          "d/M/yyyy",
          "d MMM yyyy",
          "M/d/yyyy",
          "d/M/yy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "tt h:mm"
        ],
        "T": [
          "tt h:mm:ss"
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