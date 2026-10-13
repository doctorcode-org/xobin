// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sa", 
    lcid: 1103, 
    name: "sa-IN", 
    nativeName: "संस्कृत (भारतम्)", 
    englishName: "Sanskrit (India)", 
    twoLetterISOLanguageName: "sa", 
    threeLetterISOLanguageName: "san", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
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
        percentPositivePattern: 0, 
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
        "रवि",
        "सोम",
        "मंगल",
        "बुध",
        "गुरु",
        "शुक्र",
        "शनि"
      ],
      "abbreviatedMonthGenitiveNames": [
        "जनवरी:",
        "फरवरी:",
        "मार्च:",
        "अप्रैल:",
        "मई",
        "जून:",
        "जुलाई:",
        "अगस्त:",
        "सितंबर:",
        "अक्तूबर:",
        "नवंबर:",
        "दिसंबर:",
        ""
      ],
      "abbreviatedMonthNames": [
        "जनवरी:",
        "फरवरी:",
        "मार्च:",
        "अप्रैल:",
        "मई",
        "जून:",
        "जुलाई:",
        "अगस्त:",
        "सितंबर:",
        "अक्तूबर:",
        "नवंबर:",
        "दिसंबर:",
        ""
      ],
      "amDesignator": "पूर्वाह्न",
      "dateSeparator": "/",
      "dayNames": [
        "रविवासरः",
        "सोमवासरः",
        "मंगलवासरः",
        "बुधवासरः",
        "गुरुवासर:",
        "शुक्रवासरः",
        "शनिवासरः"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "जनवरीमासः",
        "फरवरीमासः",
        "मार्चमासः",
        "अप्रैलमासः",
        "मईमासः",
        "जूनमासः",
        "जुलाईमासः",
        "अगस्तमासः",
        "सितंबरमासः",
        "अक्तूबरमासः",
        "नवंबरमासः",
        "दिसंबरमासः",
        ""
      ],
      "monthNames": [
        "जनवरीमासः",
        "फरवरीमासः",
        "मार्चमासः",
        "अप्रैलमासः",
        "मईमासः",
        "जूनमासः",
        "जुलाईमासः",
        "अगस्तमासः",
        "सितंबरमासः",
        "अक्तूबरमासः",
        "नवंबरमासः",
        "दिसंबरमासः",
        ""
      ],
      "nativeCalendarName": "ग्रेगोरियन पञ्चाङ्ग",
      "pmDesignator": "अपराह्न",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "र",
        "सो",
        "मं",
        "बु",
        "गु",
        "शु",
        "श"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "CE"
      ],
      "abbreviatedEraNames": [
        "CE"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM yyyy",
          "d/M/yy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
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