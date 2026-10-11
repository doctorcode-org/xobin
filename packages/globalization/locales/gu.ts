// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 71, 
    name: "gu", 
    nativeName: "ગુજરાતી", 
    englishName: "Gujarati", 
    twoLetterISOLanguageName: "gu", 
    threeLetterISOLanguageName: "guj", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3, 2], 
        numberGroupSizes: [3, 2], 
        percentGroupSizes: [3, 2], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₹", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 12, 
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
        nativeDigits: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "રવિ",
        "સોમ",
        "મંગળ",
        "બુધ",
        "ગુરુ",
        "શુક્ર",
        "શનિ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "જાન્યુ",
        "ફેબ્રુ",
        "માર્ચ",
        "એપ્રિલ",
        "મે",
        "જૂન",
        "જુલાઈ",
        "ઑગસ્ટ",
        "સપ્ટે",
        "ઑક્ટો",
        "નવે",
        "ડિસે",
        ""
      ],
      "abbreviatedMonthNames": [
        "જાન્યુ",
        "ફેબ્રુ",
        "માર્ચ",
        "એપ્રિલ",
        "મે",
        "જૂન",
        "જુલાઈ",
        "ઑગસ્ટ",
        "સપ્ટે",
        "ઑક્ટો",
        "નવે",
        "ડિસે",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "/",
      "dayNames": [
        "રવિવાર",
        "સોમવાર",
        "મંગળવાર",
        "બુધવાર",
        "ગુરુવાર",
        "શુક્રવાર",
        "શનિવાર"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM, yyyy hh:mm:ss tt",
      "longDatePattern": "dddd, d MMMM, yyyy",
      "longTimePattern": "hh:mm:ss tt",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "જાન્યુઆરી",
        "ફેબ્રુઆરી",
        "માર્ચ",
        "એપ્રિલ",
        "મે",
        "જૂન",
        "જુલાઈ",
        "ઑગસ્ટ",
        "સપ્ટેમ્બર",
        "ઑક્ટોબર",
        "નવેમ્બર",
        "ડિસેમ્બર",
        ""
      ],
      "monthNames": [
        "જાન્યુઆરી",
        "ફેબ્રુઆરી",
        "માર્ચ",
        "એપ્રિલ",
        "મે",
        "જૂન",
        "જુલાઈ",
        "ઑગસ્ટ",
        "સપ્ટેમ્બર",
        "ઑક્ટોબર",
        "નવેમ્બર",
        "ડિસેમ્બર",
        ""
      ],
      "nativeCalendarName": "ગ્રેગોરિઅન કેલેન્ડર",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "ર",
        "સો",
        "મં",
        "બુ",
        "ગુ",
        "શુ",
        "શ"
      ],
      "shortTimePattern": "hh:mm tt",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "ઈ.સ."
      ],
      "abbreviatedEraNames": [
        "ઇસ"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM, yyyy",
          "d/M/yy"
        ],
        "D": [
          "dddd, d MMMM, yyyy",
          "d MMMM, yyyy"
        ],
        "t": [
          "hh:mm tt"
        ],
        "T": [
          "hh:mm:ss tt"
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
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};