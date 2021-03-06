import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "fur", 
    lcid: 4096, 
    name: "fur-IT", 
    nativeName: "furlan (Italie)", 
    englishName: "Friulian (Italy)", 
    twoLetterISOLanguageName: "fur", 
    threeLetterISOLanguageName: "fur", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "€", 
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
        amDesignator: "a.", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d 'di' MMMM 'dal' yyyy HH:mm:ss", 
        longDatePattern: "dddd d 'di' MMMM 'dal' yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d 'di' MMMM", 
        pmDesignator: "p.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM 'dal' yyyy", 
        abbreviatedDayNames: ["dom", "lun", "mar", "mie", "joi", "vin", "sab"], 
        shortestDayNames: ["dom", "lun", "mar", "mie", "joi", "vin", "sab"], 
        dayNames: ["domenie", "lunis", "martars", "miercus", "joibe", "vinars", "sabide"], 
        abbreviatedMonthNames: ["Zen", "Fev", "Mar", "Avr", "Mai", "Jug", "Lui", "Avo", "Set", "Otu", "Nov", "Dic", ""], 
        monthNames: ["Zenâr", "Fevrâr", "Març", "Avrîl", "Mai", "Jugn", "Lui", "Avost", "Setembar", "Otubar", "Novembar", "Dicembar", ""], 
        nativeCalendarName: "calendari gregorian", 
        abbreviatedMonthGenitiveNames: ["Zen", "Fev", "Mar", "Avr", "Mai", "Jug", "Lui", "Avo", "Set", "Otu", "Nov", "Dic", ""], 
        monthGenitiveNames: ["Zenâr", "Fevrâr", "Març", "Avrîl", "Mai", "Jugn", "Lui", "Avost", "Setembar", "Otubar", "Novembar", "Dicembar", ""]
    }, 
    calendar: new GregorianCalendar()
};