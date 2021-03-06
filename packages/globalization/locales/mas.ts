import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "mas", 
    nativeName: "Maa", 
    englishName: "Masai", 
    twoLetterISOLanguageName: "mas", 
    threeLetterISOLanguageName: "mas", 
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
        amDesignator: "Ɛnkakɛnyá", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "Ɛndámâ", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Jpi", "Jtt", "Jnn", "Jtn", "Alh", "Iju", "Jmo"], 
        shortestDayNames: ["Jpi", "Jtt", "Jnn", "Jtn", "Alh", "Iju", "Jmo"], 
        dayNames: ["Jumapílí", "Jumatátu", "Jumane", "Jumatánɔ", "Alaámisi", "Jumáa", "Jumamósi"], 
        abbreviatedMonthNames: ["Dal", "Ará", "Ɔɛn", "Doy", "Lép", "Rok", "Sás", "Bɔ́r", "Kús", "Gís", "Shʉ́", "Ntʉ́", ""], 
        monthNames: ["Oladalʉ́", "Arát", "Ɔɛnɨ́ɔɨŋɔk", "Olodoyíóríê inkókúâ", "Oloilépūnyīē inkókúâ", "Kújúɔrɔk", "Mórusásin", "Ɔlɔ́ɨ́bɔ́rárɛ", "Kúshîn", "Olgísan", "Pʉshʉ́ka", "Ntʉ́ŋʉ́s", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Dal", "Ará", "Ɔɛn", "Doy", "Lép", "Rok", "Sás", "Bɔ́r", "Kús", "Gís", "Shʉ́", "Ntʉ́", ""], 
        monthGenitiveNames: ["Oladalʉ́", "Arát", "Ɔɛnɨ́ɔɨŋɔk", "Olodoyíóríê inkókúâ", "Oloilépūnyīē inkókúâ", "Kújúɔrɔk", "Mórusásin", "Ɔlɔ́ɨ́bɔ́rárɛ", "Kúshîn", "Olgísan", "Pʉshʉ́ka", "Ntʉ́ŋʉ́s", ""]
    }, 
    calendar: new GregorianCalendar()
};