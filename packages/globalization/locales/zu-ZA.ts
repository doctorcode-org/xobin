import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "zu", 
    lcid: 1077, 
    name: "zu-ZA", 
    nativeName: "isiZulu (iNingizimu Afrika)", 
    englishName: "isiZulu (South Africa)", 
    twoLetterISOLanguageName: "zu", 
    threeLetterISOLanguageName: "zul", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "R", 
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
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, MMMM d, yyyy HH:mm:ss", 
        longDatePattern: "dddd, MMMM d, yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "M/d/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Son", "Mso", "Bil", "Tha", "Sin", "Hla", "Mgq"], 
        shortestDayNames: ["Son", "Mso", "Bil", "Tha", "Sin", "Hla", "Mgq"], 
        dayNames: ["ISonto", "UMsombuluko", "ULwesibili", "ULwesithathu", "ULwesine", "ULwesihlanu", "UMgqibelo"], 
        abbreviatedMonthNames: ["Jan", "Feb", "Mas", "Eph", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis", ""], 
        monthNames: ["Januwari", "Februwari", "Mashi", "Ephreli", "Meyi", "Juni", "Julayi", "Agasti", "Septhemba", "Okthoba", "Novemba", "Disemba", ""], 
        nativeCalendarName: "ikhalenda lesi-Gregorian", 
        abbreviatedMonthGenitiveNames: ["Jan", "Feb", "Mas", "Eph", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis", ""], 
        monthGenitiveNames: ["Januwari", "Februwari", "Mashi", "Ephreli", "Meyi", "Juni", "Julayi", "Agasti", "Septhemba", "Okthoba", "Novemba", "Disemba", ""]
    }, 
    calendar: new GregorianCalendar()
};