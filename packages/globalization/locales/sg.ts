// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "sg", 
    nativeName: "Sängö", 
    englishName: "Sango", 
    twoLetterISOLanguageName: "sg", 
    threeLetterISOLanguageName: "sag", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "FCFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
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
        "Bk1",
        "Bk2",
        "Bk3",
        "Bk4",
        "Bk5",
        "Lâp",
        "Lây"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Nye",
        "Ful",
        "Mbä",
        "Ngu",
        "Bêl",
        "Fön",
        "Len",
        "Kük",
        "Mvu",
        "Ngb",
        "Nab",
        "Kak",
        ""
      ],
      "abbreviatedMonthNames": [
        "Nye",
        "Ful",
        "Mbä",
        "Ngu",
        "Bêl",
        "Fön",
        "Len",
        "Kük",
        "Mvu",
        "Ngb",
        "Nab",
        "Kak",
        ""
      ],
      "amDesignator": "ND",
      "dateSeparator": "/",
      "dayNames": [
        "Bikua-ôko",
        "Bïkua-ûse",
        "Bïkua-ptâ",
        "Bïkua-usïö",
        "Bïkua-okü",
        "Lâpôsö",
        "Lâyenga"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "Nyenye",
        "Fulundïgi",
        "Mbängü",
        "Ngubùe",
        "Bêläwü",
        "Föndo",
        "Lengua",
        "Kükürü",
        "Mvuka",
        "Ngberere",
        "Nabändüru",
        "Kakauka",
        ""
      ],
      "monthNames": [
        "Nyenye",
        "Fulundïgi",
        "Mbängü",
        "Ngubùe",
        "Bêläwü",
        "Föndo",
        "Lengua",
        "Kükürü",
        "Mvuka",
        "Ngberere",
        "Nabändüru",
        "Kakauka",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "LK",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "K",
        "S",
        "T",
        "S",
        "K",
        "P",
        "Y"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "NpK"
      ],
      "abbreviatedEraNames": [
        "NpK"
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