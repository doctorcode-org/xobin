// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 88, 
    name: "mni", 
    nativeName: "মৈতৈলোন্", 
    englishName: "Manipuri", 
    twoLetterISOLanguageName: "mni", 
    threeLetterISOLanguageName: "mni", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
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
        nativeDigits: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "নোংমাইজিং",
        "নিংথৌকাবা",
        "লৈবাকপোকপা",
        "য়ুমশকৈশা",
        "শগোলশেন",
        "ইরাই",
        "থাংজ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "জানুৱারি",
        "ফেব্রুৱারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "ওক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
        ""
      ],
      "abbreviatedMonthNames": [
        "জানু",
        "ফেব্রু",
        "মার",
        "এপ্রি",
        "মে",
        "জুন",
        "জুলা",
        "আগ",
        "সেপ্ট",
        "ওক্টো",
        "নভে",
        "ডিসে",
        ""
      ],
      "amDesignator": "এ এম",
      "dateSeparator": "/",
      "dayNames": [
        "নোংমাইজিং",
        "নিংথৌকাবা",
        "লৈবাকপোকপা",
        "য়ুমশকৈশা",
        "শগোলশেন",
        "ইরাই",
        "থাংজ"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "MMMM d, yyyy, dddd h:mm:ss tt",
      "longDatePattern": "MMMM d, yyyy, dddd",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "জানুৱারি",
        "ফেব্রুৱারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "ওক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
        ""
      ],
      "monthNames": [
        "জানুৱারি",
        "ফেব্রুৱারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "ওগষ্ট",
        "সেপ্টেম্বর",
        "ওক্টোবর",
        "নবেম্বর",
        "ডিসেম্বর",
        ""
      ],
      "nativeCalendarName": "গ্রিগোরিয়ান কেলেন্দর",
      "pmDesignator": "পি এম",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "নো",
        "নিং",
        "লৈ",
        "য়ুম",
        "শগ",
        "ইরা",
        "থাং"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "খৃ: মতুং"
      ],
      "abbreviatedEraNames": [
        "খৃ: মতুং"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "MMM d, yyyy",
          "d/M/yy"
        ],
        "D": [
          "MMMM d, yyyy, dddd",
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};