import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "bas", 
    nativeName: "Ɓàsàa", 
    englishName: "Basaa", 
    twoLetterISOLanguageName: "bas", 
    threeLetterISOLanguageName: "bas", 
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
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
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
        amDesignator: "I bikɛ̂glà", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "I ɓugajɔp", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["nɔy", "nja", "uum", "ŋge", "mbɔ", "kɔɔ", "jon"], 
        shortestDayNames: ["nɔy", "nja", "uum", "ŋge", "mbɔ", "kɔɔ", "jon"], 
        dayNames: ["ŋgwà nɔ̂y", "ŋgwà njaŋgumba", "ŋgwà ûm", "ŋgwà ŋgê", "ŋgwà mbɔk", "ŋgwà kɔɔ", "ŋgwà jôn"], 
        abbreviatedMonthNames: ["kɔn", "mac", "mat", "mto", "mpu", "hil", "nje", "hik", "dip", "bio", "may", "liɓ", ""], 
        monthNames: ["Kɔndɔŋ", "Màcɛ̂l", "Màtùmb", "Màtop", "M̀puyɛ", "Hìlòndɛ̀", "Njèbà", "Hìkaŋ", "Dìpɔ̀s", "Bìòôm", "Màyɛsèp", "Lìbuy li ńyèe", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["kɔn", "mac", "mat", "mto", "mpu", "hil", "nje", "hik", "dip", "bio", "may", "liɓ", ""], 
        monthGenitiveNames: ["Kɔndɔŋ", "Màcɛ̂l", "Màtùmb", "Màtop", "M̀puyɛ", "Hìlòndɛ̀", "Njèbà", "Hìkaŋ", "Dìpɔ̀s", "Bìòôm", "Màyɛsèp", "Lìbuy li ńyèe", ""]
    }, 
    calendar: new GregorianCalendar()
};