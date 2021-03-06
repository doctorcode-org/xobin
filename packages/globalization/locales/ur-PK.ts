import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ur", 
    lcid: 1056, 
    name: "ur-PK", 
    nativeName: "اُردو (پاکستان)", 
    englishName: "Urdu (Pakistan)", 
    twoLetterISOLanguageName: "ur", 
    threeLetterISOLanguageName: "urd", 
    listSeparator: ";", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
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
        nativeDigits: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dd MMMM, yyyy h:mm:ss tt", 
        longDatePattern: "dd MMMM, yyyy", 
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
        abbreviatedDayNames: ["اتوار", "پير", "منگل", "بدھ", "جمعرات", "جمعه", "هفته"], 
        shortestDayNames: ["ا", "پ", "م", "ب", "ج", "ج", "ه"], 
        dayNames: ["اتوار", "پير", "منگل", "بدھ", "جمعرات", "جمعه", "هفته"], 
        abbreviatedMonthNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""], 
        monthNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""], 
        nativeCalendarName: "عیسوی", 
        abbreviatedMonthGenitiveNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""], 
        monthGenitiveNames: ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""]
    }, 
    calendar: new GregorianCalendar()
};