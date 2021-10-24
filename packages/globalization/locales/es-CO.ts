import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "es", 
    lcid: 9226, 
    name: "es-CO", 
    nativeName: "español (Colombia)", 
    englishName: "Spanish (Colombia)", 
    twoLetterISOLanguageName: "es", 
    threeLetterISOLanguageName: "spa", 
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
        currencySymbol: "$", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 2, 
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
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, d 'de' MMMM 'de' yyyy h:mm:ss tt", 
        longDatePattern: "dddd, d 'de' MMMM 'de' yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d 'de' MMMM", 
        pmDesignator: "p. m.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM 'de' yyyy", 
        abbreviatedDayNames: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."], 
        shortestDayNames: ["DO", "LU", "MA", "MI", "JU", "VI", "SA"], 
        dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"], 
        abbreviatedMonthNames: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic.", ""], 
        monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""], 
        nativeCalendarName: "calendario gregoriano", 
        abbreviatedMonthGenitiveNames: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""], 
        monthGenitiveNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""]
    }, 
    calendar: new GregorianCalendar()
};