import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ja", 
    lcid: 1041, 
    name: "ja-JP", 
    nativeName: "日本語 (日本)", 
    englishName: "Japanese (Japan)", 
    twoLetterISOLanguageName: "ja", 
    threeLetterISOLanguageName: "jpn", 
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
        currencySymbol: "¥", 
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
        amDesignator: "午前", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "yyyy'年'M'月'd'日' H:mm:ss", 
        longDatePattern: "yyyy'年'M'月'd'日'", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "M月d日", 
        pmDesignator: "午後", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy/MM/dd", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy'年'M'月'", 
        abbreviatedDayNames: ["日", "月", "火", "水", "木", "金", "土"], 
        shortestDayNames: ["日", "月", "火", "水", "木", "金", "土"], 
        dayNames: ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"], 
        abbreviatedMonthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""], 
        monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""], 
        nativeCalendarName: "西暦 (日本語)", 
        abbreviatedMonthGenitiveNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""], 
        monthGenitiveNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""]
    }, 
    calendar: new GregorianCalendar()
};