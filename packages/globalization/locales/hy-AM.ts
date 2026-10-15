// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "hy", 
    lcid: 1067, 
    name: "hy-AM", 
    nativeName: "Հայերեն (Հայաստան)", 
    englishName: "Armenian (Armenia)", 
    twoLetterISOLanguageName: "hy", 
    threeLetterISOLanguageName: "hye", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "֏", 
        naNSymbol: "ՈչԹ", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",",
        numberGroupSeparator: ",", 
        currencyPositivePattern: 3, 
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
        "կիր",
        "երկ",
        "երք",
        "չրք",
        "հնգ",
        "ուր",
        "շբթ"
      ],
      "abbreviatedMonthGenitiveNames": [
        "հնվ",
        "փտվ",
        "մրտ",
        "ապր",
        "մյս",
        "հնս",
        "հլս",
        "օգս",
        "սեպ",
        "հոկ",
        "նոյ",
        "դեկ",
        ""
      ],
      "abbreviatedMonthNames": [
        "հնվ",
        "փտվ",
        "մրտ",
        "ապր",
        "մյս",
        "հնս",
        "հլս",
        "օգս",
        "սեպ",
        "հոկ",
        "նոյ",
        "դեկ",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": ".",
      "dayNames": [
        "կիրակի",
        "երկուշաբթի",
        "երեքշաբթի",
        "չորեքշաբթի",
        "հինգշաբթի",
        "ուրբաթ",
        "շաբաթ"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy թ. MMMM d, dddd HH:mm:ss",
      "longDatePattern": "yyyy թ. MMMM d, dddd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "հունվարի",
        "փետրվարի",
        "մարտի",
        "ապրիլի",
        "մայիսի",
        "հունիսի",
        "հուլիսի",
        "օգոստոսի",
        "սեպտեմբերի",
        "հոկտեմբերի",
        "նոյեմբերի",
        "դեկտեմբերի",
        ""
      ],
      "monthNames": [
        "հունվար",
        "փետրվար",
        "մարտ",
        "ապրիլ",
        "մայիս",
        "հունիս",
        "հուլիս",
        "օգոստոս",
        "սեպտեմբեր",
        "հոկտեմբեր",
        "նոյեմբեր",
        "դեկտեմբեր",
        ""
      ],
      "nativeCalendarName": "գրիգորյան օրացույց",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd.MM.yyyy",
      "shortestDayNames": [
        "Կ",
        "Ե",
        "Ե",
        "Չ",
        "Հ",
        "Ո",
        "Շ"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy թ․ MMMM",
      "eraNames": [
        "մ.թ."
      ],
      "abbreviatedEraNames": [
        "մ.թ."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd.MM.yyyy",
          "dd MMM, yyyy թ.",
          "dd.MM.yy"
        ],
        "D": [
          "yyyy թ. MMMM d, dddd",
          "dd MMMM, yyyy թ."
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy թ․ MMMM"
        ],
        "Y": [
          "yyyy թ․ MMMM"
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