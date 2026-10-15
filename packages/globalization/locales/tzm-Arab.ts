// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "tzm", 
    lcid: 4096, 
    name: "tzm-Arab", 
    nativeName: "أطلس المركزية التامازيتية", 
    englishName: "Central Atlas Tamazight (Arabic)", 
    twoLetterISOLanguageName: "tzm", 
    threeLetterISOLanguageName: "tzm", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "MAD", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Asa",
        "Ayn",
        "Asn",
        "Akr",
        "Akw",
        "Asm",
        "Asḍ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Yen",
        "Yeb",
        "Mar",
        "Ibr",
        "May",
        "Yun",
        "Yul",
        "Ɣuc",
        "Cut",
        "Kṭu",
        "Nwa",
        "Duj",
        ""
      ],
      "abbreviatedMonthNames": [
        "Yen",
        "Yeb",
        "Mar",
        "Ibr",
        "May",
        "Yun",
        "Yul",
        "Ɣuc",
        "Cut",
        "Kṭu",
        "Nwa",
        "Duj",
        ""
      ],
      "amDesignator": "Zdat azal",
      "dateSeparator": "-",
      "dayNames": [
        "Asamas",
        "Aynas",
        "Asinas",
        "Akras",
        "Akwas",
        "Asimwas",
        "Asiḍyas"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Yennayer",
        "Yebrayer",
        "Mars",
        "Ibrir",
        "Mayyu",
        "Yunyu",
        "Yulyuz",
        "Ɣuct",
        "Cutanbir",
        "Kṭuber",
        "Nwanbir",
        "Dujanbir",
        ""
      ],
      "monthNames": [
        "Yennayer",
        "Yebrayer",
        "Mars",
        "Ibrir",
        "Mayyu",
        "Yunyu",
        "Yulyuz",
        "Ɣuct",
        "Cutanbir",
        "Kṭuber",
        "Nwanbir",
        "Dujanbir",
        ""
      ],
      "nativeCalendarName": "تقویم میلادی",
      "pmDesignator": "Ḍeffir aza",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ḌƐ"
      ],
      "abbreviatedEraNames": [
        "ḌƐ"
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