import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import * as SR from '@xobin/core/internal/exception-resources';
import { ArgumentException, Exception, getValue, setValue } from '@xobin/core';

/**
 * The exception thrown when a method attempts to construct an unavailable culture.
 */
export class CultureNotFoundException extends ArgumentException {

    /**
     * Initializes an instance with the default error message.
     */
    constructor();

    /**
     * Initializes an instance with a specified error message.
     * @param message The message that describes the error.
     */
    constructor(message: string | null);

    /**
     * Initializes an instance with an invalid parameter name and error message.
     * @param paramName The name of the parameter that caused the exception.
     * @param message The message that describes the error.
     */
    constructor(paramName: string | null, message: string | null);

    /**
     * Initializes an instance with a message and the exception that caused it.
     * @param message The message that describes the error.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, innerException: Exception | null);

    /**
     * Initializes an instance with the invalid culture name and parameter name.
     * @param paramName The name of the parameter that caused the exception.
     * @param invalidCultureName The culture name that could not be found.
     * @param message The message that describes the error.
     */
    constructor(paramName: string | null, invalidCultureName: string | null, message: string | null);

    /**
     * Initializes an instance with the invalid culture name and inner exception.
     * @param message The message that describes the error.
     * @param invalidCultureName The culture name that could not be found.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, invalidCultureName: string | null, innerException: Exception | null);

    /**
     * Initializes an instance with the invalid culture identifier and parameter name.
     * @param paramName The name of the parameter that caused the exception.
     * @param invalidCultureId The culture identifier that could not be found.
     * @param message The message that describes the error.
     */
    constructor(paramName: string | null, invalidCultureId: number, message: string | null);

    /**
     * Initializes an instance with the invalid culture identifier and inner exception.
     * @param message The message that describes the error.
     * @param invalidCultureId The culture identifier that could not be found.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, invalidCultureId: number, innerException: Exception | null);
    constructor(first?: string | null, second?: string | number | Exception | null, third?: string | Exception | null) {
        const hasCulture = arguments.length === 3;
        const innerException = hasCulture ? third instanceof Exception ? third : null
            : second instanceof Exception ? second : null;
        const message = hasCulture ? innerException ? first : third as string | null
            : innerException || arguments.length < 2 ? first : second as string | null;
        const paramName = hasCulture || arguments.length === 2 && !innerException ? innerException ? null : first ?? null : null;
        super(message ?? SR.Argument_CultureNotSupported, paramName, innerException);
        setValue(this, 'invalidCultureName', hasCulture && typeof second === 'string' ? second : null);
        setValue(this, 'invalidCultureId', hasCulture && typeof second === 'number' ? second : null);
    }

    /**
     * Gets the culture identifier that could not be found.
     */
    get invalidCultureId(): number | null {
        return getValue(this, 'invalidCultureId');
    }

    /**
     * Gets the culture name that could not be found.
     */
    get invalidCultureName(): string | null {
        return getValue(this, 'invalidCultureName');
    }

    /**
     * Gets the error message and the invalid culture name or identifier, if present.
     */
    override get message(): string {
        const id = this.invalidCultureId;
        const identifier = id == null ? this.invalidCultureName
            : String(id) + ' (0x' + (id >>> 0).toString(16).padStart(4, '0') + ')';
        return identifier == null ? super.message
            : super.message + '\r\n' + formatExceptionResource(SR.Argument_CultureInvalidIdentifier, identifier);
    }
}
