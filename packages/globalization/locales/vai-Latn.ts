// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "vai", 
    lcid: 4096, 
    name: "vai-Latn", 
    nativeName: "Vai", 
    englishName: "Vai (Latin)", 
    twoLetterISOLanguageName: "vai", 
    threeLetterISOLanguageName: "vai", 
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
        currencySymbol: "$", 
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
        nativeDigits: ["꘠", "꘡", "꘢", "꘣", "꘤", "꘥", "꘦", "꘧", "꘨", "꘩"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "lahadi",
        "tɛɛnɛɛ",
        "talata",
        "alaba",
        "aimisa",
        "aijima",
        "siɓiti"
      ],
      "abbreviatedMonthGenitiveNames": [
        "luukao kemã",
        "ɓandaɓu",
        "vɔɔ",
        "fulu",
        "goo",
        "juŋ",
        "julai",
        "kɔnde",
        "saah",
        "galo",
        "kenpkato ɓololɔ",
        "luukao lɔma",
        ""
      ],
      "abbreviatedMonthNames": [
        "luukao kemã",
        "ɓandaɓu",
        "vɔɔ",
        "fulu",
        "goo",
        "juŋ",
        "julai",
        "kɔnde",
        "saah",
        "galo",
        "kenpkato ɓololɔ",
        "luukao lɔma",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "lahadi",
        "tɛɛnɛɛ",
        "talata",
        "alaba",
        "aimisa",
        "aijima",
        "siɓiti"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "luukao kemã",
        "ɓandaɓu",
        "vɔɔ",
        "fulu",
        "goo",
        "juŋ",
        "julai",
        "kɔnde",
        "saah",
        "galo",
        "kenpkato ɓololɔ",
        "luukao lɔma",
        ""
      ],
      "monthNames": [
        "luukao kemã",
        "ɓandaɓu",
        "vɔɔ",
        "fulu",
        "goo",
        "juŋ",
        "julai",
        "kɔnde",
        "saah",
        "galo",
        "kenpkato ɓololɔ",
        "luukao lɔma",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
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
          "dd/MM/yyyy",
          "d MMM yyyy",
          "M/d/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};