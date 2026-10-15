// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "be", 
    lcid: 1059, 
    name: "be-BY", 
    nativeName: "Беларуская (Беларусь)", 
    englishName: "Belarusian (Belarus)", 
    twoLetterISOLanguageName: "be", 
    threeLetterISOLanguageName: "bel", 
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
        currencySymbol: "Br", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
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
        "нд",
        "пн",
        "аў",
        "ср",
        "чц",
        "пт",
        "сб"
      ],
      "abbreviatedMonthGenitiveNames": [
        "сту",
        "лют",
        "сак",
        "кра",
        "мая",
        "чэр",
        "ліп",
        "жні",
        "вер",
        "кас",
        "ліс",
        "сне",
        ""
      ],
      "abbreviatedMonthNames": [
        "сту",
        "лют",
        "сак",
        "кра",
        "май",
        "чэр",
        "ліп",
        "жні",
        "вер",
        "кас",
        "ліс",
        "сне",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ".",
      "dayNames": [
        "нядзеля",
        "панядзелак",
        "аўторак",
        "серада",
        "чацвер",
        "пятніца",
        "субота"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy 'г'. HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy 'г'.",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "студзеня",
        "лютага",
        "сакавіка",
        "красавіка",
        "мая",
        "чэрвеня",
        "ліпеня",
        "жніўня",
        "верасня",
        "кастрычніка",
        "лістапада",
        "снежня",
        ""
      ],
      "monthNames": [
        "студзень",
        "люты",
        "сакавік",
        "красавік",
        "май",
        "чэрвень",
        "ліпень",
        "жнівень",
        "верасень",
        "кастрычнік",
        "лістапад",
        "снежань",
        ""
      ],
      "nativeCalendarName": "грыгарыянскі каляндар",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.MM.yyyy",
      "shortestDayNames": [
        "н",
        "п",
        "а",
        "с",
        "ч",
        "п",
        "с"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "н.э."
      ],
      "abbreviatedEraNames": [
        "н.э."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.MM.yyyy",
          "d MMM yyyy 'г'.",
          "d.M.yyyy",
          "d.MM.yy"
        ],
        "D": [
          "dddd, d MMMM yyyy 'г'.",
          "d MMMM yyyy 'г'."
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
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};