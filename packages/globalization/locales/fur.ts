// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "fur", 
    nativeName: "furlan", 
    englishName: "Friulian", 
    twoLetterISOLanguageName: "fur", 
    threeLetterISOLanguageName: "fur", 
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
        currencySymbol: "€", 
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
        "mie",
        "joi",
        "vin",
        "sab"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Zen",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jug",
        "Lui",
        "Avo",
        "Set",
        "Otu",
        "Nov",
        "Dic",
        ""
      ],
      "abbreviatedMonthNames": [
        "Zen",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jug",
        "Lui",
        "Avo",
        "Set",
        "Otu",
        "Nov",
        "Dic",
        ""
      ],
      "amDesignator": "a.",
      "dateSeparator": "/",
      "dayNames": [
        "domenie",
        "lunis",
        "martars",
        "miercus",
        "joibe",
        "vinars",
        "sabide"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd d 'di' MMMM 'dal' yyyy HH:mm:ss",
      "longDatePattern": "dddd d 'di' MMMM 'dal' yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "d 'di' MMMM",
      "monthGenitiveNames": [
        "Zenâr",
        "Fevrâr",
        "Març",
        "Avrîl",
        "Mai",
        "Jugn",
        "Lui",
        "Avost",
        "Setembar",
        "Otubar",
        "Novembar",
        "Dicembar",
        ""
      ],
      "monthNames": [
        "Zenâr",
        "Fevrâr",
        "Març",
        "Avrîl",
        "Mai",
        "Jugn",
        "Lui",
        "Avost",
        "Setembar",
        "Otubar",
        "Novembar",
        "Dicembar",
        ""
      ],
      "nativeCalendarName": "calendari gregorian",
      "pmDesignator": "p.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "D",
        "L",
        "M",
        "M",
        "J",
        "V",
        "S"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM 'dal' yyyy",
      "eraNames": [
        "ddC"
      ],
      "abbreviatedEraNames": [
        "ddC"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "dd/MM/yy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd d 'di' MMMM 'dal' yyyy",
          "d 'di' MMMM 'dal' yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM 'dal' yyyy"
        ],
        "Y": [
          "MMMM 'dal' yyyy"
        ],
        "m": [
          "d 'di' MMMM"
        ],
        "M": [
          "d 'di' MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};