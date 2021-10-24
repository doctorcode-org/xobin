import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "gl", 
    lcid: 1110, 
    name: "gl-ES", 
    nativeName: "galego (galego)", 
    englishName: "Galician (Galician)", 
    twoLetterISOLanguageName: "gl", 
    threeLetterISOLanguageName: "glg", 
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
        amDesignator: "a.m.", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d 'de' MMMM 'de' yyyy HH:mm:ss", 
        longDatePattern: "dddd, d 'de' MMMM 'de' yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d 'de' MMMM", 
        pmDesignator: "p.m.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM 'de' yyyy", 
        abbreviatedDayNames: ["dom.", "luns", "mar.", "mér.", "xov.", "ven.", "sáb."], 
        shortestDayNames: ["do.", "lu.", "ma.", "mé.", "xo.", "ve.", "sá."], 
        dayNames: ["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"], 
        abbreviatedMonthNames: ["Xan.", "Feb.", "Mar.", "Abr.", "Maio", "Xuño", "Xul.", "Ago.", "Set.", "Out.", "Nov.", "Dec.", ""], 
        monthNames: ["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro", ""], 
        nativeCalendarName: "calendario gregoriano", 
        abbreviatedMonthGenitiveNames: ["xan.", "feb.", "mar.", "abr.", "maio", "xuño", "xul.", "ago.", "set.", "out.", "nov.", "dec.", ""], 
        monthGenitiveNames: ["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro", ""]
    }, 
    calendar: new GregorianCalendar()
};