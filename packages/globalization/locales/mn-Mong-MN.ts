// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "mn-Mong", 
    lcid: 3152, 
    name: "mn-Mong-MN", 
    nativeName: "ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡ (ᠮᠣᠩᠭᠣᠯ ᠣᠯᠣᠰ)", 
    englishName: "Mongolian (Traditional Mongolian, Mongolia)", 
    twoLetterISOLanguageName: "mn", 
    threeLetterISOLanguageName: "mon", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3, 0], 
        numberGroupSizes: [3, 0], 
        percentGroupSizes: [3, 0], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₮", 
        naNSymbol: "NaN",
        currencyNegativePattern: 2, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞",
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",",
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
        "ᠨᠢ",
        "ᠳᠠ",
        "ᠮᠢᠭ",
        "ᡀᠠ",
        "ᠫᠦᠷ",
        "ᠪᠠ",
        "ᠪᠢᠮ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "1 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "2 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "3᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "4 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "5 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "6 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "7 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "8᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "9 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "10 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "11 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "12 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        ""
      ],
      "abbreviatedMonthNames": [
        "1 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "2 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "3᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "4 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "5 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "6 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "7 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "8 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "9 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "10 ᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "11᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        "12᠊ᠷ ᠰᠠᠷ᠎ᠠ",
        ""
      ],
      "amDesignator": "ᠦ᠂ ᠥ",
      "dateSeparator": ".",
      "dayNames": [
        "ᠨᠢᠮ᠎ᠠ",
        "ᠳᠠᠸᠠ",
        "ᠮᠢᠠᠠᠮᠠᠷ",
        "ᡀᠠᠭᠪᠠ",
        "ᠫᠦᠷᠪᠦ",
        "ᠪᠠᠰᠠᠩ",
        "ᠪᠢᠮᠪᠠ"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy ᠣᠨ ᠎᠎᠎ᠤ MMMM᠎᠎ᠢᠢᠨd. dddd ᠋ᠭᠠᠷᠠᠭ HH:mm:ss",
      "longDatePattern": "yyyy ᠣᠨ ᠎᠎᠎ᠤ MMMM᠎᠎ᠢᠢᠨd. dddd ᠋ᠭᠠᠷᠠᠭ",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "ᠨᠢᠭᠡᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠬᠣᠶᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ ᠠ",
        "ᠭᠣᠷᠪᠡᠳᠣᠭᠠᠷ ᠰᠠᠷ ᠠ",
        "ᠳᠥᠷᠪᠡᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠲᠠᠪᠣᠳᠣᠭᠠᠷ ᠰᠠᠷ ᠠ",
        "ᠵᠢᠷᠭᠣᠭᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠲᠣᠯᠣᠭᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠨᠠᠢᠮᠠᠳᠥᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠶᠢᠰᠥᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠠᠷᠪᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠠᠷᠪᠠᠨ ᠬᠣᠶᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        ""
      ],
      "monthNames": [
        "ᠨᠢᠭᠡᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠬᠣᠶᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ ᠠ",
        "ᠭᠣᠷᠪᠡᠳᠣᠭᠠᠷ ᠰᠠᠷ ᠠ",
        "ᠳᠥᠷᠪᠡᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠲᠠᠪᠣᠳᠣᠭᠠᠷ ᠰᠠᠷ ᠠ",
        "ᠵᠢᠷᠭᠣᠭᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠲᠣᠯᠣᠭᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠨᠠᠢᠮᠠᠳᠥᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠶᠢᠰᠥᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠠᠷᠪᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠥᠭᠡᠷ ᠰᠠᠷ᠎ᠠ",
        "ᠠᠷᠪᠠᠨ ᠬᠣᠶᠠᠳᠣᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",
        ""
      ],
      "nativeCalendarName": "ᠭᠸᠷᠸᠭᠣᠷᠢ   ᠢᠨ ᠬᠣᠸᠠᠩᠯᠢ",
      "pmDesignator": "ᠦ᠂ ᠬᠣ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy.MM.dd",
      "shortestDayNames": [
        "ᠨᠢ",
        "ᠳᠠ",
        "ᠮᠢᠭ",
        "ᡀᠠ",
        "ᠫᠥᠷ",
        "ᠪᠠ",
        "ᠪᠢᠮ"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "ᠮ᠂ ᠡ"
      ],
      "abbreviatedEraNames": [
        "ᠮ᠂ ᠡ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy.MM.dd",
          "yyyy.M.d"
        ],
        "D": [
          "yyyy ᠣᠨ ᠎᠎᠎ᠤ MMMM᠎᠎ᠢᠢᠨd. dddd ᠋ᠭᠠᠷᠠᠭ",
          "yyyy ᠋ᠣᠨ  ᠤMMMM᠎᠎  ᠤᠩ d"
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