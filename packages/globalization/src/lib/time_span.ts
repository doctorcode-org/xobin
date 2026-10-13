import type { IFormatProvider, OutParam } from '@xobin/core';
import { formatTimeSpan } from './time_span_format';
import { tryWriteFormatted } from './format_buffer';
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

/**
 * Represents a time interval stored as signed 100-nanosecond ticks.
 */
export class TimeSpan implements IEquatable<TimeSpan>, IComparable<TimeSpan> {
    /**
     * Gets the number of nanoseconds per tick.
     */
    static readonly nanosecondsPerTick = 100n;

    /**
     * Gets the number of ticks per microsecond.
     */
    static readonly ticksPerMicrosecond = 10n;

    /**
     * Gets the number of ticks per millisecond.
     */
    static readonly ticksPerMillisecond = TicksPerMicrosecond * 1000n;

    /**
     * Gets the number of ticks per second.
     */
    static readonly ticksPerSecond = TicksPerMillisecond * 1000n;

    /**
     * Gets the number of ticks per minute.
     */
    static readonly ticksPerMinute = TicksPerSecond * 60n;

    /**
     * Gets the number of ticks per hour.
     */
    static readonly ticksPerHour = TicksPerMinute * 60n;

    /**
     * Gets the number of ticks per day.
     */
    static readonly ticksPerDay = TicksPerHour * 24n;

    /**
     * Gets the number of microseconds per millisecond.
     */
    static readonly microsecondsPerMillisecond = TicksPerMillisecond / TicksPerMicrosecond;

    /**
     * Gets the number of microseconds per second.
     */
    static readonly microsecondsPerSecond = TicksPerSecond / TicksPerMicrosecond;

    /**
     * Gets the number of microseconds per minute.
     */
    static readonly microsecondsPerMinute = TicksPerMinute / TicksPerMicrosecond;

    /**
     * Gets the number of microseconds per hour.
     */
    static readonly microsecondsPerHour = TicksPerHour / TicksPerMicrosecond;

    /**
     * Gets the number of microseconds per day.
     */
    static readonly microsecondsPerDay = TicksPerDay / TicksPerMicrosecond;

    /**
     * Gets the number of milliseconds per second.
     */
    static readonly millisecondsPerSecond = TicksPerSecond / TicksPerMillisecond;

    /**
     * Gets the number of milliseconds per minute.
     */
    static readonly millisecondsPerMinute = TicksPerMinute / TicksPerMillisecond;

    /**
     * Gets the number of milliseconds per hour.
     */
    static readonly millisecondsPerHour = TicksPerHour / TicksPerMillisecond;

    /**
     * Gets the number of milliseconds per day.
     */
    static readonly millisecondsPerDay = TicksPerDay / TicksPerMillisecond;

    /**
     * Gets the number of seconds per minute.
     */
    static readonly secondsPerMinute = TicksPerMinute / TicksPerSecond;

    /**
     * Gets the number of seconds per hour.
     */
    static readonly secondsPerHour = TicksPerHour / TicksPerSecond;

    /**
     * Gets the number of seconds per day.
     */
    static readonly secondsPerDay = TicksPerDay / TicksPerSecond;

    /**
     * Gets the number of minutes per hour.
     */
    static readonly minutesPerHour = TicksPerHour / TicksPerMinute;

    /**
     * Gets the number of minutes per day.
     */
    static readonly minutesPerDay = TicksPerDay / TicksPerMinute;

    /**
     * Gets the number of hours per day.
     */
    static readonly hoursPerDay = 24;

    private readonly _ticks: bigint;

    /**
     * Initializes an interval of zero duration.
     */
    constructor();
    /**
     * Initializes an interval with the specified number of 100-nanosecond ticks.
     * @param ticks The number of ticks.
     */
    constructor(ticks: bigint);
    /**
     * Initializes an interval with the specified hours, minutes and seconds.
     */
    constructor(hours: number, minutes: number, seconds: number);
    /**
     * Initializes an interval with the specified days, hours, minutes and seconds.
     */
    constructor(days: number, hours: number, minutes: number, seconds: number);
    /**
     * Initializes an interval with the specified days, hours, minutes, seconds and milliseconds.
     */
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    /**
     * Initializes an interval with the specified days, hours, minutes, seconds, milliseconds and microseconds.
     */
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
                const totalMicroseconds = BigInt.asIntN(64, days * 86400000000n + hours * 3600000000n + minutes * 60000000n
                    + seconds * 1000000n + milliseconds * 1000n + microseconds);
                if (totalMicroseconds > MaxMicroseconds || totalMicroseconds < MinMicroseconds) {
                    throw new ArgumentOutOfRangeException(undefined, 'TimeSpan overflowed because the duration is too long.');
                }
                this._ticks = totalMicroseconds * TicksPerMicrosecond;
                break;
            }
            default:
                throw new ArgumentException('Invalid arguments');
        }
    }

    /**
     * Gets the number of 100-nanosecond ticks in this interval.
     */
    get ticks(): bigint {
        return this._ticks;
    }

    /**
     * Gets the days component of this interval.
     */
    get days(): number {
        return Number(this._ticks / TicksPerDay);
    }

    /**
     * Gets the hours component of this interval.
     */
    get hours(): number {
        return Number((this._ticks / TicksPerHour) % 24n);
    }

    /**
     * Gets the minutes component of this interval.
     */
    get minutes(): number {
        return Number((this._ticks / TicksPerMinute) % 60n);
    }

    /**
     * Gets the seconds component of this interval.
     */
    get seconds(): number {
        return Number((this._ticks / TicksPerSecond) % 60n);
    }

    /**
     * Gets the milliseconds component of this interval.
     */
    get milliseconds(): number {
        return Number((this._ticks / TicksPerMillisecond) % 1000n);
    }

    /**
     * Gets the microseconds component of this interval.
     */
    get microseconds(): number {
        return Number((this._ticks / TicksPerMicrosecond) % 1000n);
    }

    /**
     * Gets the nanoseconds component of this interval.
     */
    get nanoseconds(): number {
        return Number(this._ticks % TicksPerMicrosecond) * 100;
    }

    /**
     * Gets the total interval expressed in whole and fractional days.
     */
    get totalDays(): number {
        return Number(this._ticks) / Number(TicksPerDay);
    }

    /**
     * Gets the total interval expressed in whole and fractional hours.
     */
    get totalHours(): number {
        return Number(this._ticks) / Number(TicksPerHour);
    }

    /**
     * Gets the total interval expressed in whole and fractional minutes.
     */
    get totalMinutes(): number {
        return Number(this._ticks) / Number(TicksPerMinute);
    }

    /**
     * Gets the total interval expressed in whole and fractional seconds.
     */
    get totalSeconds(): number {
        return Number(this._ticks) / Number(TicksPerSecond);
    }

    /**
     * Gets the total interval expressed in whole and fractional milliseconds.
     */
    get totalMilliseconds(): number {
        const value = Number(this._ticks) / Number(TicksPerMillisecond);
        return Math.max(Number(MinMilliseconds), Math.min(Number(MaxMilliseconds), value));
    }

    /**
     * Gets the total interval expressed in whole and fractional microseconds.
     */
    get totalMicroseconds(): number {
        return Number(this._ticks) / Number(TicksPerMicrosecond);
    }

    /**
     * Gets the total interval expressed in whole and fractional nanoseconds.
     */
    get totalNanoseconds(): number {
        return Number(this._ticks) * 100;
    }

    /**
     * Gets an interval of zero duration.
     */
    static get zero(): TimeSpan {
        return getOrCreateValue(this, 'zero', () => new TimeSpan(0n));
    }

    /**
     * Gets the smallest supported interval.
     */
    static get minValue(): TimeSpan {
        return getOrCreateValue(this, 'minValue', () => new TimeSpan(LongMinValue));
    }

    /**
     * Gets the largest supported interval.
     */
    static get maxValue(): TimeSpan {
        return getOrCreateValue(this, 'maxValue', () => new TimeSpan(LongMaxValue));
    }

    /**
     * Adds the specified interval to this interval.
     */
    add(value: TimeSpan): TimeSpan {
        return new TimeSpan(checkTicks(this._ticks + value.ticks));
    }

    /**
     * Subtracts the specified interval from this interval.
     */
    subtract(value: TimeSpan): TimeSpan {
        return new TimeSpan(checkTicks(this._ticks - value.ticks));
    }

    /**
     * Gets the absolute value of this interval.
     */
    duration(): TimeSpan {
        if (this._ticks === LongMinValue) throw new OverflowException('The duration cannot be returned for TimeSpan.MinValue because the absolute value of TimeSpan.MinValue exceeds the value of TimeSpan.MaxValue.');
        return new TimeSpan(this._ticks < 0n ? -this._ticks : this._ticks);
    }

    /**
     * Gets an interval with the negated value of this interval.
     */
    negate(): TimeSpan {
        if (this._ticks === LongMinValue) throw new OverflowException('Negating the minimum value of a twos complement number is invalid.');
        return new TimeSpan(-this._ticks);
    }

    /**
     * Determines whether the specified value equals this interval.
     */
    equals(other: Nullable<object>): boolean;
    equals(other: TimeSpan): boolean;
    equals(other: Nullable<object>): boolean {
        return other instanceof TimeSpan && this._ticks === other.ticks;
    }

    /**
     * Compares this interval with the specified value.
     */
    compareTo(otherValue: Nullable<object>): number;
    compareTo(otherValue: TimeSpan): number;
    compareTo(otherValue: TimeSpan | Nullable<object>): number {
        if (otherValue == null) return 1;
        if (!(otherValue instanceof TimeSpan)) throw new ArgumentException('Object must be of type TimeSpan.');
        return this._ticks > otherValue.ticks ? 1 : this._ticks < otherValue.ticks ? -1 : 0;
    }

    /**
     * Gets the hash code of this interval.
     */
    getHashCode(): number {
        return Number(BigInt.asIntN(32, this._ticks ^ (this._ticks >> 32n)));
    }

    /**
     * Multiplies this interval by the specified factor.
     * @param factor The floating-point multiplier.
     */
    multiply(factor: number): TimeSpan {
        if (Number.isNaN(factor)) throw new ArgumentException('TimeSpan does not accept floating point Not-a-Number values.', 'factor');
        return intervalFromDoubleTicks(roundToEven(Number(this._ticks) * factor));
    }

    /**
     * Divides this interval by a number or another interval.
     * @param divisor The divisor.
     */
    divide(divisor: number): TimeSpan;
    divide(divisor: TimeSpan): number;
    divide(divisor: number | TimeSpan): TimeSpan | number {
        if (divisor instanceof TimeSpan) return Number(this._ticks) / Number(divisor.ticks);
        if (Number.isNaN(divisor)) throw new ArgumentException('TimeSpan does not accept floating point Not-a-Number values.', 'divisor');
        return intervalFromDoubleTicks(roundToEven(Number(this._ticks) / divisor));
    }

    /**
     * Gets the ticks for JavaScript numeric comparisons.
     */
    valueOf(): bigint { return this._ticks; }

    /**
     * Creates an interval from days. A number selects floating-point conversion; bigint selects integer conversion.
     */
    static fromDays(value: number): TimeSpan;
    static fromDays(value: bigint): TimeSpan;
    static fromDays(days: number | bigint, hours?: number | bigint, minutes?: number | bigint, seconds?: number | bigint, milliseconds?: number | bigint, microseconds?: number | bigint): TimeSpan;
    static fromDays(value: number | bigint, ...components: Array<number | bigint | undefined>): TimeSpan {
        if (components.length === 0 && typeof value === 'number') return interval(value, TicksPerDay);
        return integerInterval([value, ...components], 0);
    }

    /**
     * Creates an interval from hours. A number selects floating-point conversion; bigint selects integer conversion.
     */
    static fromHours(value: number): TimeSpan;
    static fromHours(value: bigint): TimeSpan;
    static fromHours(hours: number | bigint, minutes?: number | bigint, seconds?: number | bigint, milliseconds?: number | bigint, microseconds?: number | bigint): TimeSpan;
    static fromHours(value: number | bigint, ...components: Array<number | bigint | undefined>): TimeSpan {
        if (components.length === 0 && typeof value === 'number') return interval(value, TicksPerHour);
        return integerInterval([value, ...components], 1);
    }

    /**
     * Creates an interval from minutes. A number selects floating-point conversion; bigint selects integer conversion.
     */
    static fromMinutes(value: number): TimeSpan;
    static fromMinutes(value: bigint): TimeSpan;
    static fromMinutes(minutes: number | bigint, seconds?: number | bigint, milliseconds?: number | bigint, microseconds?: number | bigint): TimeSpan;
    static fromMinutes(value: number | bigint, ...components: Array<number | bigint | undefined>): TimeSpan {
        if (components.length === 0 && typeof value === 'number') return interval(value, TicksPerMinute);
        return integerInterval([value, ...components], 2);
    }

    /**
     * Creates an interval from seconds. A number selects floating-point conversion; bigint selects integer conversion.
     */
    static fromSeconds(value: number): TimeSpan;
    static fromSeconds(value: bigint): TimeSpan;
    static fromSeconds(seconds: number | bigint, milliseconds?: number | bigint, microseconds?: number | bigint): TimeSpan;
    static fromSeconds(value: number | bigint, ...components: Array<number | bigint | undefined>): TimeSpan {
        if (components.length === 0 && typeof value === 'number') return interval(value, TicksPerSecond);
        return integerInterval([value, ...components], 3);
    }

    /**
     * Creates an interval from milliseconds. A number selects floating-point conversion; bigint selects integer conversion.
     */
    static fromMilliseconds(value: number): TimeSpan;
    static fromMilliseconds(value: bigint): TimeSpan;
    static fromMilliseconds(milliseconds: number | bigint, microseconds?: number | bigint): TimeSpan;
    static fromMilliseconds(value: number | bigint, ...components: Array<number | bigint | undefined>): TimeSpan {
        if (components.length === 0 && typeof value === 'number') return interval(value, TicksPerMillisecond);
        return integerInterval([value, ...components], 4);
    }

    /**
     * Creates an interval from microseconds. A number selects floating-point conversion; bigint selects integer conversion.
     */
    static fromMicroseconds(value: number): TimeSpan;
    static fromMicroseconds(value: bigint): TimeSpan;
    static fromMicroseconds(value: number | bigint, ...components: Array<number | bigint | undefined>): TimeSpan {
        if (components.length === 0 && typeof value === 'number') return interval(value, TicksPerMicrosecond);
        return integerInterval([value, ...components], 5);
    }

    /**
     * Creates an interval from the specified number of 100-nanosecond ticks.
     */
    static fromTicks(value: bigint): TimeSpan {
        return new TimeSpan(value);
    }

    /**
     * Compares two intervals by their tick values.
     */
    static compare(first: TimeSpan, second: TimeSpan): number {
        return first.ticks > second.ticks ? 1 : first.ticks < second.ticks ? -1 : 0;
    }

    /**
     * Determines whether two intervals have equal tick values.
     */
    static equals(first: TimeSpan, second: TimeSpan): boolean {
        return first.ticks === second.ticks;
    }

    /**
     * Converts this interval to its invariant constant string representation.
     */
    toString(): string;

    /**
     * Converts this interval using the specified standard or custom format.
     * @param format The standard or custom interval format string.
     */
    toString(format: string | null): string;

    /**
     * Converts this interval using the specified format and formatting information.
     * @param format The standard or custom interval format string.
     * @param provider The provider supplying culture-specific formatting information.
     */
    toString(format: string | null, provider: IFormatProvider | null): string;
    toString(format?: string | null, provider?: IFormatProvider | null): string {
        return formatTimeSpan(this.ticks, format, provider);
    }

    /**
     * Tries to format this interval into a UTF-16 character buffer or UTF-8 byte buffer.
     * @param destination The buffer that receives the formatted interval.
     * @param charsWritten Receives the number of code units or bytes written; zero if the buffer is too small.
     * @param format The standard or custom interval format string.
     * @param provider The provider supplying culture-specific formatting information.
     * @returns True if the destination has enough space; otherwise, false.
     */
    tryFormat(destination: string[] | Uint16Array | Uint8Array, charsWritten: OutParam<number>, format?: string | null, provider?: IFormatProvider | null): boolean {
        return tryWriteFormatted(emit => formatTimeSpan(this.ticks, format, provider, emit), destination, charsWritten, false);
    }
}

export function timeToTicks(hour: number, minute: number, second: number): bigint {
    const totalSeconds = BigInt(int32(hour)) * 3600n + BigInt(int32(minute)) * 60n + BigInt(int32(second));
    if (totalSeconds > MaxSeconds || totalSeconds < MinSeconds) {
        throw new ArgumentOutOfRangeException(undefined, 'TimeSpan overflowed because the duration is too long.');
    }
    return totalSeconds * TicksPerSecond;
}

function int32(value?: number | bigint): number {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < -2147483648 || value > 2147483647) {
        throw new ArgumentOutOfRangeException('Integer component out of range');
    }
    return value;
}

function checkTicks(ticks: bigint): bigint {
    if (ticks < LongMinValue || ticks > LongMaxValue) throw new OverflowException('TimeSpan overflowed because the duration is too long.');
    return ticks;
}

function interval(value: number, scale: bigint): TimeSpan {
    if (Number.isNaN(value)) throw new ArgumentException('TimeSpan does not accept floating point Not-a-Number values.');
    return intervalFromDoubleTicks(value * Number(scale));
}

function intervalFromDoubleTicks(ticks: number): TimeSpan {
    if (!Number.isFinite(ticks) || ticks > Number(LongMaxValue) || ticks < Number(LongMinValue)) {
        throw new OverflowException('TimeSpan overflowed because the duration is too long.');
    }
    if (ticks === Number(LongMaxValue)) return TimeSpan.maxValue;
    return new TimeSpan(BigInt(Math.trunc(ticks)));
}

function roundToEven(value: number): number {
    if (!Number.isFinite(value)) return value;
    const floor = Math.floor(value);
    const fraction = value - floor;
    return fraction < 0.5 ? floor : fraction > 0.5 ? floor + 1 : floor % 2 === 0 ? floor : floor + 1;
}

function integerInterval(components: Array<number | bigint | undefined>, start: number): TimeSpan {
    const scales = [86400000000n, 3600000000n, 60000000n, 1000000n, 1000n, 1n];
    let microseconds = 0n;
    for (let i = 0; i < components.length; i++) {
        const input = components[i] ?? 0n;
        if (typeof input === 'number' && !Number.isSafeInteger(input)) {
            throw new ArgumentOutOfRangeException(undefined, 'TimeSpan overflowed because the duration is too long.');
        }
        const value = BigInt(input);
        if (value < LongMinValue || value > LongMaxValue || (start + i < 2 && (value < -2147483648n || value > 2147483647n))) {
            throw new ArgumentOutOfRangeException(undefined, 'TimeSpan overflowed because the duration is too long.');
        }
        microseconds += value * scales[start + i]!;
    }
    if (microseconds < MinMicroseconds || microseconds > MaxMicroseconds) {
        throw new ArgumentOutOfRangeException(undefined, 'TimeSpan overflowed because the duration is too long.');
    }
    return new TimeSpan(microseconds * TicksPerMicrosecond);
}
