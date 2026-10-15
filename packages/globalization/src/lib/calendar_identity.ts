import type { Calendar } from './calendar';

const calendarTypes = new WeakMap<object, { name: string; id: (calendar: Calendar) => number; isGregorian: boolean }>();

/** Registers a calendar's internal .NET identity without importing other calendar implementations. */
export function registerCalendarIdentity(prototype: object, name: string, id: (calendar: Calendar) => number, isGregorian = false): void {
    calendarTypes.set(prototype, { name, id, isGregorian });
}

/** Gets the internal identity, including inherited calendar implementations. */
export function getCalendarIdentity(calendar: Calendar): { id: number; name: string; isGregorian: boolean } {
    const actualPrototype = Object.getPrototypeOf(calendar);
    for (let prototype = actualPrototype; prototype; prototype = Object.getPrototypeOf(prototype)) {
        const type = calendarTypes.get(prototype);
        if (type) return {
            id: type.id(calendar),
            name: prototype === actualPrototype ? type.name : calendar.constructor.name,
            isGregorian: prototype === actualPrototype && type.isGregorian,
        };
    }
    return { id: 0, name: calendar.constructor.name, isGregorian: false };
}
