import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ur", 
    lcid: 2080, 
    name: "ur-IN", 
    nativeName: "اردو (بھارت)", 
    englishName: "Urdu (India)", 
    twoLetterISOLanguageName: "ur", 
    threeLetterISOLanguageName: "urd", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3, 2], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₹", 
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
        percentSymbol: "٪", 
        perMilleSymbol: "‰", 
        nativeDigits: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
        amDesignator: "دن", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d MMMM, yyyy h:mm:ss tt", 
        longDatePattern: "dddd, d MMMM, yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "رات", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"], 
        shortestDayNames: ["ا", "پ", "م", "ب", "ج", "ج", "ہ"], 
        dayNames: ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"], 
        abbreviatedMonthNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""], 
        monthNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""], 
        nativeCalendarName: "مىلادىيە كالېندارى", 
        abbreviatedMonthGenitiveNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""], 
        monthGenitiveNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""]
    }, 
    calendar: new GregorianCalendar()
};