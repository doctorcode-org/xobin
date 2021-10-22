
/**
 * Represents a type of key-value pair object that key is a string and the value is a type of T.
 */
export type PlainObject<T = any> = { [key: string]: T };

/**
 * Represents a type of key-value pair collection that key is number and the value is a type of T.
 */
export type PlainCollection<T = any> = { [key: number]: T };

/**
 * Represents a type that can used as method outer parameter.
 */
export type OutParam<T = any> = { result: T };

/**
 * Represents a type that has a length property.
 */
export type HasLength = { readonly length: number };

/**
 * Encapsulates a method that has no parameters and returns a value of the type specified by the `T` parameter.
 */
export type Func<T> = () => T;

/**
 * The type alias for primitive types.
 */
export type PrimitiveType = string | number | boolean | bigint | symbol | undefined | Date;

/**
 * Defines a generalized comparison method that a value type or class implements to create a type-specific comparison method for ordering or sorting its instances.
 */
export interface IComparable<T> {
    /**
     * Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, 
     * follows, or occurs in the same position in the sort order as the other object.
     * @param otherValue An object to compare with this instance.
     * @returns A value that indicates the relative order of the objects being compared. The return value has these meanings:
     *          Less than zero = This instance precedes other in the sort order.
     *          Zero = This instance occurs in the same position in the sort order as other.
     *          Greater than zero = This instance follows other in the sort order.
     */
    compareTo(otherValue: T): number;
}

/**
 * Defines a method that a type implements to compare two objects.
 */
export interface IComparer<T> {
    /**
     * Compares two objects and returns a value indicating whether one is less than, equal to, or greater than the other.
     * @param x The first object to compare.
     * @param y The second object to compare.
     * @returns A value that indicates the relative order of the objects being compared. The return value has these meanings:
     *          Less than zero = This instance precedes other in the sort order.
     *          Zero = This instance occurs in the same position in the sort order as other.
     *          Greater than zero = This instance follows other in the sort order.
     */
    compare(x: T, y: T): number;
}

/**
 * Provides a mechanism for releasing unmanaged resources.
 */
export interface IDisposable {
    /**
     * Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.
     */
    dispose(): void;
}

/**
 * Defines a generalized method that a value type or class implements to create a type-specific method for determining equality of instances.
 */
export interface IEquatable<T> {
    /**
     * Indicates whether the current object is equal to another object of the same type.
     * @param other An object to compare with this object.
     */
    equals(other: T): boolean;
}

/**
 * Provides a mechanism for retrieving an object to control formatting.
 */
export interface IFormatProvider {
    /**
     * Returns an object that provides formatting services for the specified type.
     * @param formatType An object that specifies the type of format object to return.
     * @returns An instance of the object specified by formatType, if the IFormatProvider implementation can supply that type of object; otherwise, null.
     */
    getFormat(formatType: any): object;
}

/**
 * Defines a mechanism for retrieving a service object; that is, an object that provides custom support to other objects.
 */
export interface IServiceProvider {
    /**
     * Gets the service object of the specified type.
     * @param type An object that specifies the type of service object to get.
     * @returns A service object of type serviceType or null if there is no service object of type serviceType.
     */
    getService(type: any): object;
}

/**
 * Represents an abstract type of T.
 */
export type Abstract<T> = Function & { prototype: T };

/**
 * Represents an constructible type of T.
 */
export type Constructible<T> = new (...args: any[]) => T;

/**
 * Represents type of T.
 */
export type Class<T> = Abstract<T> | Constructible<T>;

/**
 * Represents an enum of T.
 */
export type Enum<T> = {
    [id: string]: T | string;
    [index: number]: string;
}

type DataPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K; }[keyof T];
type DataPropertiesOnly<T> = { [P in DataPropertyNames<T>]: T[P] extends object ? Dto<T[P]> : T[P] };
/**
 * Represents a type of properties of T.
 */
export type Dto<T> = DataPropertiesOnly<T>;

/**
 * Represents a nullable type of T.
 */
export type Nullable<T> = T | null | undefined;