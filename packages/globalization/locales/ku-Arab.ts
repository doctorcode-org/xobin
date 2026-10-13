// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ku", 
    lcid: 31890, 
    name: "ku-Arab", 
    nativeName: "کوردیی ناوەڕاست", 
    englishName: "Central Kurdish", 
    twoLetterISOLanguageName: "ku", 
    threeLetterISOLanguageName: "kur", 
    listSeparator: "؛", 
    isRightToLeft: true, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "د.ع.‏", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "‏-∞",
        negativeSign: "‏-",
        numberDecimalDigits: 2, 
        numberDecimalSeparator: "٫",
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "‏+",
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "٪", 
        perMilleSymbol: "‰", 
        nativeDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], 
        digitSubstitution: 0
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "یەکشەممە",
        "دووشەممە",
        "سێشەممە",
        "چوارشەممە",
        "پێنجشەممە",
        "ھەینی",
        "شەممە"
      ],
      "abbreviatedMonthGenitiveNames": [
        "کانوونی دووەم",
        "شوبات",
        "ئازار",
        "نیسان",
        "ئایار",
        "حوزەیران",
        "تەمووز",
        "ئاب",
        "ئەیلوول",
        "تشرینی یەکەم",
        "تشرینی دووەم",
        "کانونی یەکەم",
        ""
      ],
      "abbreviatedMonthNames": [
        "کانوونی دووەم",
        "شوبات",
        "ئازار",
        "نیسان",
        "ئایار",
        "حوزەیران",
        "تەمووز",
        "ئاب",
        "ئەیلوول",
        "تشرینی یەکەم",
        "تشرینی دووەم",
        "کانونی یەکەم",
        ""
      ],
      "amDesignator": "ب.ن",
      "dateSeparator": "-",
      "dayNames": [
        "یەکشەممە",
        "دووشەممە",
        "سێشەممە",
        "چوارشەممە",
        "پێنجشەممە",
        "ھەینی",
        "شەممە"
      ],
      "firstDayOfWeek": 6,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd h:mm:ss tt",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "h:mm:ss tt",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "کانوونی دووەم",
        "شوبات",
        "ئازار",
        "نیسان",
        "ئایار",
        "حوزەیران",
        "تەمووز",
        "ئاب",
        "ئەیلوول",
        "تشرینی یەکەم",
        "تشرینی دووەم",
        "کانونی یەکەم",
        ""
      ],
      "monthNames": [
        "کانوونی دووەم",
        "شوبات",
        "ئازار",
        "نیسان",
        "ئایار",
        "حوزەیران",
        "تەمووز",
        "ئاب",
        "ئەیلوول",
        "تشرینی یەکەم",
        "تشرینی دووەم",
        "کانونی یەکەم",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "د.ن",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "ی",
        "د",
        "س",
        "چ",
        "پ",
        "ھ",
        "ش"
      ],
      "shortTimePattern": "h:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "زایینی"
      ],
      "abbreviatedEraNames": [
        "زایینی"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy-MM-dd",
          "yyyy MMM d",
          "d/M/yyyy"
        ],
        "D": [
          "yyyy MMMM d, dddd",
          "dی MMMMی yyyy"
        ],
        "t": [
          "h:mm tt"
        ],
        "T": [
          "h:mm:ss tt"
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
    calendarFormats: {
      "1": {},
      "6": {
        "eraNames": [
          "بعد الهجرة"
        ],
        "abbreviatedEraNames": [
          "هـ"
        ],
        "monthNames": [
          "Muharram",
          "Safar",
          "Rabiʻ I",
          "Rabiʻ II",
          "Jumada I",
          "Jumada II",
          "Rajab",
          "Shaʻban",
          "Ramadan",
          "Shawwal",
          "Dhuʻl-Qiʻdah",
          "Dhuʻl-Hijjah",
          ""
        ],
        "abbreviatedMonthNames": [
          "Muh.",
          "Saf.",
          "Rab. I",
          "Rab. II",
          "Jum. I",
          "Jum. II",
          "Raj.",
          "Sha.",
          "Ram.",
          "Shaw.",
          "Dhuʻl-Q.",
          "Dhuʻl-H.",
          ""
        ],
        "monthGenitiveNames": [
          "Muharram",
          "Safar",
          "Rabiʻ I",
          "Rabiʻ II",
          "Jumada I",
          "Jumada II",
          "Rajab",
          "Shaʻban",
          "Ramadan",
          "Shawwal",
          "Dhuʻl-Qiʻdah",
          "Dhuʻl-Hijjah",
          ""
        ],
        "abbreviatedMonthGenitiveNames": [
          "Muh.",
          "Saf.",
          "Rab. I",
          "Rab. II",
          "Jum. I",
          "Jum. II",
          "Raj.",
          "Sha.",
          "Ram.",
          "Shaw.",
          "Dhuʻl-Q.",
          "Dhuʻl-H.",
          ""
        ],
        "nativeCalendarName": "islamic"
      }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()],
    calendar: new GregorianCalendar(1)
};