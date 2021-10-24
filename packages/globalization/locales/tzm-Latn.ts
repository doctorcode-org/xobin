import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "tzm", 
    lcid: 31839, 
    name: "tzm-Latn", 
    nativeName: "Tamaziɣt n laṭlaṣ", 
    englishName: "Central Atlas Tamazight (Latin)", 
    twoLetterISOLanguageName: "tzm", 
    threeLetterISOLanguageName: "tzm", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "DA", 
        naNSymbol: "war amdhan", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-ifedh", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "+ifedh", 
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
        amDesignator: "", 
        dateSeparator: "-", 
        firstDayOfWeek: 6, 
        fullDateTimePattern: "dd MMMM, yyyy H:mm:ss", 
        longDatePattern: "dd MMMM, yyyy", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd-MM-yyyy", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM, yyyy", 
        abbreviatedDayNames: ["lh'd", "let", "ttl", "lar", "lex", "ldj", "sse"], 
        shortestDayNames: ["lh", "lt", "tt", "la", "lx", "ld", "ss"], 
        dayNames: ["lh'ed", "letnayen", "ttlata", "larebâa", "lexmis", "ldjemâa", "ssebt"], 
        abbreviatedMonthNames: ["Yen", "Fur", "Megh", "Yeb", "May", "Yun", "Yul", "Ghu", "Cut", "Tub", "Nun", "Duj", ""], 
        monthNames: ["Yennayer", "Furar", "Meghres", "Yebrir", "Magu", "Yunyu", "Yulyu", "Ghuct", "Cutenber", "Tuber", "Nunember", "Dujanbir", ""], 
        nativeCalendarName: "calendrier grégorien", 
        abbreviatedMonthGenitiveNames: ["Yen", "Fur", "Megh", "Yeb", "May", "Yun", "Yul", "Ghu", "Cut", "Tub", "Nun", "Duj", ""], 
        monthGenitiveNames: ["Yennayer", "Furar", "Meghres", "Yebrir", "Magu", "Yunyu", "Yulyu", "Ghuct", "Cutenber", "Tuber", "Nunember", "Dujanbir", ""]
    }, 
    calendar: new GregorianCalendar()
};