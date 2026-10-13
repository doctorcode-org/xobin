// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, PersianCalendar, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "fa", 
    lcid: 1065, 
    name: "fa-IR", 
    nativeName: "فارسی (ایران)", 
    englishName: "Persian (Iran)", 
    twoLetterISOLanguageName: "fa", 
    threeLetterISOLanguageName: "fas", 
    listSeparator: "؛", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: "/", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "ريال", 
        naNSymbol: "ناعدد", 
        currencyNegativePattern: 6, 
        numberNegativePattern: 3, 
        percentPositivePattern: 0, 
        percentNegativePattern: 11, 
        negativeInfinitySymbol: "‎−∞",
        negativeSign: "‎−",
        numberDecimalDigits: 2, 
        numberDecimalSeparator: "٫",
        numberGroupSeparator: ",", 
        currencyPositivePattern: 1, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "‎+",
        percentDecimalDigits: 2, 
        percentDecimalSeparator: "/", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], 
        digitSubstitution: 0
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
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
        ""
      ],
      "abbreviatedMonthNames": [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
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
      "firstDayOfWeek": 6,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy MMMM d, dddd H:mm:ss",
      "longDatePattern": "yyyy MMMM d, dddd",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
        ""
      ],
      "monthNames": [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
        ""
      ],
      "nativeCalendarName": "تقویم هجری شمسی",
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
        "ه‍.ش."
      ],
      "abbreviatedEraNames": [
        "ه‍.ش."
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
          "yyyy MMMM d, dddd",
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
      "1": {
        "eraNames": [
          "م."
        ],
        "abbreviatedEraNames": [
          "م"
        ],
        "monthNames": [
          "ژانویه",
          "فوریه",
          "مارس",
          "آوریل",
          "مه",
          "ژوئن",
          "ژوئیه",
          "اوت",
          "سپتامبر",
          "اکتبر",
          "نوامبر",
          "دسامبر",
          ""
        ],
        "abbreviatedMonthNames": [
          "ژانویه",
          "فوریه",
          "مارس",
          "آوریل",
          "مه",
          "ژوئن",
          "ژوئیه",
          "اوت",
          "سپتامبر",
          "اکتبر",
          "نوامبر",
          "دسامبر",
          ""
        ],
        "monthGenitiveNames": [
          "ژانویهٔ",
          "فوریهٔ",
          "مارس",
          "آوریل",
          "مهٔ",
          "ژوئن",
          "ژوئیهٔ",
          "اوت",
          "سپتامبر",
          "اکتبر",
          "نوامبر",
          "دسامبر",
          ""
        ],
        "abbreviatedMonthGenitiveNames": [
          "ژانویه",
          "فوریه",
          "مارس",
          "آوریل",
          "مه",
          "ژوئن",
          "ژوئیه",
          "اوت",
          "سپتامبر",
          "اکتبر",
          "نوامبر",
          "دسامبر",
          ""
        ],
        "nativeCalendarName": "تقویم میلادی"
      },
      "6": {
        "eraNames": [
          "بعد الهجرة"
        ],
        "abbreviatedEraNames": [
          "هـ"
        ],
        "monthNames": [
          "محرم",
          "صفر",
          "ربیع‌الاول",
          "ربیع‌الثانی",
          "جمادی‌الاول",
          "جمادی‌الثانی",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذیقعده",
          "ذیحجه",
          ""
        ],
        "abbreviatedMonthNames": [
          "محرم",
          "صفر",
          "ربیع‌الاول",
          "ربیع‌الثانی",
          "جمادی‌الاول",
          "جمادی‌الثانی",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذیقعده",
          "ذیحجه",
          ""
        ],
        "monthGenitiveNames": [
          "محرم",
          "صفر",
          "ربیع‌الاول",
          "ربیع‌الثانی",
          "جمادی‌الاول",
          "جمادی‌الثانی",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذیقعدهٔ",
          "ذیحجهٔ",
          ""
        ],
        "abbreviatedMonthGenitiveNames": [
          "محرم",
          "صفر",
          "ربیع‌الاول",
          "ربیع‌الثانی",
          "جمادی‌الاول",
          "جمادی‌الثانی",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذیقعدهٔ",
          "ذیحجهٔ",
          ""
        ],
        "nativeCalendarName": "تقویم هجری قمری"
      },
      "22": {}
    },
    calendarFactories: [() => new PersianCalendar(), () => new GregorianCalendar(1), () => new HijriCalendar()],
    calendar: new PersianCalendar()
};