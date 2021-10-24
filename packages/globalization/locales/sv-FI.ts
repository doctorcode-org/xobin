import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "sv", 
    lcid: 2077, 
    name: "sv-FI", 
    nativeName: "svenska (Finland)", 
    englishName: "Swedish (Finland)", 
    twoLetterISOLanguageName: "sv", 
    threeLetterISOLanguageName: "swe", 
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
        currencySymbol: "€", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
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
        amDesignator: "fm", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "em", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd-MM-yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["sön", "mån", "tis", "ons", "tors", "fre", "lör"], 
        shortestDayNames: ["sö", "må", "ti", "on", "to", "fr", "lö"], 
        dayNames: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"], 
        abbreviatedMonthNames: ["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec.", ""], 
        monthNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december", ""], 
        nativeCalendarName: "gregoriansk kalender", 
        abbreviatedMonthGenitiveNames: ["jan.", "feb.", "mars", "apr.", "maj", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "dec.", ""], 
        monthGenitiveNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december", ""]
    }, 
    calendar: new GregorianCalendar()
};