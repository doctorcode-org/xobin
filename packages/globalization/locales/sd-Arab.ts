import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "sd", 
    lcid: 31833, 
    name: "sd-Arab", 
    nativeName: "سنڌي", 
    englishName: "Sindhi", 
    twoLetterISOLanguageName: "sd", 
    threeLetterISOLanguageName: "snd", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Rs", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 3, 
        percentPositivePattern: 3, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "Infinity-", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "Infinity", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, dd MMMM, yyyy h:mm:ss tt", 
        longDatePattern: "dddd, dd MMMM, yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "dd MMMM", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM, yyyy", 
        abbreviatedDayNames: ["سو", "اڱ", "ار", "خم", "جمعو", "ڇن", "آچ"], 
        shortestDayNames: ["سو", "اڱ", "ار", "خم", "جم", "ڇن", "آچ"], 
        dayNames: ["سومر", "اڱارو", "اربع", "خميس", "جمعو", "ڇنڇر", "آچر"], 
        abbreviatedMonthNames: ["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""], 
        monthNames: ["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""], 
        nativeCalendarName: "عیسوی", 
        abbreviatedMonthGenitiveNames: ["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""], 
        monthGenitiveNames: ["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""]
    }, 
    calendar: new GregorianCalendar()
};