import { ArgumentException, ArgumentOutOfRangeException, getOrCreateValue, IComparable, IEquatable } from '@xobin/core';
import { DateTime } from './date_time';
import { TimeSpan } from './time_span';
import { TicksPerDay, TicksPerHour, TicksPerMinute, TicksPerSecond, TicksPerMillisecond, TicksPerMicrosecond } from './var';

/** A time of day stored as 100-nanosecond ticks since midnight. */
export class TimeOnly implements IComparable<TimeOnly>, IEquatable<TimeOnly> {
    private readonly _ticks: bigint;

    constructor();
    constructor(ticks: bigint);
    constructor(hour: number, minute: number);
    constructor(hour: number, minute: number, second: number);
    constructor(hour: number, minute: number, second: number, millisecond: number);
    constructor(hour: number, minute: number, second: number, millisecond: number, microsecond: number);
    constructor(first?: number | bigint, minute = 0, second = 0, millisecond = 0, microsecond = 0) {
        if (arguments.length >= 2) {
            this._ticks = new DateTime(1, 1, 1, Number(first), minute, second, millisecond, microsecond).ticks;
        } else {
            const ticks = arguments.length === 0 ? 0n : first;
            if (typeof ticks !== 'bigint') throw new ArgumentException('Ticks must be a bigint.');
            if (ticks < 0n || ticks >= TicksPerDay) {
                throw new ArgumentOutOfRangeException('ticks', 'Ticks must be between 0 and and TimeOnly.MaxValue.Ticks.');
            }
            this._ticks = ticks;
        }
    }

    get ticks(): bigint { return this._ticks; }
    get hour(): number { return Number(this._ticks / TicksPerHour); }
    get minute(): number { return Number(this._ticks / TicksPerMinute % 60n); }
    get second(): number { return Number(this._ticks / TicksPerSecond % 60n); }
    get millisecond(): number { return Number(this._ticks / TicksPerMillisecond % 1000n); }
    get microsecond(): number { return Number(this._ticks / TicksPerMicrosecond % 1000n); }
    get nanosecond(): number { return Number(this._ticks % TicksPerMicrosecond) * 100; }
    static get minValue(): TimeOnly { return getOrCreateValue(this, 'minValue', () => new TimeOnly()); }
    static get maxValue(): TimeOnly { return getOrCreateValue(this, 'maxValue', () => new TimeOnly(TicksPerDay - 1n)); }
    static fromDateTime(dateTime: DateTime): TimeOnly { return new TimeOnly(dateTime.ticks % TicksPerDay); }
    static fromTimeSpan(timeSpan: TimeSpan): TimeOnly { return new TimeOnly(timeSpan.ticks); }
    toTimeSpan(): TimeSpan { return new TimeSpan(this._ticks); }
    compareTo(value: TimeOnly | null): number {
        if (value == null) return 1;
        if (!(value instanceof TimeOnly)) throw new ArgumentException('Object must be of type TimeOnly.');
        return this._ticks === value._ticks ? 0 : this._ticks < value._ticks ? -1 : 1;
    }
    equals(value: unknown): boolean { return value instanceof TimeOnly && this._ticks === value._ticks; }
    getHashCode(): number { return Number(BigInt.asIntN(32, this._ticks ^ this._ticks >> 32n)); }
}
