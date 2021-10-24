import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "ku-Arab", 
    lcid: 1170, 
    name: "ku-Arab-IQ", 
    nativeName: "کوردیی ناوەڕاست (عێراق)", 
    englishName: "Central Kurdish (Iraq)", 
    twoLetterISOLanguageName: "ku", 
    threeLetterISOLanguageName: "kur", 
    listSeparator: "؛", 
    isRightToLeft: true, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "د.ع.‏", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 2, 
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
        nativeDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], 
        digitSubstitution: 0
    }, 
    dateTimeFormat: {
        amDesignator: "پ.ن", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, dd MMMM, yyyy hh:mm:ss tt", 
        longDatePattern: "dddd, dd MMMM, yyyy", 
        longTimePattern: "hh:mm:ss tt", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "د.ن", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy/MM/dd", 
        shortTimePattern: "hh:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM, yyyy", 
        abbreviatedDayNames: ["یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "ھەینی", "شەممە"], 
        shortestDayNames: ["ی", "د", "س", "چ", "پ", "ھ", "ش"], 
        dayNames: ["یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "ھەینی", "شەممە"], 
        abbreviatedMonthNames: ["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""], 
        monthNames: ["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""], 
        nativeCalendarName: "ڕۆژژمێری زایینی", 
        abbreviatedMonthGenitiveNames: ["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""], 
        monthGenitiveNames: ["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""]
    }, 
    calendar: new GregorianCalendar()
};