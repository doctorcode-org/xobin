import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "ewo", 
    nativeName: "ewondo", 
    englishName: "Ewondo", 
    twoLetterISOLanguageName: "ewo", 
    threeLetterISOLanguageName: "ewo", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "FCFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
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
        amDesignator: "kíkíríg", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "ngəgógəle", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["sɔ́n", "mɔ́n", "smb", "sml", "smn", "fúl", "sér"], 
        shortestDayNames: ["sɔ́n", "mɔ́n", "smb", "sml", "smn", "fúl", "sér"], 
        dayNames: ["sɔ́ndɔ", "mɔ́ndi", "sɔ́ndɔ məlú mə́bɛ̌", "sɔ́ndɔ məlú mə́lɛ́", "sɔ́ndɔ məlú mə́nyi", "fúladé", "séradé"], 
        abbreviatedMonthNames: ["ngo", "ngb", "ngl", "ngn", "ngt", "ngs", "ngz", "ngm", "nge", "nga", "ngad", "ngab", ""], 
        monthNames: ["ngɔn osú", "ngɔn bɛ̌", "ngɔn lála", "ngɔn nyina", "ngɔn tána", "ngɔn saməna", "ngɔn zamgbála", "ngɔn mwom", "ngɔn ebulú", "ngɔn awóm", "ngɔn awóm ai dziá", "ngɔn awóm ai bɛ̌", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["ngo", "ngb", "ngl", "ngn", "ngt", "ngs", "ngz", "ngm", "nge", "nga", "ngad", "ngab", ""], 
        monthGenitiveNames: ["ngɔn osú", "ngɔn bɛ̌", "ngɔn lála", "ngɔn nyina", "ngɔn tána", "ngɔn saməna", "ngɔn zamgbála", "ngɔn mwom", "ngɔn ebulú", "ngɔn awóm", "ngɔn awóm ai dziá", "ngɔn awóm ai bɛ̌", ""]
    }, 
    calendar: new GregorianCalendar()
};