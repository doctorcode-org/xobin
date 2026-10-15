// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ko", 
    lcid: 1042, 
    name: "ko-KR", 
    nativeName: "한국어(대한민국)", 
    englishName: "Korean (Korea)", 
    twoLetterISOLanguageName: "ko", 
    threeLetterISOLanguageName: "kor", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₩", 
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
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
      ],
      "abbreviatedMonthGenitiveNames": [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
        ""
      ],
      "abbreviatedMonthNames": [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
        ""
      ],
      "amDesignator": "오전",
      "dateSeparator": ". ",
      "dayNames": [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ],
      "firstDayOfWeek": 0,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "yyyy년 M월 d일 dddd tt h:mm:ss",
      "longDatePattern": "yyyy년 M월 d일 dddd",
      "longTimePattern": "tt h:mm:ss",
      "monthDayPattern": "MMMM d일",
      "monthGenitiveNames": [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
        ""
      ],
      "monthNames": [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
        ""
      ],
      "nativeCalendarName": "양력",
      "pmDesignator": "오후",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "yyyy. M. d.",
      "shortestDayNames": [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
      ],
      "shortTimePattern": "tt h:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy년 MMMM",
      "eraNames": [
        "AD"
      ],
      "abbreviatedEraNames": [
        "AD"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "yyyy. M. d.",
          "yy. M. d."
        ],
        "D": [
          "yyyy년 M월 d일 dddd",
          "yyyy년 M월 d일"
        ],
        "t": [
          "tt h:mm"
        ],
        "T": [
          "tt h:mm:ss"
        ],
        "y": [
          "yyyy년 MMMM"
        ],
        "Y": [
          "yyyy년 MMMM"
        ],
        "m": [
          "MMMM d일"
        ],
        "M": [
          "MMMM d일"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};