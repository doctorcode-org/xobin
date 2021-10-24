import {
    MinTicks,
    MaxTicks,
    TicksPerDay,
    MillisPerSecond,
    TicksPerMillisecond,
    MaxMillis,
    MillisPerDay,
    MillisPerMinute,
    DaysPer400Years,
    DaysPer100Years,
    DaysPer4Years,
    DaysPerYear,
    MillisPerHour,
    TicksPerHour,
    TicksPerMinute,
    TicksPerSecond,
    DatePartYear,
    DatePartDayOfYear,
    DatePartMonth,
    DatePartDay,
    getTimezoneOffset
} from "./var";
import { Calendar } from "./calendar";
import { TimeSpan, timeToTicks as TimeSpanTimeToTicks } from "./time_span";
import { DayOfWeek } from './day_of_week';
import { DateTimeKind } from './date_time_kind';
import {
    ArgumentOutOfRangeException,
    ArgumentException,
    getOrCreateValue,
    setValue,
    uint,
    int,
    IFormatProvider,
    ArgumentNullException,
    IComparable,
    IEquatable
} from '@xobin/core';


const s_daysToMonth365 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const s_daysToMonth366 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

/**
 * Represents an instant in time, typically expressed as a date and time of day.
 */
export class DateTime implements IComparable<DateTime>, IEquatable<DateTime> {

    /**
     * Initializes a new instance of the DateTime structure.
     */
    constructor();

    /**
     * Initializes a new instance of the DateTime structure to a specified number of ticks.
     * @param ticks A date and time expressed in the number of millisecond intervals that have elapsed since January 1, 0001 at 00:00:00.000 in the Gregorian calendar.
     */
    constructor(ticks: number);

    /**
     * Initializes a new instance of the DateTime structure to a specified number of ticks and to Coordinated Universal Time (UTC) or local time.
     * @param ticks A date and time expressed in the number of 100-nanosecond intervals that have elapsed since January 1, 0001 at 00:00:00.000 in the Gregorian calendar.
     * @param kind One of the enumeration values that indicates whether ticks specifies a local time, Coordinated Universal Time (UTC), or neither.
     */
    constructor(ticks: number, kind: DateTimeKind);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, and day.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     */
    constructor(year: number, month: number, day: number);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, and day for the specified calendar.
     * @param year The year (1 through the number of years in calendar).
     * @param month The month (1 through the number of months in calendar).
     * @param day The day (1 through the number of days in month).
     * @param calendar The calendar that is used to interpret year, month, and day.
     */
    constructor(year: number, month: number, day: number, calendar: Calendar);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, and second.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, second, and Coordinated Universal Time (UTC) or local time.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param kind One of the enumeration values that indicates whether year, month, day, hour, minute and second specify a local time, Coordinated Universal Time (UTC), or neither.
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, kind: DateTimeKind);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, and second for the specified calendar.
     * @param year The year (1 through the number of years in calendar).
     * @param month The month (1 through the number of months in calendar).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param calendar The calendar that is used to interpret year, month, and day.
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, calendar: Calendar);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, second, and millisecond.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param millisecond The milliseconds (0 through 999).
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time.
     * @param year The year (1 through 9999).
     * @param month The month (1 through 12).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param millisecond The milliseconds (0 through 999).
     * @param kind One of the enumeration values that indicates whether year, month, day, hour, minute, second, and millisecond specify a local time, Coordinated Universal Time (UTC), or neither.
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, second, and millisecond for the specified calendar.
     * @param year The year (1 through the number of years in calendar).
     * @param month The month (1 through the number of months in calendar).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param millisecond The milliseconds (0 through 999).
     * @param calendar The calendar that is used to interpret year, month, and day.
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, calendar: Calendar);

    /**
     * Initializes a new instance of the DateTime structure to the specified year, month, day, hour, minute, second, millisecond, and Coordinated Universal Time (UTC) or local time for the specified calendar.
     * @param year The year (1 through the number of years in calendar).
     * @param month The month (1 through the number of months in calendar).
     * @param day The day (1 through the number of days in month).
     * @param hour The hours (0 through 23).
     * @param minute The minutes (0 through 59).
     * @param second The seconds (0 through 59).
     * @param millisecond The milliseconds (0 through 999).
     * @param calendar The calendar that is used to interpret year, month, and day.
     * @param kind One of the enumeration values that indicates whether year, month, day, hour, minute, second, and millisecond specify a local time, Coordinated Universal Time (UTC), or neither.
     */
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, calendar: Calendar, kind: DateTimeKind);
    constructor() {

        let ticks: number,
            year: number,
            month: number,
            day: number,
            hour: number,
            minute: number,
            second: number,
            millisecond: number,
            calendar: Calendar,
            kind: DateTimeKind = DateTimeKind.unspecified;

        switch (arguments.length) {
            case 0:
                ticks = dateToTicks(1, 1, 1);
                break;

            case 1:
                ticks = arguments[0];
                if (ticks < MinTicks || ticks > MaxTicks)
                    throw new ArgumentOutOfRangeException('ArgumentOutOfRange_DateTimeBadTicks');

                break;

            case 2:
                ticks = arguments[0];
                kind = arguments[1];

                if (ticks < MinTicks || ticks > MaxTicks) {
                    throw new ArgumentOutOfRangeException('ArgumentOutOfRange_DateTimeBadTicks');
                }
                if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                    throw new ArgumentException('Argument_InvalidDateTimeKind');
                }

                break;

            case 3:
                year = arguments[0];
                month = arguments[1];
                day = arguments[2];
                ticks = dateToTicks(year, month, day);
                break;

            case 4:
                year = arguments[0];
                month = arguments[1];
                day = arguments[2];
                calendar = arguments[3];

                if (!(calendar instanceof Calendar))
                    throw new ArgumentNullException("calendar");

                ticks = calendar.toDateTime(year, month, day, 0, 0, 0, 0).ticks;
                break;

            case 6:
                year = arguments[0];
                month = arguments[1];
                day = arguments[2];
                hour = arguments[3];
                minute = arguments[4];
                second = arguments[5];

                ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                break;

            case 7:
                year = arguments[0];
                month = arguments[1];
                day = arguments[2];
                hour = arguments[3];
                minute = arguments[4];
                second = arguments[5];

                let arg6: DateTimeKind | Calendar | number = arguments[6];
                if (arg6 instanceof Calendar) {
                    calendar = arg6;
                    ticks = calendar.toDateTime(year, month, day, hour, minute, second, 0).ticks;
                }
                else if (arg6 instanceof DateTimeKind) {
                    kind = arg6;
                    if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                        throw new ArgumentException("Argument_InvalidDateTimeKind");
                    }

                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                }
                else if (typeof arg6 === 'number') {
                    millisecond = arg6;
                    if (millisecond < 0 || millisecond >= MillisPerSecond) {
                        throw new ArgumentOutOfRangeException("ArgumentOutOfRange_Range");
                    }

                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                    ticks += millisecond * TicksPerMillisecond;
                    if (ticks < MinTicks || ticks > MaxTicks)
                        throw new ArgumentException("Arg_DateTimeRange");
                }
                else {
                    throw new ArgumentException('Invalid arguments');
                }

                break;

            case 8:
                year = arguments[0];
                month = arguments[1];
                day = arguments[2];
                hour = arguments[3];
                minute = arguments[4];
                second = arguments[5];
                millisecond = arguments[6];

                if (millisecond < 0 || millisecond >= MillisPerSecond) {
                    throw new ArgumentOutOfRangeException(/*nameof(millisecond), SR.Format(SR.ArgumentOutOfRange_Range, 0, MillisPerSecond - 1)*/);
                }

                let arg7: DateTimeKind | Calendar = arguments[7];
                if (arg7 instanceof Calendar) {
                    calendar = arg7;

                    ticks = calendar.toDateTime(year, month, day, hour, minute, second, 0).ticks;
                    ticks += millisecond * TicksPerMillisecond;
                    if (ticks < MinTicks || ticks > MaxTicks)
                        throw new ArgumentException(/*SR.Arg_DateTimeRange*/);
                }
                else if (arg7 instanceof DateTimeKind) {
                    kind = arg7;
                    if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                        throw new ArgumentException("Argument_InvalidDateTimeKind");
                    }

                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                    ticks += millisecond * TicksPerMillisecond;
                    if (ticks < MinTicks || ticks > MaxTicks)
                        throw new ArgumentException(/*SR.Arg_DateTimeRange*/);
                }
                else {
                    throw new ArgumentException('Invalid arguments');
                }

                break;

            case 9:
                year = arguments[0];
                month = arguments[1];
                day = arguments[2];
                hour = arguments[3];
                minute = arguments[4];
                second = arguments[5];
                millisecond = arguments[6];
                calendar = arguments[7];
                kind = arguments[8];

                if (!(calendar instanceof Calendar))
                    throw new ArgumentNullException("calendar");

                if (millisecond < 0 || millisecond >= MillisPerSecond) {
                    throw new ArgumentOutOfRangeException(/*nameof(millisecond), SR.Format(SR.ArgumentOutOfRange_Range, 0, MillisPerSecond - 1)*/);
                }

                if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                    throw new ArgumentException("Argument_InvalidDateTimeKind");
                }

                ticks = calendar.toDateTime(year, month, day, hour, minute, second, 0).ticks;
                ticks += millisecond * TicksPerMillisecond;
                if (ticks < MinTicks || ticks > MaxTicks)
                    throw new ArgumentException(/*SR.Arg_DateTimeRange*/);

                break;

            default:
                throw new Error('Invalid arguments');
        }

        setValue(this, 'ticks', ticks);
        setValue(this, 'kind', kind);
    }

    /**
     * Gets the date component of this instance.
     */
    get date(): DateTime {
        const ticks = this.ticks;
        //return new DateTime(uint(ticks - int(ticks % TicksPerDay)), this.kind);
        return new DateTime(ticks - int(ticks % TicksPerDay), this.kind);
    }

    /**
     * Gets the day of the week represented by this instance.
     */
    get dayOfWeek(): DayOfWeek {
        return (int(this.ticks / TicksPerDay) + 1) % 7;
    }

    /**
     * Gets the day of the year represented by this instance.
     */
    get dayOfYear(): number {
        return getDatePart.call(this, DatePartDayOfYear);
    }

    /**
     * Gets the year component of the date represented by this instance.
     */
    get year(): number {
        return getDatePart.call(this, DatePartYear);
    }

    /**
     * Gets the month component of the date represented by this instance.
     */
    get month(): number {
        return getDatePart.call(this, DatePartMonth);
    }

    /**
     * Gets the day of the month represented by this instance.
     */
    get day(): number {
        return getDatePart.call(this, DatePartDay);
    }

    /**
     * Gets the hour component of the date represented by this instance.
     */
    get hour(): number {
        return int(this.ticks / TicksPerHour) % 24;
    }

    /**
     * Gets the minute component of the date represented by this instance.
     */
    get minute(): number {
        return int(this.ticks / TicksPerMinute) % 60;
    }

    /**
     * Gets the seconds component of the date represented by this instance.
     */
    get second(): number {
        return int(this.ticks / TicksPerSecond) % 60;
    }

    /**
     * Gets the milliseconds component of the date represented by this instance.
     */
    get millisecond(): number {
        return int(this.ticks / TicksPerMillisecond) % 1000;
    }

    /**
     * Gets the number of ticks that represent the date and time of this instance.
     */
    get ticks(): number {
        return getOrCreateValue(this, 'ticks', () => 0);
    }

    /**
     * Gets a value that indicates whether the time represented by this instance is based on local time, Coordinated Universal Time (UTC), or neither.
     */
    get kind(): DateTimeKind {
        return getOrCreateValue(this, 'kind', () => DateTimeKind.unspecified);
    }

    /**
     * Gets the time of day for this instance.
     */
    get timeOfDay(): TimeSpan {
        return new TimeSpan(this.ticks % TicksPerDay);
    }

    /**
     * Gets a DateTime object that is set to the current date and time on this computer, expressed as the local time.
     */
    static get now(): DateTime {
        const d = new Date();
        return new DateTime(
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds(),
            d.getMilliseconds(),
            DateTimeKind.local
        );
    }

    /**
     * Gets a DateTime object that is set to the current date and time on this computer, expressed as the Coordinated Universal Time (UTC).
     */
    static get utcNow(): DateTime {
        const d = new Date();
        return new DateTime(
            d.getUTCFullYear(),
            d.getUTCMonth() + 1,
            d.getUTCDate(),
            d.getUTCHours(),
            d.getUTCMinutes(),
            d.getUTCSeconds(),
            d.getUTCMilliseconds(),
            DateTimeKind.utc
        );
    }

    /**
     * Gets the current date.
     */
    static get today(): DateTime {
        return this.now.date;
    }

    /**
     * Represents the smallest possible value of DateTime.
     */
    static get minValue(): DateTime {
        return getOrCreateValue(this, 'minValue', () => new DateTime(MinTicks, DateTimeKind.unspecified));
    }

    /**
     * Represents the largest possible value of DateTime.
     */
    static get maxValue(): DateTime {
        return getOrCreateValue(this, 'maxValue', () => new DateTime(MaxTicks, DateTimeKind.unspecified));
    }

    /**
     * 
     */
    static get unixEpoch(): DateTime {
        return getOrCreateValue(this, 'unixEpoch', () => new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.utc));
    }

    /**
     * Returns a new DateTime that adds the value of the specified TimeSpan to the value of this instance.
     * @param value A positive or negative time interval.
     */
    add(value: TimeSpan): DateTime;
    /**
     * 
     * @param value
     * @param scale
     */
    add(value: number, scale: number): DateTime;
    add(value: TimeSpan | number, scale?: number): DateTime {
        if (value instanceof TimeSpan) {
            return this.addTicks(value.ticks);
        }
        else {
            const millis_double = value * scale! + (value >= 0 ? 0.5 : -0.5);

            if (millis_double <= -MaxMillis || millis_double >= MaxMillis)
                throw new ArgumentOutOfRangeException(/*nameof(value), SR.ArgumentOutOfRange_AddValue*/);

            return this.addTicks(int(millis_double) * TicksPerMillisecond);
        }
    }

    /**
     * Returns a new DateTime that adds the specified number of days to the value of this instance.
     * @param value A number of whole and fractional days. The value parameter can be negative or positive.
     */
    addDays(value: number): DateTime {
        return this.add(value, MillisPerDay);
    }

    /**
     * Returns a new DateTime that adds the specified number of years to the value of this instance.
     * @param value A number of years. The value parameter can be negative or positive.
     */
    addYears(value: number): DateTime {
        if (value < -10000 || value > 10000) {
            throw new Error('ArgumentOutOfRange_DateTimeBadYears');
        }

        return this.addMonths(value * 12);
    }

    /**
     * Returns a new DateTime that adds the specified number of months to the value of this instance.
     * @param months A number of months. The months parameter can be negative or positive.
     */
    addMonths(months: number): DateTime {
        if (months < -120000 || months > 120000)
            throw new Error('ArgumentOutOfRange_DateTimeBadMonths');

        let { year, month, day } = getDate.call(this);

        let i = month - 1 + months;
        if (i >= 0) {
            month = int(i % 12) + 1;
            year += int(i / 12);
        }
        else {
            month = 12 + (i + 1) % 12;
            year += int((i - 11) / 12);
        }

        if (year < 1 || year > 9999) {
            throw new Error('ArgumentOutOfRange_DateArithmetic');
        }
        const days = DateTime.daysInMonth(year, month);
        if (day > days) day = days;

        return new DateTime(dateToTicks(year, month, day) + int(this.ticks % TicksPerDay), this.kind);
    }

    /**
     * Returns a new DateTime that adds the specified number of hours to the value of this instance.
     * @param value A number of whole and fractional hours. The value parameter can be negative or positive.
     */
    addHours(value: number): DateTime {
        return this.add(value, MillisPerHour);
    }

    /**
     * Returns a new DateTime that adds the specified number of minutes to the value of this instance.
     * @param value A number of whole and fractional minutes. The value parameter can be negative or positive.
     */
    addMinutes(value: number): DateTime {
        return this.add(value, MillisPerMinute);
    }

    /**
     * Returns a new DateTime that adds the specified number of seconds to the value of this instance.
     * @param value A number of whole and fractional seconds. The value parameter can be negative or positive.
     */
    addSeconds(value: number): DateTime {
        return this.add(value, MillisPerSecond);
    }

    /**
     * Returns a new DateTime that adds the specified number of milliseconds to the value of this instance.
     * @param value A number of whole and fractional milliseconds. The value parameter can be negative or positive. Note that this value is rounded to the nearest integer.
     */
    addMilliseconds(value: number): DateTime {
        return this.add(value, 1);
    }

    /**
     * Returns a new DateTime that adds the specified number of ticks to the value of this instance.
     * @param value A number of 100-nanosecond ticks. The value parameter can be positive or negative.
     */
    addTicks(value: number): DateTime {
        const ticks = this.ticks;
        if (value > MaxTicks - ticks || value < MinTicks - ticks) {
            throw new ArgumentOutOfRangeException(/*nameof(value), SR.ArgumentOutOfRange_DateArithmetic*/);
        }
        return new DateTime(ticks + value, this.kind);
    }

    /**
     * Returns a new TimeSpan that subtracts the specified date and time from the value of this instance.
     * @param value The date and time value to subtract.
     */
    subtract(value: DateTime): TimeSpan;
    /**
     * Returns a new DateTime that subtracts the specified duration from the value of this instance.
     * @param value The time interval to subtract.
     */
    subtract(value: TimeSpan): DateTime;
    subtract(value: DateTime | TimeSpan): DateTime | TimeSpan {
        if (value instanceof DateTime) {
            return new TimeSpan(this.ticks - value.ticks);
        }

        const ticks = this.ticks;
        let valueTicks = value.ticks;
        if (ticks - MinTicks < valueTicks || ticks - MaxTicks > valueTicks) {
            throw new ArgumentOutOfRangeException(/*nameof(value), SR.ArgumentOutOfRange_DateArithmetic*/);
        }
        return new DateTime(ticks - valueTicks, this.kind);
    }

    /**
     * Converts the value of the current DateTime object to local time.
     * @param throwOnOverflow
     */
    toLocalTime(throwOnOverflow?: boolean): DateTime {
        if (this.kind == DateTimeKind.local) {
            return this;
        }

        const offset = getTimezoneOffset();
        const ticks = this.ticks + (offset * TicksPerMinute);
        if (ticks > MaxTicks) {
            if (throwOnOverflow)
                throw new ArgumentException(/*SR.Arg_ArgumentOutOfRangeException*/);
            else
                return new DateTime(MaxTicks, DateTimeKind.local);
        }

        if (ticks < MinTicks) {
            if (throwOnOverflow)
                throw new ArgumentException(/*SR.Arg_ArgumentOutOfRangeException*/);
            else
                return new DateTime(MinTicks, DateTimeKind.local);
        }

        return new DateTime(ticks, DateTimeKind.local);
    }

    /**
     * Converts the value of the current DateTime object to Coordinated Universal Time (UTC).
     */
    toUniversalTime(): DateTime {
        if (this.kind == DateTimeKind.utc) {
            return this;
        }

        const offset = getTimezoneOffset();
        const ticks = this.ticks - (offset * TicksPerMinute);
        return new DateTime(ticks, DateTimeKind.utc);
    }

    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the formatting conventions of the current culture.
     */
    toString(): string;
    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the specified format and the formatting conventions of the current culture.
     * @param format A standard or custom date and time format string.
     */
    toString(format: string): string;
    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the specified culture-specific format information.
     * @param provider An object that supplies culture-specific formatting information.
     */
    toString(provider: IFormatProvider): string;
    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the specified format and culture-specific format information.
     * @param format A standard or custom date and time format string.
     * @param provider An object that supplies culture-specific formatting information.
     */
    toString(format: string, provider: IFormatProvider): string;
    toString(/*format?: string | IFormatProvider, provider?: IFormatProvider*/): string {
        //return `${format}_${provider}`;
        return "";
    }

    /**
     * Compares the value of this instance to a specified object that contains a specified DateTime value, and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified DateTime value.
     * @param value A boxed object to compare, or null.
     */
    compareTo(value: any): number;
    /**
     * Compares the value of this instance to a specified DateTime value and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified DateTime value.
     * @param value The object to compare to the current instance.
     * @description To determine the relationship of t1 to t2, the Compare method compares the ticks property of t1 and t2 but ignores their kind property. Before comparing DateTime objects, ensure that the objects represent times in the same time zone.
     */
    compareTo(value: DateTime): number;
    compareTo(value: any): number {
        if (value == null) {
            return 1;
        }

        if (!(value instanceof DateTime)) {
            throw new ArgumentException(/*SR.Arg_MustBeDateTime*/);
        }

        const ticks1 = this.ticks;
        const ticks2 = value.ticks;
        if (ticks1 > ticks2) return 1;
        if (ticks1 < ticks2) return -1;
        return 0;
    }

    /**
     * Returns a value indicating whether this instance is equal to a specified object.
     * @param other The object to compare to this instance.
     */
    equals(other: any): boolean;
    /**
     * Returns a value indicating whether the value of this instance is equal to the value of the specified DateTime instance.
     * @param other The object to compare to this instance.
     * @description The current instance and value are equal if their Ticks property values are equal. Their Kind property values are not considered in the test for equality.
     */
    equals(other: DateTime): boolean;
    equals(other: any): boolean {
        if (other instanceof DateTime) {
            return DateTime.equals(this, other);
        }

        return false;
    }

    valueOf(): number {
        return this.ticks;
    }

    /**
     * Returns an indication whether the specified year is a leap year.
     * @param year A 4-digit year.
     */
    static isLeapYear(year: number): boolean {
        if (year < 1 || year > 9999) {
            throw new Error('ThrowArgumentOutOfRange_Year');
        }
        return (year & 3) == 0 && ((year & 15) == 0 || (year % 25) != 0);
    }

    /**
     * Returns the number of days in the specified month and year.
     * @param year The year.
     * @param month The month (a number ranging from 1 to 12).
     */
    static daysInMonth(year: number, month: number): number {
        if (month < 1 || month > 12)
            throw new Error('ArgumentOutOfRange_Month');

        // IsLeapYear checks the year argument
        const days = this.isLeapYear(year) ? s_daysToMonth366 : s_daysToMonth365;
        return days[month]! - days[month - 1]!;
    }

    /**
     * Creates a new DateTime object that has the same number of ticks as the specified DateTime, but is designated as either local time, 
     * Coordinated Universal Time (UTC), or neither, as indicated by the specified DateTimeKind value.
     * @param value A date and time.
     * @param kind One of the enumeration values that indicates whether the new object represents local time, UTC, or neither.
     */
    static specifyKind(value: DateTime, kind: DateTimeKind): DateTime {
        return new DateTime(value.ticks, kind);
    }

    /**
     * Returns a value indicating whether two DateTime instances have the same date and time value.
     * @param t1 The first object to compare.
     * @param t2 The second object to compare.
     */
    static equals(t1: DateTime, t2: DateTime): boolean {
        return t1.ticks == t2.ticks;
    }

    /**
     * Compares two instances of DateTime and returns an integer that indicates whether the first instance is earlier than, the same as, or later than the second instance.
     * @param t1 The first object to compare.
     * @param t2 The second object to compare.
     * @description To determine the relationship of t1 to t2, the Compare method compares the ticks property of t1 and t2 but ignores their kind property. Before comparing DateTime objects, ensure that the objects represent times in the same time zone.
     */
    static compare(t1: DateTime, t2: DateTime): number {
        const ticks1 = t1.ticks;
        const ticks2 = t2.ticks;
        if (ticks1 > ticks2) return 1;
        if (ticks1 < ticks2) return -1;
        return 0;
    }
}

function dateToTicks(year: number, month: number, day: number): number {
    if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) {
        throw new ArgumentOutOfRangeException('ThrowArgumentOutOfRange_BadYearMonthDay');
    }

    const days = DateTime.isLeapYear(year) ? s_daysToMonth366 : s_daysToMonth365;
    if (day > days[month]! - days[month - 1]!) {
        throw new ArgumentOutOfRangeException('ThrowArgumentOutOfRange_BadYearMonthDay');
    }

    const y = year - 1;
    const n = int(y * 365) + int(y / 4) - int(y / 100) + int(y / 400) + days[month - 1]! + day - 1;
    return int(n * TicksPerDay);
}

function timeToTicks(hour: number, minute: number, second: number): number {
    // TimeSpan.TimeToTicks is a family access function which does no error checking, 
    // so we need to put some error checking out here.

    if (uint(hour) >= 24 || uint(minute) >= 60 || uint(second) >= 60) {
        throw new ArgumentOutOfRangeException('ThrowArgumentOutOfRange_BadHourMinuteSecond');
    }

    return TimeSpanTimeToTicks(hour, minute, second);
}

export function getDate(this: DateTime) {
    const ticks = this.ticks;
    // n = number of days since 1/1/0001
    let n = int(ticks / TicksPerDay);
    // y400 = number of whole 400-year periods since 1/1/0001
    const y400 = int(n / DaysPer400Years);
    // n = day number within 400-year period
    n -= y400 * DaysPer400Years;
    // y100 = number of whole 100-year periods within 400-year period
    let y100 = int(n / DaysPer100Years);
    // Last 100-year period has an extra day, so decrement result if 4
    if (y100 == 4) y100 = 3;
    // n = day number within 100-year period
    n -= y100 * DaysPer100Years;
    // y4 = number of whole 4-year periods within 100-year period
    const y4 = int(n / DaysPer4Years);
    // n = day number within 4-year period
    n -= y4 * DaysPer4Years;
    // y1 = number of whole years within 4-year period
    let y1 = int(n / DaysPerYear);
    // Last year has an extra day, so decrement result if 4
    if (y1 == 4) y1 = 3;
    // compute year
    const year = y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1;
    // n = day number within year
    n -= y1 * DaysPerYear;
    // dayOfYear = n + 1;
    // Leap year calculation looks different from IsLeapYear since y1, y4,
    // and y100 are relative to year 1, not year 0
    const leapYear = y1 == 3 && (y4 != 24 || y100 == 3);
    const days = leapYear ? s_daysToMonth366 : s_daysToMonth365;
    // All months have less than 32 days, so n >> 5 is a good conservative
    // estimate for the month
    let m = (n >> 5) + 1;
    // m = 1-based month number
    while (n >= days[m]!) m++;
    // compute month and day
    const month = m;
    const day = n - days[m - 1]! + 1;

    return {
        year,
        month,
        day
    };
}

function getDatePart(this: DateTime, part: number): number {
    const ticks = this.ticks;
    // n = number of days since 1/1/0001
    let n = int(ticks / TicksPerDay);
    // y400 = number of whole 400-year periods since 1/1/0001
    const y400 = int(n / DaysPer400Years);
    // n = day number within 400-year period
    n -= y400 * DaysPer400Years;
    // y100 = number of whole 100-year periods within 400-year period
    let y100 = int(n / DaysPer100Years);
    // Last 100-year period has an extra day, so decrement result if 4
    if (y100 == 4) y100 = 3;
    // n = day number within 100-year period
    n -= y100 * DaysPer100Years;
    // y4 = number of whole 4-year periods within 100-year period
    const y4 = int(n / DaysPer4Years);
    // n = day number within 4-year period
    n -= y4 * DaysPer4Years;
    // y1 = number of whole years within 4-year period
    let y1 = int(n / DaysPerYear);
    // Last year has an extra day, so decrement result if 4
    if (y1 == 4) y1 = 3;
    // If year was requested, compute and return it
    if (part == DatePartYear) {
        return y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1;
    }
    // n = day number within year
    n -= y1 * DaysPerYear;
    // If day-of-year was requested, return it
    if (part == DatePartDayOfYear) return n + 1;
    // Leap year calculation looks different from IsLeapYear since y1, y4,
    // and y100 are relative to year 1, not year 0
    const leapYear = y1 == 3 && (y4 != 24 || y100 == 3);
    const days = leapYear ? s_daysToMonth366 : s_daysToMonth365;
    // All months have less than 32 days, so n >> 5 is a good conservative
    // estimate for the month
    let m = (n >> 5) + 1;
    // m = 1-based month number
    while (n >= days[m]!) m++;
    // If month was requested, return it
    if (part == DatePartMonth) return int(m);
    // Return 1-based day-of-month
    return int(n - days[m - 1]! + 1);
}



/*
 https://stackoverflow.com/questions/13360653/datetime-comparing-by-internal-ticks

 The dateData field is used like a bit field to store multiple values in a compact format.

The top two bits store the DateTimeKind, which has one of four possible values: Unspecified,
Local (internally there are two variants), or Utc. These four values can be stored in two bits.

The bottom 62 bits store the ticks. The operation x & 0x3fffffffffffffffL is a bitwise-and operation,
also sometimes called masking. It returns only the bits that correspond to the ticks.
 */