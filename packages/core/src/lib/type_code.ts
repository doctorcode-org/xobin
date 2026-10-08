import { getOrCreateValue, getValue, setValue } from './type_helper';
import { int } from './number_helper';

/** Identifies the CLR primitive type represented by a value. */
export class TypeCode {
    constructor(value: number) { setValue(this, 'value', int(value)); }
    get value(): number { return getValue(this, 'value'); }
    static get empty(): TypeCode { return getOrCreateValue(this, 'empty', () => new TypeCode(0)); }
    static get object(): TypeCode { return getOrCreateValue(this, 'object', () => new TypeCode(1)); }
    static get dbNull(): TypeCode { return getOrCreateValue(this, 'dbNull', () => new TypeCode(2)); }
    static get boolean(): TypeCode { return getOrCreateValue(this, 'boolean', () => new TypeCode(3)); }
    static get char(): TypeCode { return getOrCreateValue(this, 'char', () => new TypeCode(4)); }
    static get sByte(): TypeCode { return getOrCreateValue(this, 'sByte', () => new TypeCode(5)); }
    static get byte(): TypeCode { return getOrCreateValue(this, 'byte', () => new TypeCode(6)); }
    static get int16(): TypeCode { return getOrCreateValue(this, 'int16', () => new TypeCode(7)); }
    static get uInt16(): TypeCode { return getOrCreateValue(this, 'uInt16', () => new TypeCode(8)); }
    static get int32(): TypeCode { return getOrCreateValue(this, 'int32', () => new TypeCode(9)); }
    static get uInt32(): TypeCode { return getOrCreateValue(this, 'uInt32', () => new TypeCode(10)); }
    static get int64(): TypeCode { return getOrCreateValue(this, 'int64', () => new TypeCode(11)); }
    static get uInt64(): TypeCode { return getOrCreateValue(this, 'uInt64', () => new TypeCode(12)); }
    static get single(): TypeCode { return getOrCreateValue(this, 'single', () => new TypeCode(13)); }
    static get double(): TypeCode { return getOrCreateValue(this, 'double', () => new TypeCode(14)); }
    static get decimal(): TypeCode { return getOrCreateValue(this, 'decimal', () => new TypeCode(15)); }
    static get dateTime(): TypeCode { return getOrCreateValue(this, 'dateTime', () => new TypeCode(16)); }
    static get string(): TypeCode { return getOrCreateValue(this, 'string', () => new TypeCode(18)); }
}
