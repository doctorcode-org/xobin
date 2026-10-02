import {
    LongMaxValue,
    LongMinValue,
    MaxMicroseconds,
    MaxMilliseconds,
    MaxSeconds,
    MinMicroseconds,
    MinMilliseconds,
    MinSeconds,
    TicksPerDay,
    TicksPerHour,
    TicksPerMicrosecond,
    TicksPerMillisecond,
    TicksPerMinute,
    TicksPerSecond
} from './var';
import {
    ArgumentException,
    ArgumentOutOfRangeException,
    getOrCreateValue,
    IComparable,
    IEquatable,
    Nullable,
    OverflowException
} from '@xobin/core';

/** A time interval stored as signed 100-nanosecond ticks. */
export class TimeSpan implements IEquatable<TimeSpan>, IComparable<TimeSpan> {
    private readonly _ticks: bigint;

    constructor();
    constructor(ticks: bigint);
    constructor(hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number, microseconds: number);
    constructor(first?: bigint | number, second?: number, third?: number, fourth?: number, fifth?: number, sixth?: number) {
        switch (arguments.length) {
            case 0:
                this._ticks = 0n;
                break;
            case 1:
                if (typeof first !== 'bigint') throw new ArgumentException('Ticks must be a bigint.');
                checkTicks(first);
                this._ticks = first;
                break;
            case 3:
                this._ticks = timeToTicks(int32(first), int32(second), int32(third));
                break;
            case 4:
            case 5:
            case 6: {
                const days = BigInt(int32(first));
                const hours = BigInt(int32(second));
                const minutes = BigInt(int32(third));
                const seconds = BigInt(int32(fourth));
                const milliseconds = arguments.length >= 5 ? BigInt(int32(fifth)) : 0n;
                const microseconds = arguments.length === 6 ? BigInt(int32(sixth)) : 0n;
                const totalMicroseconds = days * 86400000000n + hours * 3600000000n + minutes * 60000000n
                    + seconds * 1000000n + milliseconds * 1000n + microseconds;
                if (totalMicroseconds > MaxMicroseconds || totalMicroseconds < MinMicroseconds) {
                    throw new ArgumentOutOfRangeException('Overflow_TimeSpanTooLong');
                }
                this._ticks = totalMicroseconds * TicksPerMicrosecond;
                break;
            }
            default:
                throw new ArgumentException('Invalid arguments');
        }
    }

    get ticks(): bigint { return this._ticks; }
    get days(): number { return Number(this._ticks / TicksPerDay); }
    get hours(): number { return Number((this._ticks / TicksPerHour) % 24n); }
    get minutes(): number { return Number((this._ticks / TicksPerMinute) % 60n); }
    get seconds(): number { return Number((this._ticks / TicksPerSecond) % 60n); }
    get milliseconds(): number { return Number((this._ticks / TicksPerMillisecond) % 1000n); }
    get microseconds(): number { return Number((this._ticks / TicksPerMicrosecond) % 1000n); }
    get nanoseconds(): number { return Number(this._ticks % TicksPerMicrosecond) * 100; }

    get totalDays(): number { return Number(this._ticks) / Number(TicksPerDay); }
    get totalHours(): number { return Number(this._ticks) / Number(TicksPerHour); }
    get totalMinutes(): number { return Number(this._ticks) / Number(TicksPerMinute); }
    get totalSeconds(): number { return Number(this._ticks) / Number(TicksPerSecond); }
    get totalMilliseconds(): number {
        const value = Number(this._ticks) / Number(TicksPerMillisecond);
        return Math.max(Number(MinMilliseconds), Math.min(Number(MaxMilliseconds), value));
    }
    get totalMicroseconds(): number { return Number(this._ticks) / Number(TicksPerMicrosecond); }
    get totalNanoseconds(): number { return Number(this._ticks) * 100; }

    static get zero(): TimeSpan {
        return getOrCreateValue(this, 'zero', () => new TimeSpan(0n));
    }

    static get minValue(): TimeSpan {
        return getOrCreateValue(this, 'minValue', () => new TimeSpan(LongMinValue));
    }

    static get maxValue(): TimeSpan {
        return getOrCreateValue(this, 'maxValue', () => new TimeSpan(LongMaxValue));
    }

    add(value: TimeSpan): TimeSpan {
        return new TimeSpan(checkTicks(this._ticks + value.ticks));
    }

    subtract(value: TimeSpan): TimeSpan {
        return new TimeSpan(checkTicks(this._ticks - value.ticks));
    }

    duration(): TimeSpan {
        if (this._ticks === LongMinValue) throw new OverflowException('Overflow_Duration');
        return new TimeSpan(this._ticks < 0n ? -this._ticks : this._ticks);
    }

    negate(): TimeSpan {
        if (this._ticks === LongMinValue) throw new OverflowException('Overflow_NegateTwosCompNum');
        return new TimeSpan(-this._ticks);
    }

    equals(other: TimeSpan): boolean {
        return other instanceof TimeSpan && this._ticks === other.ticks;
    }

    compareTo(otherValue: Nullable<object>): number;
    compareTo(otherValue: TimeSpan): number;
    compareTo(otherValue: TimeSpan | Nullable<object>): number {
        if (otherValue == null) return 1;
        if (!(otherValue instanceof TimeSpan)) throw new ArgumentException('Arg_MustBeTimeSpan');
        return this._ticks > otherValue.ticks ? 1 : this._ticks < otherValue.ticks ? -1 : 0;
    }

    valueOf(): bigint { return this._ticks; }

    static fromDays(value: number): TimeSpan { return interval(value, TicksPerDay); }
    static fromHours(value: number): TimeSpan { return interval(value, TicksPerHour); }
    static fromMinutes(value: number): TimeSpan { return interval(value, TicksPerMinute); }
    static fromSeconds(value: number): TimeSpan { return interval(value, TicksPerSecond); }
    static fromMilliseconds(value: number): TimeSpan { return interval(value, TicksPerMillisecond); }
    static fromTicks(value: bigint): TimeSpan { return new TimeSpan(value); }

    static compare(first: TimeSpan, second: TimeSpan): number {
        return first.ticks > second.ticks ? 1 : first.ticks < second.ticks ? -1 : 0;
    }

    static equals(first: TimeSpan, second: TimeSpan): boolean {
        return first.ticks === second.ticks;
    }
}

export function timeToTicks(hour: number, minute: number, second: number): bigint {
    const totalSeconds = BigInt(int32(hour)) * 3600n + BigInt(int32(minute)) * 60n + BigInt(int32(second));
    if (totalSeconds > MaxSeconds || totalSeconds < MinSeconds) {
        throw new ArgumentOutOfRangeException('Overflow_TimeSpanTooLong');
    }
    return totalSeconds * TicksPerSecond;
}

function int32(value: number | bigint | undefined): number {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
        throw new ArgumentOutOfRangeException('Integer component out of range');
    }
    return value;
}

function checkTicks(ticks: bigint): bigint {
    if (ticks < LongMinValue || ticks > LongMaxValue) throw new OverflowException('Overflow_TimeSpanTooLong');
    return ticks;
}

function interval(value: number, scale: bigint): TimeSpan {
    if (Number.isNaN(value)) throw new ArgumentException('Arg_CannotBeNaN');
    const ticks = value * Number(scale);
    if (!Number.isFinite(ticks) || ticks > Number(LongMaxValue) || ticks < Number(LongMinValue)) {
        throw new OverflowException('Overflow_TimeSpanTooLong');
    }
    if (ticks === Number(LongMaxValue)) return TimeSpan.maxValue;
    return new TimeSpan(BigInt(Math.trunc(ticks)));
}
