import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 50, 
    name: "tn", 
    nativeName: "Setswana", 
    englishName: "Setswana", 
    twoLetterISOLanguageName: "tn", 
    threeLetterISOLanguageName: "tsn", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "R", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "-", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "yyyy MMMM d, dddd HH:mm:ss", 
        longDatePattern: "yyyy MMMM d, dddd", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["Tsh", "Mos", "Labb", "Labr", "Labn", "Labt", "Mat"], 
        shortestDayNames: ["Tsh", "Mos", "Labb", "Labr", "Labn", "Labt", "Mat"], 
        dayNames: ["Tshipi", "Mosopulogo", "Labobedi", "Laboraro", "Labone", "Labotlhano", "Matlhatso"], 
        abbreviatedMonthNames: ["Fer", "Tlh", "Mop", "Mor", "Mot", "See", "Phu", "Pha", "Lwe", "Dip", "Ngw", "Sed", ""], 
        monthNames: ["Ferikgong", "Tlhakole", "Mopitlo", "Moranang", "Motsheganang", "Seetebosigo", "Phukwi", "Phatwe", "Lwetse", "Diphalane", "Ngwanatsele", "Sedimonthole", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Fer", "Tlh", "Mop", "Mor", "Mot", "See", "Phu", "Pha", "Lwe", "Dip", "Ngw", "Sed", ""], 
        monthGenitiveNames: ["Ferikgong", "Tlhakole", "Mopitlo", "Moranang", "Motsheganang", "Seetebosigo", "Phukwi", "Phatwe", "Lwetse", "Diphalane", "Ngwanatsele", "Sedimonthole", ""]
    }, 
    calendar: new GregorianCalendar()
};