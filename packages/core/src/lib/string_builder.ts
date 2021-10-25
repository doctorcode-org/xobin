import { IFormatProvider } from "./types";
import { setValue } from "./type_helper";

export class StringBuilder {
    /**
     * Initializes a new instance of the StringBuilder class.
     */
    constructor();
    /**
     * Initializes a new instance of the StringBuilder class using the specified string.
     * @param value The string used to initialize the value of the instance. If value is null, the new StringBuilder will contain the empty string.
     */
    constructor(value: string);
    /**
     * Initializes a new instance of the StringBuilder class using the specified capacity.
     * @param capacity The suggested starting size of this instance.
     */
    constructor(capacity: number);
    /**
     * Initializes a new instance of the StringBuilder class using the specified string and capacity.
     * @param value The string used to initialize the value of the instance. If value is null, the new StringBuilder will contain the empty string.
     * @param capacity The suggested starting size of the System.Text.StringBuilder.
     */
    constructor(value: string, capacity: number);
    /**
     * Initializes a new instance of the StringBuilder class that starts with a specified capacity and can grow to a specified maximum.
     * @param capacity The suggested starting size of the StringBuilder.
     * @param maxCapacity The maximum number of characters the current string can contain.
     */
    constructor(capacity: number, maxCapacity: number);
    /**
     * Initializes a new instance of the System.Text.StringBuilder class from the specified substring and capacity.
     * @param value The string used to initialize the value of the instance. If value is null, the new StringBuilder will contain the empty string
     * @param startIndex The position within value where the substring begins.
     * @param length The number of characters in the substring.
     * @param capacity The suggested starting size of the System.Text.StringBuilder.
     */
    constructor(value: string, startIndex: number, length: number, capacity: number);
    constructor() {

    }

    /**
     * Gets the maximum capacity of this instance.
     */
    get maxCapacity(): number {
        return 0;
    }

    /**
     * Gets the maximum number of characters that can be contained in the memory allocated by the current instance.
     */
    get capacity(): number {
        return 0;
    }

    /**
     * Sets the maximum number of characters that can be contained in the memory allocated by the current instance.
     */
    set capacity(value) {
        setValue(this, 'capacity', value);
    }

    /**
     * Appends the string representation of a specified object to this instance.
     * @param value The object to append.
     * @returns A reference to this instance after the append operation has completed.
     */
    append(value: any): StringBuilder;
    /**
     * Appends a specified number of copies of the string representation of a Unicode character to this instance.
     * @param value The character to append.
     * @param repeatCount The number of times to append value.
     */
    append(value: string, repeatCount: number): StringBuilder;
    /**
     * Appends a copy of a specified substring to this instance.
     * @param value The string that contains the substring to append.
     * @param startIndex The starting position of the substring within value.
     * @param count The number of characters in value to append.
     * @returns A reference to this instance after the append operation has completed.
     */
    append(value: string, startIndex: number, count: number): StringBuilder;
    append(): StringBuilder {

        return this;
    }

    /**
     * Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by
     * the string representation of a corresponding argument in a parameter array.
     * @param format A composite format string.
     * @param args An array of objects to format.
     * @returns A reference to this instance with format appended. Each format item in format is replaced by the string representation of the corresponding object argument.
     */
    appendFormat(format: string, ...args: any[]): StringBuilder;
    /**
     * Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by
     * the string representation of a corresponding argument in a parameter array using a specified format provider.
     * @param provider An object that supplies culture-specific formatting information.
     * @param format A composite format string.
     * @param args An array of objects to format.
     * @returns A reference to this instance after the append operation has completed. After the append operation, this instance contains any data that existed before the
     * operation, suffixed by a copy of format where any format specification is replaced by the string representation of the corresponding object argument.
     */
    appendFormat(provider: IFormatProvider, format: string, ...args: any[]): StringBuilder;
    appendFormat(): StringBuilder {
        return this;
    }

    /**
     * Appends the default line terminator to the end of the current StringBuilder object.
     * @returns A reference to this instance after the append operation has completed.
     */
    appendLine(): StringBuilder;
    /**
     * Appends a copy of the specified string followed by the default line terminator to the end of the current System.Text.StringBuilder object.
     * @param value The string to append.
     * @returns A reference to this instance after the append operation has completed.
     */
    appendLine(value: string): StringBuilder;
    appendLine(): StringBuilder {
        return this;
    }

    /**
     * Removes all characters from the current System.Text.StringBuilder instance.
     * @returns An object whose System.Text.StringBuilder.Length is 0 (zero).
     */
    clear(): StringBuilder {

        return this;
    }

    /**
     * Inserts the string representation of an object into this instance at the specified character position.
     * @param index The position in this instance where insertion begins.
     * @param value The object to insert, or null.
     * @returns A reference to this instance after the insert operation has completed.
     */
    insert(index: number, value: any): StringBuilder;
    /**
     * Inserts one or more copies of a specified string into this instance at the specified character position.
     * @param index The position in this instance where insertion begins.
     * @param value The string to insert.
     * @param count The number of times to insert value.
     * @returns A reference to this instance after insertion has completed.
     */
    insert(index: number, value: string, count: number): StringBuilder;
    /**
     * Inserts the string representation of a specified subarray of Unicode characters into this instance at the specified character position.
     * @param index The position in this instance where insertion begins.
     * @param value A character array.
     * @param startIndex The starting index within value.
     * @param charCount The number of characters to insert.
     * @returns A reference to this instance after the insert operation has completed.
     */
    insert(index: number, value: string[], startIndex: number, charCount: number): StringBuilder;
    insert(): StringBuilder {

        return this;
    }

    /**
     * Removes the specified range of characters from this instance.
     * @param startIndex The zero-based position in this instance where removal begins
     * @param length The number of characters to remove.
     */
    remove(startIndex: number, length: number): StringBuilder {
        return this;
    }

    /**
     * Replaces all occurrences of a specified string in this instance with another specified string.
     * @param oldValue The string to replace.
     * @param newValue The string that replaces oldValue, or null.
     * @returns A reference to this instance with all instances of oldValue replaced by newValue.
     */
    replace(oldValue: string, newValue: string): StringBuilder;
    /**
     * Replaces, within a substring of this instance, all occurrences of a specified string with another specified string.
     * @param oldValue The string to replace.
     * @param newValue The string that replaces oldValue, or null.
     * @param startIndex The position in this instance where the substring begins.
     * @param count The length of the substring.
     */
    replace(oldValue: string, newValue: string, startIndex: number, count: number): StringBuilder;
    replace(): StringBuilder {
        return this;
    }

    /**
     * Converts the value of this instance to a System.String.
     */
    toString(): string;
    /**
     * Converts the value of a substring of this instance to a String.
     * @param startIndex The starting position of the substring in this instance.
     * @param length The length of the substring.
     * @returns A string whose value is the same as the specified substring of this instance.
     */
    toString(startIndex: number, length: number): string;
    toString(): string {

    }
}