import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
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
        amDesignator: "오전", 
        dateSeparator: "-", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "yyyy'년' M'월' d'일' dddd tt h:mm:ss", 
        longDatePattern: "yyyy'년' M'월' d'일' dddd", 
        longTimePattern: "tt h:mm:ss", 
        monthDayPattern: "M월 d일", 
        pmDesignator: "오후", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "tt h:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy'년' M'월'", 
        abbreviatedDayNames: ["일", "월", "화", "수", "목", "금", "토"], 
        shortestDayNames: ["일", "월", "화", "수", "목", "금", "토"], 
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"], 
        abbreviatedMonthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""], 
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ""], 
        nativeCalendarName: "서기(한글)", 
        abbreviatedMonthGenitiveNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""], 
        monthGenitiveNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ""]
    }, 
    calendar: new GregorianCalendar()
};