// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "dje", 
    lcid: 4096, 
    name: "dje-NE", 
    nativeName: "Zarmaciine (Nižer)", 
    englishName: "Zarma (Niger)", 
    twoLetterISOLanguageName: "dje", 
    threeLetterISOLanguageName: "dje", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "CFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 5, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 1, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Alh",
        "Ati",
        "Ata",
        "Ala",
        "Alm",
        "Alz",
        "Asi"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Žan",
        "Fee",
        "Mar",
        "Awi",
        "Me",
        "Žuw",
        "Žuy",
        "Ut",
        "Sek",
        "Okt",
        "Noo",
        "Dee",
        ""
      ],
      "abbreviatedMonthNames": [
        "Žan",
        "Fee",
        "Mar",
        "Awi",
        "Me",
        "Žuw",
        "Žuy",
        "Ut",
        "Sek",
        "Okt",
        "Noo",
        "Dee",
        ""
      ],
      "amDesignator": "Subbaahi",
      "dateSeparator": "/",
      "dayNames": [
        "Alhadi",
        "Atinni",
        "Atalaata",
        "Alarba",
        "Alhamisi",
        "Alzuma",
        "Asibti"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Žanwiye",
        "Feewiriye",
        "Marsi",
        "Awiril",
        "Me",
        "Žuweŋ",
        "Žuyye",
        "Ut",
        "Sektanbur",
        "Oktoobur",
        "Noowanbur",
        "Deesanbur",
        ""
      ],
      "monthNames": [
        "Žanwiye",
        "Feewiriye",
        "Marsi",
        "Awiril",
        "Me",
        "Žuweŋ",
        "Žuyye",
        "Ut",
        "Sektanbur",
        "Oktoobur",
        "Noowanbur",
        "Deesanbur",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "Zaarikay b",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "H",
        "T",
        "T",
        "L",
        "M",
        "Z",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "IZ"
      ],
      "abbreviatedEraNames": [
        "IZ"
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