// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "wo", 
    lcid: 1160, 
    name: "wo-SN", 
    nativeName: "Wolof (Senegaal)", 
    englishName: "Wolof (Senegal)", 
    twoLetterISOLanguageName: "wo", 
    threeLetterISOLanguageName: "wol", 
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
        currencySymbol: "CFA", 
        naNSymbol: "Non Numérique", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-Infini", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "+Infini", 
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
        "Dib",
        "Alt",
        "Tal",
        "Àla",
        "Alx",
        "Àjj",
        "Ase"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Sam",
        "Few",
        "Mar",
        "Awr",
        "Mee",
        "Suw",
        "Sul",
        "Ut",
        "Sàt",
        "Okt",
        "Now",
        "Des",
        ""
      ],
      "abbreviatedMonthNames": [
        "Sam",
        "Few",
        "Mar",
        "Awr",
        "Mee",
        "Suw",
        "Sul",
        "Ut",
        "Sàt",
        "Okt",
        "Now",
        "Des",
        ""
      ],
      "amDesignator": "Sub",
      "dateSeparator": "-",
      "dayNames": [
        "Dibéer",
        "Altine",
        "Talaata",
        "Àlarba",
        "Alxamis",
        "Àjjuma",
        "Aseer"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMM, yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMM, yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Samwiyee",
        "Fewriyee",
        "Mars",
        "Awril",
        "Mee",
        "Suwe",
        "Sulet",
        "Ut",
        "Sàttumbar",
        "Oktoobar",
        "Nowàmbar",
        "Desàmbar",
        ""
      ],
      "monthNames": [
        "Samwiyee",
        "Fewriyee",
        "Mars",
        "Awril",
        "Mee",
        "Suwe",
        "Sulet",
        "Ut",
        "Sàttumbar",
        "Oktoobar",
        "Nowàmbar",
        "Desàmbar",
        ""
      ],
      "nativeCalendarName": "Arminaatu Gregoriyee",
      "pmDesignator": "Ngo",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd-MM-yyyy",
      "shortestDayNames": [
        "Dib",
        "Alt",
        "Tal",
        "Àla",
        "Alx",
        "Àjj",
        "Ase"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
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
          "dd-MM-yyyy",
          "d MMM, yyyy"
        ],
        "D": [
          "dddd, d MMM, yyyy",
          "d MMMM, yyyy"
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