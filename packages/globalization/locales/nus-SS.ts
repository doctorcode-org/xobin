import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "nus", 
    lcid: 4096, 
    name: "nus-SS", 
    nativeName: "Thok Nath (South Sudan)", 
    englishName: "Nuer (South Sudan)", 
    twoLetterISOLanguageName: "nus", 
    threeLetterISOLanguageName: "nus", 
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
        currencySymbol: "£", 
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
        amDesignator: "RW", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy h:mm:ss tt", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "TŊ", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["Cäŋ", "Jiec", "Rɛw", "Diɔ̱k", "Ŋuaan", "Dhieec", "Bäkɛl"], 
        shortestDayNames: ["Cäŋ", "Jiec", "Rɛw", "Diɔ̱k", "Ŋuaan", "Dhieec", "Bäkɛl"], 
        dayNames: ["Cäŋ kuɔth", "Jiec la̱t", "Rɛw lätni", "Diɔ̱k lätni", "Ŋuaan lätni", "Dhieec lätni", "Bäkɛl lätni"], 
        abbreviatedMonthNames: ["Tiop", "Pɛt", "Duɔ̱ɔ̱", "Guak", "Duä", "Kor", "Pay", "Thoo", "Tɛɛ", "Laa", "Kur", "Tid", ""], 
        monthNames: ["Tiop thar pɛt", "Pɛt", "Duɔ̱ɔ̱ŋ", "Guak", "Duät", "Kornyoot", "Pay yie̱tni", "Tho̱o̱r", "Tɛɛr", "Laath", "Kur", "Tio̱p in di̱i̱t", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Tiop", "Pɛt", "Duɔ̱ɔ̱", "Guak", "Duä", "Kor", "Pay", "Thoo", "Tɛɛ", "Laa", "Kur", "Tid", ""], 
        monthGenitiveNames: ["Tiop thar pɛt", "Pɛt", "Duɔ̱ɔ̱ŋ", "Guak", "Duät", "Kornyoot", "Pay yie̱tni", "Tho̱o̱r", "Tɛɛr", "Laath", "Kur", "Tio̱p in di̱i̱t", ""]
    }, 
    calendar: new GregorianCalendar()
};