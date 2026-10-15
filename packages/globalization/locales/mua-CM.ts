// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "mua", 
    lcid: 4096, 
    name: "mua-CM", 
    nativeName: "MUNDAŊ (kameruŋ)", 
    englishName: "Mundang (Cameroon)", 
    twoLetterISOLanguageName: "mua", 
    threeLetterISOLanguageName: "mua", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "FCFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
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
        "Cya",
        "Cla",
        "Czi",
        "Cko",
        "Cka",
        "Cga",
        "Cze"
      ],
      "abbreviatedMonthGenitiveNames": [
        "FLO",
        "CLA",
        "CKI",
        "FMF",
        "MAD",
        "MBI",
        "MLI",
        "MAM",
        "FDE",
        "FMU",
        "FGW",
        "FYU",
        ""
      ],
      "abbreviatedMonthNames": [
        "FLO",
        "CLA",
        "CKI",
        "FMF",
        "MAD",
        "MBI",
        "MLI",
        "MAM",
        "FDE",
        "FMU",
        "FGW",
        "FYU",
        ""
      ],
      "amDesignator": "comme",
      "dateSeparator": "/",
      "dayNames": [
        "Com’yakke",
        "Comlaaɗii",
        "Comzyiiɗii",
        "Comkolle",
        "Comkaldǝɓlii",
        "Comgaisuu",
        "Comzyeɓsuu"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Fĩi Loo",
        "Cokcwaklaŋne",
        "Cokcwaklii",
        "Fĩi Marfoo",
        "Madǝǝuutǝbijaŋ",
        "Mamǝŋgwãafahbii",
        "Mamǝŋgwãalii",
        "Madǝmbii",
        "Fĩi Dǝɓlii",
        "Fĩi Mundaŋ",
        "Fĩi Gwahlle",
        "Fĩi Yuru",
        ""
      ],
      "monthNames": [
        "Fĩi Loo",
        "Cokcwaklaŋne",
        "Cokcwaklii",
        "Fĩi Marfoo",
        "Madǝǝuutǝbijaŋ",
        "Mamǝŋgwãafahbii",
        "Mamǝŋgwãalii",
        "Madǝmbii",
        "Fĩi Dǝɓlii",
        "Fĩi Mundaŋ",
        "Fĩi Gwahlle",
        "Fĩi Yuru",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "lilli",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "Y",
        "L",
        "Z",
        "O",
        "A",
        "G",
        "E"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "PK"
      ],
      "abbreviatedEraNames": [
        "PK"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM yyyy"
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