// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "az", 
    lcid: 30764, 
    name: "az-Latn", 
    nativeName: "azərbaycan", 
    englishName: "Azerbaijani (Latin)", 
    twoLetterISOLanguageName: "az", 
    threeLetterISOLanguageName: "aze", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "₼", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
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
        "B.",
        "B.E.",
        "Ç.A.",
        "Ç.",
        "C.A.",
        "C.",
        "Ş."
      ],
      "abbreviatedMonthGenitiveNames": [
        "yan",
        "fev",
        "mar",
        "apr",
        "may",
        "iyn",
        "iyl",
        "avq",
        "sen",
        "okt",
        "noy",
        "dek",
        ""
      ],
      "abbreviatedMonthNames": [
        "yan",
        "fev",
        "mar",
        "apr",
        "may",
        "iyn",
        "iyl",
        "avq",
        "sen",
        "okt",
        "noy",
        "dek",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ".",
      "dayNames": [
        "bazar",
        "bazar ertəsi",
        "çərşənbə axşamı",
        "çərşənbə",
        "cümə axşamı",
        "cümə",
        "şənbə"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "d MMMM yyyy, dddd HH:mm:ss",
      "longDatePattern": "d MMMM yyyy, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avqust",
        "sentyabr",
        "oktyabr",
        "noyabr",
        "dekabr",
        ""
      ],
      "monthNames": [
        "yanvar",
        "fevral",
        "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avqust",
        "sentyabr",
        "oktyabr",
        "noyabr",
        "dekabr",
        ""
      ],
      "nativeCalendarName": "Qreqorian təqvimi",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "7",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "y.e."
      ],
      "abbreviatedEraNames": [
        "y.e."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "d MMM yyyy",
          "dd.MM.yy"
        ],
        "D": [
          "d MMMM yyyy, dddd",
          "d MMMM yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};