// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "gn", 
    lcid: 1140, 
    name: "gn-PY", 
    nativeName: "Avañe’ẽ (Paraguái)", 
    englishName: "Guarani (Paraguay)", 
    twoLetterISOLanguageName: "gn", 
    threeLetterISOLanguageName: "grn", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "₲", 
        naNSymbol: "ndaha’éi papaha", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-Infinito", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "Infinito", 
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
        "Arateĩ",
        "Arakõi",
        "Araapy",
        "Ararundy",
        "Arapo",
        "Arapoteĩ",
        "Arapokõi"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jasyteĩ",
        "Jasykõi",
        "Jasyapy",
        "Jasyrundy",
        "Jasypo",
        "Jasypoteĩ",
        "Jasypokõi",
        "Jasypoapy",
        "Jasyporundy",
        "Jasypa",
        "Jasypateĩ",
        "Jasypakõi",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jasyteĩ",
        "Jasykõi",
        "Jasyapy",
        "Jasyrundy",
        "Jasypo",
        "Jasypoteĩ",
        "Jasypokõi",
        "Jasypoapy",
        "Jasyporundy",
        "Jasypa",
        "Jasypateĩ",
        "Jasypakõi",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Arateĩ",
        "Arakõi",
        "Araapy",
        "Ararundy",
        "Arapo",
        "Arapoteĩ",
        "Arapokõi"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Jasyteĩ",
        "Jasykõi",
        "Jasyapy",
        "Jasyrundy",
        "Jasypo",
        "Jasypoteĩ",
        "Jasypokõi",
        "Jasypoapy",
        "Jasyporundy",
        "Jasypa",
        "Jasypateĩ",
        "Jasypakõi",
        ""
      ],
      "monthNames": [
        "Jasyteĩ",
        "Jasykõi",
        "Jasyapy",
        "Jasyrundy",
        "Jasypo",
        "Jasypoteĩ",
        "Jasypokõi",
        "Jasypoapy",
        "Jasyporundy",
        "Jasypa",
        "Jasypateĩ",
        "Jasypakõi",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
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
          "yyyy-MM-dd",
          "yyyy MMM d",
          "yyyy-M-d"
        ],
        "D": [
          "yyyy MMMM d, dddd",
          "yyyy MMMM d"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};