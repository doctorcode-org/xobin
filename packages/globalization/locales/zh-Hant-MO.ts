// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    "parent": "zh-Hant",
    "lcid": 4096,
    "name": "zh-Hant-MO",
    "nativeName": "中文（繁體字，澳門特別行政區）",
    "englishName": "Chinese (Traditional, Macao SAR)",
    "twoLetterISOLanguageName": "zh",
    "threeLetterISOLanguageName": "zho",
    "listSeparator": ",",
    "isRightToLeft": false,
    "isNeutralCulture": false,
    "numberFormat": {
        "currencyDecimalDigits": 2,
        "currencyDecimalSeparator": ".",
        "currencyGroupSizes": [
            3
        ],
        "numberGroupSizes": [
            3
        ],
        "percentGroupSizes": [
            3
        ],
        "currencyGroupSeparator": ",",
        "currencySymbol": "MOP$",
        "naNSymbol": "非數值",
        "currencyNegativePattern": 1,
        "numberNegativePattern": 1,
        "percentPositivePattern": 1,
        "percentNegativePattern": 1,
        "negativeInfinitySymbol": "-∞",
        "negativeSign": "-",
        "numberDecimalDigits": 3,
        "numberDecimalSeparator": ".",
        "numberGroupSeparator": ",",
        "currencyPositivePattern": 0,
        "positiveInfinitySymbol": "∞",
        "positiveSign": "+",
        "percentDecimalDigits": 3,
        "percentDecimalSeparator": ".",
        "percentGroupSeparator": ",",
        "percentSymbol": "%",
        "perMilleSymbol": "‰",
        "nativeDigits": [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ],
        "digitSubstitution": 1
    },
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "週日",
        "週一",
        "週二",
        "週三",
        "週四",
        "週五",
        "週六"
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
      "monthNames": [
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
      "nativeCalendarName": "公曆",
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
          "yyyy年M月d日"
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
