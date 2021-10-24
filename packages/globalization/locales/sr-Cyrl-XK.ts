import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "sr-Cyrl", 
    lcid: 4096, 
    name: "sr-Cyrl-XK", 
    nativeName: "српски (Косово)", 
    englishName: "Serbian (Cyrillic, Kosovo)", 
    twoLetterISOLanguageName: "sr", 
    threeLetterISOLanguageName: "srp", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "€", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
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
        amDesignator: "пре подне", 
        dateSeparator: ".", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, dd. MMMM yyyy. HH:mm:ss", 
        longDatePattern: "dddd, dd. MMMM yyyy.", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "d. MMMM", 
        pmDesignator: "по подне", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d.M.yyyy.", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy.", 
        abbreviatedDayNames: ["нед", "пон", "уто", "сре", "чет", "пет", "суб"], 
        shortestDayNames: ["не", "по", "ут", "ср", "че", "пе", "су"], 
        dayNames: ["недеља", "понедељак", "уторак", "среда", "четвртак", "петак", "субота"], 
        abbreviatedMonthNames: ["јан", "феб", "март", "апр", "мај", "јун", "јул", "авг", "септ", "окт", "нов", "дец", ""], 
        monthNames: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар", ""], 
        nativeCalendarName: "грегоријански календар", 
        abbreviatedMonthGenitiveNames: ["јан", "феб", "март", "апр", "мај", "јун", "јул", "авг", "септ", "окт", "нов", "дец", ""], 
        monthGenitiveNames: ["јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар", ""]
    }, 
    calendar: new GregorianCalendar()
};