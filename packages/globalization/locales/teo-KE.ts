import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "teo", 
    lcid: 4096, 
    name: "teo-KE", 
    nativeName: "Kiteso (Kenia)", 
    englishName: "Teso (Kenya)", 
    twoLetterISOLanguageName: "teo", 
    threeLetterISOLanguageName: "teo", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
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
        amDesignator: "Taparachu", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "Ebongi", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Jum", "Bar", "Aar", "Uni", "Ung", "Kan", "Sab"], 
        shortestDayNames: ["Jum", "Bar", "Aar", "Uni", "Ung", "Kan", "Sab"], 
        dayNames: ["Nakaejuma", "Nakaebarasa", "Nakaare", "Nakauni", "Nakaung’on", "Nakakany", "Nakasabiti"], 
        abbreviatedMonthNames: ["Rar", "Muk", "Kwa", "Dun", "Mar", "Mod", "Jol", "Ped", "Sok", "Tib", "Lab", "Poo", ""], 
        monthNames: ["Orara", "Omuk", "Okwamg’", "Odung’el", "Omaruk", "Omodok’king’ol", "Ojola", "Opedel", "Osokosokoma", "Otibar", "Olabor", "Opoo", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Rar", "Muk", "Kwa", "Dun", "Mar", "Mod", "Jol", "Ped", "Sok", "Tib", "Lab", "Poo", ""], 
        monthGenitiveNames: ["Orara", "Omuk", "Okwamg’", "Odung’el", "Omaruk", "Omodok’king’ol", "Ojola", "Opedel", "Osokosokoma", "Otibar", "Olabor", "Opoo", ""]
    }, 
    calendar: new GregorianCalendar()
};