import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "jv", 
    nativeName: "Basa Jawa", 
    englishName: "Javanese", 
    twoLetterISOLanguageName: "jv", 
    threeLetterISOLanguageName: "jav", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "Rp", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-Infinity", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "Infinity", 
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
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dd MMMM yyyy HH.mm.ss", 
        longDatePattern: "dd MMMM yyyy", 
        longTimePattern: "HH.mm.ss", 
        monthDayPattern: "dd MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH.mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ".", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Min", "Sen", "Sel", "Reb", "Kem", "Jem", "Set"], 
        shortestDayNames: ["Mi", "Sn", "Sl", "Re", "Ke", "Je", "St"], 
        dayNames: ["Minggu", "Senèn", "Selasa", "Rebo", "Kemis", "Jemuwah", "Setu"], 
        abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Okt", "Nov", "Des", ""], 
        monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ""], 
        nativeCalendarName: "kalender Masehi", 
        abbreviatedMonthGenitiveNames: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Okt", "Nov", "Des", ""], 
        monthGenitiveNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ""]
    }, 
    calendar: new GregorianCalendar()
};