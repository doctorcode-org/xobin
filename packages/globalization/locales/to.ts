import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "to", 
    nativeName: "lea fakatonga", 
    englishName: "Tongan", 
    twoLetterISOLanguageName: "to", 
    threeLetterISOLanguageName: "ton", 
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
        currencySymbol: "T$", 
        naNSymbol: "TF", 
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
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd d MMMM yyyy h:mm:ss tt", 
        longDatePattern: "dddd d MMMM yyyy", 
        longTimePattern: "h:mm:ss tt", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "h:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Sāp", "Mōn", "Tūs", "Pul", "Tuʻa", "Fal", "Tok"], 
        shortestDayNames: ["Sāp", "Mōn", "Tūs", "Pul", "Tuʻa", "Fal", "Tok"], 
        dayNames: ["Sāpate", "Mōnite", "Tūsite", "Pulelulu", "Tuʻapulelulu", "Falaite", "Tokonaki"], 
        abbreviatedMonthNames: ["Sān", "Fēp", "Maʻa", "ʻEpe", "Mē", "Sun", "Siu", "ʻAok", "Sep", "ʻOka", "Nōv", "Tīs", ""], 
        monthNames: ["Sānuali", "Fēpueli", "Maʻasi", "ʻEpeleli", "Mē", "Sune", "Siulai", "ʻAokosi", "Sepitema", "ʻOkatopa", "Nōvema", "Tīsema", ""], 
        nativeCalendarName: "fakakelekolia", 
        abbreviatedMonthGenitiveNames: ["Sān", "Fēp", "Maʻa", "ʻEpe", "Mē", "Sun", "Siu", "ʻAok", "Sep", "ʻOka", "Nōv", "Tīs", ""], 
        monthGenitiveNames: ["Sānuali", "Fēpueli", "Maʻasi", "ʻEpeleli", "Mē", "Sune", "Siulai", "ʻAokosi", "Sepitema", "ʻOkatopa", "Nōvema", "Tīsema", ""]
    }, 
    calendar: new GregorianCalendar()
};