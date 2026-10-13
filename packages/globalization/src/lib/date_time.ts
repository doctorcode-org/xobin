import { TicksMustBeBigInt, InvalidArguments } from './javascript_exception_resources';
import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import * as SR from '@xobin/core/internal/exception-resources';
import {
    MinTicks,
    MaxTicks,
    TicksPerDay,
    MillisPerSecond,
    TicksPerMillisecond,
    TicksPerMicrosecond,
    DaysPer400Years,
    DaysPer100Years,
    DaysPer4Years,
    DaysPerYear,
    DaysTo1601,
    DaysTo1899,
    MaxMillis,
    TicksPerHour,
    TicksPerMinute,
    TicksPerSecond,
    DatePartYear,
    DatePartDayOfYear,
    DatePartMonth,
    DatePartDay
} from "./var";
import { Calendar } from "./calendar";
import { TimeSpan, timeToTicks as TimeSpanTimeToTicks } from "./time_span";
import { DayOfWeek } from './day_of_week';
import { DateTimeKind } from './date_time_kind';
import { DateOnly } from './date_only';
import { TimeOnly } from './time_only';
import { DateTimeFormat } from './date_time_format';
import { localTimeOffset } from './local_time_zone';
import {
    ArgumentOutOfRangeException,
    ArgumentException,
    getOrCreateValue,
    setValue,
    uint,
    int,
    IFormatProvider,
    ArgumentNullException,
    OverflowException,
    IComparable,
    IEquatable,
    InvalidCastException,
    TypeCode,
    OutParam
} from '@xobin/core';


const s_daysToMonth365 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const s_daysToMonth366 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
const MillisecondsPerDay = 86400000;
const DoubleDateOffset = BigInt(DaysTo1899) * TicksPerDay;
const OADateMinAsTicks = BigInt(DaysPer100Years - DaysPerYear) * TicksPerDay;
const OADateMinAsDouble = -657435;
const OADateMaxAsDouble = 2958466;
const TicksMask = 0x3fffffffffffffffn;
const TicksCeiling = 0x4000000000000000n;
const KindUtc = 0x4000000000000000n;
const KindLocal = 0x8000000000000000n;
const FileTimeOffset = BigInt(DaysTo1601) * TicksPerDay;
const ambiguousLocalDaylight = new WeakSet<DateTime>();

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
     * @param ticks A date and time expressed in 100-nanosecond intervals since January 1, 0001.
     */
    constructor(ticks: bigint);

    /**
     * Initializes a new instance of the DateTime structure to a specified number of ticks and to Coordinated Universal Time (UTC) or local time.
     * @param ticks A date and time expressed in the number of 100-nanosecond intervals that have elapsed since January 1, 0001 at 00:00:00.000 in the Gregorian calendar.
     * @param kind One of the enumeration values that indicates whether ticks specifies a local time, Coordinated Universal Time (UTC), or neither.
     */
    constructor(ticks: bigint, kind: DateTimeKind);
    constructor(date: DateOnly, time: TimeOnly);
    constructor(date: DateOnly, time: TimeOnly, kind: DateTimeKind);

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
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, microsecond: number);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, microsecond: number, kind: DateTimeKind);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, microsecond: number, calendar: Calendar);
    constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, microsecond: number, calendar: Calendar, kind: DateTimeKind);
    constructor() {

        let ticks: bigint,
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
                if (typeof ticks !== 'bigint') throw new ArgumentException(TicksMustBeBigInt);
                if (ticks < MinTicks || ticks > MaxTicks)
                    throwTicksOutOfRange();

                break;

            case 2:
                if (arguments[0] instanceof DateOnly && arguments[1] instanceof TimeOnly) {
                    ticks = BigInt(arguments[0].dayNumber) * TicksPerDay + arguments[1].ticks;
                    break;
                }
                ticks = arguments[0];
                kind = arguments[1];
                if (typeof ticks !== 'bigint') throw new ArgumentException(TicksMustBeBigInt);

                if (ticks < MinTicks || ticks > MaxTicks) {
                    throwTicksOutOfRange();
                }
                if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                    throwInvalidKind();
                }

                break;

            case 3:
                if (arguments[0] instanceof DateOnly && arguments[1] instanceof TimeOnly) {
                    kind = arguments[2];
                    if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) throwInvalidKind();
                    ticks = BigInt(arguments[0].dayNumber) * TicksPerDay + arguments[1].ticks;
                    break;
                }
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
                        throwInvalidKind();
                    }

                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                }
                else if (typeof arg6 === 'number') {
                    millisecond = arg6;
                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                    checkMillisecond(millisecond);
                    ticks += BigInt(millisecond) * TicksPerMillisecond;
                }
                else if (arg6 == null) {
                    throw new ArgumentNullException('calendar');
                }
                else {
                    throw new ArgumentException(InvalidArguments);
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

                let arg7: DateTimeKind | Calendar | number = arguments[7];
                if (arg7 instanceof Calendar) {
                    calendar = arg7;

                    ticks = calendar.toDateTime(year, month, day, hour, minute, second, millisecond).ticks;
                }
                else if (arg7 instanceof DateTimeKind) {
                    kind = arg7;
                    if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                        throwInvalidKind();
                    }

                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                    checkMillisecond(millisecond);
                    ticks += BigInt(millisecond) * TicksPerMillisecond;
                }
                else if (typeof arg7 === 'number') {
                    ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second);
                    checkMillisecond(millisecond);
                    ticks += BigInt(millisecond) * TicksPerMillisecond;
                    checkMicrosecond(arg7);
                    ticks += BigInt(arg7) * TicksPerMicrosecond;
                }
                else if (arg7 == null) {
                    throw new ArgumentNullException('calendar');
                }
                else {
                    throw new ArgumentException(InvalidArguments);
                }

                break;

            case 9:
                if (typeof arguments[7] === 'number') {
                    const microsecond: number = arguments[7];
                    const extra: DateTimeKind | Calendar = arguments[8];
                    if (extra == null) throw new ArgumentNullException('calendar');
                    if (extra instanceof Calendar) {
                        checkMillisecond(arguments[6]);
                        ticks = extra.toDateTime(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]).ticks;
                    }
                    else if (extra instanceof DateTimeKind) {
                        if (extra.value < DateTimeKind.unspecified.value || extra.value > DateTimeKind.local.value)
                            throwInvalidKind();
                        ticks = dateToTicks(arguments[0], arguments[1], arguments[2])
                            + timeToTicks(arguments[3], arguments[4], arguments[5]);
                        checkMillisecond(arguments[6]);
                        ticks += BigInt(arguments[6]) * TicksPerMillisecond;
                        kind = extra;
                    }
                    else throw new ArgumentException(InvalidArguments);
                    checkMicrosecond(microsecond);
                    ticks += BigInt(microsecond) * TicksPerMicrosecond;
                    break;
                }
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

                checkMillisecond(millisecond);

                if (kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value) {
                    throwInvalidKind();
                }

                ticks = calendar.toDateTime(year, month, day, hour, minute, second, millisecond).ticks;

                break;

            case 10: {
                const microsecond: number = arguments[7];
                calendar = arguments[8];
                kind = arguments[9];
                if (!(calendar instanceof Calendar)) throw new ArgumentNullException('calendar');
                checkMillisecond(arguments[6]);
                if (!(kind instanceof DateTimeKind) || kind.value < DateTimeKind.unspecified.value || kind.value > DateTimeKind.local.value)
                    throwInvalidKind();
                ticks = calendar.toDateTime(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]).ticks;
                checkMicrosecond(microsecond);
                ticks += BigInt(microsecond) * TicksPerMicrosecond;
                break;
            }

            default:
                throw new Error(InvalidArguments);
        }

        setValue(this, 'ticks', ticks);
        setValue(this, 'kind', kind);
    }

    /**
     * Gets the date component of this instance.
     */
    get date(): DateTime {
        const ticks = this.ticks;
        return preserveLocalKind(this, ticks - ticks % TicksPerDay);
    }

    /**
     * Gets the day of the week represented by this instance.
     */
    get dayOfWeek(): DayOfWeek {
        return Number((this.ticks / TicksPerDay + 1n) % 7n);
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
        return Number((this.ticks / TicksPerHour) % 24n);
    }

    /**
     * Gets the minute component of the date represented by this instance.
     */
    get minute(): number {
        return Number((this.ticks / TicksPerMinute) % 60n);
    }

    /**
     * Gets the seconds component of the date represented by this instance.
     */
    get second(): number {
        return Number((this.ticks / TicksPerSecond) % 60n);
    }

    /**
     * Gets the milliseconds component of the date represented by this instance.
     */
    get millisecond(): number {
        return Number((this.ticks / TicksPerMillisecond) % 1000n);
    }

    get microsecond(): number {
        return Number((this.ticks / TicksPerMicrosecond) % 1000n);
    }

    get nanosecond(): number {
        return Number(this.ticks % TicksPerMicrosecond) * 100;
    }

    /**
     * Gets the number of ticks that represent the date and time of this instance.
     */
    get ticks(): bigint {
        return getOrCreateValue(this, 'ticks', () => 0n);
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
        return DateTime.utcNow.toLocalTime();
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
    add(value: TimeSpan): DateTime {
        return this.addTicks(value.ticks);
    }

    /**
     * Returns a new DateTime that adds the specified number of days to the value of this instance.
     * @param value A number of whole and fractional days. The value parameter can be negative or positive.
     */
    addDays(value: number): DateTime {
        return addUnits(this, value, TicksPerDay);
    }

    /**
     * Returns a new DateTime that adds the specified number of years to the value of this instance.
     * @param value A number of years. The value parameter can be negative or positive.
     */
    addYears(value: number): DateTime {
        if (value < -10000 || value > 10000) {
            throw new ArgumentOutOfRangeException('value', SR.ArgumentOutOfRange_DateTimeBadYears);
        }

        let { year, month, day } = getDate.call(this);
        year += value;
        if (year < 1 || year > 9999) {
            throw new ArgumentOutOfRangeException('value', SR.ArgumentOutOfRange_DateArithmetic);
        }
        if (month === 2 && day === 29 && !DateTime.isLeapYear(year)) {
            day = 28;
        }
        return preserveLocalKind(this, dateToTicks(year, month, day) + this.ticks % TicksPerDay);
    }

    /**
     * Returns a new DateTime that adds the specified number of months to the value of this instance.
     * @param months A number of months. The months parameter can be negative or positive.
     */
    addMonths(months: number): DateTime {
        if (months < -120000 || months > 120000)
            throw new ArgumentOutOfRangeException('months', SR.ArgumentOutOfRange_DateTimeBadMonths);

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
            throw new ArgumentOutOfRangeException('months', SR.ArgumentOutOfRange_DateArithmetic);
        }
        const days = DateTime.daysInMonth(year, month);
        if (day > days) day = days;

        return preserveLocalKind(this, dateToTicks(year, month, day) + this.ticks % TicksPerDay);
    }

    /**
     * Returns a new DateTime that adds the specified number of hours to the value of this instance.
     * @param value A number of whole and fractional hours. The value parameter can be negative or positive.
     */
    addHours(value: number): DateTime {
        return addUnits(this, value, TicksPerHour);
    }

    /**
     * Returns a new DateTime that adds the specified number of minutes to the value of this instance.
     * @param value A number of whole and fractional minutes. The value parameter can be negative or positive.
     */
    addMinutes(value: number): DateTime {
        return addUnits(this, value, TicksPerMinute);
    }

    /**
     * Returns a new DateTime that adds the specified number of seconds to the value of this instance.
     * @param value A number of whole and fractional seconds. The value parameter can be negative or positive.
     */
    addSeconds(value: number): DateTime {
        return addUnits(this, value, TicksPerSecond);
    }

    /**
     * Returns a new DateTime that adds the specified number of milliseconds to the value of this instance.
     * @param value A number of whole and fractional milliseconds. The value parameter can be negative or positive.
     */
    addMilliseconds(value: number): DateTime {
        return addUnits(this, value, TicksPerMillisecond);
    }

    addMicroseconds(value: number): DateTime {
        return addUnits(this, value, TicksPerMicrosecond);
    }

    /**
     * Returns a new DateTime that adds the specified number of ticks to the value of this instance.
     * @param value A number of 100-nanosecond ticks. The value parameter can be positive or negative.
     */
    addTicks(value: bigint): DateTime {
        const ticks = this.ticks;
        if (value > MaxTicks - ticks || value < MinTicks - ticks) {
            throw new ArgumentOutOfRangeException('value', SR.ArgumentOutOfRange_DateArithmetic);
        }
        return preserveLocalKind(this, ticks + value);
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
        const valueTicks = value.ticks;
        if (ticks - MinTicks < valueTicks || ticks - MaxTicks > valueTicks) {
            throw new ArgumentOutOfRangeException('value', SR.ArgumentOutOfRange_DateArithmetic);
        }
        return preserveLocalKind(this, ticks - valueTicks);
    }

    /**
     * Converts the value of the current DateTime object to local time.
     * @param throwOnOverflow
     */
    toLocalTime(throwOnOverflow?: boolean): DateTime {
        if (this.kind.value === DateTimeKind.local.value) {
            return this;
        }

        const offset = localTimeOffset(this.ticks, true);
        const ticks = this.ticks + offset.ticks;
        if (ticks > MaxTicks) {
            if (throwOnOverflow)
                throw new ArgumentException(SR.ArgumentOutOfRange_DateArithmetic);
            else
                return new DateTime(MaxTicks, DateTimeKind.local);
        }

        if (ticks < MinTicks) {
            if (throwOnOverflow)
                throw new ArgumentException(SR.ArgumentOutOfRange_DateArithmetic);
            else
                return new DateTime(MinTicks, DateTimeKind.local);
        }

        const result = new DateTime(ticks, DateTimeKind.local);
        if (offset.ambiguousDaylight) ambiguousLocalDaylight.add(result);
        return result;
    }

    /**
     * Converts the value of the current DateTime object to Coordinated Universal Time (UTC).
     */
    toUniversalTime(): DateTime {
        if (this.kind.value === DateTimeKind.utc.value) {
            return this;
        }

        const ticks = this.ticks - localTimeOffset(this.ticks, false, ambiguousLocalDaylight.has(this)).ticks;
        if (ticks < MinTicks) return new DateTime(MinTicks, DateTimeKind.utc);
        if (ticks > MaxTicks) return new DateTime(MaxTicks, DateTimeKind.utc);
        return new DateTime(ticks, DateTimeKind.utc);
    }

    /**
     * Converts this value to an OLE Automation date.
     */
    toOADate(): number {
        let ticks = this.ticks;
        if (ticks === 0n) return 0;
        if (ticks < TicksPerDay) ticks += DoubleDateOffset;
        if (ticks < OADateMinAsTicks) {
            throw new OverflowException(SR.Arg_OleAutDateInvalid);
        }

        let milliseconds = (ticks - DoubleDateOffset) / TicksPerMillisecond;
        if (milliseconds < 0n) {
            const fraction = milliseconds % BigInt(MillisecondsPerDay);
            if (fraction !== 0n) {
                milliseconds -= (BigInt(MillisecondsPerDay) + fraction) * 2n;
            }
        }
        return Number(milliseconds) / MillisecondsPerDay;
    }

    /**
     * Serializes this value, including its DateTimeKind, into a signed 64-bit integer.
     */
    toBinary(): bigint {
        if (this.kind.value === DateTimeKind.local.value) {
            const offsetTicks = localOffsetTicks(this);
            let storedTicks = this.ticks - offsetTicks;
            if (storedTicks < 0n) storedTicks += TicksCeiling;
            return BigInt.asIntN(64, storedTicks | KindLocal);
        }
        return BigInt.asIntN(64, this.ticks | BigInt(this.kind.value) << 62n);
    }

    /**
     * Converts this value to a Windows file time, treating unspecified values as local.
     */
    toFileTime(): bigint {
        return this.toUniversalTime().toFileTimeUtc();
    }

    /**
     * Converts this value to a Windows file time, treating unspecified values as UTC.
     */
    toFileTimeUtc(): bigint {
        const ticks = this.kind.value === DateTimeKind.local.value ? this.toUniversalTime().ticks : this.ticks;
        const fileTime = ticks - FileTimeOffset;
        if (fileTime < 0n) {
            throw new ArgumentOutOfRangeException(undefined, SR.ArgumentOutOfRange_FileTimeInvalid);
        }
        return fileTime;
    }

    getTypeCode(): TypeCode { return TypeCode.dateTime; }

    deconstruct(): [DateOnly, TimeOnly];
    deconstruct(parts: 'date'): [number, number, number];
    deconstruct(parts?: 'date'): [DateOnly, TimeOnly] | [number, number, number] {
        return parts === 'date' ? [this.year, this.month, this.day]
            : [DateOnly.fromDateTime(this), TimeOnly.fromDateTime(this)];
    }

    toBoolean(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Boolean'); }
    toChar(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Char'); }
    toSByte(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('SByte'); }
    toByte(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Byte'); }
    toInt16(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Int16'); }
    toUInt16(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('UInt16'); }
    toInt32(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Int32'); }
    toUInt32(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('UInt32'); }
    toInt64(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Int64'); }
    toUInt64(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('UInt64'); }
    toSingle(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Single'); }
    toDouble(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Double'); }
    toDecimal(_provider?: IFormatProvider | null): never { return invalidDateTimeCast('Decimal'); }
    toDateTime(_provider?: IFormatProvider | null): DateTime { return this; }

    /** JavaScript constructor tokens represent CLR Type values. */
    toType(conversionType: typeof DateTime, provider?: IFormatProvider | null): DateTime;
    toType(conversionType: Function | null, provider?: IFormatProvider | null): unknown;
    toType(conversionType: Function | null, provider?: IFormatProvider | null): unknown {
        if (conversionType == null) throw new ArgumentNullException('conversionType');
        if (conversionType === DateTime || conversionType === Object) return this;
        if (conversionType === String) return provider ? this.toString(provider) : this.toString();
        if (conversionType === Boolean) return this.toBoolean(provider);
        if (conversionType === Number) return this.toDouble(provider);
        if (conversionType === BigInt) return this.toInt64(provider);
        throw new InvalidCastException(formatExceptionResource(SR.InvalidCast_FromTo, 'DateTime', conversionType.name));
    }

    /** A SerializationInfo adapter receives the exact unsigned 64-bit dateData. */
    getObjectData(info: { addValue(name: string, value: bigint): void } | null, _context?: unknown): void {
        if (info == null) throw new ArgumentNullException('info');
        const kind = ambiguousLocalDaylight.has(this) ? 3n : BigInt(this.kind.value);
        info.addValue('ticks', this.ticks);
        info.addValue('dateData', this.ticks | kind << 62n);
    }

    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the formatting conventions of the current culture.
     */
    toString(): string;
    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the specified format and the formatting conventions of the current culture.
     * @param format A standard or custom date and time format string.
     */
    toString(format: string | null): string;
    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the specified culture-specific format information.
     * @param provider An object that supplies culture-specific formatting information.
     */
    toString(provider: IFormatProvider | null): string;
    /**
     * Converts the value of the current DateTime object to its equivalent string representation using the specified format and culture-specific format information.
     * @param format A standard or custom date and time format string.
     * @param provider An object that supplies culture-specific formatting information.
     */
    toString(format: string | null, provider: IFormatProvider | null): string;
    toString(format?: string | IFormatProvider | null, provider?: IFormatProvider | null): string {
        return typeof format === 'object' && format !== null
            ? DateTimeFormat.format(this, null, format) : DateTimeFormat.format(this, format, provider);
    }

    /**
     * Converts this instance to a long date string using the current culture.
     */
    toLongDateString(): string {
        return this.toString('D');
    }

    /**
     * Converts this instance to a long time string using the current culture.
     */
    toLongTimeString(): string {
        return this.toString('T');
    }

    /**
     * Converts this instance to a short date string using the current culture.
     */
    toShortDateString(): string {
        return this.toString('d');
    }

    /**
     * Converts this instance to a short time string using the current culture.
     */
    toShortTimeString(): string {
        return this.toString('t');
    }

    /**
     * Returns all standard string representations using the current culture.
     */
    getDateTimeFormats(): string[];

    /**
     * Returns all standard string representations using the specified format provider.
     * @param provider An object that supplies culture-specific formatting information.
     */
    getDateTimeFormats(provider: IFormatProvider | null): string[];

    /**
     * Returns all string representations associated with a standard format specifier.
     * @param format A single standard date and time format specifier.
     * @param provider An object that supplies culture-specific formatting information.
     */
    getDateTimeFormats(format: string, provider?: IFormatProvider | null): string[];
    getDateTimeFormats(format?: string | IFormatProvider | null, provider?: IFormatProvider | null): string[] {
        return typeof format === 'object' && format !== null
            ? DateTimeFormat.getAllFormats(this, null, format) : DateTimeFormat.getAllFormats(this, format, provider);
    }

    /**
     * Tries to format this instance into a UTF-16 character buffer or UTF-8 byte buffer.
     * @param destination The buffer that receives the formatted date and time.
     * @param charsWritten Receives the number of UTF-16 code units or UTF-8 bytes written; zero if the buffer is too small.
     * @param format A standard or custom date and time format string.
     * @param provider An object that supplies culture-specific formatting information.
     * @returns True if the destination has enough space; otherwise, false.
     */
    tryFormat(destination: string[] | Uint16Array | Uint8Array, charsWritten: OutParam<number>, format?: string | null, provider?: IFormatProvider | null): boolean {
        const text = DateTimeFormat.format(this, format, provider);
        if (destination instanceof Uint8Array) {
            const bytes = new TextEncoder().encode(text);
            if (bytes.length > destination.length) { charsWritten.result = 0; return false; }
            destination.set(bytes);
            charsWritten.result = bytes.length;
        } else {
            if (text.length > destination.length) { charsWritten.result = 0; return false; }
            for (let i = 0; i < text.length; i++) {
                if (destination instanceof Uint16Array) destination[i] = text.charCodeAt(i);
                else destination[i] = text[i]!;
            }
            charsWritten.result = text.length;
        }
        return true;
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
            throw new ArgumentException(SR.Arg_MustBeDateTime);
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

    /**
     * Returns the hash code for this instance.
     */
    getHashCode(): number {
        const ticks = this.ticks;
        return Number(BigInt.asIntN(32, ticks ^ (ticks >> 32n)));
    }

    valueOf(): bigint {
        return this.ticks;
    }

    /**
     * Returns an indication whether the specified year is a leap year.
     * @param year A 4-digit year.
     */
    static isLeapYear(year: number): boolean {
        if (year < 1 || year > 9999) {
            throw new ArgumentOutOfRangeException('year',
                SR.ArgumentOutOfRange_Year);
        }
        return (year & 3) == 0 && ((year & 15) == 0 || (year % 25) != 0);
    }

    /**
     * Indicates whether this instance is within the daylight saving time range for the current time zone.
     */
    isDaylightSavingTime(): boolean {
        if (this.kind.value === DateTimeKind.utc.value) {
            return false;
        }

        return localTimeOffset(this.ticks, false, ambiguousLocalDaylight.has(this)).daylight;
    }

    /**
     * Returns the number of days in the specified month and year.
     * @param year The year.
     * @param month The month (a number ranging from 1 to 12).
     */
    static daysInMonth(year: number, month: number): number {
        if (month < 1 || month > 12)
            throw new ArgumentOutOfRangeException('month', month,
                SR.ArgumentOutOfRange_Month);

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
     * Returns a DateTime equivalent to the specified OLE Automation date.
     */
    static fromOADate(value: number): DateTime {
        if (!(value < OADateMaxAsDouble) || !(value > OADateMinAsDouble)) {
            throw new ArgumentException(SR.Arg_OleAutDateInvalid);
        }

        let milliseconds = Math.trunc(value * MillisecondsPerDay + (value >= 0 ? 0.5 : -0.5));
        if (milliseconds < 0) {
            milliseconds -= (milliseconds % MillisecondsPerDay) * 2;
        }
        milliseconds += Number(DoubleDateOffset / TicksPerMillisecond);
        if (milliseconds < 0 || milliseconds > MaxMillis) {
            throw new ArgumentException(SR.Arg_OleAutDateScale);
        }
        return new DateTime(BigInt(milliseconds) * TicksPerMillisecond, DateTimeKind.unspecified);
    }

    /**
     * Deserializes a value produced by toBinary.
     */
    static fromBinary(dateData: bigint): DateTime {
        const data = BigInt.asUintN(64, dateData);
        if ((data & KindLocal) !== 0n) {
            let ticks = data & TicksMask;
            if (ticks > TicksCeiling - TicksPerDay) ticks -= TicksCeiling;

            const boundary = ticks < MinTicks ? DateTime.minValue : ticks > MaxTicks ? DateTime.maxValue : new DateTime(ticks, DateTimeKind.utc);
            const offset = localTimeOffset(boundary.ticks, true);
            ticks += offset.ticks;
            if (ticks < 0n) ticks += TicksPerDay;
            if (ticks > MaxTicks) throwBadBinaryData();
            const result = new DateTime(ticks, DateTimeKind.local);
            if (offset.ambiguousDaylight) ambiguousLocalDaylight.add(result);
            return result;
        }

        const ticks = data & TicksMask;
        if (ticks > MaxTicks) throwBadBinaryData();
        const kind = (data & KindUtc) !== 0n ? DateTimeKind.utc : DateTimeKind.unspecified;
        return new DateTime(ticks, kind);
    }

    /**
     * Creates a local DateTime from a Windows file time.
     */
    static fromFileTime(fileTime: bigint): DateTime {
        return DateTime.fromFileTimeUtc(fileTime).toLocalTime();
    }

    /**
     * Creates a UTC DateTime from a Windows file time.
     */
    static fromFileTimeUtc(fileTime: bigint): DateTime {
        if (fileTime < 0n || fileTime > MaxTicks - FileTimeOffset) {
            throw new ArgumentOutOfRangeException('fileTime', SR.ArgumentOutOfRange_FileTimeInvalid);
        }
        return new DateTime(fileTime + FileTimeOffset, DateTimeKind.utc);
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

function addUnits(date: DateTime, value: number, scale: bigint): DateTime {
    if (Math.abs(value) > Number(MaxTicks / scale))
        throw new ArgumentOutOfRangeException('value', SR.ArgumentOutOfRange_AddValue);
    if (Number.isNaN(value))
        return date.addTicks(0n);
    const whole = Math.trunc(value);
    const ticks = BigInt(whole) * scale + BigInt(Math.trunc((value - whole) * Number(scale)));
    return date.addTicks(ticks);
}

function dateToTicks(year: number, month: number, day: number): bigint {
    if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) {
        throwInvalidDate();
    }

    const days = DateTime.isLeapYear(year) ? s_daysToMonth366 : s_daysToMonth365;
    if (day > days[month]! - days[month - 1]!) {
        throwInvalidDate();
    }

    const y = year - 1;
    const n = int(y * 365) + int(y / 4) - int(y / 100) + int(y / 400) + days[month - 1]! + day - 1;
    return BigInt(n) * TicksPerDay;
}

function timeToTicks(hour: number, minute: number, second: number): bigint {
    // TimeSpan.TimeToTicks is a family access function which does no error checking, 
    // so we need to put some error checking out here.

    if (uint(hour) >= 24 || uint(minute) >= 60 || uint(second) >= 60) {
        throwInvalidTime();
    }

    return TimeSpanTimeToTicks(hour, minute, second);
}

function localOffsetTicks(value: DateTime): bigint {
    return localTimeOffset(value.ticks, false, ambiguousLocalDaylight.has(value)).ticks;
}

function throwTicksOutOfRange(): never {
    throw new ArgumentOutOfRangeException('ticks',
        SR.ArgumentOutOfRange_DateTimeBadTicks);
}

function throwInvalidKind(): never {
    throw new ArgumentException(SR.Argument_InvalidDateTimeKind, 'kind');
}

function throwBadBinaryData(): never {
    throw new ArgumentException(
        SR.Argument_DateTimeBadBinaryData,
        'dateData');
}

function throwInvalidDate(): never {
    throw new ArgumentOutOfRangeException(undefined,
        SR.ArgumentOutOfRange_BadYearMonthDay);
}

function throwInvalidTime(): never {
    throw new ArgumentOutOfRangeException(undefined,
        SR.ArgumentOutOfRange_BadHourMinuteSecond);
}

function checkMillisecond(value: number): void {
    if (!Number.isInteger(value) || value < 0 || value >= MillisPerSecond) {
        throw new ArgumentOutOfRangeException('millisecond',
            formatExceptionResource(SR.ArgumentOutOfRange_Range, 0, 999));
    }
}

function checkMicrosecond(value: number): void {
    if (!Number.isInteger(value) || value < 0 || value >= 1000) {
        throw new ArgumentOutOfRangeException('microsecond',
            formatExceptionResource(SR.ArgumentOutOfRange_Range, 0, 999));
    }
}

export function getDate(this: DateTime) {
    const ticks = this.ticks;
    // n = number of days since 1/1/0001
    let n = Number(ticks / TicksPerDay);
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
    let n = Number(ticks / TicksPerDay);
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

function preserveLocalKind(source: DateTime, ticks: bigint): DateTime {
    const result = new DateTime(ticks, source.kind);
    if (ambiguousLocalDaylight.has(source)) ambiguousLocalDaylight.add(result);
    return result;
}

function invalidDateTimeCast(type: string): never {
    throw new InvalidCastException(formatExceptionResource(SR.InvalidCast_FromTo, 'DateTime', type));
}

/** Internal formatter access preserves the ambiguous local DST flag. */
export function getDateTimeOffset(value: DateTime): bigint {
    return localTimeOffset(value.ticks, false, ambiguousLocalDaylight.has(value)).ticks;
}
