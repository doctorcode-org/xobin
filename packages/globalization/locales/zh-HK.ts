import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "zh-Hant", 
    lcid: 3076, 
    name: "zh-HK", 
    nativeName: "中文(香港特別行政區)", 
    englishName: "Chinese (Traditional, Hong Kong SAR)", 
    twoLetterISOLanguageName: "zh", 
    threeLetterISOLanguageName: "zho", 
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
        currencySymbol: "HK$", 
        naNSymbol: "非數值", 
        currencyNegativePattern: 0, 
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
        amDesignator: "上午", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "yyyy'年'M'月'd'日' H:mm:ss", 
        longDatePattern: "yyyy'年'M'月'd'日'", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "M月d日", 
        pmDesignator: "下午", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy'年'M'月'", 
        abbreviatedDayNames: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"], 
        shortestDayNames: ["日", "一", "二", "三", "四", "五", "六"], 
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"], 
        abbreviatedMonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""], 
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""], 
        nativeCalendarName: "西曆", 
        abbreviatedMonthGenitiveNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""], 
        monthGenitiveNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""]
    }, 
    calendar: new GregorianCalendar()
};