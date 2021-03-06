import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "nds", 
    lcid: 4096, 
    name: "nds-DE", 
    nativeName: "Neddersass’sch (Düütschland)", 
    englishName: "Low German (Germany)", 
    twoLetterISOLanguageName: "nds", 
    threeLetterISOLanguageName: "nds", 
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
        amDesignator: "vm", 
        dateSeparator: ".", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, 'de' d. MMMM yyyy 'Klock' H.mm:ss", 
        longDatePattern: "dddd, 'de' d. MMMM yyyy", 
        longTimePattern: "'Klock' H.mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "nm", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d.MM.yyyy", 
        shortTimePattern: "'Kl'. H.mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ".", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["Sü.", "Ma.", "Di.", "Mi.", "Du.", "Fr.", "Sa."], 
        shortestDayNames: ["Sü.", "Ma.", "Di.", "Mi.", "Du.", "Fr.", "Sa."], 
        dayNames: ["Sünndag", "Maandag", "Dingsdag", "Middeweken", "Dunnersdag", "Freedag", "Sünnavend"], 
        abbreviatedMonthNames: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez.", ""], 
        monthNames: ["Januaar", "Februaar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktover", "November", "Dezember", ""], 
        nativeCalendarName: "Gregoriaansch Klenner", 
        abbreviatedMonthGenitiveNames: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez.", ""], 
        monthGenitiveNames: ["Januaar", "Februaar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktover", "November", "Dezember", ""]
    }, 
    calendar: new GregorianCalendar()
};