// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "bm", 
    lcid: 4096, 
    name: "bm-Latn", 
    nativeName: "bamanakan", 
    englishName: "Bamanankan (Latin)", 
    twoLetterISOLanguageName: "bm", 
    threeLetterISOLanguageName: "bam", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "CFA", 
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
        "kar",
        "ntɛ",
        "tar",
        "ara",
        "ala",
        "jum",
        "sib"
      ],
      "abbreviatedMonthGenitiveNames": [
        "zan",
        "feb",
        "mar",
        "awi",
        "mɛ",
        "zuw",
        "zul",
        "uti",
        "sɛt",
        "ɔku",
        "now",
        "des",
        ""
      ],
      "abbreviatedMonthNames": [
        "zan",
        "feb",
        "mar",
        "awi",
        "mɛ",
        "zuw",
        "zul",
        "uti",
        "sɛt",
        "ɔku",
        "now",
        "des",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "kari",
        "ntɛnɛ",
        "tarata",
        "araba",
        "alamisa",
        "juma",
        "sibiri"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "zanwuye",
        "feburuye",
        "marisi",
        "awirili",
        "mɛ",
        "zuwɛn",
        "zuluye",
        "uti",
        "sɛtanburu",
        "ɔkutɔburu",
        "nowanburu",
        "desanburu",
        ""
      ],
      "monthNames": [
        "zanwuye",
        "feburuye",
        "marisi",
        "awirili",
        "mɛ",
        "zuwɛn",
        "zuluye",
        "uti",
        "sɛtanburu",
        "ɔkutɔburu",
        "nowanburu",
        "desanburu",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "K",
        "N",
        "T",
        "A",
        "A",
        "J",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ni J.-C."
      ],
      "abbreviatedEraNames": [
        "ni J.-C."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM, yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "d MMMM"
        ],
        "M": [
          "d MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};