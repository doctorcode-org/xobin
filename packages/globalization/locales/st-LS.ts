import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "st", 
    lcid: 4096, 
    name: "st-LS", 
    nativeName: "Sesotho (Lesotho)", 
    englishName: "Sesotho (Lesotho)", 
    twoLetterISOLanguageName: "st", 
    threeLetterISOLanguageName: "sot", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "R", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 0, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
        amDesignator: "AM", 
        dateSeparator: "-", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "yyyy MMMM d, dddd HH:mm:ss", 
        longDatePattern: "yyyy MMMM d, dddd", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "PM", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["Son", "Mma", "Bed", "Rar", "Ne", "Hla", "Moq"], 
        shortestDayNames: ["Son", "Mma", "Bed", "Rar", "Ne", "Hla", "Moq"], 
        dayNames: ["Sontaha", "Mmantaha", "Labobedi", "Laboraru", "Labone", "Labohlane", "Moqebelo"], 
        abbreviatedMonthNames: ["Phe", "Kol", "Ube", "Mme", "Mot", "Jan", "Upu", "Pha", "Leo", "Mph", "Pun", "Tsh", ""], 
        monthNames: ["Phesekgong", "Hlakola", "Hlakubele", "Mmese", "Motsheanong", "Phupjane", "Phupu", "Phata", "Leotshe", "Mphalane", "Pundungwane", "Tshitwe", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Phe", "Kol", "Ube", "Mme", "Mot", "Jan", "Upu", "Pha", "Leo", "Mph", "Pun", "Tsh", ""], 
        monthGenitiveNames: ["Phesekgong", "Hlakola", "Hlakubele", "Mmese", "Motsheanong", "Phupjane", "Phupu", "Phata", "Leotshe", "Mphalane", "Pundungwane", "Tshitwe", ""]
    }, 
    calendar: new GregorianCalendar()
};