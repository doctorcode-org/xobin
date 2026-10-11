// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HebrewCalendar, HijriCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "he", 
    lcid: 1037, 
    name: "he-IL", 
    nativeName: "עברית (ישראל)", 
    englishName: "Hebrew (Israel)", 
    twoLetterISOLanguageName: "he", 
    threeLetterISOLanguageName: "heb", 
    listSeparator: ",", 
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
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
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
        "יום א׳",
        "יום ב׳",
        "יום ג׳",
        "יום ד׳",
        "יום ה׳",
        "יום ו׳",
        "שבת"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ינו׳",
        "פבר׳",
        "מרץ",
        "אפר׳",
        "מאי",
        "יוני",
        "יולי",
        "אוג׳",
        "ספט׳",
        "אוק׳",
        "נוב׳",
        "דצמ׳",
        ""
      ],
      "abbreviatedMonthNames": [
        "ינו׳",
        "פבר׳",
        "מרץ",
        "אפר׳",
        "מאי",
        "יוני",
        "יולי",
        "אוג׳",
        "ספט׳",
        "אוק׳",
        "נוב׳",
        "דצמ׳",
        ""
      ],
      "amDesignator": "לפנה״צ",
      "dateSeparator": ".",
      "dayNames": [
        "יום ראשון",
        "יום שני",
        "יום שלישי",
        "יום רביעי",
        "יום חמישי",
        "יום שישי",
        "יום שבת"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d בMMMM yyyy H:mm:ss",
      "longDatePattern": "dddd, d בMMMM yyyy",
      "longTimePattern": "H:mm:ss",
      "monthDayPattern": "d בMMMM",
      "monthGenitiveNames": [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
        ""
      ],
      "monthNames": [
        "ינואר",
        "פברואר",
        "מרץ",
        "אפריל",
        "מאי",
        "יוני",
        "יולי",
        "אוגוסט",
        "ספטמבר",
        "אוקטובר",
        "נובמבר",
        "דצמבר",
        ""
      ],
      "nativeCalendarName": "לוח השנה הגרגוריאני",
      "pmDesignator": "אחה״צ",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy",
      "shortestDayNames": [
        "א׳",
        "ב׳",
        "ג׳",
        "ד׳",
        "ה׳",
        "ו׳",
        "ש׳"
      ],
      "shortTimePattern": "H:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "לספירה"
      ],
      "abbreviatedEraNames": [
        "אחריי"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.M.yyyy",
          "d בMMM yyyy"
        ],
        "D": [
          "dddd, d בMMMM yyyy",
          "d בMMMM yyyy"
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
          "d בMMMM"
        ],
        "M": [
          "d בMMMM"
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
          "מוחרם",
          "צפר",
          "רביע אל־אוול",
          "רביע א־ת׳אני",
          "ג׳ומאדא אל־אולא",
          "ג׳ומאדא א־ת׳אניה",
          "רג׳ב",
          "שעבאן",
          "רמדאן",
          "שוואל",
          "ד׳ו אל־קעדה",
          "ד׳ו אל־חיג׳ה",
          ""
        ],
        "abbreviatedMonthNames": [
          "מוחרם",
          "צפר",
          "רביע א׳",
          "רביע ב׳",
          "ג׳ומאדא א׳",
          "ג׳ומאדא ב׳",
          "רג׳ב",
          "שעבאן",
          "רמדאן",
          "שוואל",
          "ד׳ו אל־קעדה",
          "ד׳ו אל־חיג׳ה",
          ""
        ],
        "monthGenitiveNames": [
          "מוחרם",
          "צפר",
          "רביע אל-אוול",
          "רביע א-ת׳אני",
          "ג׳ומאדא אל-אולא",
          "ג׳ומאדא א-ת׳אניה",
          "רג׳ב",
          "שעבאן",
          "רמדאן",
          "שוואל",
          "ד׳ו אל־קעדה",
          "ד׳ו אל־חיג׳ה",
          ""
        ],
        "abbreviatedMonthGenitiveNames": [
          "מוחרם",
          "צפר",
          "רביע א׳",
          "רביע ב׳",
          "ג׳ומאדא א׳",
          "ג׳ומאדא ב׳",
          "רג׳ב",
          "שעבאן",
          "רמדאן",
          "שוואל",
          "ד׳ו אל־קעדה",
          "ד׳ו אל־חיג׳ה",
          ""
        ],
        "nativeCalendarName": "לוח השנה המוסלמי"
      },
      "8": {
        "leapYearMonthNames": [
          "תשרי",
          "חשוון",
          "כסלו",
          "טבת",
          "שבט",
          "אדר א׳",
          "אדר ב׳",
          "ניסן",
          "אייר",
          "סיוון",
          "תמוז",
          "אב",
          "אלול"
        ],
        "eraNames": [
          "C.E."
        ],
        "abbreviatedEraNames": [
          "C.E."
        ],
        "monthNames": [
          "תשרי",
          "חשוון",
          "כסלו",
          "טבת",
          "שבט",
          "אדר",
          "אדר ב׳",
          "ניסן",
          "אייר",
          "סיוון",
          "תמוז",
          "אב",
          "אלול"
        ],
        "abbreviatedMonthNames": [
          "תשרי",
          "חשון",
          "כסלו",
          "טבת",
          "שבט",
          "אדר א׳",
          "אדר",
          "ניסן",
          "אייר",
          "סיון",
          "תמוז",
          "אב",
          "אלול"
        ],
        "monthGenitiveNames": [
          "תשרי",
          "חשוון",
          "כסלו",
          "טבת",
          "שבט",
          "אדר א׳",
          "אדר",
          "ניסן",
          "אייר",
          "סיוון",
          "תמוז",
          "אב",
          "אלול"
        ],
        "abbreviatedMonthGenitiveNames": [
          "תשרי",
          "חשון",
          "כסלו",
          "טבת",
          "שבט",
          "אדר א׳",
          "אדר",
          "ניסן",
          "אייר",
          "סיון",
          "תמוז",
          "אב",
          "אלול"
        ],
        "nativeCalendarName": "לוח השנה העברי"
      }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HebrewCalendar(), () => new HijriCalendar()],
    calendar: new GregorianCalendar(1)
};