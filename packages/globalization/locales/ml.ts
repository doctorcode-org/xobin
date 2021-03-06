import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 76, 
    name: "ml", 
    nativeName: "മലയാളം", 
    englishName: "Malayalam", 
    twoLetterISOLanguageName: "ml", 
    threeLetterISOLanguageName: "mal", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3, 2], 
        percentGroupSizes: [3, 2], 
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
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "yyyy, MMMM d, dddd h:mm:ss tt", 
        longDatePattern: "yyyy, MMMM d, dddd", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"], 
        shortestDayNames: ["ഞാ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ"], 
        dayNames: ["ഞായറാഴ്‌ച", "തിങ്കളാഴ്‌ച", "ചൊവ്വാഴ്ച", "ബുധനാഴ്‌ച", "വ്യാഴാഴ്‌ച", "വെള്ളിയാഴ്‌ച", "ശനിയാഴ്‌ച"], 
        abbreviatedMonthNames: ["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം", ""], 
        monthNames: ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ", ""], 
        nativeCalendarName: "ഇംഗ്ലീഷ് കലണ്ടർ", 
        abbreviatedMonthGenitiveNames: ["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം", ""], 
        monthGenitiveNames: ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ", ""]
    }, 
    calendar: new GregorianCalendar()
};