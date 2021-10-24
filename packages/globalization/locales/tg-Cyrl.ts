import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "tg", 
    lcid: 31784, 
    name: "tg-Cyrl", 
    nativeName: "тоҷикӣ", 
    englishName: "Tajik (Cyrillic)", 
    twoLetterISOLanguageName: "tg", 
    threeLetterISOLanguageName: "tgk", 
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
        currencySymbol: "смн", 
        naNSymbol: "NaN", 
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
        amDesignator: "", 
        dateSeparator: ".", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "d MMMM yyyy' с.' HH:mm:ss", 
        longDatePattern: "d MMMM yyyy' с.'", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "dd MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd.MM.yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["пкш", "дшб", "сшб", "чшб", "пшб", "ҷум", "шнб"], 
        shortestDayNames: ["яш", "дш", "сш", "чш", "пш", "ҷм", "шб"], 
        dayNames: ["якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе"], 
        abbreviatedMonthNames: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""], 
        monthNames: ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр", ""], 
        nativeCalendarName: "Тақвими григорианӣ", 
        abbreviatedMonthGenitiveNames: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""], 
        monthGenitiveNames: ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр", ""]
    }, 
    calendar: new GregorianCalendar()
};