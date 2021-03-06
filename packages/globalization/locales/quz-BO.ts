import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "quz", 
    lcid: 1131, 
    name: "quz-BO", 
    nativeName: "Runasimi (Bolivia)", 
    englishName: "Quechua (Bolivia)", 
    twoLetterISOLanguageName: "quz", 
    threeLetterISOLanguageName: "qub", 
    listSeparator: ",", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ".", 
        currencySymbol: "Bs.", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 14, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: ".", 
        currencyPositivePattern: 2, 
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
        amDesignator: "a.m.", 
        dateSeparator: "/", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt", 
        longDatePattern: "dddd, dd' de 'MMMM' de 'yyyy", 
        longTimePattern: "hh:mm:ss tt", 
        monthDayPattern: "d 'de' MMMM", 
        pmDesignator: "p.m.", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "hh:mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM' de 'yyyy", 
        abbreviatedDayNames: ["int", "kil", "ati", "quy", "Ch'", "Ill", "k'u"], 
        shortestDayNames: ["d", "k", "a", "m", "h", "b", "k"], 
        dayNames: ["intichaw", "killachaw", "atipachaw", "quyllurchaw", "Ch' askachaw", "Illapachaw", "k'uychichaw"], 
        abbreviatedMonthNames: ["Qul", "Hat", "Pau", "ayr", "Aym", "Int", "Ant", "Qha", "Uma", "Kan", "Aya", "Kap", ""], 
        monthNames: ["Qulla puquy", "Hatun puquy", "Pauqar waray", "ayriwa", "Aymuray", "Inti raymi", "Anta Sitwa", "Qhapaq Sitwa", "Uma raymi", "Kantaray", "Ayamarq'a", "Kapaq Raymi", ""], 
        nativeCalendarName: "calendario gregoriano", 
        abbreviatedMonthGenitiveNames: ["Qul", "Hat", "Pau", "ayr", "Aym", "Int", "Ant", "Qha", "Uma", "Kan", "Aya", "Kap", ""], 
        monthGenitiveNames: ["Qulla puquy", "Hatun puquy", "Pauqar waray", "ayriwa", "Aymuray", "Inti raymi", "Anta Sitwa", "Qhapaq Sitwa", "Uma raymi", "Kantaray", "Ayamarq'a", "Kapaq Raymi", ""]
    }, 
    calendar: new GregorianCalendar()
};