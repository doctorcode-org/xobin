import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 116, 
    name: "gn", 
    nativeName: "Avañe’ẽ", 
    englishName: "Guarani", 
    twoLetterISOLanguageName: "gn", 
    threeLetterISOLanguageName: "grn", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "₲", 
        naNSymbol: "ndaha’éi papaha", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-Infinito", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "Infinito", 
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
        amDesignator: "a.m.", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, dd MMMM, yyyy HH:mm:ss", 
        longDatePattern: "dddd, dd MMMM, yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "dd MMMM", 
        pmDesignator: "p.m.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM, yyyy", 
        abbreviatedDayNames: ["teĩ", "kõi", "apy", "ndy", "po", "oteĩ", "okõi"], 
        shortestDayNames: ["A1", "A2", "A3", "A4", "A5", "A6", "A7"], 
        dayNames: ["arateĩ", "arakõi", "araapy", "ararundy", "arapo", "arapoteĩ", "arapokõi"], 
        abbreviatedMonthNames: ["jteĩ", "jkõi", "japy", "jrun", "jpo", "jpot", "jpok", "jpoa", "jpor", "jpa", "jpat", "jpak", ""], 
        monthNames: ["jasyteĩ", "jasykõi", "jasyapy", "jasyrundy", "jasypo", "jasypoteĩ", "jasypokõi", "jasypoapy", "jasyporundy", "jasypa", "jasypateĩ", "jasypakõi", ""], 
        nativeCalendarName: "Arapapaha", 
        abbreviatedMonthGenitiveNames: ["jteĩ", "jkõi", "japy", "jrun", "jpo", "jpot", "jpok", "jpoa", "jpor", "jpa", "jpat", "jpak", ""], 
        monthGenitiveNames: ["jasyteĩ", "jasykõi", "jasyapy", "jasyrundy", "jasypo", "jasypoteĩ", "jasypokõi", "jasypoapy", "jasyporundy", "jasypa", "jasypateĩ", "jasypakõi", ""]
    }, 
    calendar: new GregorianCalendar()
};