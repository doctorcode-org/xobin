import * as SR from '@xobin/core/internal/exception-resources';
import type { IFormatProvider, OutParam } from '@xobin/core';
import { formatDateOnlyTimeOnly } from './date_only_time_only_format';
import { tryWriteFormatted } from './format_buffer';
import { ArgumentException, ArgumentOutOfRangeException, getOrCreateValue, IComparable, IEquatable } from '@xobin/core';
import { Calendar } from './calendar';
import { DateTime } from './date_time';
import { DateTimeKind } from './date_time_kind';
import { DayOfWeek } from './day_of_week';
import { TimeOnly } from './time_only';
import { TicksPerDay, DaysTo10000 } from './var';

/**
 * Represents a date from January 1, 0001 through December 31, 9999.
 */
export class DateOnly implements IComparable<DateOnly>, IEquatable<DateOnly> {
    private readonly _dayNumber: number;

    /**
     * Creates the earliest representable date.
     */
    constructor();

    /**
     * Creates a date using the Gregorian calendar.
     * @param year The year, from 1 through 9999.
     * @param month The month, from 1 through 12.
     * @param day The day of the month.
     */
    constructor(year: number, month: number, day: number);

    /**
     * Creates a date using the specified calendar.
     * @param year The year in the specified calendar.
     * @param month The month in the specified calendar.
     * @param day The day of the month.
     * @param calendar The calendar used to interpret the date.
     */
    constructor(year: number, month: number, day: number, calendar: Calendar);

    constructor(year = 1, month = 1, day = 1, calendar?: Calendar) {
        const date = arguments.length === 4 ? new DateTime(year, month, day, calendar!) : new DateTime(year, month, day);
        this._dayNumber = Number(date.ticks / TicksPerDay);
    }

    /**
     * Gets the number of days since January 1, 0001 in the Gregorian calendar.
     */
    get dayNumber(): number {
        return this._dayNumber;
    }

    /**
     * Gets the year component of this date.
     */
    get year(): number {
        return this.equivalentDateTime.year;
    }

    /**
     * Gets the month component of this date.
     */
    get month(): number {
        return this.equivalentDateTime.month;
    }

    /**
     * Gets the day component of this date.
     */
    get day(): number {
        return this.equivalentDateTime.day;
    }

    /**
     * Gets the day of the year represented by this date.
     */
    get dayOfYear(): number {
        return this.equivalentDateTime.dayOfYear;
    }

    /**
     * Gets the day of the week represented by this date.
     */
    get dayOfWeek(): DayOfWeek {
        return this.equivalentDateTime.dayOfWeek;
    }

    private get equivalentDateTime(): DateTime {
        return new DateTime(BigInt(this._dayNumber) * TicksPerDay);
    }

    /**
     * Gets the earliest representable date.
     */
    static get minValue(): DateOnly {
        return getOrCreateValue(this, 'minValue', () => new DateOnly());
    }

    /**
     * Gets the latest representable date.
     */
    static get maxValue(): DateOnly {
        return getOrCreateValue(this, 'maxValue', () => new DateOnly(9999, 12, 31));
    }

    /**
     * Creates a date from the number of days since January 1, 0001.
     * @param dayNumber The day number, from 0 through 3652058.
     */
    static fromDayNumber(dayNumber: number): DateOnly {
        if (!Number.isInteger(dayNumber) || dayNumber < 0 || dayNumber >= DaysTo10000) {
            throw new ArgumentOutOfRangeException('dayNumber', dayNumber, SR.ArgumentOutOfRange_DayNumber);
        }
        return DateOnly.fromDateTime(new DateTime(BigInt(dayNumber) * TicksPerDay));
    }

    /**
     * Creates a date from the date component of a specified DateTime.
     * @param dateTime The date and time whose date component is used.
     */
    static fromDateTime(dateTime: DateTime): DateOnly {
        return new DateOnly(dateTime.year, dateTime.month, dateTime.day);
    }

    /**
     * Combines this date with the specified time of day.
     * @param time The time of day.
     */
    toDateTime(time: TimeOnly): DateTime;

    /**
     * Combines this date with the specified time of day and Kind.
     * @param time The time of day.
     * @param kind Indicates local time, UTC, or an unspecified kind.
     */
    toDateTime(time: TimeOnly, kind: DateTimeKind): DateTime;

    toDateTime(time: TimeOnly, kind: DateTimeKind = DateTimeKind.unspecified): DateTime {
        return new DateTime(BigInt(this._dayNumber) * TicksPerDay + time.ticks, kind);
    }

    /**
     * Adds the specified number of days to this date.
     * @param value The number of days to add; may be negative.
     */
    addDays(value: number): DateOnly {
        const day = this._dayNumber + value;
        if (!Number.isInteger(value) || day < 0 || day >= DaysTo10000) {
            throw new ArgumentOutOfRangeException('value', SR.ArgumentOutOfRange_AddValue);
        }
        return DateOnly.fromDayNumber(day);
    }

    /**
     * Adds the specified number of months, adjusting the day to the end of the month when necessary.
     * @param value The number of months to add; may be negative.
     */
    addMonths(value: number): DateOnly {
        return DateOnly.fromDateTime(this.equivalentDateTime.addMonths(value));
    }

    /**
     * Adds the specified number of years, adjusting February 29 when necessary.
     * @param value The number of years to add; may be negative.
     */
    addYears(value: number): DateOnly {
        return DateOnly.fromDateTime(this.equivalentDateTime.addYears(value));
    }

    /**
     * Compares this date with another date.
     * @param value The date to compare.
     * @returns A negative number, zero, or a positive number according to date order.
     */
    compareTo(value: DateOnly): number;

    /**
     * Compares this date with an object containing a DateOnly, or null.
     * @param value The object to compare; null is earlier than any date.
     */
    compareTo(value: unknown): number;

    compareTo(value: unknown): number {
        if (value == null) {
            return 1;
        }

        if (!(value instanceof DateOnly)) {
            throw new ArgumentException(SR.Arg_MustBeDateOnly);
        }

        return Math.sign(this._dayNumber - value._dayNumber);
    }

    /**
     * Determines whether this date and another date represent the same day.
     * @param value The date to compare.
     */
    equals(value: DateOnly): boolean;

    /**
     * Determines whether an object is a DateOnly representing the same day.
     * @param value The object to compare.
     */
    equals(value: unknown): boolean;

    equals(value: unknown): boolean {
        return value instanceof DateOnly && this._dayNumber === value._dayNumber;
    }

    /**
     * Gets the signed 32-bit hash code for this date.
     */
    getHashCode(): number {
        return this._dayNumber;
    }

    /**
     * Returns the day number for JavaScript relational comparisons.
     */
    valueOf(): number {
        return this._dayNumber;
    }

    /**
     * Deconstructs this date into its year, month, and day components.
     */
    deconstruct(): [number, number, number] {
        return [this.year, this.month, this.day];
    }
    /**
     * Converts this instance using the current culture's short date format.
     */
    toString(): string;

    /**
     * Converts this instance using a standard or custom date format.
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
        return formatDateOnlyTimeOnly(this.equivalentDateTime, format, provider, true);
    }

    /**
     * Converts this instance to a long date string using the current culture.
     */
    toLongDateString(): string {
        return this.toString('D');
    }

    /**
     * Converts this instance to a short date string using the current culture.
     */
    toShortDateString(): string {
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
        return tryWriteFormatted(emit => formatDateOnlyTimeOnly(this.equivalentDateTime, format, provider, true, true, emit), destination, charsWritten, true);
    }

}
