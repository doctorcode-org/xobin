// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "rw", 
    lcid: 1159, 
    name: "rw-RW", 
    nativeName: "Kinyarwanda (U Rwanda)", 
    englishName: "Kinyarwanda (Rwanda)", 
    twoLetterISOLanguageName: "rw", 
    threeLetterISOLanguageName: "kin", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "RF", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 2, 
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
        "cyu.",
        "mbe.",
        "kab.",
        "gtu.",
        "kan.",
        "gnu.",
        "gnd."
      ],
      "abbreviatedMonthGenitiveNames": [
        "mut.",
        "gas.",
        "wer.",
        "mat.",
        "gic.",
        "kam.",
        "nya.",
        "kan.",
        "nze.",
        "ukw.",
        "ugu.",
        "uku.",
        ""
      ],
      "abbreviatedMonthNames": [
        "mut.",
        "gas.",
        "wer.",
        "mat.",
        "gic.",
        "kam.",
        "nya.",
        "kan.",
        "nze.",
        "ukw.",
        "ugu.",
        "uku.",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Ku cyumweru",
        "Kuwa mbere",
        "Kuwa kabiri",
        "Kuwa gatatu",
        "Kuwa kane",
        "Kuwa gatanu",
        "Kuwa gatandatu"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Mutarama",
        "Gashyantare",
        "Werurwe",
        "Mata",
        "Gicurasi",
        "Kamena",
        "Nyakanga",
        "Kanama",
        "Nzeli",
        "Ukwakira",
        "Ugushyingo",
        "Ukuboza",
        ""
      ],
      "monthNames": [
        "Mutarama",
        "Gashyantare",
        "Werurwe",
        "Mata",
        "Gicurasi",
        "Kamena",
        "Nyakanga",
        "Kanama",
        "Nzeli",
        "Ukwakira",
        "Ugushyingo",
        "Ukuboza",
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
          "yyyy MMM d"
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