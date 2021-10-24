import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "kkj", 
    nativeName: "kakɔ", 
    englishName: "Kako", 
    twoLetterISOLanguageName: "kkj", 
    threeLetterISOLanguageName: "kkj", 
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
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
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
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd dd MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd dd MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["sɔndi", "lundi", "mardi", "mɛrkɛrɛdi", "yedi", "vaŋdɛrɛdi", "mɔnɔ sɔndi"], 
        shortestDayNames: ["sɔndi", "lundi", "mardi", "mɛrkɛrɛdi", "yedi", "vaŋdɛrɛdi", "mɔnɔ sɔndi"], 
        dayNames: ["sɔndi", "lundi", "mardi", "mɛrkɛrɛdi", "yedi", "vaŋdɛrɛdi", "mɔnɔ sɔndi"], 
        abbreviatedMonthNames: ["pamba", "wanja", "mbiyɔ mɛndoŋgɔ", "Nyɔlɔmbɔŋgɔ", "Mɔnɔ ŋgbanja", "Nyaŋgwɛ ŋgbanja", "kuŋgwɛ", "fɛ", "njapi", "nyukul", "11", "ɓulɓusɛ", ""], 
        monthNames: ["pamba", "wanja", "mbiyɔ mɛndoŋgɔ", "Nyɔlɔmbɔŋgɔ", "Mɔnɔ ŋgbanja", "Nyaŋgwɛ ŋgbanja", "kuŋgwɛ", "fɛ", "njapi", "nyukul", "11", "ɓulɓusɛ", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["pamba", "wanja", "mbiyɔ mɛndoŋgɔ", "Nyɔlɔmbɔŋgɔ", "Mɔnɔ ŋgbanja", "Nyaŋgwɛ ŋgbanja", "kuŋgwɛ", "fɛ", "njapi", "nyukul", "11", "ɓulɓusɛ", ""], 
        monthGenitiveNames: ["pamba", "wanja", "mbiyɔ mɛndoŋgɔ", "Nyɔlɔmbɔŋgɔ", "Mɔnɔ ŋgbanja", "Nyaŋgwɛ ŋgbanja", "kuŋgwɛ", "fɛ", "njapi", "nyukul", "11", "ɓulɓusɛ", ""]
    }, 
    calendar: new GregorianCalendar()
};