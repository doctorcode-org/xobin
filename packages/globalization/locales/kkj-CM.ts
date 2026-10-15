// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "kkj", 
    lcid: 4096, 
    name: "kkj-CM", 
    nativeName: "kakɔ (Kamɛrun)", 
    englishName: "Kako (Cameroon)", 
    twoLetterISOLanguageName: "kkj", 
    threeLetterISOLanguageName: "kkj", 
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
        currencySymbol: "FCFA", 
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
        "sɔndi",
        "lundi",
        "mardi",
        "mɛrkɛrɛdi",
        "yedi",
        "vaŋdɛrɛdi",
        "mɔnɔ sɔndi"
      ],
      "abbreviatedMonthGenitiveNames": [
        "pamba",
        "wanja",
        "mbiyɔ mɛndoŋgɔ",
        "Nyɔlɔmbɔŋgɔ",
        "Mɔnɔ ŋgbanja",
        "Nyaŋgwɛ ŋgbanja",
        "kuŋgwɛ",
        "fɛ",
        "njapi",
        "nyukul",
        "M11",
        "ɓulɓusɛ",
        ""
      ],
      "abbreviatedMonthNames": [
        "pamba",
        "wanja",
        "mbiyɔ mɛndoŋgɔ",
        "Nyɔlɔmbɔŋgɔ",
        "Mɔnɔ ŋgbanja",
        "Nyaŋgwɛ ŋgbanja",
        "kuŋgwɛ",
        "fɛ",
        "njapi",
        "nyukul",
        "M11",
        "ɓulɓusɛ",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "sɔndi",
        "lundi",
        "mardi",
        "mɛrkɛrɛdi",
        "yedi",
        "vaŋdɛrɛdi",
        "mɔnɔ sɔndi"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd dd MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd dd MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "pamba",
        "wanja",
        "mbiyɔ mɛndoŋgɔ",
        "Nyɔlɔmbɔŋgɔ",
        "Mɔnɔ ŋgbanja",
        "Nyaŋgwɛ ŋgbanja",
        "kuŋgwɛ",
        "fɛ",
        "njapi",
        "nyukul",
        "M11",
        "ɓulɓusɛ",
        ""
      ],
      "monthNames": [
        "pamba",
        "wanja",
        "mbiyɔ mɛndoŋgɔ",
        "Nyɔlɔmbɔŋgɔ",
        "Mɔnɔ ŋgbanja",
        "Nyaŋgwɛ ŋgbanja",
        "kuŋgwɛ",
        "fɛ",
        "njapi",
        "nyukul",
        "M11",
        "ɓulɓusɛ",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM yyyy",
      "shortestDayNames": [
        "so",
        "lu",
        "ma",
        "mɛ",
        "ye",
        "va",
        "ms"
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
          "dd/MM yyyy",
          "d MMM yyyy"
        ],
        "D": [
          "dddd dd MMMM yyyy",
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};