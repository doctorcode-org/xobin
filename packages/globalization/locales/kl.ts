import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 111, 
    name: "kl", 
    nativeName: "kalaallisut", 
    englishName: "Kalaallisut", 
    twoLetterISOLanguageName: "kl", 
    threeLetterISOLanguageName: "kal", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3, 0], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "kr.", 
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
        amDesignator: "", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "MMMM d'.-at, 'yyyy HH:mm:ss", 
        longDatePattern: "MMMM d'.-at, 'yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d'.-at'", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd-MM-yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["sap.", "at.", "marl.", "ping.", "sis.", "tall.", "arf."], 
        shortestDayNames: ["sa", "at", "ma", "pi", "si", "ta", "ar"], 
        dayNames: ["sapaat", "ataasinngorneq", "marlunngorneq", "pingasunngorneq", "sisamanngorneq", "tallimanngorneq", "arfininngorneq"], 
        abbreviatedMonthNames: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""], 
        monthNames: ["januaari", "februaari", "marsi", "apriili", "maaji", "juuni", "juuli", "aggusti", "septembari", "oktobari", "novembari", "decembari", ""], 
        nativeCalendarName: "qaamatisiutit gregorianerisooq", 
        abbreviatedMonthGenitiveNames: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""], 
        monthGenitiveNames: ["januaarip", "februaarip", "marsip", "apriilip", "maajip", "juunip", "juulip", "aggustip", "septembarip", "oktobarip", "novembarip", "decembarip", ""]
    }, 
    calendar: new GregorianCalendar()
};