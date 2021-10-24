import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "arn", 
    lcid: 1146, 
    name: "arn-CL", 
    nativeName: "Mapudungun (Chile)", 
    englishName: "Mapuche (Chile)", 
    twoLetterISOLanguageName: "arn", 
    threeLetterISOLanguageName: "arn", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "$", 
        naNSymbol: "NeuN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-Infinito", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 2, 
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
        amDesignator: "", 
        dateSeparator: "-", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss", 
        longDatePattern: "dddd, dd' de 'MMMM' de 'yyyy", 
        longTimePattern: "H:mm:ss", 
        monthDayPattern: "d 'de' MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd-MM-yyyy", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM' de 'yyyy", 
        abbreviatedDayNames: ["Kiñe", "Epu", "Kila", "Meli", "Kechu", "Cayu", "Regle"], 
        shortestDayNames: ["kñ", "ep", "kl", "me", "ke", "ca", "re"], 
        dayNames: ["Kiñe Ante", "Epu Ante", "Kila Ante", "Meli Ante", "Kechu Ante", "Cayu Ante", "Regle Ante"], 
        abbreviatedMonthNames: ["Kiñe Tripantu", "Epu", "Kila", "Meli", "Kechu", "Cayu", "Regle", "Purha", "Aiya", "Marhi", "Marhi Kiñe", "Marhi Epu", ""], 
        monthNames: ["Kiñe Tripantu", "Epu", "Kila", "Meli", "Kechu", "Cayu", "Regle", "Purha", "Aiya", "Marhi", "Marhi Kiñe", "Marhi Epu", ""], 
        nativeCalendarName: "calendario gregoriano", 
        abbreviatedMonthGenitiveNames: ["Kiñe Tripantu", "Epu", "Kila", "Meli", "Kechu", "Cayu", "Regle", "Purha", "Aiya", "Marhi", "Marhi Kiñe", "Marhi Epu", ""], 
        monthGenitiveNames: ["Kiñe Tripantu", "Epu", "Kila", "Meli", "Kechu", "Cayu", "Regle", "Purha", "Aiya", "Marhi", "Marhi Kiñe", "Marhi Epu", ""]
    }, 
    calendar: new GregorianCalendar()
};