// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sd-Deva", 
    lcid: 1113, 
    name: "sd-Deva-IN", 
    nativeName: "सिन्धी (India)", 
    englishName: "Sindhi (Devanagari, India)", 
    twoLetterISOLanguageName: "sd", 
    threeLetterISOLanguageName: "snd", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₹", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 0, 
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
        nativeDigits: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "आ",
        "सू",
        "मं",
        "बुध",
        "विस",
        "जु",
        "छंछ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "जन",
        "फर",
        "मार्च",
        "अप्रै",
        "मई",
        "जून",
        "जु",
        "अग",
        "सप्टे",
        "ऑक्टो",
        "नवं",
        "डिसं",
        ""
      ],
      "abbreviatedMonthNames": [
        "जन",
        "फर",
        "मार्च",
        "अप्रै",
        "मई",
        "जून",
        "जुला",
        "अग",
        "सप्टे",
        "ऑक्टो",
        "नवं",
        "डिसं",
        ""
      ],
      "amDesignator": "सुबुह जा",
      "dateSeparator": "/",
      "dayNames": [
        "आर्त",
        "सू",
        "मं",
        "बु॒ध",
        "विस",
        "जुम",
        "छंछ"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d, yyyy h:mm:ss tt",
      "longDatePattern": "dddd, MMMM d, yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "जनवरी",
        "फरवरी",
        "मार्चु",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्ट",
        "सप्टेंबर",
        "ओक्टोबर",
        "नवंबर",
        "डिसंबर",
        ""
      ],
      "monthNames": [
        "जनवरी",
        "फरवरी",
        "मार्चु",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नवंबर",
        "डिसंबर",
        ""
      ],
      "nativeCalendarName": "ग्रेगोरियन कैलेंडरु",
      "pmDesignator": "शाम जा",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "M/d/yyyy",
      "shortestDayNames": [
        "आ",
        "सू",
        "मं",
        "बु॒",
        "वि",
        "जु",
        "छं"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "एडी"
      ],
      "abbreviatedEraNames": [
        "एडी"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "M/d/yyyy",
          "MMM d, yyyy",
          "M/d/yy"
        ],
        "D": [
          "dddd, MMMM d, yyyy",
          "MMMM d, yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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