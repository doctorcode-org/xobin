import { ArgumentException, formatString } from '@xobin/core';

/**
 * The exception that is thrown when a method attempts to construct a culture that is not available.
 */
export class CultureNotFoundException extends ArgumentException {

    /**
     * Initializes a new instance of the CultureNotFoundException class with the name of the culture that is the cause this exception.
     * @param invalidCultureName The name of the culture that is the cause of the current exception.
     */
    constructor(invalidCultureName: string);
    /**
     * Initializes a new instance of the CultureNotFoundException class with a specified error message and the name of the culture that is the cause this exception.
     * @param invalidCultureName The name of the culture that is the cause of the current exception.
     * @param message The error message to display with this exception.
     */
    constructor(invalidCultureName: string, message: string);
    constructor(invalidCultureName: string, message?: string) {
        super(formatString(message || '{0} is an invalid culture identifier.', invalidCultureName));
    }

}