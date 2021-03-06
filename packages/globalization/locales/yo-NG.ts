import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData = {
    parent: "yo", 
    lcid: 1130, 
    name: "yo-NG", 
    nativeName: "Èdè Yorùbá (Orilẹ̀-èdè Nàìjíríà)", 
    englishName: "Yoruba (Nigeria)", 
    twoLetterISOLanguageName: "yo", 
    threeLetterISOLanguageName: "yor", 
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
        currencySymbol: "₦", 
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
        amDesignator: "Àárọ̀", 
        dateSeparator: "/", 
        firstDayOfWeek: 1, 
        fullDateTimePattern: "dddd, d MMM yyyy H:m:s", 
        longDatePattern: "dddd, d MMM yyyy", 
        longTimePattern: "H:m:s", 
        monthDayPattern: "d MMMM", 
        pmDesignator: "Ọ̀sán", 
        rfC1123Pattern: "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'", 
        shortDatePattern: "d/M/yyyy", 
        shortTimePattern: "H:m", 
        sortableDateTimePattern: "yyyy'-'MM'-'dd'T'HH':'mm':'ss", 
        timeSeparator: ":", 
        universalSortableDateTimePattern: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'", 
        yearMonthPattern: "MMMM yyyy", 
        abbreviatedDayNames: ["Àìk", "Aj", "Ìsẹ́g", "Ọjọ́r", "Ọjọ́b", "Ẹt", "Àbám"], 
        shortestDayNames: ["Àìkú", "Ajé", "Ìsẹ́gun", "Ọjọ́rú", "Ọjọ́bọ", "Ẹtì", "Àbámẹ́ta"], 
        dayNames: ["Ọjọ́ Àìkú", "Ọjọ́ Ajé", "Ọjọ́ Ìsẹ́gun", "Ọjọ́rú", "Ọjọ́bọ", "Ọjọ́ Ẹtì", "Ọjọ́ Àbámẹ́ta"], 
        abbreviatedMonthNames: ["Ṣẹ́", "Èr", "Ẹr", "Ìg", "Ẹ̀b", "Òk", "Ag", "Òg", "Ow", "Ọ̀w", "Bé", "Ọ̀p", ""], 
        monthNames: ["Ṣẹ́rẹ́", "Èrèlè", "Ẹrẹ̀nà", "Ìgbé", "Ẹ̀bibi", "Òkúdu", "Agẹmọ", "Ògún", "Owewe", "Ọ̀wàrà", "Bélú", "Ọ̀pẹ̀", ""], 
        nativeCalendarName: "Kàlẹ́ńdà Gregory", 
        abbreviatedMonthGenitiveNames: ["Ṣẹ́r", "Èrèl", "Ẹrẹ̀n", "Ìgb", "Ẹ̀bi", "Òkú", "Agẹ", "Ògú", "Owe", "Ọ̀wà", "Bél", "Ọ̀pẹ", ""], 
        monthGenitiveNames: ["Oṣù Ṣẹ́rẹ́", "Oṣù Èrèlè", "Oṣù Ẹrẹ̀nà", "Oṣù Ìgbé", "Oṣù Ẹ̀bibi", "Oṣù Òkúdu", "Oṣù Agẹmọ", "Oṣù Ògún", "Oṣù Owewe", "Oṣù Ọ̀wàrà", "Oṣù Bélú", "Oṣù Ọ̀pẹ̀", ""]
    }, 
    calendar: new GregorianCalendar()
};