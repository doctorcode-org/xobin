import { formatExceptionResource } from './exception_format';
import * as SR from './exception_resources';
import { setValue, getValue } from './type_helper';

/**
 * Represents errors that occur during application execution.
 */
export class Exception extends Error {

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
        super();
        setValue(this, 'message', message as string);
        setValue(this, 'innerException', innerException);
    }

    /**
     * Gets the message that describes the current exception.
     */
    override get message(): string {
        return getValue(this, 'message') ?? formatExceptionResource(SR.Exception_WasThrown, 'System.' + this.constructor.name);
    }

    /**
     * Gets the exception that caused the current exception.
     */
    get innerException(): Exception | null {
        return getValue(this, 'innerException');
    }
}

/**
 * The base class for predefined system exceptions.
 */
export class SystemException extends Exception {

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
        super(arguments.length === 0 ? SR.Arg_SystemException : message ?? null, innerException);
    }
}

/**
 * The exception thrown for errors in an arithmetic operation.
 */
export class ArithmeticException extends SystemException {

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
        super(message ?? SR.Arg_ArithmeticException, innerException);
    }
}

/**
 * The exception thrown when an operation dereferences a null object reference.
 */
export class NullReferenceException extends SystemException {

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
        super(message ?? SR.Arg_NullReferenceException, innerException);
    }
}

/**
 * The exception thrown when a conversion is not supported.
 */
export class InvalidCastException extends SystemException {

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
        super(message ?? SR.Arg_InvalidCastException, innerException);
    }
}

/**
 * The exception thrown when a format string or input has an invalid form.
 */
export class FormatException extends SystemException {

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
        super(message ?? SR.Arg_FormatException, innerException);
    }
}

/**
 * The exception thrown when serialization or deserialization fails.
 */
export class SerializationException extends SystemException {

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
        super(message ?? SR.SerializationException, innerException);
    }
}

/**
 * The exception thrown when a requested operation is not implemented.
 */
export class NotImplementedException extends SystemException {

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
        super(message ?? SR.Arg_NotImplementedException, innerException);
    }
}

/**
 * The exception thrown when binding to a member finds more than one matching member.
 */
export class AmbiguousMatchException extends SystemException {

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
        super(message ?? SR.Arg_AmbiguousMatchException_NoMessage, innerException);
    }
}

/**
 * The exception thrown when an operation is invalid for the current state of an object.
 */
export class InvalidOperationException extends SystemException {

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
        super(message ?? SR.Arg_InvalidOperationException, innerException);
    }
}

/**
 * The exception thrown when an index is outside the bounds of an array.
 */
export class IndexOutOfRangeException extends SystemException {

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
        super(message ?? SR.Arg_IndexOutOfRangeException, innerException);
    }
}

/**
 * The exception thrown when a program contains invalid instructions or metadata.
 */
export class InvalidProgramException extends SystemException {

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
        super(message ?? SR.InvalidProgram_Default, innerException);
    }
}

/**
 * The exception thrown when an invoked method is not supported.
 */
export class NotSupportedException extends SystemException {

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
        super(message ?? SR.Arg_NotSupportedException, innerException);
    }
}

/**
 * The exception thrown when an arithmetic operation overflows.
 */
export class OverflowException extends ArithmeticException {

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
        super(message ?? SR.Arg_OverflowException, innerException);
    }
}

/**
 * The exception thrown when an argument provided to a method is not valid.
 */
export class ArgumentException extends SystemException {

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

    /**
     * Initializes an instance with a specified message and invalid parameter name.
     * @param message The message that describes the error.
     * @param paramName The name of the parameter that caused the exception.
     */
    constructor(message: string | null, paramName: string | null);

    /**
     * Initializes an instance with a message, parameter name and inner exception.
     * @param message The message that describes the error.
     * @param paramName The name of the parameter that caused the exception.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, paramName: string | null, innerException: Exception | null);
    constructor(message?: string | null, paramNameOrInnerException?: string | Exception | null, innerException: Exception | null = null) {
        super(arguments.length === 0 ? SR.Arg_ArgumentException : message ?? null,
            paramNameOrInnerException instanceof Exception ? paramNameOrInnerException : innerException);
        setValue(this, 'paramName', typeof paramNameOrInnerException === 'string' ? paramNameOrInnerException : null);
    }

    /**
     * Gets the name of the parameter that caused the current exception.
     */
    get paramName(): string | null {
        return getValue(this, 'paramName');
    }

    /**
     * Gets the error message followed by the invalid parameter name, if present.
     */
    override get message(): string {
        const message = getValue(this, 'message') ?? SR.Arg_ArgumentException;
        return this.paramName ? message + ' ' + formatExceptionResource(SR.Arg_ParamName_Name, this.paramName) : message;
    }
}

/**
 * The exception thrown when a null reference is passed to a method that does not accept it.
 */
export class ArgumentNullException extends ArgumentException {

    /**
     * Initializes an instance with the default error message.
     */
    constructor();

    /**
     * Initializes an instance with the name of the invalid parameter.
     * @param paramName The name of the parameter that caused the exception.
     */
    constructor(paramName: string | null);

    /**
     * Initializes an instance with a parameter name and specified error message.
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
    constructor(paramNameOrMessage?: string | null, messageOrInnerException?: string | Exception | null) {
        const innerException = messageOrInnerException instanceof Exception ? messageOrInnerException : null;
        super(innerException ? paramNameOrMessage ?? SR.ArgumentNull_Generic
            : messageOrInnerException as string | null | undefined ?? SR.ArgumentNull_Generic,
            innerException ? null : paramNameOrMessage ?? null, innerException);
    }
}

/**
 * The exception thrown when an argument is outside the allowable range of values.
 */
export class ArgumentOutOfRangeException extends ArgumentException {

    /**
     * Initializes an instance with the default error message.
     */
    constructor();

    /**
     * Initializes an instance with the name of the invalid parameter.
     * @param paramName The name of the parameter that caused the exception.
     */
    constructor(paramName: string | null | undefined);

    /**
     * Initializes an instance with a parameter name and specified error message.
     * @param paramName The name of the parameter that caused the exception.
     * @param message The message that describes the error.
     */
    constructor(paramName: string | null | undefined, message: string | null);

    /**
     * Initializes an instance with a message and the exception that caused it.
     * @param message The message that describes the error.
     * @param innerException The exception that caused the current exception.
     */
    constructor(message: string | null, innerException: Exception | null);

    /**
     * Initializes an instance with the invalid parameter, actual value and message.
     * @param paramName The name of the parameter that caused the exception.
     * @param actualValue The value of the argument that caused the exception.
     * @param message The message that describes the error.
     */
    constructor(paramName: string | null | undefined, actualValue: unknown, message: string | null);
    constructor(paramNameOrMessage?: string | null, messageOrActualValue?: unknown, message?: string | null) {
        const hasActualValue = arguments.length === 3;
        const innerException = !hasActualValue && messageOrActualValue instanceof Exception ? messageOrActualValue : null;
        super((hasActualValue ? message : innerException ? paramNameOrMessage
            : messageOrActualValue as string | null | undefined) ?? SR.Arg_ArgumentOutOfRangeException,
            innerException ? null : paramNameOrMessage ?? null, innerException);
        setValue(this, 'actualValue', hasActualValue ? messageOrActualValue ?? null : null);
    }

    /**
     * Gets the value of the argument that caused the current exception.
     */
    get actualValue(): unknown {
        return getValue(this, 'actualValue');
    }

    /**
     * Gets the error message, invalid parameter name and actual value, if present.
     */
    override get message(): string {
        const message = super.message;
        return this.actualValue == null ? message
            : message + '\r\n' + formatExceptionResource(SR.ArgumentOutOfRange_ActualValue, this.actualValue);
    }
}
