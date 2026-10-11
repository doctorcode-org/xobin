// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "st", 
    lcid: 4096, 
    name: "st-LS", 
    nativeName: "Sesotho (Lesotho)", 
    englishName: "Sesotho (Lesotho)", 
    twoLetterISOLanguageName: "st", 
    threeLetterISOLanguageName: "sot", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "R", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Son",
        "Mma",
        "Bed",
        "Rar",
        "Ne",
        "Hla",
        "Moq"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Phe",
        "Kol",
        "Ube",
        "Mme",
        "Mot",
        "Jan",
        "Upu",
        "Pha",
        "Leo",
        "Mph",
        "Pun",
        "Tsh",
        ""
      ],
      "abbreviatedMonthNames": [
        "Phe",
        "Kol",
        "Ube",
        "Mme",
        "Mot",
        "Jan",
        "Upu",
        "Pha",
        "Leo",
        "Mph",
        "Pun",
        "Tsh",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Sontaha",
        "Mmantaha",
        "Labobedi",
        "Laboraru",
        "Labone",
        "Labohlane",
        "Moqebelo"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd h:mm:ss tt",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Phesekgong",
        "Hlakola",
        "Hlakubele",
        "Mmese",
        "Motsheanong",
        "Phupjane",
        "Phupu",
        "Phata",
        "Leotshe",
        "Mphalane",
        "Pundungwane",
        "Tshitwe",
        ""
      ],
      "monthNames": [
        "Phesekgong",
        "Hlakola",
        "Hlakubele",
        "Mmese",
        "Motsheanong",
        "Phupjane",
        "Phupu",
        "Phata",
        "Leotshe",
        "Mphalane",
        "Pundungwane",
        "Tshitwe",
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
      "shortTimePattern": "h:mm tt",
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
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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