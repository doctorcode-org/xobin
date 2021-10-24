import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "af", 
    lcid: 4096, 
    name: "af-NA", 
    nativeName: "Afrikaans (Namibië)", 
    englishName: "Afrikaans (Namibia)", 
    twoLetterISOLanguageName: "af", 
    threeLetterISOLanguageName: "afr", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "$", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "vm.", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy h:mm:ss tt", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "nm.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["So.", "Ma.", "Di.", "Wo.", "Do.", "Vr.", "Sa."], 
        shortestDayNames: ["So.", "Ma.", "Di.", "Wo.", "Do.", "Vr.", "Sa."], 
        dayNames: ["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"], 
        abbreviatedMonthNames: ["Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des.", ""], 
        monthNames: ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember", ""], 
        nativeCalendarName: "Gregoriaanse kalender", 
        abbreviatedMonthGenitiveNames: ["Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des.", ""], 
        monthGenitiveNames: ["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember", ""]
    }, 
    calendar: new GregorianCalendar()
};