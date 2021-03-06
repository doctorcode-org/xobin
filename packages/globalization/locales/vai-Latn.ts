import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "vai", 
    lcid: 4096, 
    name: "vai-Latn", 
    nativeName: "Vai", 
    englishName: "Vai (Latin)", 
    twoLetterISOLanguageName: "vai", 
    threeLetterISOLanguageName: "vai", 
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
        currencySymbol: "$", 
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
        nativeDigits: ["꘠", "꘡", "꘢", "꘣", "꘤", "꘥", "꘦", "꘧", "꘨", "꘩"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d MMMM yyyy h:mm:ss tt", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["lahadi", "tɛɛnɛɛ", "talata", "alaba", "aimisa", "aijima", "siɓiti"], 
        shortestDayNames: ["lahadi", "tɛɛnɛɛ", "talata", "alaba", "aimisa", "aijima", "siɓiti"], 
        dayNames: ["lahadi", "tɛɛnɛɛ", "talata", "alaba", "aimisa", "aijima", "siɓiti"], 
        abbreviatedMonthNames: ["luukao kemã", "ɓandaɓu", "vɔɔ", "fulu", "goo", "6", "7", "kɔnde", "saah", "galo", "kenpkato ɓololɔ", "luukao lɔma", ""], 
        monthNames: ["luukao kemã", "ɓandaɓu", "vɔɔ", "fulu", "goo", "6", "7", "kɔnde", "saah", "galo", "kenpkato ɓololɔ", "luukao lɔma", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["luukao kemã", "ɓandaɓu", "vɔɔ", "fulu", "goo", "6", "7", "kɔnde", "saah", "galo", "kenpkato ɓololɔ", "luukao lɔma", ""], 
        monthGenitiveNames: ["luukao kemã", "ɓandaɓu", "vɔɔ", "fulu", "goo", "6", "7", "kɔnde", "saah", "galo", "kenpkato ɓololɔ", "luukao lɔma", ""]
    }, 
    calendar: new GregorianCalendar()
};