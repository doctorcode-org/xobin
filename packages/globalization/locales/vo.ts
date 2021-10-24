import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "vo", 
    nativeName: "Volapük", 
    englishName: "Volapük", 
    twoLetterISOLanguageName: "vo", 
    threeLetterISOLanguageName: "vol", 
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
        currencySymbol: "XDR", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
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
        amDesignator: "AM", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "yyyy MMMM'a' 'd'. d'id' HH:mm:ss", 
        longDatePattern: "yyyy MMMM'a' 'd'. d'id'", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["su.", "mu.", "tu.", "ve.", "dö.", "fr.", "zä."], 
        shortestDayNames: ["su.", "mu.", "tu.", "ve.", "dö.", "fr.", "zä."], 
        dayNames: ["sudel", "mudel", "tudel", "vedel", "dödel", "fridel", "zädel"], 
        abbreviatedMonthNames: ["yan", "feb", "mäz", "prl", "may", "yun", "yul", "gst", "set", "tob", "nov", "dek", ""], 
        monthNames: ["yanul", "febul", "mäzul", "prilul", "mayul", "yunul", "yulul", "gustul", "setul", "tobul", "novul", "dekul", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["yan", "feb", "mäz", "prl", "may", "yun", "yul", "gst", "set", "ton", "nov", "dek", ""], 
        monthGenitiveNames: ["yanul", "febul", "mäzul", "prilul", "mayul", "yunul", "yulul", "gustul", "setul", "tobul", "novul", "dekul", ""]
    }, 
    calendar: new GregorianCalendar()
};