import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "hsb", 
    lcid: 1070, 
    name: "hsb-DE", 
    nativeName: "hornjoserbšćina (Němska)", 
    englishName: "Upper Sorbian (Germany)", 
    twoLetterISOLanguageName: "hsb", 
    threeLetterISOLanguageName: "hsb", 
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
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
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
        amDesignator: "dopołdnja", 
        dateSeparator: ".", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d. MMMM yyyy H:mm:ss", 
        longDatePattern: "dddd, d. MMMM yyyy", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "popołdnju", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d.M.yyyy", 
        shortTimePattern: "H:mm 'hodź'.", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["nje", "pón", "wut", "srj", "štw", "pja", "sob"], 
        shortestDayNames: ["nj", "pó", "wu", "sr", "št", "pj", "so"], 
        dayNames: ["njedźela", "póndźela", "wutora", "srjeda", "štwórtk", "pjatk", "sobota"], 
        abbreviatedMonthNames: ["jan", "feb", "měr", "apr", "mej", "jun", "jul", "awg", "sep", "okt", "now", "dec", ""], 
        monthNames: ["januar", "februar", "měrc", "apryl", "meja", "junij", "julij", "awgust", "september", "oktober", "nowember", "december", ""], 
        nativeCalendarName: "gregorianska protyka", 
        abbreviatedMonthGenitiveNames: ["jan.", "feb.", "měr.", "apr.", "mej.", "jun.", "jul.", "awg.", "sep.", "okt.", "now.", "dec.", ""], 
        monthGenitiveNames: ["januara", "februara", "měrca", "apryla", "meje", "junija", "julija", "awgusta", "septembra", "oktobra", "nowembra", "decembra", ""]
    }, 
    calendar: new GregorianCalendar()
};