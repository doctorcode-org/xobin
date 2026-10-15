// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "km", 
    lcid: 1107, 
    name: "km-KH", 
    nativeName: "ខ្មែរ (កម្ពុជា)", 
    englishName: "Khmer (Cambodia)", 
    twoLetterISOLanguageName: "km", 
    threeLetterISOLanguageName: "khm", 
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
        currencySymbol: "៛", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 2, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",",
        numberGroupSeparator: ",", 
        currencyPositivePattern: 1, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "អាទិត្យ",
        "ចន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហ",
        "សុក្រ",
        "សៅរ៍"
      ],
      "abbreviatedMonthGenitiveNames": [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ",
        ""
      ],
      "abbreviatedMonthNames": [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "អាទិត្យ",
        "ចន្ទ",
        "អង្គារ",
        "ពុធ",
        "ព្រហស្បតិ៍",
        "សុក្រ",
        "សៅរ៍"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ",
        ""
      ],
      "monthNames": [
        "មករា",
        "កុម្ភៈ",
        "មីនា",
        "មេសា",
        "ឧសភា",
        "មិថុនា",
        "កក្កដា",
        "សីហា",
        "កញ្ញា",
        "តុលា",
        "វិច្ឆិកា",
        "ធ្នូ",
        ""
      ],
      "nativeCalendarName": "ប្រតិទិន​ហ្សកហ្ស៊ី",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "អ",
        "ច",
        "អ",
        "ព",
        "ព",
        "ស",
        "ស"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "គ.ស."
      ],
      "abbreviatedEraNames": [
        "គ.ស."
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