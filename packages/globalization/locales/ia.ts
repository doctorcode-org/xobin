// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "ia", 
    nativeName: "interlingua", 
    englishName: "Interlingua", 
    twoLetterISOLanguageName: "ia", 
    threeLetterISOLanguageName: "ina", 
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
        currencySymbol: "XDR", 
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
        "dom",
        "lun",
        "mar",
        "mer",
        "jov",
        "ven",
        "sab"
      ],
      "abbreviatedMonthGenitiveNames": [
        "jan",
        "feb",
        "mar",
        "apr",
        "mai",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
        ""
      ],
      "abbreviatedMonthNames": [
        "jan",
        "feb",
        "mar",
        "apr",
        "mai",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "dominica",
        "lunedi",
        "martedi",
        "mercuridi",
        "jovedi",
        "venerdi",
        "sabbato"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd 'le' d 'de' MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd 'le' d 'de' MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d 'de' MMMM",
      "monthGenitiveNames": [
        "januario",
        "februario",
        "martio",
        "april",
        "maio",
        "junio",
        "julio",
        "augusto",
        "septembre",
        "octobre",
        "novembre",
        "decembre",
        ""
      ],
      "monthNames": [
        "januario",
        "februario",
        "martio",
        "april",
        "maio",
        "junio",
        "julio",
        "augusto",
        "septembre",
        "octobre",
        "novembre",
        "decembre",
        ""
      ],
      "nativeCalendarName": "calendario gregorian",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd-MM-yyyy",
      "shortestDayNames": [
        "d",
        "l",
        "m",
        "m",
        "j",
        "v",
        "s"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "p.Chr."
      ],
      "abbreviatedEraNames": [
        "p.Chr."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd-MM-yyyy",
          "d MMM yyyy"
        ],
        "D": [
          "dddd 'le' d 'de' MMMM yyyy",
          "d 'de' MMMM yyyy"
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
          "d 'de' MMMM"
        ],
        "M": [
          "d 'de' MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};