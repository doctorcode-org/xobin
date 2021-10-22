import { IComparable, IComparer } from './types';

const DataMap = new WeakMap<any, any>();

/**
 * 
 * @param obj
 * @param key
 */
export function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
    const map = getMap(obj);
    return map && map[key];
}

/**
 * 
 * @param obj
 * @param key
 * @param value
 */
export function setValue<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): void {
    const map = getMap(obj, true);
    map[key] = value;
}

/**
 * 
 * @param obj
 * @param key
 * @param creator
 */
export function getOrCreateValue<T extends object, K extends keyof T>(obj: T, key: K, creator: () => T[K]): T[K] {
    const map = getMap(obj, true);
    if (!(key in map)) {
        map[key] = creator();
    }

    return map[key];
}

function getMap(obj: any, create?: boolean): any {
    let map = DataMap.get(obj);
    if (!map && create) {
        DataMap.set(obj, (map = {}));
    }

    return map;
}

/**
 * 
 * @param flags
 * @param flag
 */
export function hasFlag(flags: number, flag: number): boolean {
    return (flags & flag) === flag;
}

/**
 * 
 * @param obj
 * @param skipSelf
 */
export function getPrototypeChain(proto: Function, skipSelf: boolean = true): ReadonlyArray<Function> {
    let chain: Function[] = skipSelf ? [] : [proto];
    proto = proto.prototype;

    do {
        if ((proto = Object.getPrototypeOf(proto)) && typeof proto.constructor === "function") {
            chain.push(proto.constructor);
        }
    } while (proto != null);

    return chain;
}

/**
 * 
 * @param type
 */
export function getBasePrototype(type: Function): Function | null {
    const prototype = Object.getPrototypeOf(type.prototype);
    return (prototype && typeof prototype.constructor === 'function') ?
        prototype.constructor :
        null;
}

/**
 * Indicating whether the given object represents an IComparable<T>.
 * @param obj The object to check.
 */
export function isComparable<T = any>(obj: any): obj is IComparable<T> {
    return obj && typeof obj['compareTo'] == 'function';
}

/**
 * Indicating whether the given object represents an IComparer<T>.
 * @param obj The object to check.
 */
export function isComparer<T = any>(obj: any): obj is IComparer<T> {
    return obj && typeof obj['compare'] == 'function';
}
