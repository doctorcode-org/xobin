// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 87, 
    name: "kok", 
    nativeName: "कोंकणी", 
    englishName: "Konkani", 
    twoLetterISOLanguageName: "kok", 
    threeLetterISOLanguageName: "kok", 
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
        percentNegativePattern: 1, 
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
        "आयतार",
        "सोमार",
        "मंगळार",
        "बुधवार",
        "बिरेस्तार",
        "शुक्रार",
        "शेनवार"
      ],
      "abbreviatedMonthGenitiveNames": [
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रील",
        "मे",
        "जून",
        "जुलय",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर",
        ""
      ],
      "abbreviatedMonthNames": [
        "जाने",
        "फेब्रु",
        "मार्च",
        "एप्री",
        "मे",
        "जून",
        "जुल",
        "ऑग",
        "सप्टें",
        "ऑक्टो",
        "नो",
        "डिसे",
        ""
      ],
      "amDesignator": "सकाळ",
      "dateSeparator": "-",
      "dayNames": [
        "आयतार",
        "सोमार",
        "मंगळार",
        "बुधवार",
        "बिरेस्तार",
        "शुक्रार",
        "शेनवार"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रील",
        "मे",
        "जून",
        "जुलय",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर",
        ""
      ],
      "monthNames": [
        "जानेवारी",
        "फेब्रुवारी",
        "मार्च",
        "एप्रील",
        "मे",
        "जून",
        "जुलय",
        "ऑगस्ट",
        "सप्टेंबर",
        "ऑक्टोबर",
        "नोव्हेंबर",
        "डिसेंबर",
        ""
      ],
      "nativeCalendarName": "ग्रेगोरियन कॅलॅण्डर",
      "pmDesignator": "सांज",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d-M-yyyy",
      "shortestDayNames": [
        "आ",
        "सो",
        "मं",
        "बु",
        "ब",
        "शु",
        "शे"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM, yyyy",
      "eraNames": [
        "क्रि.श."
      ],
      "abbreviatedEraNames": [
        "क्रि.श."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d-M-yyyy",
          "d-MMM-yyyy",
          "d-M-yy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
        ],
        "y": [
          "MMMM, yyyy"
        ],
        "Y": [
          "MMMM, yyyy"
        ],
        "m": [
          "d MMMM"
        ],
        "M": [
          "d MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};