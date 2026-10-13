import type { IFormatProvider } from '@xobin/core';
import { formatDateOnlyTimeOnly } from './date_only_time_only_format';
import { tryWriteFormatted } from './format_buffer';
import { ArgumentException, ArgumentOutOfRangeException, getOrCreateValue, IComparable, IEquatable, OutParam } from '@xobin/core';
import { DateTime } from './date_time';
import { TimeSpan } from './time_span';
import { TicksPerDay, TicksPerHour, TicksPerMinute, TicksPerSecond, TicksPerMillisecond, TicksPerMicrosecond, LongMinValue, LongMaxValue } from './var';

/**
 * Represents a time of day from midnight through 23:59:59.9999999.
 */
export class TimeOnly implements IComparable<TimeOnly>, IEquatable<TimeOnly> {
    private readonly _ticks: bigint;

    /**
     * Creates a time representing midnight.
     */
    constructor();

    /**
     * Creates a time from 100-nanosecond ticks since midnight.
     * @param ticks The number of ticks, from 0 through 863999999999.
     */
    constructor(ticks: bigint);

    /**
     * Creates a time from its hour and minute components.
     * @param hour The hour, from 0 through 23.
     * @param minute The minute, from 0 through 59.
     */
    constructor(hour: number, minute: number);

    /**
     * Creates a time from its hour, minute, and second components.
     * @param hour The hour, from 0 through 23.
     * @param minute The minute, from 0 through 59.
     * @param second The second, from 0 through 59.
     */
    constructor(hour: number, minute: number, second: number);

    /**
     * Creates a time including the millisecond component.
     * @param hour The hour, from 0 through 23.
     * @param minute The minute, from 0 through 59.
     * @param second The second, from 0 through 59.
     * @param millisecond The millisecond, from 0 through 999.
     */
    constructor(hour: number, minute: number, second: number, millisecond: number);

    /**
     * Creates a time including the millisecond and microsecond components.
     * @param hour The hour, from 0 through 23.
     * @param minute The minute, from 0 through 59.
     * @param second The second, from 0 through 59.
     * @param millisecond The millisecond, from 0 through 999.
     * @param microsecond The microsecond, from 0 through 999.
     */
    constructor(hour: number, minute: number, second: number, millisecond: number, microsecond: number);

    constructor(first?: number | bigint, minute = 0, second = 0, millisecond = 0, microsecond = 0) {
        if (arguments.length >= 2) {
            const hour = Number(first);
            if (!Number.isInteger(hour) || hour < 0 || hour >= 24
                || !Number.isInteger(minute) || minute < 0 || minute >= 60
                || !Number.isInteger(second) || second < 0 || second >= 60) {
                throw new ArgumentOutOfRangeException(undefined, 'Hour, Minute, and Second parameters describe an un-representable DateTime.');
            }

            if (!Number.isInteger(millisecond) || millisecond < 0 || millisecond >= 1000) {
                throw new ArgumentOutOfRangeException('millisecond', 'Valid values are between 0 and 999, inclusive.');
            }

            if (!Number.isInteger(microsecond) || microsecond < 0 || microsecond >= 1000) {
                throw new ArgumentOutOfRangeException('microsecond', 'Valid values are between 0 and 999, inclusive.');
            }

            this._ticks = BigInt(hour) * TicksPerHour + BigInt(minute) * TicksPerMinute
                + BigInt(second) * TicksPerSecond + BigInt(millisecond) * TicksPerMillisecond
                + BigInt(microsecond) * TicksPerMicrosecond;
        } else {
            const ticks = arguments.length === 0 ? 0n : first;
            if (typeof ticks !== 'bigint') throw new ArgumentException('Ticks must be a bigint.');
            if (ticks < 0n || ticks >= TicksPerDay) {
                throw new ArgumentOutOfRangeException('ticks', 'Ticks must be between 0 and and TimeOnly.MaxValue.Ticks.');
            }
            this._ticks = ticks;
        }
    }

    /**
     * Gets the number of 100-nanosecond ticks since midnight.
     */
    get ticks(): bigint {
        return this._ticks;
    }

    /**
     * Gets the hour component of this time.
     */
    get hour(): number {
        return Number(this._ticks / TicksPerHour);
    }

    /**
     * Gets the minute component of this time.
     */
    get minute(): number {
        return Number(this._ticks / TicksPerMinute % 60n);
    }

    /**
     * Gets the second component of this time.
     */
    get second(): number {
        return Number(this._ticks / TicksPerSecond % 60n);
    }

    /**
     * Gets the millisecond component of this time.
     */
    get millisecond(): number {
        return Number(this._ticks / TicksPerMillisecond % 1000n);
    }

    /**
     * Gets the microsecond component of this time.
     */
    get microsecond(): number {
        return Number(this._ticks / TicksPerMicrosecond % 1000n);
    }

    /**
     * Gets the nanosecond component, in increments of 100 nanoseconds.
     */
    get nanosecond(): number {
        return Number(this._ticks % TicksPerMicrosecond) * 100;
    }

    /**
     * Gets the earliest representable time of day.
     */
    static get minValue(): TimeOnly {
        return getOrCreateValue(this, 'minValue', () => new TimeOnly());
    }

    /**
     * Gets the latest representable time of day.
     */
    static get maxValue(): TimeOnly {
        return getOrCreateValue(this, 'maxValue', () => new TimeOnly(TicksPerDay - 1n));
    }

    /**
     * Creates a time from the time-of-day component of a DateTime.
     * @param dateTime The date and time whose time component is used.
     */
    static fromDateTime(dateTime: DateTime): TimeOnly {
        return new TimeOnly(dateTime.ticks % TicksPerDay);
    }

    /**
     * Creates a time from an interval since midnight.
     * @param timeSpan The interval, which must be nonnegative and less than one day.
     */
    static fromTimeSpan(timeSpan: TimeSpan): TimeOnly {
        return new TimeOnly(timeSpan.ticks);
    }

    /**
     * Returns the time interval since midnight.
     */
    toTimeSpan(): TimeSpan {
        return new TimeSpan(this._ticks);
    }

    /**
     * Adds a time interval, wrapping at midnight.
     * @param value The positive or negative time interval to add.
     */
    add(value: TimeSpan): TimeOnly;

    /**
     * Adds a time interval and returns the number of wrapped days through an output parameter.
     * @param value The positive or negative time interval to add.
     * @param wrappedDays Receives the number of whole days crossed.
     */
    add(value: TimeSpan, wrappedDays: OutParam<number>): TimeOnly;

    add(value: TimeSpan, wrappedDays?: OutParam<number>): TimeOnly {
        return this.addTicks(value.ticks, wrappedDays);
    }

    /**
     * Adds whole or fractional hours, wrapping at midnight.
     * @param value The positive or negative number of hours to add.
     */
    addHours(value: number): TimeOnly;

    /**
     * Adds hours and returns the number of wrapped days through an output parameter.
     * @param value The positive or negative number of hours to add.
     * @param wrappedDays Receives the number of whole days crossed.
     */
    addHours(value: number, wrappedDays: OutParam<number>): TimeOnly;

    addHours(value: number, wrappedDays?: OutParam<number>): TimeOnly {
        return this.addTicks(this.intervalTicks(value, TicksPerHour), wrappedDays);
    }

    /**
     * Adds whole or fractional minutes, wrapping at midnight.
     * @param value The positive or negative number of minutes to add.
     */
    addMinutes(value: number): TimeOnly;

    /**
     * Adds minutes and returns the number of wrapped days through an output parameter.
     * @param value The positive or negative number of minutes to add.
     * @param wrappedDays Receives the number of whole days crossed.
     */
    addMinutes(value: number, wrappedDays: OutParam<number>): TimeOnly;

    addMinutes(value: number, wrappedDays?: OutParam<number>): TimeOnly {
        return this.addTicks(this.intervalTicks(value, TicksPerMinute), wrappedDays);
    }

    /**
     * Determines whether this time is within a range, including ranges that cross midnight.
     * @param start The start of the range, inclusive.
     * @param end The end of the range, exclusive. An equal start and end define an empty range.
     */
    isBetween(start: TimeOnly, end: TimeOnly): boolean {
        return start._ticks <= end._ticks
            ? this._ticks >= start._ticks && this._ticks < end._ticks
            : this._ticks >= start._ticks || this._ticks < end._ticks;
    }

    /**
     * Returns the elapsed interval on a circular clock, always between zero and one day.
     * @param value The time to subtract from this time.
     */
    subtract(value: TimeOnly): TimeSpan {
        const difference = this._ticks - value._ticks;
        return new TimeSpan(difference < 0n ? difference + TicksPerDay : difference);
    }

    /**
     * Compares this time with another time of day.
     * @param value The time to compare.
     */
    compareTo(value: TimeOnly): number;

    /**
     * Compares this time with an object containing a TimeOnly, or null.
     * @param value The object to compare; null is earlier than any time.
     */
    compareTo(value: unknown): number;

    compareTo(value: unknown): number {
        if (value == null) {
            return 1;
        }

        if (!(value instanceof TimeOnly)) {
            throw new ArgumentException('Object must be of type TimeOnly.');
        }

        return this._ticks === value._ticks ? 0 : this._ticks < value._ticks ? -1 : 1;
    }

    /**
     * Determines whether this time and another time represent the same time of day.
     * @param value The time to compare.
     */
    equals(value: TimeOnly): boolean;

    /**
     * Determines whether an object is a TimeOnly representing the same time of day.
     * @param value The object to compare.
     */
    equals(value: unknown): boolean;

    equals(value: unknown): boolean {
        return value instanceof TimeOnly && this._ticks === value._ticks;
    }

    /**
     * Gets the signed 32-bit hash code for this time.
     */
    getHashCode(): number {
        return Number(BigInt.asIntN(32, this._ticks ^ this._ticks >> 32n));
    }

    /**
     * Returns the ticks for JavaScript relational comparisons.
     */
    valueOf(): bigint {
        return this._ticks;
    }

    /**
     * Deconstructs this time into its hour and minute components.
     * @param hour Receives the hour.
     * @param minute Receives the minute.
     */
    deconstruct(hour: OutParam<number>, minute: OutParam<number>): void;

    /**
     * Deconstructs this time into its hour, minute, and second components.
     * @param hour Receives the hour.
     * @param minute Receives the minute.
     * @param second Receives the second.
     */
    deconstruct(hour: OutParam<number>, minute: OutParam<number>, second: OutParam<number>): void;

    /**
     * Deconstructs this time including its millisecond component.
     * @param hour Receives the hour.
     * @param minute Receives the minute.
     * @param second Receives the second.
     * @param millisecond Receives the millisecond.
     */
    deconstruct(hour: OutParam<number>, minute: OutParam<number>, second: OutParam<number>, millisecond: OutParam<number>): void;

    /**
     * Deconstructs this time including its microsecond component.
     * @param hour Receives the hour.
     * @param minute Receives the minute.
     * @param second Receives the second.
     * @param millisecond Receives the millisecond.
     * @param microsecond Receives the microsecond.
     */
    deconstruct(hour: OutParam<number>, minute: OutParam<number>, second: OutParam<number>, millisecond: OutParam<number>, microsecond: OutParam<number>): void;

    deconstruct(hour: OutParam<number>, minute: OutParam<number>, second?: OutParam<number>, millisecond?: OutParam<number>, microsecond?: OutParam<number>): void {
        hour.result = this.hour;
        minute.result = this.minute;
        if (second) second.result = this.second;
        if (millisecond) millisecond.result = this.millisecond;
        if (microsecond) microsecond.result = this.microsecond;
    }

    /**
     * Converts this instance using the current culture's short time format.
     */
    toString(): string;

    /**
     * Converts this instance using a standard or custom time format.
     * @param format The standard or custom format string.
     */
    toString(format: string | null): string;

    /**
     * Converts this instance using the specified formatting information.
     * @param provider The provider supplying culture-specific formatting information.
     */
    toString(provider: IFormatProvider | null): string;

    /**
     * Converts this instance using the specified format and formatting information.
     * @param format The standard or custom format string.
     * @param provider The provider supplying culture-specific formatting information.
     */
    toString(format: string | null, provider: IFormatProvider | null): string;
    toString(format?: string | IFormatProvider | null, provider?: IFormatProvider | null): string {
        if (typeof format === 'object' && format !== null) { provider = format; format = null; }
        return formatDateOnlyTimeOnly(new DateTime(this._ticks), format, provider, false);
    }

    /**
     * Converts this instance to a long time string using the current culture.
     */
    toLongTimeString(): string {
        return this.toString('T');
    }

    /**
     * Converts this instance to a short time string using the current culture.
     */
    toShortTimeString(): string {
        return this.toString();
    }

    /**
     * Tries to format this instance into a UTF-16 character buffer or UTF-8 byte buffer.
     * @param destination The buffer that receives the formatted value.
     * @param charsWritten Receives the number of code units or bytes written; zero if the buffer is too small.
     * @param format The standard or custom format string.
     * @param provider The provider supplying culture-specific formatting information.
     * @returns True if the destination has enough space; otherwise, false.
     */
    tryFormat(destination: string[] | Uint16Array | Uint8Array, charsWritten: OutParam<number>, format?: string | null, provider?: IFormatProvider | null): boolean {
        return tryWriteFormatted(emit => formatDateOnlyTimeOnly(new DateTime(this._ticks), format, provider, false, true, emit), destination, charsWritten, true);
    }

    private addTicks(ticks: bigint, wrappedDays?: OutParam<number>): TimeOnly {
        let days = ticks / TicksPerDay;
        let timeTicks = this._ticks + ticks % TicksPerDay;
        if (timeTicks < 0n) {
            days--;
            timeTicks += TicksPerDay;
        } else if (timeTicks >= TicksPerDay) {
            days++;
            timeTicks -= TicksPerDay;
        }

        if (wrappedDays) wrappedDays.result = Number(days);
        return new TimeOnly(timeTicks);
    }

    private intervalTicks(value: number, ticksPerUnit: bigint): bigint {
        const ticks = value * Number(ticksPerUnit);
        if (Number.isNaN(ticks)) return 0n;
        if (ticks >= Number(LongMaxValue)) return LongMaxValue;
        if (ticks <= Number(LongMinValue)) return LongMinValue;
        return BigInt(Math.trunc(ticks));
    }
}
