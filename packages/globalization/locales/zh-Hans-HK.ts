// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "zh-Hans", 
    lcid: 4096, 
    name: "zh-Hans-HK", 
    nativeName: "中文 (香港特别行政区)", 
    englishName: "Chinese (Simplified Han, Hong Kong SAR)", 
    twoLetterISOLanguageName: "zh", 
    threeLetterISOLanguageName: "zho", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "$", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
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
        nativeDigits: ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
      ],
      "abbreviatedMonthGenitiveNames": [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
        ""
      ],
      "abbreviatedMonthNames": [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
        ""
      ],
      "amDesignator": "上午",
      "dateSeparator": "/",
      "dayNames": [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy年M月d日dddd tth:mm:ss",
      "longDatePattern": "yyyy年M月d日dddd",
      "longTimePattern": "tth:mm:ss",
      "monthDayPattern": "M月d日",
      "monthGenitiveNames": [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
        ""
      ],
      "monthNames": [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
        ""
      ],
      "nativeCalendarName": "公历",
      "pmDesignator": "下午",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "日",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六"
      ],
      "shortTimePattern": "tth:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy年M月",
      "eraNames": [
        "公元"
      ],
      "abbreviatedEraNames": [
        "公元"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "yyyy年M月d日",
          "d/M/yy"
        ],
        "D": [
          "yyyy年M月d日dddd",
          "yyyy年M月d日"
        ],
        "t": [
          "tth:mm"
        ],
        "T": [
          "tth:mm:ss"
        ],
        "y": [
          "yyyy年M月"
        ],
        "Y": [
          "yyyy年M月"
        ],
        "m": [
          "M月d日"
        ],
        "M": [
          "M月d日"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};