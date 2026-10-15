// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "sn-Latn", 
    lcid: 4096, 
    name: "sn-Latn-ZW", 
    nativeName: "chiShona (Zimbabwe)", 
    englishName: "Shona (Latin, Zimbabwe)", 
    twoLetterISOLanguageName: "sn", 
    threeLetterISOLanguageName: "sna", 
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
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Svo",
        "Muv",
        "Chp",
        "Cht",
        "Chn",
        "Chs",
        "Mug"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Ndi",
        "Kuk",
        "Kur",
        "Kub",
        "Chv",
        "Chk",
        "Chg",
        "Nya",
        "Gun",
        "Gum",
        "Mbu",
        "Zvi",
        ""
      ],
      "abbreviatedMonthNames": [
        "Ndi",
        "Kuk",
        "Kur",
        "Kub",
        "Chv",
        "Chk",
        "Chg",
        "Nya",
        "Gun",
        "Gum",
        "Mbu",
        "Zvi",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Svondo",
        "Muvhuro",
        "Chipiri",
        "Chitatu",
        "China",
        "Chishanu",
        "Mugovera"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Ndira",
        "Kukadzi",
        "Kurume",
        "Kubvumbi",
        "Chivabvu",
        "Chikumi",
        "Chikunguru",
        "Nyamavhuvhu",
        "Gunyana",
        "Gumiguru",
        "Mbudzi",
        "Zvita",
        ""
      ],
      "monthNames": [
        "Ndira",
        "Kukadzi",
        "Kurume",
        "Kubvumbi",
        "Chivabvu",
        "Chikumi",
        "Chikunguru",
        "Nyamavhuvhu",
        "Gunyana",
        "Gumiguru",
        "Mbudzi",
        "Zvita",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "S",
        "M",
        "C",
        "C",
        "C",
        "C",
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