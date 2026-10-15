// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "lag", 
    lcid: 4096, 
    name: "lag-TZ", 
    nativeName: "Kɨlaangi (Taansanía)", 
    englishName: "Langi (Tanzania)", 
    twoLetterISOLanguageName: "lag", 
    threeLetterISOLanguageName: "lag", 
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
        currencySymbol: "TSh", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
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
        "Píili",
        "Táatu",
        "Íne",
        "Táano",
        "Alh",
        "Ijm",
        "Móosi"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Fúngatɨ",
        "Naanɨ",
        "Keenda",
        "Ikúmi",
        "Inyambala",
        "Idwaata",
        "Mʉʉnchɨ",
        "Vɨɨrɨ",
        "Saatʉ",
        "Inyi",
        "Saano",
        "Sasatʉ",
        ""
      ],
      "abbreviatedMonthNames": [
        "Fúngatɨ",
        "Naanɨ",
        "Keenda",
        "Ikúmi",
        "Inyambala",
        "Idwaata",
        "Mʉʉnchɨ",
        "Vɨɨrɨ",
        "Saatʉ",
        "Inyi",
        "Saano",
        "Sasatʉ",
        ""
      ],
      "amDesignator": "TOO",
      "dateSeparator": "/",
      "dayNames": [
        "Jumapíiri",
        "Jumatátu",
        "Jumaíne",
        "Jumatáano",
        "Alamíisi",
        "Ijumáa",
        "Jumamóosi"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Kʉfúngatɨ",
        "Kʉnaanɨ",
        "Kʉkeenda",
        "Kwiikumi",
        "Kwiinyambála",
        "Kwiidwaata",
        "Kʉmʉʉnchɨ",
        "Kʉvɨɨrɨ",
        "Kʉsaatʉ",
        "Kwiinyi",
        "Kʉsaano",
        "Kʉsasatʉ",
        ""
      ],
      "monthNames": [
        "Kʉfúngatɨ",
        "Kʉnaanɨ",
        "Kʉkeenda",
        "Kwiikumi",
        "Kwiinyambála",
        "Kwiidwaata",
        "Kʉmʉʉnchɨ",
        "Kʉvɨɨrɨ",
        "Kʉsaatʉ",
        "Kwiinyi",
        "Kʉsaano",
        "Kʉsasatʉ",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "MUU",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "P",
        "T",
        "E",
        "O",
        "A",
        "I",
        "M"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "KA"
      ],
      "abbreviatedEraNames": [
        "KA"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
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