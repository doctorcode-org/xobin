import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 108, 
    name: "nso", 
    nativeName: "Sesotho sa Leboa", 
    englishName: "Sesotho sa Leboa", 
    twoLetterISOLanguageName: "nso", 
    threeLetterISOLanguageName: "nso", 
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
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 2, 
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
        abbreviatedDayNames: ["Lam", "Mos", "Bed", "Rar", "Ne", "Hla", "Mok"], 
        shortestDayNames: ["Lam", "Mos", "Bed", "Rar", "Ne", "Hla", "Mok"], 
        dayNames: ["Lamorena", "Musopologo", "Labobedi", "Laboraro", "Labone", "Labohlano", "Mokibelo"], 
        abbreviatedMonthNames: ["Phere", "Dibo", "Hlak", "Mora", "Mopi", "Phupu", "Mose", "Phato", "Lewe", "Dipha", "Diba", "Manth", ""], 
        monthNames: ["Pherekgong", "Dibokwane", "Hlakola", "Moranang", "Mopitlo", "Phupu", "Mosegemanye", "Phato", "Lewedi", "Diphalane", "Dibatsela", "Manthole", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Phere", "Dibo", "Hlak", "Mora", "Mopi", "Phupu", "Mose", "Phato", "Lewe", "Dipha", "Diba", "Manth", ""], 
        monthGenitiveNames: ["Pherekgong", "Dibokwane", "Hlakola", "Moranang", "Mopitlo", "Phupu", "Mosegemanye", "Phato", "Lewedi", "Diphalane", "Dibatsela", "Manthole", ""]
    }, 
    calendar: new GregorianCalendar()
};