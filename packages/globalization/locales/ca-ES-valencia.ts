import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ca-ES", 
    lcid: 2051, 
    name: "ca-ES-valencia", 
    nativeName: "valencià (Espanya)", 
    englishName: "Valencian (Spain)", 
    twoLetterISOLanguageName: "ca", 
    threeLetterISOLanguageName: "cat", 
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
        amDesignator: "a. m.", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d MMMM 'de' yyyy H:mm:ss", 
        longDatePattern: "dddd, d MMMM 'de' yyyy", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "p. m.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM 'de' yyyy", 
        abbreviatedDayNames: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."], 
        shortestDayNames: ["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."], 
        dayNames: ["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"], 
        abbreviatedMonthNames: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des.", ""], 
        monthNames: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre", ""], 
        nativeCalendarName: "calendari gregorià", 
        abbreviatedMonthGenitiveNames: ["de gen.", "de febr.", "de març", "d’abr.", "de maig", "de juny", "de jul.", "d’ag.", "de set.", "d’oct.", "de nov.", "de des.", ""], 
        monthGenitiveNames: ["de gener", "de febrer", "de març", "d’abril", "de maig", "de juny", "de juliol", "d’agost", "de setembre", "d’octubre", "de novembre", "de desembre", ""]
    }, 
    calendar: new GregorianCalendar()
};