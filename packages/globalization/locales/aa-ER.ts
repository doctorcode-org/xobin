import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "aa", 
    lcid: 4096, 
    name: "aa-ER", 
    nativeName: "Qafar (Eretria)", 
    englishName: "Afar (Eritrea)", 
    twoLetterISOLanguageName: "aa", 
    threeLetterISOLanguageName: "aar", 
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
        currencySymbol: "Nfk", 
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
        amDesignator: "saaku", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, MMMM dd, yyyy h:mm:ss tt", 
        longDatePattern: "dddd, MMMM dd, yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "carra", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["Aca", "Etl", "Tal", "Arb", "Kam", "Gum", "Sab"], 
        shortestDayNames: ["Aca", "Etl", "Tal", "Arb", "Kam", "Gum", "Sab"], 
        dayNames: ["Acaada", "Etleeni", "Talaata", "Arbaqa", "Kamiisi", "Gumqata", "Sabti"], 
        abbreviatedMonthNames: ["Qun", "Nah", "Cig", "Agd", "Cax", "Qas", "Qad", "Leq", "Way", "Dit", "Xim", "Kax", ""], 
        monthNames: ["Qunxa Garablu", "Kudo", "Ciggilta Kudo", "Agda Baxis", "Caxah Alsa", "Qasa Dirri", "Qado Dirri", "Liiqen", "Waysu", "Diteli", "Ximoli", "Kaxxa Garablu", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Qun", "Nah", "Cig", "Agd", "Cax", "Qas", "Qad", "Leq", "Way", "Dit", "Xim", "Kax", ""], 
        monthGenitiveNames: ["Qunxa Garablu", "Kudo", "Ciggilta Kudo", "Agda Baxis", "Caxah Alsa", "Qasa Dirri", "Qado Dirri", "Liiqen", "Waysu", "Diteli", "Ximoli", "Kaxxa Garablu", ""]
    }, 
    calendar: new GregorianCalendar()
};