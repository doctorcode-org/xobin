import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "lag", 
    lcid: 4096, 
    name: "lag-TZ", 
    nativeName: "Kɨlaangi (Taansanía)", 
    englishName: "Langi (Tanzania)", 
    twoLetterISOLanguageName: "lag", 
    threeLetterISOLanguageName: "lag", 
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
        currencySymbol: "TSh", 
        naNSymbol: "NaN", 
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
        amDesignator: "TOO", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d MMMM yyyy HH:mm:ss", 
        longDatePattern: "dddd, d MMMM yyyy", 
        longTimePattern: "HH:mm:ss", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "MUU", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "dd/MM/yyyy", 
        shortTimePattern: "HH:mm", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Píili", "Táatu", "Íne", "Táano", "Alh", "Ijm", "Móosi"], 
        shortestDayNames: ["Píili", "Táatu", "Íne", "Táano", "Alh", "Ijm", "Móosi"], 
        dayNames: ["Jumapíiri", "Jumatátu", "Jumaíne", "Jumatáano", "Alamíisi", "Ijumáa", "Jumamóosi"], 
        abbreviatedMonthNames: ["Fúngatɨ", "Naanɨ", "Keenda", "Ikúmi", "Inyambala", "Idwaata", "Mʉʉnchɨ", "Vɨɨrɨ", "Saatʉ", "Inyi", "Saano", "Sasatʉ", ""], 
        monthNames: ["Kʉfúngatɨ", "Kʉnaanɨ", "Kʉkeenda", "Kwiikumi", "Kwiinyambála", "Kwiidwaata", "Kʉmʉʉnchɨ", "Kʉvɨɨrɨ", "Kʉsaatʉ", "Kwiinyi", "Kʉsaano", "Kʉsasatʉ", ""], 
        nativeCalendarName: "Gregorian Calendar", 
        abbreviatedMonthGenitiveNames: ["Fúngatɨ", "Naanɨ", "Keenda", "Ikúmi", "Inyambala", "Idwaata", "Mʉʉnchɨ", "Vɨɨrɨ", "Saatʉ", "Inyi", "Saano", "Sasatʉ", ""], 
        monthGenitiveNames: ["Kʉfúngatɨ", "Kʉnaanɨ", "Kʉkeenda", "Kwiikumi", "Kwiinyambála", "Kwiidwaata", "Kʉmʉʉnchɨ", "Kʉvɨɨrɨ", "Kʉsaatʉ", "Kwiinyi", "Kʉsaano", "Kʉsasatʉ", ""]
    }, 
    calendar: new GregorianCalendar()
};