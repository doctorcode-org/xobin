// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "mas", 
    lcid: 4096, 
    name: "mas-TZ", 
    nativeName: "Maa (Tansania)", 
    englishName: "Masai (Tanzania)", 
    twoLetterISOLanguageName: "mas", 
    threeLetterISOLanguageName: "mas", 
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
        "Jpi",
        "Jtt",
        "Jnn",
        "Jtn",
        "Alh",
        "Iju",
        "Jmo"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Dal",
        "Ará",
        "Ɔɛn",
        "Doy",
        "Lép",
        "Rok",
        "Sás",
        "Bɔ́r",
        "Kús",
        "Gís",
        "Shʉ́",
        "Ntʉ́",
        ""
      ],
      "abbreviatedMonthNames": [
        "Dal",
        "Ará",
        "Ɔɛn",
        "Doy",
        "Lép",
        "Rok",
        "Sás",
        "Bɔ́r",
        "Kús",
        "Gís",
        "Shʉ́",
        "Ntʉ́",
        ""
      ],
      "amDesignator": "Ɛnkakɛnyá",
      "dateSeparator": "/",
      "dayNames": [
        "Jumapílí",
        "Jumatátu",
        "Jumane",
        "Jumatánɔ",
        "Alaámisi",
        "Jumáa",
        "Jumamósi"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Oladalʉ́",
        "Arát",
        "Ɔɛnɨ́ɔɨŋɔk",
        "Olodoyíóríê inkókúâ",
        "Oloilépūnyīē inkókúâ",
        "Kújúɔrɔk",
        "Mórusásin",
        "Ɔlɔ́ɨ́bɔ́rárɛ",
        "Kúshîn",
        "Olgísan",
        "Pʉshʉ́ka",
        "Ntʉ́ŋʉ́s",
        ""
      ],
      "monthNames": [
        "Oladalʉ́",
        "Arát",
        "Ɔɛnɨ́ɔɨŋɔk",
        "Olodoyíóríê inkókúâ",
        "Oloilépūnyīē inkókúâ",
        "Kújúɔrɔk",
        "Mórusásin",
        "Ɔlɔ́ɨ́bɔ́rárɛ",
        "Kúshîn",
        "Olgísan",
        "Pʉshʉ́ka",
        "Ntʉ́ŋʉ́s",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "Ɛndámâ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "1"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "EY"
      ],
      "abbreviatedEraNames": [
        "EY"
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