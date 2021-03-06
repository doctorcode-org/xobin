import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ss", 
    lcid: 4096, 
    name: "ss-SZ", 
    nativeName: "siSwati (eSwatini)", 
    englishName: "siSwati (Eswatini)", 
    twoLetterISOLanguageName: "ss", 
    threeLetterISOLanguageName: "ssw", 
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
        currencySymbol: "E", 
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
        amDesignator: "AM", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
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
        abbreviatedDayNames: ["Son", "Mso", "Bil", "Tsa", "Ne", "Hla", "Mgc"], 
        shortestDayNames: ["Son", "Mso", "Bil", "Tsa", "Ne", "Hla", "Mgc"], 
        dayNames: ["Lisontfo", "uMsombuluko", "Lesibili", "Lesitsatfu", "Lesine", "Lesihlanu", "uMgcibelo"], 
        abbreviatedMonthNames: ["Bhi", "Van", "Vol", "Mab", "Nkh", "Nhl", "Kho", "Ngc", "Nyo", "Mph", "Lwe", "Ngo", ""], 
        monthNames: ["Bhimbidvwane", "iNdlovana", "iNdlovu-lenkhulu", "Mabasa", "iNkhwekhweti", "iNhlaba", "Kholwane", "iNgci", "iNyoni", "iMphala", "Lweti", "iNgongoni", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Bhi", "Van", "Vol", "Mab", "Nkh", "Nhl", "Kho", "Ngc", "Nyo", "Mph", "Lwe", "Ngo", ""], 
        monthGenitiveNames: ["Bhimbidvwane", "iNdlovana", "iNdlovu-lenkhulu", "Mabasa", "iNkhwekhweti", "iNhlaba", "Kholwane", "iNgci", "iNyoni", "iMphala", "Lweti", "iNgongoni", ""]
    }, 
    calendar: new GregorianCalendar()
};