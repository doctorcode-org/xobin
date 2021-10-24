import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "ki", 
    nativeName: "Gikuyu", 
    englishName: "Kikuyu", 
    twoLetterISOLanguageName: "ki", 
    threeLetterISOLanguageName: "kik", 
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
        currencySymbol: "Ksh", 
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
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "Kiroko", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "Hwaĩ-inĩ", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["KMA", "NTT", "NMN", "NMT", "ART", "NMA", "NMM"], 
        shortestDayNames: ["KMA", "NTT", "NMN", "NMT", "ART", "NMA", "NMM"], 
        dayNames: ["Kiumia", "Njumatatũ", "Njumaine", "Njumatana", "Aramithi", "Njumaa", "Njumamothi"], 
        abbreviatedMonthNames: ["JEN", "WKR", "WGT", "WKN", "WTN", "WTD", "WMJ", "WNN", "WKD", "WIK", "WMW", "DIT", ""], 
        monthNames: ["Njenuarĩ", "Mwere wa kerĩ", "Mwere wa gatatũ", "Mwere wa kana", "Mwere wa gatano", "Mwere wa gatandatũ", "Mwere wa mũgwanja", "Mwere wa kanana", "Mwere wa kenda", "Mwere wa ikũmi", "Mwere wa ikũmi na ũmwe", "Ndithemba", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["JEN", "WKR", "WGT", "WKN", "WTN", "WTD", "WMJ", "WNN", "WKD", "WIK", "WMW", "DIT", ""], 
        monthGenitiveNames: ["Njenuarĩ", "Mwere wa kerĩ", "Mwere wa gatatũ", "Mwere wa kana", "Mwere wa gatano", "Mwere wa gatandatũ", "Mwere wa mũgwanja", "Mwere wa kanana", "Mwere wa kenda", "Mwere wa ikũmi", "Mwere wa ikũmi na ũmwe", "Ndithemba", ""]
    }, 
    calendar: new GregorianCalendar()
};