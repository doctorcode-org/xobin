import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "sr-Latn", 
    lcid: 4096, 
    name: "sr-Latn-XK", 
    nativeName: "srpski (Kosovo)", 
    englishName: "Serbian (Latin, Kosovo)", 
    twoLetterISOLanguageName: "sr", 
    threeLetterISOLanguageName: "srp", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "€", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: ".", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "pre podne", 
        dateSeparator: ".", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, dd. MMMM yyyy. HH:mm:ss", 
        longDatePattern: "dddd, dd. MMMM yyyy.", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d. MMMM", 
        pmDesignator: "po podne", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d.M.yyyy.", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy.", 
        abbreviatedDayNames: ["ned.", "pon.", "ut.", "sr.", "čet.", "pet.", "sub."], 
        shortestDayNames: ["ne", "po", "ut", "sr", "če", "pe", "su"], 
        dayNames: ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"], 
        abbreviatedMonthNames: ["jan.", "feb.", "mart", "apr.", "maj", "jun", "jul", "avg.", "sept.", "okt.", "nov.", "dec.", ""], 
        monthNames: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar", ""], 
        nativeCalendarName: "gregorijanski kalendar", 
        abbreviatedMonthGenitiveNames: ["jan.", "feb.", "mart", "apr.", "maj", "jun", "jul", "avg.", "sept.", "okt.", "nov.", "dec.", ""], 
        monthGenitiveNames: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar", ""]
    }, 
    calendar: new GregorianCalendar()
};