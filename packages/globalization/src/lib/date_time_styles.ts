/**
 * Defines the formatting options that customize how strings are parsed as dates and times.
 */
export enum DateTimeStyles {
    /** Uses the default parsing options. */
    None = 0,

    /** Allows leading white-space characters. */
    AllowLeadingWhite = 1,

    /** Allows trailing white-space characters. */
    AllowTrailingWhite = 2,

    /** Allows additional white-space characters within the string. */
    AllowInnerWhite = 4,

    /** Allows leading, trailing, and inner white-space characters. */
    AllowWhiteSpaces = AllowLeadingWhite | AllowTrailingWhite | AllowInnerWhite,

    /** Uses January 1, 0001 when the string contains a time but no date. */
    NoCurrentDateDefault = 8,

    /** Converts the parsed date and time to Coordinated Universal Time. */
    AdjustToUniversal = 16,

    /** Assumes local time when the string does not specify a time zone. */
    AssumeLocal = 32,

    /** Assumes Coordinated Universal Time when the string does not specify a time zone. */
    AssumeUniversal = 64,

    /** Preserves the DateTimeKind when parsing a round-trip representation. */
    RoundtripKind = 128
}
