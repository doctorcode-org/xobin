import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "dyo", 
    lcid: 4096, 
    name: "dyo-SN", 
    nativeName: "joola (Senegal)", 
    englishName: "Jola-Fonyi (Senegal)", 
    twoLetterISOLanguageName: "dyo", 
    threeLetterISOLanguageName: "dyo", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "CFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
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
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["Dim", "Ten", "Tal", "Ala", "Ara", "Arj", "Sib"], 
        shortestDayNames: ["Dim", "Ten", "Tal", "Ala", "Ara", "Arj", "Sib"], 
        dayNames: ["Dimas", "Teneŋ", "Talata", "Alarbay", "Aramisay", "Arjuma", "Sibiti"], 
        abbreviatedMonthNames: ["Sa", "Fe", "Ma", "Ab", "Me", "Su", "Sú", "Ut", "Se", "Ok", "No", "De", ""], 
        monthNames: ["Sanvie", "Fébirie", "Mars", "Aburil", "Mee", "Sueŋ", "Súuyee", "Ut", "Settembar", "Oktobar", "Novembar", "Disambar", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Sa", "Fe", "Ma", "Ab", "Me", "Su", "Sú", "Ut", "Se", "Ok", "No", "De", ""], 
        monthGenitiveNames: ["Sanvie", "Fébirie", "Mars", "Aburil", "Mee", "Sueŋ", "Súuyee", "Ut", "Settembar", "Oktobar", "Novembar", "Disambar", ""]
    }, 
    calendar: new GregorianCalendar()
};