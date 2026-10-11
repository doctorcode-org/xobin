// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "mgh", 
    nativeName: "Makua", 
    englishName: "Makhuwa-Meetto", 
    twoLetterISOLanguageName: "mgh", 
    threeLetterISOLanguageName: "mgh", 
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
        currencySymbol: "MTn", 
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
        "Sab",
        "Jtt",
        "Jnn",
        "Jtn",
        "Ara",
        "Iju",
        "Jmo"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Kwa",
        "Una",
        "Rar",
        "Che",
        "Tha",
        "Moc",
        "Sab",
        "Nan",
        "Tis",
        "Kum",
        "Moj",
        "Yel",
        ""
      ],
      "abbreviatedMonthNames": [
        "Kwa",
        "Una",
        "Rar",
        "Che",
        "Tha",
        "Moc",
        "Sab",
        "Nan",
        "Tis",
        "Kum",
        "Moj",
        "Yel",
        ""
      ],
      "amDesignator": "wichishu",
      "dateSeparator": "/",
      "dayNames": [
        "Sabato",
        "Jumatatu",
        "Jumanne",
        "Jumatano",
        "Arahamisi",
        "Ijumaa",
        "Jumamosi"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Mweri wo kwanza",
        "Mweri wo unayeli",
        "Mweri wo uneraru",
        "Mweri wo unecheshe",
        "Mweri wo unethanu",
        "Mweri wo thanu na mocha",
        "Mweri wo saba",
        "Mweri wo nane",
        "Mweri wo tisa",
        "Mweri wo kumi",
        "Mweri wo kumi na moja",
        "Mweri wo kumi na yel’li",
        ""
      ],
      "monthNames": [
        "Mweri wo kwanza",
        "Mweri wo unayeli",
        "Mweri wo uneraru",
        "Mweri wo unecheshe",
        "Mweri wo unethanu",
        "Mweri wo thanu na mocha",
        "Mweri wo saba",
        "Mweri wo nane",
        "Mweri wo tisa",
        "Mweri wo kumi",
        "Mweri wo kumi na moja",
        "Mweri wo kumi na yel’li",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "mchochil’l",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "J",
        "J",
        "J",
        "A",
        "I",
        "J"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "YY"
      ],
      "abbreviatedEraNames": [
        "YY"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
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