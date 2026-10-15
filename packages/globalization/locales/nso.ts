// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 108, 
    name: "nso", 
    nativeName: "Sesotho sa Leboa", 
    englishName: "Sesotho sa Leboa", 
    twoLetterISOLanguageName: "nso", 
    threeLetterISOLanguageName: "nso", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "R", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Lam",
        "Mos",
        "Bed",
        "Rar",
        "Ne",
        "Hla",
        "Mok"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Phere",
        "Dibo",
        "Hlak",
        "Mora",
        "Mopi",
        "Phupu",
        "Mose",
        "Phato",
        "Lewe",
        "Dipha",
        "Diba",
        "Manth",
        ""
      ],
      "abbreviatedMonthNames": [
        "Phere",
        "Dibo",
        "Hlak",
        "Mora",
        "Mopi",
        "Phupu",
        "Mose",
        "Phato",
        "Lewe",
        "Dipha",
        "Diba",
        "Manth",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Lamorena",
        "Musopologo",
        "Labobedi",
        "Laboraro",
        "Labone",
        "Labohlano",
        "Mokibelo"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Pherekgong",
        "Dibokwane",
        "Hlakola",
        "Moranang",
        "Mopitlo",
        "Phupu",
        "Mosegemanye",
        "Phato",
        "Lewedi",
        "Diphalane",
        "Dibatsela",
        "Manthole",
        ""
      ],
      "monthNames": [
        "Pherekgong",
        "Dibokwane",
        "Hlakola",
        "Moranang",
        "Mopitlo",
        "Phupu",
        "Mosegemanye",
        "Phato",
        "Lewedi",
        "Diphalane",
        "Dibatsela",
        "Manthole",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "L",
        "M",
        "B",
        "R",
        "N",
        "H",
        "M"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};