// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "brx", 
    nativeName: "बड़ो", 
    englishName: "Bodo", 
    twoLetterISOLanguageName: "brx", 
    threeLetterISOLanguageName: "brx", 
    listSeparator: ";", 
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
        currencyNegativePattern: 9, 
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
        "रबि",
        "सम",
        "मंगल",
        "बुध",
        "बिस्थि",
        "सुखुर",
        "सनि"
      ],
      "abbreviatedMonthGenitiveNames": [
        "जान",
        "फेब",
        "मार्च",
        "एप्रि",
        "मे",
        "जुन",
        "जुल",
        "आग",
        "सेप",
        "अक्ट’",
        "नवे",
        "डिसे",
        ""
      ],
      "abbreviatedMonthNames": [
        "जान",
        "फेब",
        "मार्च",
        "एप्रि",
        "मे",
        "जुन",
        "जुल",
        "आग",
        "सेप",
        "अक्ट’",
        "नवे",
        "डिसे",
        ""
      ],
      "amDesignator": "फुं",
      "dateSeparator": "-",
      "dayNames": [
        "रबिबार",
        "समबार",
        "मंगलबार",
        "बुधबार",
        "बिस्थिबार",
        "सुुखुरबार",
        "सनिबार"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "d MMMM yyyy, dddd tt h:mm:ss",
      "longDatePattern": "d MMMM yyyy, dddd",
      "longTimePattern": "tt h:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "जानुवारी",
        "फेब्रूवारी",
        "मार्च",
        "एप्रिल",
        "मे",
        "जुन",
        "जुलाई",
        "आगष्ट",
        "सेप्थेम्बर",
        "अक्ट’बर",
        "नवेम्बर",
        "डिसेम्बर",
        ""
      ],
      "monthNames": [
        "जानुवारी",
        "फेब्रूवारी",
        "मार्च",
        "एप्रिल",
        "मे",
        "जुन",
        "जुलाई",
        "आगष्ट",
        "सेप्थेम्बर",
        "अक्ट’बर",
        "नवेम्बर",
        "डिसेम्बर",
        ""
      ],
      "nativeCalendarName": "ग्रेग’रियान फान्जामुथि",
      "pmDesignator": "बेलासे",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd-MM-yyyy",
      "shortestDayNames": [
        "र",
        "स",
        "मं",
        "बु",
        "बि",
        "सु",
        "स"
      ],
      "shortTimePattern": "tt नि h:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ए.दि"
      ],
      "abbreviatedEraNames": [
        "ए.दि"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd-MM-yyyy",
          "d MMM, yyyy"
        ],
        "D": [
          "d MMMM yyyy, dddd",
          "d MMMM, yyyy"
        ],
        "t": [
          "tt नि h:mm"
        ],
        "T": [
          "tt h:mm:ss"
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};