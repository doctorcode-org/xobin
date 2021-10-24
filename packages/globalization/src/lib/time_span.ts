import {
    MaxSeconds,
    TicksPerSecond,
    MinSeconds,
    LongMaxValue,
    MaxMilliSeconds,
    MinMilliSeconds,
    TicksPerMillisecond,
    TicksPerDay,
    TicksPerHour,
    TicksPerMinute,
    LongMinValue
} from "./var";
import {
    getOrCreateValue,
    setValue,
    getValue,
    int,
    OverflowException,
    ArgumentException,
    ArgumentOutOfRangeException,
    IEquatable,
    IComparable,
    Nullable
} from '@xobin/core';

/**
 * Represents a time interval.
 */
export class TimeSpan implements IEquatable<TimeSpan>, IComparable<TimeSpan> {

    /**
     * Initializes a new instance of the TimeSpan structure.
     */
    constructor();

    /**
     * Initializes a new instance of the TimeSpan structure to the specified number of ticks.
     * @param ticks A time period expressed in millisecond units.
     */
    constructor(ticks: number);

    /**
     * Initializes a new instance of the TimeSpan structure to a specified number of hours, minutes, and seconds.
     * @param hours Number of hours.
     * @param minutes Number of minutes.
     * @param seconds Number of seconds.
     */
    constructor(hours: number, minutes: number, seconds: number);

    /**
     * Initializes a new instance of the TimeSpan structure to a specified number of days, hours, minutes, and seconds.
     * @param days Number of days.
     * @param hours Number of hours.
     * @param minutes Number of minutes.
     * @param seconds Number of seconds.
     */
    constructor(days: number, hours: number, minutes: number, seconds: number);

    /**
     * Initializes a new instance of the TimeSpan structure to a specified number of days, hours, minutes, seconds, and milliseconds.
     * @param days Number of days.
     * @param hours Number of hours.
     * @param minutes Number of minutes.
     * @param seconds Number of seconds.
     * @param milliseconds Number of milliseconds.
     */
    constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
    constructor(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number) {
        switch (arguments.length) {
            case 0:
                setValue(this, 'ticks', 0);
                break;
            case 1:
                setValue(this, 'ticks', int(days!));
                break;
            case 3:
                setValue(this, 'ticks', timeToTicks(days!, hours!, minutes!));
                break;
            case 4:
            case 5:
                const totalMilliSeconds = (days! * 3600 * 24 + hours! * 3600 + minutes! * 60 + seconds!) * 1000 + (milliseconds || 0);

                if (totalMilliSeconds > MaxMilliSeconds || totalMilliSeconds < MinMilliSeconds)
                    throw new ArgumentOutOfRangeException('Overflow_TimeSpanTooLong');

                setValue(this, 'ticks', int(totalMilliSeconds * TicksPerMillisecond));
                break;
            default:
                throw new ArgumentException('Invalid arguments');
        }
    }

    /**
     * Gets the number of ticks that represent the value of the current TimeSpan structure.
     */
    get ticks(): number {
        return getValue(this, 'ticks');
    }

    /**
     * Gets the days component of the time interval represented by the current TimeSpan structure.
     */
    get days(): number {
        return int(this.ticks / TicksPerDay);
    }

    /**
     * Gets the hours component of the time interval represented by the current TimeSpan structure.
     */
    get hours(): number {
        return int((this.ticks / TicksPerHour) % 24);
    }

    /**
     * Gets the minutes component of the time interval represented by the current TimeSpan structure.
     */
    get minutes(): number {
        return int((this.ticks / TicksPerMinute) % 60);
    }

    /**
     * Gets the seconds component of the time interval represented by the current TimeSpan structure.
     */
    get seconds(): number {
        return int((this.ticks / TicksPerSecond) % 60);
    }

    /**
     * Gets the milliseconds component of the time interval represented by the current TimeSpan structure.
     */
    get milliseconds(): number {
        return int((this.ticks / TicksPerMillisecond) % 1000);
    }

    /**
     * Gets the value of the current TimeSpan structure expressed in whole and fractional days.
     */
    get totalDays(): number {
        return this.ticks / TicksPerDay;
    }

    /**
     * Gets the value of the current TimeSpan structure expressed in whole and fractional hours.
     */
    get totalHours(): number {
        return this.ticks / TicksPerHour;
    }

    /**
     * Gets the value of the current TimeSpan structure expressed in whole and fractional minutes.
     */
    get totalMinutes(): number {
        return this.ticks / TicksPerMinute;
    }

    /**
     * Gets the value of the current TimeSpan structure expressed in whole and fractional seconds.
     */
    get totalSeconds(): number {
        return this.ticks / TicksPerSecond;
    }

    /**
     * Gets the value of the current TimeSpan structure expressed in whole and fractional milliseconds.
     */
    get totalMilliseconds(): number {
        const temp = this.ticks / TicksPerMillisecond;

        if (temp > MaxMilliSeconds)
            return MaxMilliSeconds;

        if (temp < MinMilliSeconds)
            return MinMilliSeconds;

        return temp;
    }

    /**
     * Represents the zero TimeSpan value. This field is read-only.
     */
    static get zero(): TimeSpan {
        return getOrCreateValue(this, "zero", () => new TimeSpan(0));
    }

    /**
     * Represents the minimum TimeSpan value. This field is read-only.
     */
    static get minValue(): TimeSpan {
        return getOrCreateValue(this, "minValue", () => new TimeSpan(LongMinValue));
    }

    /**
     * Represents the maximum TimeSpan value. This field is read-only.
     */
    static get maxValue(): TimeSpan {
        return getOrCreateValue(this, "maxValue", () => new TimeSpan(LongMaxValue));
    }

    /**
     * Returns a new TimeSpan object whose value is the sum of the specified TimeSpan object and this instance.
     * @param ts The time interval to add.
     */
    add(ts: TimeSpan): TimeSpan {
        const result = this.ticks + ts.ticks;

        if (result > LongMaxValue || result < LongMinValue)
            throw new OverflowException(/*SR.Overflow_TimeSpanTooLong*/);

        return new TimeSpan(result);
    }

    /**
     * Returns a new TimeSpan object whose value is the absolute value of the current TimeSpan object.
     */
    duration(): TimeSpan {
        if (this.ticks == TimeSpan.minValue.ticks)
            throw new OverflowException(/*SR.Overflow_Duration*/);

        return new TimeSpan(this.ticks >= 0 ? this.ticks : -this.ticks);
    }

    /**
     * Returns a new TimeSpan object whose value is the negated value of this instance.
     */
    negate(): TimeSpan {
        if (this.ticks == TimeSpan.minValue.ticks)
            throw new OverflowException(/*SR.Overflow_NegateTwosCompNum*/);

        return new TimeSpan(-this.ticks);
    }

    /**
     * Returns a new TimeSpan object whose value is the difference between the specified TimeSpan object and this instance.
     * @param ts The time interval to be subtracted.
     */
    subtract(ts: TimeSpan): TimeSpan {
        const result = this.ticks - ts.ticks;

        if (result > LongMaxValue || result < LongMinValue)
            throw new OverflowException(/*SR.Overflow_TimeSpanTooLong*/);

        return new TimeSpan(result);
    }

    /**
     * Returns a value indicating whether this instance is equal to a specified TimeSpan object.
     * @param other An object to compare with this instance.
     */
    equals(other: TimeSpan): boolean {
        return other && this.ticks === other.ticks;
    }

    /**
     * Compares this instance to a specified object and returns an integer that indicates whether this instance is shorter than, equal to, or longer than the specified object.
     * @param otherValue An object to compare, or null.
     */
    compareTo(otherValue: Nullable<object>): number;
    /**
     * Compares this instance to a specified TimeSpan object and returns an integer that indicates whether this instance is shorter than, equal to, or longer than the TimeSpan object.
     * @param otherValue An object to compare to this instance.
     * @returns A signed number indicating the relative values of this instance and value.
     */
    compareTo(otherValue: TimeSpan): number;
    compareTo(otherValue: TimeSpan | Nullable<object>): number {
        if (otherValue == null) {
            return 1;
        }

        if (!(otherValue instanceof TimeSpan)) {
            throw new ArgumentException(/*SR.Arg_MustBeTimeSpan*/);
        }

        const t = otherValue.ticks;
        if (this.ticks > t) return 1;
        if (this.ticks < t) return -1;
        return 0;
    }

    /**
     * Returns the primitive value of this TimeSpan instance.
     */
    valueOf(): number {
        return this.ticks;
    }

    /**
     * Returns a TimeSpan that represents a specified number of days, where the specification is accurate to the nearest millisecond.
     * @param value A number of days, accurate to the nearest millisecond.
     */
    static fromDays(value: number): TimeSpan {
        return interval(value, TicksPerDay);
    }

    /**
     * Returns a TimeSpan that represents a specified number of hours, where the specification is accurate to the nearest millisecond.
     * @param value A number of hours accurate to the nearest millisecond.
     */
    static fromHours(value: number): TimeSpan {
        return interval(value, TicksPerHour);
    }

    /**
     * Returns a TimeSpan that represents a specified number of minutes, where the specification is accurate to the nearest millisecond.
     * @param value A number of minutes, accurate to the nearest millisecond.
     */
    static fromMinutes(value: number): TimeSpan {
        return interval(value, TicksPerMinute);
    }

    /**
     * Returns a TimeSpan that represents a specified number of seconds, where the specification is accurate to the nearest millisecond.
     * @param value A number of seconds, accurate to the nearest millisecond.
     */
    static fromSeconds(value: number): TimeSpan {
        return interval(value, TicksPerSecond);
    }

    /**
     * Returns a TimeSpan that represents a specified number of milliseconds.
     * @param value A number of milliseconds.
     */
    static fromMilliseconds(value: number): TimeSpan {
        return interval(value, TicksPerMillisecond);
    }

    /**
     * Returns a TimeSpan that represents a specified time, where the specification is in units of ticks.
     * @param value A number of ticks that represent a time.
     */
    static fromTicks(value: number): TimeSpan {
        return new TimeSpan(value);
    }

    /**
     * Compares two TimeSpan values and returns an integer that indicates whether the first value is shorter than, equal to, or longer than the second value.
     * @param t1 The first time interval to compare.
     * @param t2 The second time interval to compare.
     */
    static compare(t1: TimeSpan, t2: TimeSpan): number {
        if (t1.ticks > t2.ticks) return 1;
        if (t1.ticks < t2.ticks) return -1;
        return 0;
    }

    /**
     * Returns a value that indicates whether two specified instances of TimeSpan are equal.
     * @param t1 The first time interval to compare.
     * @param t2 The second time interval to compare.
     */
    static equals(t1: TimeSpan, t2: TimeSpan): boolean {
        return t1.ticks === t2.ticks;
    }
}

export function timeToTicks(hour: number, minute: number, second: number): number {
    // totalSeconds is bounded by 2^31 * 2^12 + 2^31 * 2^8 + 2^31,
    // which is less than 2^44, meaning we won't overflow totalSeconds.
    const totalSeconds = hour * 3600 + minute * 60 + second;
    if (totalSeconds > MaxSeconds || totalSeconds < MinSeconds)
        throw new OverflowException('ThrowArgumentOutOfRange_TimeSpanTooLong');

    return int(totalSeconds * TicksPerSecond);
}

function interval(value: number, scale: number): TimeSpan {
    if (isNaN(value))
        throw new ArgumentException(/*SR.Arg_CannotBeNaN*/);

    const ticks = value * scale;
    return intervalFromDoubleTicks(ticks);
}

function intervalFromDoubleTicks(ticks: number): TimeSpan {
    if ((ticks > LongMaxValue) || (ticks < LongMinValue) || isNaN(ticks))
        throw new OverflowException(/*SR.Overflow_TimeSpanTooLong*/);

    if (ticks == LongMaxValue)
        return TimeSpan.maxValue;

    return new TimeSpan(int(ticks));
}