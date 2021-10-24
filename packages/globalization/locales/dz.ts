import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "", 
    lcid: 4096, 
    name: "dz", 
    nativeName: "རྫོང་ཁ", 
    englishName: "Dzongkha", 
    twoLetterISOLanguageName: "dz", 
    threeLetterISOLanguageName: "dzo", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3, 2], 
        numberGroupSizes: [3, 2], 
        percentGroupSizes: [3, 2], 
        currencyGroupSeparator: ",", 
        currencySymbol: "Nu.", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 1, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
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
        nativeDigits: ["༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩"], 
        digitSubstitution: 2
    }, 
    dateTimeFormat: {
        amDesignator: "སྔ་ཆ་", 
        dateSeparator: "-", 
        firstDayOfWeek: 0, 
        fullDateTimePattern: "dddd, སྤྱི་ལོ་yyyy MMMM ཚེས་dd ཆུ་ཚོད་h:mm:ss tt", 
        longDatePattern: "dddd, སྤྱི་ལོ་yyyy MMMM ཚེས་dd", 
        longTimePattern: "ཆུ་ཚོད་h:mm:ss tt", 
        monthDayPattern: "MMMM d", 
        pmDesignator: "ཕྱི་ཆ་", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "yyyy-MM-dd", 
        shortTimePattern: "ཆུ་ཚོད་ h སྐར་མ་ mm tt", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "yyyy MMMM", 
        abbreviatedDayNames: ["ཟླ་", "མིར་", "ལྷག་", "ཕུར་", "སངས་", "སྤེན་", "ཉི་"], 
        shortestDayNames: ["ཟླ་", "མིར་", "ལྷག་", "ཕུར་", "སངས་", "སྤེན་", "ཉི་"], 
        dayNames: ["གཟའ་ཟླ་བ་", "གཟའ་མིག་དམར་", "གཟའ་ལྷག་པ་", "གཟའ་ཕུར་བུ་", "གཟའ་པ་སངས་", "གཟའ་སྤེན་པ་", "གཟའ་ཉི་མ་"], 
        abbreviatedMonthNames: ["ཟླ་༡", "ཟླ་༢", "ཟླ་༣", "ཟླ་༤", "ཟླ་༥", "ཟླ་༦", "ཟླ་༧", "ཟླ་༨", "ཟླ་༩", "ཟླ་༡༠", "ཟླ་༡༡", "ཟླ་༡༢", ""], 
        monthNames: ["སྤྱི་ཟླ་དངཔ་", "སྤྱི་ཟླ་གཉིས་པ་", "སྤྱི་ཟླ་གསུམ་པ་", "སྤྱི་ཟླ་བཞི་པ", "སྤྱི་ཟླ་ལྔ་པ་", "སྤྱི་ཟླ་དྲུག་པ", "སྤྱི་ཟླ་བདུན་པ་", "སྤྱི་ཟླ་བརྒྱད་པ་", "སྤྱི་ཟླ་དགུ་པ་", "སྤྱི་ཟླ་བཅུ་པ་", "སྤྱི་ཟླ་བཅུ་གཅིག་པ་", "སྤྱི་ཟླ་བཅུ་གཉིས་པ་", ""], 
        nativeCalendarName: "གྲེག་གོ་རི་ཡཱན་ཟླ་ཐོ", 
        abbreviatedMonthGenitiveNames: ["༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩", "༡༠", "༡༡", "12", ""], 
        monthGenitiveNames: ["ཟླ་དངཔ་", "ཟླ་གཉིས་པ་", "ཟླ་གསུམ་པ་", "ཟླ་བཞི་པ་", "ཟླ་ལྔ་པ་", "ཟླ་དྲུག་པ", "ཟླ་བདུན་པ་", "ཟླ་བརྒྱད་པ་", "ཟླ་དགུ་པ་", "ཟླ་བཅུ་པ་", "ཟླ་བཅུ་གཅིག་པ་", "ཟླ་བཅུ་གཉིས་པ་", ""]
    }, 
    calendar: new GregorianCalendar()
};