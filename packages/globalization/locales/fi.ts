// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 11, 
    name: "fi", 
    nativeName: "suomi", 
    englishName: "Finnish", 
    twoLetterISOLanguageName: "fi", 
    threeLetterISOLanguageName: "fin", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "€", 
        naNSymbol: "epäluku", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "−∞",
        negativeSign: "−",
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
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "su",
        "ma",
        "ti",
        "ke",
        "to",
        "pe",
        "la"
      ],
      "abbreviatedMonthGenitiveNames": [
        "tammik.",
        "helmik.",
        "maalisk.",
        "huhtik.",
        "toukok.",
        "kesäk.",
        "heinäk.",
        "elok.",
        "syysk.",
        "lokak.",
        "marrask.",
        "jouluk.",
        ""
      ],
      "abbreviatedMonthNames": [
        "tammi",
        "helmi",
        "maalis",
        "huhti",
        "touko",
        "kesä",
        "heinä",
        "elo",
        "syys",
        "loka",
        "marras",
        "joulu",
        ""
      ],
      "amDesignator": "ap.",
      "dateSeparator": ".",
      "dayNames": [
        "sunnuntai",
        "maanantai",
        "tiistai",
        "keskiviikko",
        "torstai",
        "perjantai",
        "lauantai"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 2,
      "fullDateTimePattern": "dddd d. MMMM yyyy H.mm.ss",
      "longDatePattern": "dddd d. MMMM yyyy",
      "longTimePattern": "H.mm.ss",
      "monthDayPattern": "d. MMMM",
      "monthGenitiveNames": [
        "tammikuuta",
        "helmikuuta",
        "maaliskuuta",
        "huhtikuuta",
        "toukokuuta",
        "kesäkuuta",
        "heinäkuuta",
        "elokuuta",
        "syyskuuta",
        "lokakuuta",
        "marraskuuta",
        "joulukuuta",
        ""
      ],
      "monthNames": [
        "tammikuu",
        "helmikuu",
        "maaliskuu",
        "huhtikuu",
        "toukokuu",
        "kesäkuu",
        "heinäkuu",
        "elokuu",
        "syyskuu",
        "lokakuu",
        "marraskuu",
        "joulukuu",
        ""
      ],
      "nativeCalendarName": "gregoriaaninen kalenteri",
      "pmDesignator": "ip.",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d.M.yyyy",
      "shortestDayNames": [
        "S",
        "M",
        "T",
        "K",
        "T",
        "P",
        "L"
      ],
      "shortTimePattern": "H.mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ".",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "jKr."
      ],
      "abbreviatedEraNames": [
        "jKr"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d.M.yyyy"
        ],
        "D": [
          "dddd d. MMMM yyyy",
          "d. MMMM yyyy"
        ],
        "t": [
          "H.mm"
        ],
        "T": [
          "H.mm.ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "d. MMMM"
        ],
        "M": [
          "d. MMMM"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};