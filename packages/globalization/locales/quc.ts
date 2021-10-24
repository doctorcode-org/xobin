import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 134, 
    name: "quc", 
    nativeName: "K'iche'", 
    englishName: "K'iche'", 
    twoLetterISOLanguageName: "quc", 
    threeLetterISOLanguageName: "quc", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Q", 
        naNSymbol: "NeuN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-Infinito", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "Infinito", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "a.m.", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, dd' rech 'MMMM' rech 'yyyy h:mm:ss tt", 
        longDatePattern: "dddd, dd' rech 'MMMM' rech 'yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d' rech 'MMMM", 
        pmDesignator: "p.m.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM' rech 'yyyy", 
        abbreviatedDayNames: ["juq'", "kaq'", "oxq'", "kajq'", "joq'", "waqq'", "wuqq'"], 
        shortestDayNames: ["ju", "ka", "ox", "kj", "jo", "wa", "wu"], 
        dayNames: ["juq'ij", "kaq'ij", "oxq'ij", "kajq'ij", "joq'ij", "waqq'ij", "wuqq'ij"], 
        abbreviatedMonthNames: ["nab'e", "ukab'", "urox", "ukaj", "uro", "uwaq", "uwuq", "uwajxaq", "ub'elej", "ulaj", "ujulaj", "ukab'laj", ""], 
        monthNames: ["nab'e ik'", "ukab' ik'", "urox ik'", "ukaj ik'", "uro ik'", "uwaq ik'", "uwuq ik'", "uwajxaq ik'", "ub'elej ik'", "ulaj ik'", "ujulaj ik'", "ukab'laj ik'", ""], 
        nativeCalendarName: "calendario gregoriano", 
        abbreviatedMonthGenitiveNames: ["nab'e", "ukab'", "urox", "ukaj", "uro", "uwaq", "uwuq", "uwajxaq", "ub'elej", "ulaj", "ujulaj", "ukab'laj", ""], 
        monthGenitiveNames: ["nab'e ik'", "ukab' ik'", "urox ik'", "ukaj ik'", "uro ik'", "uwaq ik'", "uwuq ik'", "uwajxaq ik'", "ub'elej ik'", "ulaj ik'", "ujulaj ik'", "ukab'laj ik'", ""]
    }, 
    calendar: new GregorianCalendar()
};