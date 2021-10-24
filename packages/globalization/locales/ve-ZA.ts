import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ve", 
    lcid: 1075, 
    name: "ve-ZA", 
    nativeName: "Tshivenḓa (South Africa)", 
    englishName: "Venda (South Africa)", 
    twoLetterISOLanguageName: "ve", 
    threeLetterISOLanguageName: "ven", 
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
        currencySymbol: "R", 
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
        abbreviatedDayNames: ["Swo", "Mus", "Vhi", "Rar", "Ṋa", "Ṱan", "Mug"], 
        shortestDayNames: ["Swo", "Mus", "Vhi", "Rar", "Ṋa", "Ṱan", "Mug"], 
        dayNames: ["Swondaha", "Musumbuluwo", "Ḽavhuvhili", "Ḽavhuraru", "Ḽavhuṋa", "Ḽavhuṱanu", "Mugivhela"], 
        abbreviatedMonthNames: ["Pha", "Luh", "Ṱhf", "Lam", "Shu", "Lwi", "Lwa", "Ṱha", "Khu", "Tsh", "Ḽar", "Nye", ""], 
        monthNames: ["Phando", "Luhuhi", "Ṱhafamuhwe", "Lambamai", "Shundunthule", "Fulwi", "Fulwana", "Ṱhangule", "Khubvumedzi", "Tshimedzi", "Ḽara", "Nyendavhusiku", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Pha", "Luh", "Ṱhf", "Lam", "Shu", "Lwi", "Lwa", "Ṱha", "Khu", "Tsh", "Ḽar", "Nye", ""], 
        monthGenitiveNames: ["Phando", "Luhuhi", "Ṱhafamuhwe", "Lambamai", "Shundunthule", "Fulwi", "Fulwana", "Ṱhangule", "Khubvumedzi", "Tshimedzi", "Ḽara", "Nyendavhusiku", ""]
    }, 
    calendar: new GregorianCalendar()
};