import { getValue, getOrCreateValue, setValue } from './type_helper';
import { ArgumentNullException } from './exceptions';
import { Func } from './types';

type PrivateLazy<T> = Lazy<T> & { valueFactory?: Func<T> };

/** 
 * Provides support for lazy initialization. 
 */
export class Lazy<T = any> {

    /**
     * Initializes a new instance of the Lazy<T> class. When lazy initialization occurs, the specified initialization function is used.
     * @param valueFactory The delegate that is invoked to produce the lazily initialized value when it is needed. 
     */
    constructor(valueFactory: Func<T>) {
        if (typeof valueFactory != 'function') {
            throw new ArgumentNullException('valueFactory');
        }
        setValue(<PrivateLazy<T>>this, "valueFactory", valueFactory);
    }

    /**
     * Gets a value that indicates whether a value has been created for this Lazy<T> instance.
     * @returns true if a value has been created for this Lazy<T> instance; otherwise, false.
     */
    get isValueCreated(): boolean {
        return getOrCreateValue(this, "isValueCreated", () => false);
    }

    /**
     * Gets the lazily initialized value of the current Lazy<T> instance.
     * @returns The lazily initialized value of the current Lazy<T> instance.
     */
    get value(): T {
        return getOrCreateValue(this, "value", () => {
            const valueFactory = getValue(<PrivateLazy<T>>this, "valueFactory");
            setValue(this, "isValueCreated", true);
            return valueFactory!();
        });
    }

}