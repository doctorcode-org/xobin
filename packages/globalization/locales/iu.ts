import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 93, 
    name: "iu", 
    nativeName: "Inuktitut", 
    englishName: "Inuktitut", 
    twoLetterISOLanguageName: "iu", 
    threeLetterISOLanguageName: "iku", 
    listSeparator: ",", 
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
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-Infinity", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "Infinity", 
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
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, dd MMMM, yyyy h:mm:ss tt", 
        longDatePattern: "dddd, dd MMMM, yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM, yyyy", 
        abbreviatedDayNames: ["Nat", "Nag", "Aip", "Pi", "Sit", "Tal", "Siv"], 
        shortestDayNames: ["Nt", "Ng", "A", "P", "S", "T", "S"], 
        dayNames: ["Naattiinguja", "Naggajjau", "Aippiq", "Pingatsiq", "Sitammiq", "Tallirmiq", "Sivataarvik"], 
        abbreviatedMonthNames: ["Jan", "Viv", "Mas", "Ipu", "Mai", "Jun", "Jul", "Agi", "Sii", "Uut", "Nuv", "Tis", ""], 
        monthNames: ["Jaannuari", "Viivvuari", "Maatsi", "Iipuri", "Mai", "Juuni", "Julai", "Aaggiisi", "Sitipiri", "Utupiri", "Nuvipiri", "Tisipiri", ""], 
        nativeCalendarName: "Ulluqsiutit", 
        abbreviatedMonthGenitiveNames: ["Jan", "Viv", "Mas", "Ipu", "Mai", "Jun", "Jul", "Agi", "Sii", "Uut", "Nuv", "Tis", ""], 
        monthGenitiveNames: ["Jaannuari", "Viivvuari", "Maatsi", "Iipuri", "Mai", "Juuni", "Julai", "Aaggiisi", "Sitipiri", "Utupiri", "Nuvipiri", "Tisipiri", ""]
    }, 
    calendar: new GregorianCalendar()
};