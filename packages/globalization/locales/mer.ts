import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "mer", 
    nativeName: "Kĩmĩrũ", 
    englishName: "Meru", 
    twoLetterISOLanguageName: "mer", 
    threeLetterISOLanguageName: "mer", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Ksh", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
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
        amDesignator: "RŨ", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "ŨG", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["KIU", "MRA", "WAI", "WET", "WEN", "WTN", "JUM"], 
        shortestDayNames: ["KIU", "MRA", "WAI", "WET", "WEN", "WTN", "JUM"], 
        dayNames: ["Kiumia", "Muramuko", "Wairi", "Wethatu", "Wena", "Wetano", "Jumamosi"], 
        abbreviatedMonthNames: ["JAN", "FEB", "MAC", "ĨPU", "MĨĨ", "NJU", "NJR", "AGA", "SPT", "OKT", "NOV", "DEC", ""], 
        monthNames: ["Januarĩ", "Feburuarĩ", "Machi", "Ĩpurũ", "Mĩĩ", "Njuni", "Njuraĩ", "Agasti", "Septemba", "Oktũba", "Novemba", "Dicemba", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["JAN", "FEB", "MAC", "ĨPU", "MĨĨ", "NJU", "NJR", "AGA", "SPT", "OKT", "NOV", "DEC", ""], 
        monthGenitiveNames: ["Januarĩ", "Feburuarĩ", "Machi", "Ĩpurũ", "Mĩĩ", "Njuni", "Njuraĩ", "Agasti", "Septemba", "Oktũba", "Novemba", "Dicemba", ""]
    }, 
    calendar: new GregorianCalendar()
};