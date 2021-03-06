import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 38, 
    name: "lv", 
    nativeName: "latviešu", 
    englishName: "Latvian", 
    twoLetterISOLanguageName: "lv", 
    threeLetterISOLanguageName: "lav", 
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
        currencySymbol: "€", 
        naNSymbol: "NS", 
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
        amDesignator: "priekšp.", 
        dateSeparator: ".", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, yyyy. 'gada' d. MMMM HH:mm:ss", 
        longDatePattern: "dddd, yyyy. 'gada' d. MMMM", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d. MMMM", 
        pmDesignator: "pēcp.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd.MM.yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy. 'g'. MMMM", 
        abbreviatedDayNames: ["svētd.", "pirmd.", "otrd.", "trešd.", "ceturtd.", "piektd.", "sestd."], 
        shortestDayNames: ["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "Se"], 
        dayNames: ["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"], 
        abbreviatedMonthNames: ["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec.", ""], 
        monthNames: ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris", ""], 
        nativeCalendarName: "Gregora kalendārs", 
        abbreviatedMonthGenitiveNames: ["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec.", ""], 
        monthGenitiveNames: ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris", ""]
    }, 
    calendar: new GregorianCalendar()
};