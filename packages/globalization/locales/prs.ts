import { CultureData, PersianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 140, 
    name: "prs", 
    nativeName: "درى", 
    englishName: "Dari", 
    twoLetterISOLanguageName: "prs", 
    threeLetterISOLanguageName: "prs", 
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
        currencySymbol: "؋", 
        naNSymbol: "ناعدد", 
        currencyNegativePattern: 3, 
        numberNegativePattern: 3, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: ".", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
        amDesignator: "غ.م", 
        dateSeparator: "/", 
        firstDayOfWeek: 6, 
        fullDateTimePattern: "dddd, d MMMM yyyy h:mm:ss tt", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "غ.و", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy/M/d", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["یکشنبه", "دوشنبه", "سه‌ شنبه", "چهار شنبه", "پنجشنبه", "جمعه", "شنبه"], 
        shortestDayNames: ["ی", "د", "س", "چ", "پ", "ج", "ش"], 
        dayNames: ["یکشنبه", "دوشنبه", "سه‌ شنبه", "چهار شنبه", "پنجشنبه", "جمعه", "شنبه"], 
        abbreviatedMonthNames: ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت", ""], 
        monthNames: ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت", ""], 
        nativeCalendarName: "Islamic Solar", 
        abbreviatedMonthGenitiveNames: ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت", ""], 
        monthGenitiveNames: ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت", ""]
    }, 
    calendar: new PersianCalendar()
};