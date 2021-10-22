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
    constructor(message: string);
    constructor(message?: string) {
        super(message);
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
        setValue(this, "paramName", paramName || "");
    }

    /** 
     * Gets the name of the parameter that causes this exception. 
     */
    get paramName(): string {
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

        if (!isNullOrEmpty(this.paramName)) {
            message += " " + formatString("(Parameter '{0}')", this.paramName);
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
     * 
     * @param paramName
     * @param message
     */
    constructor(paramName?: string, message?: string) {
        super(paramName, message);
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