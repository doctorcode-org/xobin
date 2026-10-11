// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "nus", 
    lcid: 4096, 
    name: "nus-SS", 
    nativeName: "Thok Nath (South Sudan)", 
    englishName: "Nuer (South Sudan)", 
    twoLetterISOLanguageName: "nus", 
    threeLetterISOLanguageName: "nus", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
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
        "Cäŋ",
        "Jiec",
        "Rɛw",
        "Diɔ̱k",
        "Ŋuaan",
        "Dhieec",
        "Bäkɛl"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Tiop",
        "Pɛt",
        "Duɔ̱ɔ̱",
        "Guak",
        "Duä",
        "Kor",
        "Pay",
        "Thoo",
        "Tɛɛ",
        "Laa",
        "Kur",
        "Tid",
        ""
      ],
      "abbreviatedMonthNames": [
        "Tiop",
        "Pɛt",
        "Duɔ̱ɔ̱",
        "Guak",
        "Duä",
        "Kor",
        "Pay",
        "Thoo",
        "Tɛɛ",
        "Laa",
        "Kur",
        "Tid",
        ""
      ],
      "amDesignator": "RW",
      "dateSeparator": "/",
      "dayNames": [
        "Cäŋ kuɔth",
        "Jiec la̱t",
        "Rɛw lätni",
        "Diɔ̱k lätni",
        "Ŋuaan lätni",
        "Dhieec lätni",
        "Bäkɛl lätni"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Tiop thar pɛt",
        "Pɛt",
        "Duɔ̱ɔ̱ŋ",
        "Guak",
        "Duät",
        "Kornyoot",
        "Pay yie̱tni",
        "Tho̱o̱r",
        "Tɛɛr",
        "Laath",
        "Kur",
        "Tio̱p in di̱i̱t",
        ""
      ],
      "monthNames": [
        "Tiop thar pɛt",
        "Pɛt",
        "Duɔ̱ɔ̱ŋ",
        "Guak",
        "Duät",
        "Kornyoot",
        "Pay yie̱tni",
        "Tho̱o̱r",
        "Tɛɛr",
        "Laath",
        "Kur",
        "Tio̱p in di̱i̱t",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "TŊ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/MM/yyyy",
      "shortestDayNames": [
        "C",
        "J",
        "R",
        "D",
        "Ŋ",
        "D",
        "B"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "ƐY"
      ],
      "abbreviatedEraNames": [
        "ƐY"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
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
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};