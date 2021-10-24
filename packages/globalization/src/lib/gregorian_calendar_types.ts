
/**
 * Defines the different language versions of the Gregorian calendar.
 */
export enum GregorianCalendarTypes {
    /** Refers to the localized version of the Gregorian calendar, based on the language of the CultureInfo that uses the DateTimeFormatInfo. */
    Localized = 1,

    /** Refers to the U.S. English version of the Gregorian calendar. */
    USEnglish = 2,

    /** Refers to the Middle East French version of the Gregorian calendar. */
    MiddleEastFrench = 9,

    /** Refers to the Arabic version of the Gregorian calendar. */
    Arabic = 10,

    /** Refers to the transliterated English version of the Gregorian calendar. */
    TransliteratedEnglish = 11,

    /** Refers to the transliterated French version of the Gregorian calendar. */
    TransliteratedFrench = 12
}