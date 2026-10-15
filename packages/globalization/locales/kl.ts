// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 111, 
    name: "kl", 
    nativeName: "kalaallisut", 
    englishName: "Kalaallisut", 
    twoLetterISOLanguageName: "kl", 
    threeLetterISOLanguageName: "kal", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3, 0], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "kr.", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 12, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 0, 
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
        "sap",
        "ata",
        "mar",
        "pin",
        "sis",
        "tal",
        "arf"
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan",
        "febr",
        "mar",
        "apr",
        "maj",
        "jun",
        "jul",
        "aug",
        "sept",
        "okt",
        "nov",
        "dec",
        ""
      ],
      "abbreviatedMonthNames": [
        "jan",
        "febr",
        "mar",
        "apr",
        "maj",
        "jun",
        "jul",
        "aug",
        "sept",
        "okt",
        "nov",
        "dec",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "sapaat",
        "ataasinngorneq",
        "marlunngorneq",
        "pingasunngorneq",
        "sisamanngorneq",
        "tallimanngorneq",
        "arfininngorneq"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH.mm.ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH.mm.ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "januaarip",
        "februaarip",
        "marsip",
        "apriilip",
        "maajip",
        "juunip",
        "juulip",
        "aggustip",
        "septembarip",
        "oktobarip",
        "novembarip",
        "decembarip",
        ""
      ],
      "monthNames": [
        "januaari",
        "februaari",
        "marsi",
        "apriili",
        "maaji",
        "juuni",
        "juuli",
        "aggusti",
        "septembari",
        "oktobari",
        "novembari",
        "decembari",
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
      "shortTimePattern": "HH.mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ".",
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
          "yyyy MMM d",
          "yyyy-M-d"
        ],
        "D": [
          "yyyy MMMM d, dddd",
          "yyyy MMMM d"
        ],
        "t": [
          "HH.mm"
        ],
        "T": [
          "HH.mm.ss"
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