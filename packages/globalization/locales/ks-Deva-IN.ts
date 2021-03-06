import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ks-Deva", 
    lcid: 2144, 
    name: "ks-Deva-IN", 
    nativeName: "कॉशुर", 
    englishName: "Kashmiri (Devanagari)", 
    twoLetterISOLanguageName: "ks", 
    threeLetterISOLanguageName: "kas", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
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
        percentNegativePattern: 0, 
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
        nativeDigits: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, MMMM dd, yyyy HH:mm:ss", 
        longDatePattern: "dddd, MMMM dd, yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd-MM-yyyy", 
        shortTimePattern: "H:mm", 
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