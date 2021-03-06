import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "sd-Deva", 
    lcid: 1113, 
    name: "sd-Deva-IN", 
    nativeName: "सिन्धी (India)", 
    englishName: "Sindhi (Devanagari, India)", 
    twoLetterISOLanguageName: "sd", 
    threeLetterISOLanguageName: "snd", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "₹", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 0, 
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
        nativeDigits: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dd MMMM yyyy HH:mm:ss", 
        longDatePattern: "dd MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "dd MMMM", 
        pmDesignator: "", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "H:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["आचर", "सवमर", "ङरव", "रब", "ख़मयस", "जम", "छनछर"], 
        shortestDayNames: ["आ", "स", "ङ", "र", "ख़", "ज", "छ"], 
        dayNames: ["आचर", "सवमर", "ङरव", "रब", "ख़मयस", "जम", "छनछर"], 
        abbreviatedMonthNames: ["जनवरय", "फ़बरवरय", "मारच", "परयल", "मय", "जवन", "वलाय", "आगसट", "सयपटमबर", "आटवबर", "नववमबर", "डसमबर", ""], 
        monthNames: ["जनवरय", "फ़बरवरय", "मारच", "परयल", "मय", "जवन", "वलाय", "आगसट", "सयपटमबर", "आटवबर", "नववमबर", "डसमबर", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["जनवरय", "फ़बरवरय", "मारच", "परयल", "मय", "जवन", "वलाय", "आगसट", "सयपटमबर", "आटवबर", "नववमबर", "डसमबर", ""], 
        monthGenitiveNames: ["जनवरय", "फ़बरवरय", "मारच", "परयल", "मय", "जवन", "वलाय", "आगसट", "सयपटमबर", "आटवबर", "नववमबर", "डसमबर", ""]
    }, 
    calendar: new GregorianCalendar()
};