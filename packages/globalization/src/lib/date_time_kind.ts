import { getOrCreateValue, setValue, int, getValue } from '@xobin/core';

/**
 * Specifies whether a DateTime object represents a local time, a Coordinated Universal Time (UTC), or is not specified as either local time or UTC.
 */
export class DateTimeKind {
    constructor(value: number) {
        setValue(this, 'value', int(value));
    }

    get value(): number {
        return getValue(this, 'value');
    }

    /**
    * The time represented is not specified as either local time or Coordinated Universal Time (UTC).
    */
    static get unspecified(): DateTimeKind {
        return getOrCreateValue(this, "unspecified", () => new DateTimeKind(0));
    }

    /**
    * The time represented is UTC.
    */
    static get utc(): DateTimeKind {
        return getOrCreateValue(this, "utc", () => new DateTimeKind(1));
    }

    /**
    * The time represented is local time.
    */
    static get local(): DateTimeKind {
        return getOrCreateValue(this, "local", () => new DateTimeKind(2));
    }
}