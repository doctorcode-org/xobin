import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "en", 
    lcid: 4105, 
    name: "en-CA", 
    nativeName: "English (Canada)", 
    englishName: "English (Canada)", 
    twoLetterISOLanguageName: "en", 
    threeLetterISOLanguageName: "eng", 
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
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "-", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "MMMM d, yyyy h:mm:ss tt", 
        longDatePattern: "MMMM d, yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM, yyyy", 
        abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], 
        shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], 
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], 
        abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""], 
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""], 
        monthGenitiveNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""]
    }, 
    calendar: new GregorianCalendar()
};