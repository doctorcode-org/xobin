import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 103, 
    name: "ff", 
    nativeName: "Pulaar", 
    englishName: "Fulah (Latin)", 
    twoLetterISOLanguageName: "ff", 
    threeLetterISOLanguageName: "ful", 
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
        currencySymbol: "CFA", 
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
        amDesignator: "", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "dd MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["alet", "alt.", "tal.", "alar.", "alk.", "alj.", "aset"], 
        shortestDayNames: ["Al", "Te", "Ta", "Al", "Al", "Ju", "As"], 
        dayNames: ["alete", "altine", "talaata", "alarba", "alkamiisa", "aljumaa", "asete"], 
        abbreviatedMonthNames: ["samw", "feeb", "mar", "awr", "me", "suy", "sul", "ut", "sat", "okt", "now", "dees", ""], 
        monthNames: ["samwiee", "feeburyee", "marsa", "awril", "me", "suyeŋ", "sulyee", "ut", "satambara", "oktoobar", "nowamburu", "deesamburu", ""], 
        nativeCalendarName: "Lebbi tuubaaka", 
        abbreviatedMonthGenitiveNames: ["samw", "feeb", "mar", "awr", "me", "suy", "sul", "ut", "sat", "okt", "now", "dees", ""], 
        monthGenitiveNames: ["samwiee", "feeburyee", "marsa", "awril", "me", "suyeŋ", "sulyee", "ut", "satambara", "oktoobar", "nowamburu", "deesamburu", ""]
    }, 
    calendar: new GregorianCalendar()
};