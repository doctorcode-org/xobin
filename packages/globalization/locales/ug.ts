import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 128, 
    name: "ug", 
    nativeName: "ئۇيغۇرچە", 
    englishName: "Uyghur", 
    twoLetterISOLanguageName: "ug", 
    threeLetterISOLanguageName: "uig", 
    listSeparator: ",", 
    isRightToLeft: true, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "¥", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
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
        amDesignator: "چۈشتىن بۇرۇن", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "yyyy-'يىل' d-MMMM H:mm:ss", 
        longDatePattern: "yyyy-'يىل' d-MMMM", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "d-MMMM", 
        pmDesignator: "چۈشتىن كېيىن", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-M-d", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy-'يىلى' MMMM", 
        abbreviatedDayNames: ["يە", "دۈ", "سە", "چا", "پە", "جۈ", "شە"], 
        shortestDayNames: ["ي", "د", "س", "چ", "پ", "ج", "ش"], 
        dayNames: ["يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"], 
        abbreviatedMonthNames: ["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي", ""], 
        monthNames: ["يانۋار", "فېۋرال", "مارت", "ئاپرېل", "ماي", "ئىيۇن", "ئىيۇل", "ئاۋغۇست", "سېنتەبىر", "ئۆكتەبىر", "نويابىر", "دېكابىر", ""], 
        nativeCalendarName: "مىلادىيە كالېندارى", 
        abbreviatedMonthGenitiveNames: ["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي", ""], 
        monthGenitiveNames: ["يانۋار", "فېۋرال", "مارت", "ئاپرېل", "ماي", "ئىيۇن", "ئىيۇل", "ئاۋغۇست", "سېنتەبىر", "ئۆكتەبىر", "نويابىر", "دېكابىر", ""]
    }, 
    calendar: new GregorianCalendar()
};