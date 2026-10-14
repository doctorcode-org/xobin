// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "syr", 
    lcid: 1114, 
    name: "syr-SY", 
    nativeName: "ܣܘܪܝܝܐ (ܣܘܪܝܐ)", 
    englishName: "Syriac (Syria)", 
    twoLetterISOLanguageName: "syr", 
    threeLetterISOLanguageName: "syr", 
    listSeparator: ",", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "ܠ.ܣ.‏", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞",
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 3, 
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
        "ܚܕ",
        "ܬܪܝܢ",
        "ܬܠܬ",
        "ܐܪܒܥ",
        "ܚܡܫ",
        "ܥܪܘ",
        "ܫܒܬܐ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ܟܢ܊ ܒ",
        "ܫܒܛ",
        "ܐܕܪ",
        "ܢܝܣܢ",
        "ܐܝܪ",
        "ܚܙܝܪܢ",
        "ܬܡܘܙ",
        "ܐܒ",
        "ܐܝܠܘܠ",
        "ܬܫ܊ ܐ",
        "ܬܫ܊ ܒ",
        "ܟܢ܊ ܐ",
        ""
      ],
      "abbreviatedMonthNames": [
        "ܟܢ܊ ܒ",
        "ܫܒܛ",
        "ܐܕܪ",
        "ܢܝܣܢ",
        "ܐܝܪ",
        "ܚܙܝܪܢ",
        "ܬܡܘܙ",
        "ܐܒ",
        "ܐܝܠܘܠ",
        "ܬܫ܊ ܐ",
        "ܬܫ܊ ܒ",
        "ܟܢ܊ ܐ",
        ""
      ],
      "amDesignator": "ܩܛ",
      "dateSeparator": "-",
      "dayNames": [
        "ܚܕܒܫܒܐ",
        "ܬܪܝܢܒܫܒܐ",
        "ܬܠܬܒܫܒܐ",
        "ܐܪܒܥܒܫܒܐ",
        "ܚܡܫܒܫܒܐ",
        "ܥܪܘܒܬܐ",
        "ܫܒܬܐ"
      ],
      "firstDayOfWeek": 6,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd، d MMMM yyyy h:mm:ss tt",
      "longDatePattern": "dddd، d MMMM yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "ܟܢܘܢ ܐܚܪܝܐ",
        "ܫܒܛ",
        "ܐܕܪ",
        "ܢܝܣܢ",
        "ܐܝܪ",
        "ܚܙܝܪܢ",
        "ܬܡܘܙ",
        "ܐܒ",
        "ܐܝܠܘܠ",
        "ܬܫܪܝܢ ܩܕܡܝܐ",
        "ܬܫܪܝܢ ܐܚܪܝܐ",
        "ܟܢܘܢ ܩܕܡܝܐ",
        ""
      ],
      "monthNames": [
        "ܟܢܘܢ ܐܚܪܝܐ",
        "ܫܒܛ",
        "ܐܕܪ",
        "ܢܝܣܢ",
        "ܐܝܪ",
        "ܚܙܝܪܢ",
        "ܬܡܘܙ",
        "ܐܒ",
        "ܐܝܠܘܠ",
        "ܬܫܪܝܢ ܩܕܡܝܐ",
        "ܬܫܪܝܼܢ ܐܚܪܝܐ",
        "ܟܢܘܢ ܩܕܡܝܐ",
        ""
      ],
      "nativeCalendarName": "ܣܘܪܓܕܐ ܓܪܝܓܘܪܝܐ",
      "pmDesignator": "ܒܛ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "ܐ",
        "ܒ",
        "ܓ",
        "ܕ",
        "ܗ",
        "ܥ",
        "ܫ"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "܏ܫܡ"
      ],
      "abbreviatedEraNames": [
        "܏ܫܡ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd",
          "yyyy MMM d",
          "d‏/M‏/yyyy"
        ],
        "D": [
          "dddd، d MMMM yyyy",
          "yyyy MMMM d"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};