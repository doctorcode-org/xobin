import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "quz", 
    lcid: 2155, 
    name: "quz-EC", 
    nativeName: "Runasimi (Ecuador)", 
    englishName: "Quechua (Ecuador)", 
    twoLetterISOLanguageName: "quz", 
    threeLetterISOLanguageName: "que", 
    listSeparator: ",", 
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
        currencyNegativePattern: 12, 
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
        amDesignator: "", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss", 
        longDatePattern: "dddd, dd' de 'MMMM' de 'yyyy", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "d 'de' MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM' de 'yyyy", 
        abbreviatedDayNames: ["int", "awk", "wan", "chy", "kuk", "cha", "wak"], 
        shortestDayNames: ["in", "aw", "wn", "cy", "ku", "ck", "wk"], 
        dayNames: ["inti", "awaki", "wanra", "chillay", "kullka", "chaska", "wakma"], 
        abbreviatedMonthNames: ["kull", "pan", "paw", "ayr", "aym", "ray", "sit", "kar", "kus", "way", "sas", "kap", ""], 
        monthNames: ["kulla", "panchi", "pawkar", "ayriwa", "aymuray", "raymi", "sitwa", "karwa", "kuski", "wayru", "sasi", "kapak", ""], 
        nativeCalendarName: "calendario gregoriano", 
        abbreviatedMonthGenitiveNames: ["kull", "pan", "paw", "ayr", "aym", "ray", "sit", "kar", "kus", "way", "sas", "kap", ""], 
        monthGenitiveNames: ["kulla", "panchi", "pawkar", "ayriwa", "aymuray", "raymi", "sitwa", "karwa", "kuski", "wayru", "sasi", "kapak", ""]
    }, 
    calendar: new GregorianCalendar()
};