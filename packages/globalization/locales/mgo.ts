// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "mgo", 
    nativeName: "metaʼ", 
    englishName: "Metaʼ", 
    twoLetterISOLanguageName: "mgo", 
    threeLetterISOLanguageName: "mgo", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "FCFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
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
        "Aneg 1",
        "Aneg 2",
        "Aneg 3",
        "Aneg 4",
        "Aneg 5",
        "Aneg 6",
        "Aneg 7"
      ],
      "abbreviatedMonthGenitiveNames": [
        "mbegtug",
        "imeg àbùbì",
        "imeg mbəŋchubi",
        "iməg ngwə̀t",
        "iməg fog",
        "iməg ichiibɔd",
        "iməg àdùmbə̀ŋ",
        "iməg ichika",
        "iməg kud",
        "iməg tèsiʼe",
        "iməg zò",
        "iməg krizmed",
        ""
      ],
      "abbreviatedMonthNames": [
        "mbegtug",
        "imeg àbùbì",
        "imeg mbəŋchubi",
        "iməg ngwə̀t",
        "iməg fog",
        "iməg ichiibɔd",
        "iməg àdùmbə̀ŋ",
        "iməg ichika",
        "iməg kud",
        "iməg tèsiʼe",
        "iməg zò",
        "iməg krizmed",
        ""
      ],
      "amDesignator": "AM",
      "dateSeparator": "-",
      "dayNames": [
        "Aneg 1",
        "Aneg 2",
        "Aneg 3",
        "Aneg 4",
        "Aneg 5",
        "Aneg 6",
        "Aneg 7"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, yyyy MMMM dd HH:mm:ss",
      "longDatePattern": "dddd, yyyy MMMM dd",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "iməg mbegtug",
        "imeg àbùbì",
        "imeg mbəŋchubi",
        "iməg ngwə̀t",
        "iməg fog",
        "iməg ichiibɔd",
        "iməg àdùmbə̀ŋ",
        "iməg ichika",
        "iməg kud",
        "iməg tèsiʼe",
        "iməg zò",
        "iməg krizmed",
        ""
      ],
      "monthNames": [
        "iməg mbegtug",
        "imeg àbùbì",
        "imeg mbəŋchubi",
        "iməg ngwə̀t",
        "iməg fog",
        "iməg ichiibɔd",
        "iməg àdùmbə̀ŋ",
        "iməg ichika",
        "iməg kud",
        "iməg tèsiʼe",
        "iməg zò",
        "iməg krizmed",
        ""
      ],
      "nativeCalendarName": "ngàb mə̀kala",
      "pmDesignator": "PM",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy-MM-dd",
      "shortestDayNames": [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "CE"
      ],
      "abbreviatedEraNames": [
        "CE"
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
          "dddd, yyyy MMMM dd",
          "yyyy MMMM d"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
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
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};