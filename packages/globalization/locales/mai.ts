// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    "parent": "",
    "lcid": 4096,
    "name": "mai",
    "nativeName": "मैथिली",
    "englishName": "Maithili",
    "twoLetterISOLanguageName": "mai",
    "threeLetterISOLanguageName": "mai",
    "listSeparator": ",",
    "isRightToLeft": false,
    "isNeutralCulture": true,
    "numberFormat": {
        "currencyDecimalDigits": 2,
        "currencyDecimalSeparator": ".",
        "currencyGroupSizes": [
            3
        ],
        "numberGroupSizes": [
            3
        ],
        "percentGroupSizes": [
            3
        ],
        "currencyGroupSeparator": ",",
        "currencySymbol": "¤",
        "naNSymbol": "NaN",
        "currencyNegativePattern": 9,
        "numberNegativePattern": 1,
        "percentPositivePattern": 1,
        "percentNegativePattern": 1,
        "negativeInfinitySymbol": "-∞",
        "negativeSign": "-",
        "numberDecimalDigits": 3,
        "numberDecimalSeparator": ".",
        "numberGroupSeparator": ",",
        "currencyPositivePattern": 2,
        "positiveInfinitySymbol": "∞",
        "positiveSign": "+",
        "percentDecimalDigits": 3,
        "percentDecimalSeparator": ".",
        "percentGroupSeparator": ",",
        "percentSymbol": "%",
        "perMilleSymbol": "‰",
        "nativeDigits": [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ],
        "digitSubstitution": 1
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
        "जन॰",
        "फ़र॰",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुल॰",
        "अग॰",
        "सित॰",
        "अक्तू॰",
        "नव॰",
        "दिस॰",
        ""
      ],
      "abbreviatedMonthNames": [
        "जन॰",
        "फर॰",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुल॰",
        "अग॰",
        "सित॰",
        "अक्तू॰",
        "नव॰",
        "दिस॰",
        ""
      ],
      "amDesignator": "भोर",
      "dateSeparator": "/",
      "dayNames": [
        "रवि दिन",
        "सोम दिन",
        "मंगल दिन",
        "बुध दिन",
        "बृहस्पति दिन",
        "शुक्र दिन",
        "शनि दिन"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "जनवरी",
        "फरवरी",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्त",
        "सितंबर",
        "अक्तूबर",
        "नवंबर",
        "दिसंबर",
        ""
      ],
      "monthNames": [
        "जनवरी",
        "फरवरी",
        "मार्च",
        "अप्रैल",
        "मई",
        "जून",
        "जुलाई",
        "अगस्त",
        "सितंबर",
        "अक्टूबर",
        "नवंबर",
        "दिसंबर",
        ""
      ],
      "nativeCalendarName": "ग्रेगोरियन कैलेंडर",
      "pmDesignator": "सांझ",
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
        "ईसवी"
      ],
      "abbreviatedEraNames": [
        "ईसवी"
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
