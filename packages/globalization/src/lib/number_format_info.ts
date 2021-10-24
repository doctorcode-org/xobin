
/**
 * Provides culture-specific information for formatting and parsing numeric values.
 */
export interface NumberFormatInfo {
    /**
     * Gets or sets the number of decimal places to use in currency values.
     */
    currencyDecimalDigits: number;

    /**
     * Gets or sets the string to use as the decimal separator in currency values.
     */
    currencyDecimalSeparator: string;

    /**
     * Gets or sets the number of digits in each group to the left of the decimal in currency values.
     */
    currencyGroupSizes: number[];

    /**
     * Gets or sets the number of digits in each group to the left of the decimal in numeric values.
     */
    numberGroupSizes: number[];

    /**
     * Gets or sets the number of digits in each group to the left of the decimal in percent values.
     */
    percentGroupSizes: number[];

    /**
     * Gets or sets the string that separates groups of digits to the left of the decimal in currency values.
     */
    currencyGroupSeparator: string;

    /**
     * Gets or sets the string to use as the currency symbol.
     */
    currencySymbol: string;

    /**
     * Gets or sets the string that represents the IEEE NaN (not a number) value.
     */
    naNSymbol: string;

    /**
     * Gets or sets the format pattern for negative currency values.
     */
    currencyNegativePattern: number;

    /**
     * Gets or sets the format pattern for negative numeric values.
     */
    numberNegativePattern: number;

    /**
     * Gets or sets the format pattern for positive percent values.
     */
    percentPositivePattern: number;

    /**
     * Gets or sets the format pattern for negative percent values.
     */
    percentNegativePattern: number;

    /**
     * Gets or sets the string that represents negative infinity.
     */
    negativeInfinitySymbol: string;

    /**
     * Gets or sets the string that denotes that the associated number is negative.
     */
    negativeSign: string;

    /**
     * Gets or sets the number of decimal places to use in numeric values.
     */
    numberDecimalDigits: number;

    /**
     * Gets or sets the string to use as the decimal separator in numeric values.
     */
    numberDecimalSeparator: string;

    /**
     * Gets or sets the string that separates groups of digits to the left of the decimal in numeric values.
     */
    numberGroupSeparator: string;

    /**
     * Gets or sets the format pattern for positive currency values.
     */
    currencyPositivePattern: number;

    /**
     * Gets or sets the string that represents positive infinity.
     */
    positiveInfinitySymbol: string;

    /**
     * Gets or sets the string that denotes that the associated number is positive.
     */
    positiveSign: string;

    /**
     * Gets or sets the number of decimal places to use in percent values.
     */
    percentDecimalDigits: number;

    /**
     * Gets or sets the string to use as the decimal separator in percent values.
     */
    percentDecimalSeparator: string;

    /**
     * Gets or sets the string that separates groups of digits to the left of the decimal in percent values.
     */
    percentGroupSeparator: string;

    /**
     * Gets or sets the string to use as the percent symbol.
     */
    percentSymbol: string;

    /**
     * Gets or sets the string to use as the per mille symbol.
     */
    perMilleSymbol: string;

    /**
     * Gets or sets a string array of native digits equivalent to the Western digits 0 through 9.
     */
    nativeDigits: string[];

    /**
     * Gets or sets a value that specifies how the graphical user interface displays the shape of a digit.
     */
    digitSubstitution: number;
}