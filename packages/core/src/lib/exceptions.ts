import { setValue, getValue } from './type_helper';
import { formatString, isNullOrEmpty } from './string_helper';

/**
 * Represents errors that occur during application execution.
 */
export class Exception extends Error {

    /**
     * Initializes a new instance of the Exception class.
     */
    constructor();

    /**
     * Initializes a new instance of the Exception class with a specified error message.
     * @param message The message that describes the error.
     */
    constructor(message: string | null);

    /**
     * Initializes an exception with a message and the exception that caused it.
     * @param message The message that describes the error.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, innerException: Exception | null);
    constructor(message?: string | null, innerException: Exception | null = null) {
        super();
        setValue(this, 'message', message ?? "Exception of type 'System.Exception' was thrown.");
        setValue(this, 'innerException', innerException);
    }

    /**
     * Gets the message that describes the current exception.
     */
    override get message(): string {
        return getValue(this, 'message');
    }

    /**
     * Gets the exception that caused the current exception.
     */
    get innerException(): Exception | null {
        return getValue(this, 'innerException');
    }
}

/**
 * The exception thrown when an operation dereferences a null object reference.
 */
export class NullReferenceException extends Exception {
    /**
     * Initializes a new instance with the default or specified error message.
     * @param message The message that describes the error.
     */
    constructor(message: string = 'Object reference not set to an instance of an object.') {
        super(message);
    }
}

/**
 * The exception thrown when a conversion is not supported.
 */
export class InvalidCastException extends Exception {

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
     * Initializes an instance with a message and the exception that caused it.
     * @param message The message that describes the error.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, innerException: Exception | null);
    constructor(message?: string | null, innerException: Exception | null = null) {
        super(message ?? 'Specified cast is not valid.', innerException);
    }
}

/**
 * The exception thrown when a format string or input has an invalid form.
 */
export class FormatException extends Exception {

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
     * Initializes an instance with a message and the exception that caused it.
     * @param message The message that describes the error.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, innerException: Exception | null);
    constructor(message?: string | null, innerException: Exception | null = null) {
        super(message ?? 'One of the identified items was in an invalid format.', innerException);
    }
}

/**
 * The exception thrown when serialization or deserialization fails.
 */
export class SerializationException extends Exception {

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
     * Initializes an instance with a message and the exception that caused it.
     * @param message The message that describes the error.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, innerException: Exception | null);
    constructor(message?: string | null, innerException: Exception | null = null) {
        super(message ?? 'Serialization error.', innerException);
    }
}

/** 
 * The exception that is thrown when a requested method or operation is not implemented. 
 */
export class NotImplementedException extends Exception {
    /**
     * Initializes a new instance of the NotImplementedException class with a specified error message.
     * @param message The error message that explains the reason for the exception.
     */
    constructor(message?: string) {
        super(message || "The method or operation is not implemented.");
    }
}

/** 
 * The exception that is thrown when one of the arguments provided to a method is not valid. 
 */
export class ArgumentException extends Exception {
    /**
     * Initializes a new instance of the ArgumentException class with a specified error message and the name of the parameter that causes this exception.
     * @param message The error message that explains the reason for the exception.
     * @param paramName The name of the parameter that caused the current exception.
     */
    constructor(message?: string, paramName?: string) {
        super();

        setValue(this, "message", message || "");
        setValue(this, "paramName", paramName ?? null);
    }

    /** 
     * Gets the name of the parameter that causes this exception. 
     */
    get paramName(): string | null {
        return getValue(this, "paramName");
    }

    /** 
     * Gets the error message and the parameter name, or only the error message if no parameter name is set. 
     */
    override  get message(): string {
        let message = getValue(this, "message");

        if (isNullOrEmpty(message)) {
            message = "Value does not fall within the expected range.";
        }

        const paramName = this.paramName;
        if (paramName) {
            message += " " + formatString("(Parameter '{0}')", paramName);
        }

        return message;
    }
}

/** 
 * The exception that is thrown when a null reference is passed to a method that does not accept it as a valid argument. 
 */
export class ArgumentNullException extends ArgumentException {
    /**
     * Initializes an instance of the ArgumentNullException class with a specified error message and the name of the parameter that causes this exception.
     * @param paramName The name of the parameter that caused the exception.
     * @param message A message that describes the error.
     */
    constructor(paramName?: string, message: string = "Value cannot be null.") {
        super(message, paramName);
    }
}

/** 
 * The exception that is thrown when binding to a member results in more than one member matching the binding criteria. This class cannot be inherited. 
 */
export class AmbiguousMatchException extends Exception {
    /**
     * Initializes a new instance of the AmbiguousMatchException class with its message string set to the given message.
     * @param message A string indicating the reason this exception was thrown.
     */
    constructor(message?: string) {
        super(message || "Ambiguous match found.");
    }
}

/** 
 * The exception that is thrown when a method call is invalid for the object's current state. 
 */
export class InvalidOperationException extends Exception {

    /**
     * Initializes a new instance of the InvalidOperationException class with a specified error message.
     * @param message The message that describes the error.
     */
    constructor(message?: string) {
        super(message || "Operation is not valid due to the current state of the object.");
    }
}

/**
 * 
 */
export class IndexOutOfRangeException extends Exception {
    constructor(message?: string) {
        super(message || "Index was outside the bounds of the array.");
    }
}

/**
 * 
 */
export class InvalidProgramException extends Exception {
    /**
     * 
     * @param message
     */
    constructor(message: string) {
        super(message || "Common Language Runtime detected an invalid program.");
    }
}

/**
 *
 */
export class NotSupportedException extends Exception {
    /**
     * 
     * @param message
     */
    constructor(message?: string) {
        super(message || "Specified method is not supported.");
    }
}

/**
 *
 */
export class ArgumentOutOfRangeException extends ArgumentException {
    /**
     * Initializes an exception with the invalid parameter and optional actual value.
     */
    constructor(paramName?: string, message?: string);
    constructor(paramName: string | undefined, actualValue: unknown, message: string);
    constructor(paramName?: string, messageOrActualValue?: unknown, message?: string) {
        super(message === undefined
            ? (messageOrActualValue as string | undefined) ?? "Specified argument was out of the range of valid values."
            : message,
            paramName);
        setValue(this, "actualValue", message === undefined ? null : messageOrActualValue ?? null);
    }

    get actualValue(): unknown {
        return getValue(this, "actualValue");
    }

    override get message(): string {
        const message = super.message;
        const actualValue = this.actualValue;
        if (actualValue == null) {
            return message;
        }
        let value = String(actualValue);
        if (typeof actualValue === 'number') {
            const magnitude = Math.abs(actualValue);
            if (magnitude >= 1e17 || (magnitude > 0 && magnitude < 1e-4)) {
                value = actualValue.toExponential().replace(/e([+-])(\d+)$/, (_, sign: string, exponent: string) =>
                    `E${sign}${exponent.padStart(2, '0')}`);
            }
        }
        return `${message}\r\nActual value was ${value}.`;
    }
}

/**
 *
 */
export class OverflowException extends Exception {
    /**
     * 
     * @param message
     */
    constructor(message?: string) {
        super(message || '');
    }
}
