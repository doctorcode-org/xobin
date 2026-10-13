// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HebrewCalendar, HijriCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ar", 
    lcid: 4096, 
    name: "ar-IL", 
    nativeName: "العربية (إسرائيل)", 
    englishName: "Arabic (Israel)", 
    twoLetterISOLanguageName: "ar", 
    threeLetterISOLanguageName: "ara", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₪", 
        naNSymbol: "ليس رقمًا", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: "٫",
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], 
        digitSubstitution: 0
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
      ],
      "abbreviatedMonthGenitiveNames": [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
        ""
      ],
      "abbreviatedMonthNames": [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
        ""
      ],
      "amDesignator": "ص",
      "dateSeparator": "‏/",
      "dayNames": [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd، d MMMM yyyy H:mm:ss",
      "longDatePattern": "dddd، d MMMM yyyy",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
        ""
      ],
      "monthNames": [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
        ""
      ],
      "nativeCalendarName": "التقويم الميلادي",
      "pmDesignator": "م",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d‏/M‏/yyyy",
      "shortestDayNames": [
        "ح",
        "ن",
        "ث",
        "ر",
        "خ",
        "ج",
        "س"
      ],
      "shortTimePattern": "H:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "م"
      ],
      "abbreviatedEraNames": [
        "م"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d‏/M‏/yyyy",
          "dd‏/MM‏/yyyy"
        ],
        "D": [
          "dddd، d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "H:mm"
        ],
        "T": [
          "H:mm:ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
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
      "1": {},
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
          "ربيع الأول",
          "ربيع الآخر",
          "جمادى الأولى",
          "جمادى الآخرة",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذو القعدة",
          "ذو الحجة",
          ""
        ],
        "abbreviatedMonthNames": [
          "محرم",
          "صفر",
          "ربيع الأول",
          "ربيع الآخر",
          "جمادى الأولى",
          "جمادى الآخرة",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذو القعدة",
          "ذو الحجة",
          ""
        ],
        "monthGenitiveNames": [
          "محرم",
          "صفر",
          "ربيع الأول",
          "ربيع الآخر",
          "جمادى الأولى",
          "جمادى الآخرة",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذو القعدة",
          "ذو الحجة",
          ""
        ],
        "abbreviatedMonthGenitiveNames": [
          "محرم",
          "صفر",
          "ربيع الأول",
          "ربيع الآخر",
          "جمادى الأولى",
          "جمادى الآخرة",
          "رجب",
          "شعبان",
          "رمضان",
          "شوال",
          "ذو القعدة",
          "ذو الحجة",
          ""
        ],
        "nativeCalendarName": "التقويم الهجري"
      },
      "8": {
        "leapYearMonthNames": [
          "تشري",
          "مرحشوان",
          "كيسلو",
          "طيفت",
          "شباط",
          "آذار الأول",
          "آذار الثاني",
          "نيسان",
          "أيار",
          "سيفان",
          "تموز",
          "آب",
          "أيلول"
        ],
        "eraNames": [
          "C.E."
        ],
        "abbreviatedEraNames": [
          "C.E."
        ],
        "monthNames": [
          "تشري",
          "مرحشوان",
          "كيسلو",
          "طيفت",
          "شباط",
          "آذار",
          "آذار الثاني",
          "نيسان",
          "أيار",
          "سيفان",
          "تموز",
          "آب",
          "أيلول"
        ],
        "abbreviatedMonthNames": [
          "تشري",
          "مرحشوان",
          "كيسلو",
          "طيفت",
          "شباط",
          "آذار الأول",
          "آذار",
          "نيسان",
          "أيار",
          "سيفان",
          "تموز",
          "آب",
          "أيلول"
        ],
        "monthGenitiveNames": [
          "تشري",
          "مرحشوان",
          "كيسلو",
          "طيفت",
          "شباط",
          "آذار الأول",
          "آذار",
          "نيسان",
          "أيار",
          "سيفان",
          "تموز",
          "آب",
          "أيلول"
        ],
        "abbreviatedMonthGenitiveNames": [
          "تشري",
          "مرحشوان",
          "كيسلو",
          "طيفت",
          "شباط",
          "آذار الأول",
          "آذار",
          "نيسان",
          "أيار",
          "سيفان",
          "تموز",
          "آب",
          "أيلول"
        ],
        "nativeCalendarName": "التقويم العبري"
      }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HebrewCalendar(), () => new HijriCalendar()],
    calendar: new GregorianCalendar(1)
};