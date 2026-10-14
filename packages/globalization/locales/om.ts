// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 114, 
    name: "om", 
    nativeName: "Oromoo", 
    englishName: "Oromo", 
    twoLetterISOLanguageName: "om", 
    threeLetterISOLanguageName: "orm", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Br", 
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
        "Dil",
        "Wix",
        "Qib",
        "Rob",
        "Kam",
        "Jim",
        "San"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Ama",
        "Gur",
        "Bit",
        "Elb",
        "Cam",
        "Wax",
        "Ado",
        "Hag",
        "Ful",
        "Onk",
        "Sad",
        "Mud",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ama",
        "Gur",
        "Bit",
        "Elb",
        "Cam",
        "Wax",
        "Ado",
        "Hag",
        "Ful",
        "Onk",
        "Sad",
        "Mud",
        ""
      ],
      "amDesignator": "WD",
      "dateSeparator": "/",
      "dayNames": [
        "Dilbata",
        "Wiixata",
        "Qibxata",
        "Roobii",
        "Kamiisa",
        "Jimaata",
        "Sanbata"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d, yyyy h:mm:ss tt",
      "longDatePattern": "dddd, MMMM d, yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Amajjii",
        "Guraandhala",
        "Bitooteessa",
        "Elba",
        "Caamsa",
        "Waxabajjii",
        "Adooleessa",
        "Hagayya",
        "Fuulbana",
        "Onkololeessa",
        "Sadaasa",
        "Muddee",
        ""
      ],
      "monthNames": [
        "Amajjii",
        "Guraandhala",
        "Bitooteessa",
        "Elba",
        "Caamsa",
        "Waxabajjii",
        "Adooleessa",
        "Hagayya",
        "Fuulbana",
        "Onkololeessa",
        "Sadaasa",
        "Muddee",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "WB",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "shortTimePattern": "h:mm tt",
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
          "dd/MM/yyyy",
          "dd-MMM-yyyy",
          "yyyy-MM-dd",
          "dd/MM/yy"
        ],
        "D": [
          "dddd, MMMM d, yyyy",
          "dd MMMM yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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