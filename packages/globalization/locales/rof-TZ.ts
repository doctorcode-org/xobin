import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "rof", 
    lcid: 4096, 
    name: "rof-TZ", 
    nativeName: "Kihorombo (Tanzania)", 
    englishName: "Rombo (Tanzania)", 
    twoLetterISOLanguageName: "rof", 
    threeLetterISOLanguageName: "rof", 
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
        currencySymbol: "TSh", 
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
        amDesignator: "kang’ama", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "kingoto", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Ijp", "Ijt", "Ijn", "Ijtn", "Alh", "Iju", "Ijm"], 
        shortestDayNames: ["Ijp", "Ijt", "Ijn", "Ijtn", "Alh", "Iju", "Ijm"], 
        dayNames: ["Ijumapili", "Ijumatatu", "Ijumanne", "Ijumatano", "Alhamisi", "Ijumaa", "Ijumamosi"], 
        abbreviatedMonthNames: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", ""], 
        monthNames: ["Mweri wa kwanza", "Mweri wa kaili", "Mweri wa katatu", "Mweri wa kaana", "Mweri wa tanu", "Mweri wa sita", "Mweri wa saba", "Mweri wa nane", "Mweri wa tisa", "Mweri wa ikumi", "Mweri wa ikumi na moja", "Mweri wa ikumi na mbili", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12", ""], 
        monthGenitiveNames: ["Mweri wa kwanza", "Mweri wa kaili", "Mweri wa katatu", "Mweri wa kaana", "Mweri wa tanu", "Mweri wa sita", "Mweri wa saba", "Mweri wa nane", "Mweri wa tisa", "Mweri wa ikumi", "Mweri wa ikumi na moja", "Mweri wa ikumi na mbili", ""]
    }, 
    calendar: new GregorianCalendar()
};