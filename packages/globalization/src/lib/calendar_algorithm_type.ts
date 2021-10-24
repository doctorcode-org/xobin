
/**
 * Specifies whether a calendar is solar-based, lunar-based, or lunisolar-based.
 */
export enum CalendarAlgorithmType {
    /** An unknown calendar basis. */
    Unknown = 0,

    /** A solar-based calendar. */
    SolarCalendar = 1,

    /** A lunar-based calendar. */
    LunarCalendar = 2,

    /** A lunisolar-based calendar. */
    LunisolarCalendar = 3
}