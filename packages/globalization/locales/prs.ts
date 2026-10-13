// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 140, 
    name: "prs", 
    nativeName: "درى", 
    englishName: "Dari", 
    twoLetterISOLanguageName: "prs", 
    threeLetterISOLanguageName: "prs", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "؋", 
        naNSymbol: "ناعدد", 
        currencyNegativePattern: 3, 
        numberNegativePattern: 3, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "‎−∞",
        negativeSign: "‎−",
        numberDecimalDigits: 2, 
        numberDecimalSeparator: "٫",
        numberGroupSeparator: ".", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "‎+",
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: ".", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه"
      ],
      "abbreviatedMonthGenitiveNames": [
        "جنو",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جول",
        "اگست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسم",
        ""
      ],
      "abbreviatedMonthNames": [
        "جنوری",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جولای",
        "اگست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "amDesignator": "قبل‌ازظهر",
      "dateSeparator": "/",
      "dayNames": [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy H:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "جنوری",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جولای",
        "اگست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "monthNames": [
        "جنوری",
        "فبروری",
        "مارچ",
        "اپریل",
        "می",
        "جون",
        "جولای",
        "اگست",
        "سپتمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر",
        ""
      ],
      "nativeCalendarName": "تقویم میلادی",
      "pmDesignator": "بعدازظهر",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy/M/d",
      "shortestDayNames": [
        "ی",
        "د",
        "س",
        "چ",
        "پ",
        "ج",
        "ش"
      ],
      "shortTimePattern": "H:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "م."
      ],
      "abbreviatedEraNames": [
        "م."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy/M/d",
          "d MMM yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "H:mm"
        ],
        "T": [
          "H:mm:ss"
        ],
        "y": [
          "yyyy MMMM"
        ],
        "Y": [
          "yyyy MMMM"
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