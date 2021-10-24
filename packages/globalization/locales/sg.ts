import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "sg", 
    nativeName: "Sängö", 
    englishName: "Sango", 
    twoLetterISOLanguageName: "sg", 
    threeLetterISOLanguageName: "sag", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "FCFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 0, 
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
        amDesignator: "ND", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "LK", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Bk1", "Bk2", "Bk3", "Bk4", "Bk5", "Lâp", "Lây"], 
        shortestDayNames: ["Bk1", "Bk2", "Bk3", "Bk4", "Bk5", "Lâp", "Lây"], 
        dayNames: ["Bikua-ôko", "Bïkua-ûse", "Bïkua-ptâ", "Bïkua-usïö", "Bïkua-okü", "Lâpôsö", "Lâyenga"], 
        abbreviatedMonthNames: ["Nye", "Ful", "Mbä", "Ngu", "Bêl", "Fön", "Len", "Kük", "Mvu", "Ngb", "Nab", "Kak", ""], 
        monthNames: ["Nyenye", "Fulundïgi", "Mbängü", "Ngubùe", "Bêläwü", "Föndo", "Lengua", "Kükürü", "Mvuka", "Ngberere", "Nabändüru", "Kakauka", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Nye", "Ful", "Mbä", "Ngu", "Bêl", "Fön", "Len", "Kük", "Mvu", "Ngb", "Nab", "Kak", ""], 
        monthGenitiveNames: ["Nyenye", "Fulundïgi", "Mbängü", "Ngubùe", "Bêläwü", "Föndo", "Lengua", "Kükürü", "Mvuka", "Ngberere", "Nabändüru", "Kakauka", ""]
    }, 
    calendar: new GregorianCalendar()
};