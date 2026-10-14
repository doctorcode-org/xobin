// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "kw", 
    nativeName: "kernewek", 
    englishName: "Cornish", 
    twoLetterISOLanguageName: "kw", 
    threeLetterISOLanguageName: "cor", 
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
        currencySymbol: "£", 
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
        "Sul",
        "Lun",
        "Mth",
        "Mhr",
        "Yow",
        "Gwe",
        "Sad"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Gen",
        "Hwe",
        "Meu",
        "Ebr",
        "Me",
        "Met",
        "Gor",
        "Est",
        "Gwn",
        "Hed",
        "Du",
        "Kev",
        ""
      ],
      "abbreviatedMonthNames": [
        "Gen",
        "Hwe",
        "Meu",
        "Ebr",
        "Me",
        "Met",
        "Gor",
        "Est",
        "Gwn",
        "Hed",
        "Du",
        "Kev",
        ""
      ],
      "amDesignator": "a.m.",
      "dateSeparator": "-",
      "dayNames": [
        "dy Sul",
        "dy Lun",
        "dy Meurth",
        "dy Merher",
        "dy Yow",
        "dy Gwener",
        "dy Sadorn"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "mis Genver",
        "mis Hwevrer",
        "mis Meurth",
        "mis Ebrel",
        "mis Me",
        "mis Metheven",
        "mis Gortheren",
        "mis Est",
        "mis Gwynngala",
        "mis Hedra",
        "mis Du",
        "mis Kevardhu",
        ""
      ],
      "monthNames": [
        "mis Genver",
        "mis Hwevrer",
        "mis Meurth",
        "mis Ebrel",
        "mis Me",
        "mis Metheven",
        "mis Gortheren",
        "mis Est",
        "mis Gwynngala",
        "mis Hedra",
        "mis Du",
        "mis Kevardhu",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "p.m.",
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
        "AD"
      ],
      "abbreviatedEraNames": [
        "AD"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};