// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "so", 
    lcid: 4096, 
    name: "so-DJ", 
    nativeName: "Soomaali (Jabuuti)", 
    englishName: "Somali (Djibouti)", 
    twoLetterISOLanguageName: "so", 
    threeLetterISOLanguageName: "som", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Fdj", 
        naNSymbol: "MaL", 
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
        "Axd",
        "Isn",
        "Tldo",
        "Arbc",
        "Khms",
        "Jmc",
        "Sbti"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Lul",
        "Ogs",
        "Seb",
        "Okt",
        "Nof",
        "Dis",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Lul",
        "Ogs",
        "Seb",
        "Okt",
        "Nof",
        "Dis",
        ""
      ],
      "amDesignator": "GH",
      "dateSeparator": "/",
      "dayNames": [
        "Axad",
        "Isniin",
        "Talaado",
        "Arbaco",
        "Khamiis",
        "Jimco",
        "Sabti"
      ],
      "firstDayOfWeek": 6,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, MMMM d, yyyy h:mm:ss tt",
      "longDatePattern": "dddd, MMMM d, yyyy",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Bisha Koobaad",
        "Bisha Labaad",
        "Bisha Saddexaad",
        "Bisha Afraad",
        "Bisha Shanaad",
        "Bisha Lixaad",
        "Bisha Todobaad",
        "Bisha Sideedaad",
        "Bisha Sagaalaad",
        "Bisha Tobnaad",
        "Bisha Kow iyo Tobnaad",
        "Bisha Laba iyo Tobnaad",
        ""
      ],
      "monthNames": [
        "Jannaayo",
        "Febraayo",
        "Maarso",
        "Abriil",
        "May",
        "Juun",
        "Luuliyo",
        "Ogosto",
        "Sebteembar",
        "Oktoobar",
        "Noofeembar",
        "Diseembar",
        ""
      ],
      "nativeCalendarName": "Habeetiriska Geregoriyaan",
      "pmDesignator": "GD",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "A",
        "I",
        "T",
        "A",
        "Kh",
        "J",
        "S"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "AD"
      ],
      "abbreviatedEraNames": [
        "A"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "dd-MMM-yyyy",
          "M/d/yyyy",
          "dd/MM/yy"
        ],
        "D": [
          "dddd, MMMM d, yyyy",
          "MMMM d, yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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