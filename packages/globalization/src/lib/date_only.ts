import { ArgumentException, ArgumentOutOfRangeException, getOrCreateValue, IComparable, IEquatable } from '@xobin/core';
import { Calendar } from './calendar';
import { DateTime } from './date_time';
import { DateTimeKind } from './date_time_kind';
import { DayOfWeek } from './day_of_week';
import { TimeOnly } from './time_only';
import { TicksPerDay, DaysTo10000 } from './var';

/** A Gregorian date with no time of day or time-zone Kind. */
export class DateOnly implements IComparable<DateOnly>, IEquatable<DateOnly> {
    private readonly _dayNumber: number;

    constructor();
    constructor(year: number, month: number, day: number);
    constructor(year: number, month: number, day: number, calendar: Calendar);
    constructor(year = 1, month = 1, day = 1, calendar?: Calendar) {
        const date = arguments.length === 4 ? new DateTime(year, month, day, calendar!) : new DateTime(year, month, day);
        this._dayNumber = Number(date.ticks / TicksPerDay);
    }

    get dayNumber(): number { return this._dayNumber; }
    get year(): number { return this.equivalentDateTime.year; }
    get month(): number { return this.equivalentDateTime.month; }
    get day(): number { return this.equivalentDateTime.day; }
    get dayOfYear(): number { return this.equivalentDateTime.dayOfYear; }
    get dayOfWeek(): DayOfWeek { return this.equivalentDateTime.dayOfWeek; }
    private get equivalentDateTime(): DateTime { return new DateTime(BigInt(this._dayNumber) * TicksPerDay); }

    static get minValue(): DateOnly { return getOrCreateValue(this, 'minValue', () => new DateOnly()); }
    static get maxValue(): DateOnly { return getOrCreateValue(this, 'maxValue', () => new DateOnly(9999, 12, 31)); }

    static fromDayNumber(dayNumber: number): DateOnly {
        if (!Number.isInteger(dayNumber) || dayNumber < 0 || dayNumber >= DaysTo10000) {
            throw new ArgumentOutOfRangeException('dayNumber', dayNumber, 'Day number must be between 0 and DateOnly.MaxValue.DayNumber.');
        }
        return DateOnly.fromDateTime(new DateTime(BigInt(dayNumber) * TicksPerDay));
    }
    static fromDateTime(dateTime: DateTime): DateOnly { return new DateOnly(dateTime.year, dateTime.month, dateTime.day); }
    toDateTime(time: TimeOnly, kind: DateTimeKind = DateTimeKind.unspecified): DateTime {
        return new DateTime(BigInt(this._dayNumber) * TicksPerDay + time.ticks, kind);
    }
    addDays(value: number): DateOnly {
        const day = this._dayNumber + value;
        if (day < 0 || day >= DaysTo10000) throw new ArgumentOutOfRangeException('value', 'Value to add was out of range.');
        return DateOnly.fromDayNumber(day);
    }
    addMonths(value: number): DateOnly { return DateOnly.fromDateTime(this.equivalentDateTime.addMonths(value)); }
    addYears(value: number): DateOnly { return DateOnly.fromDateTime(this.equivalentDateTime.addYears(value)); }
    compareTo(value: DateOnly | null): number {
        if (value == null) return 1;
        if (!(value instanceof DateOnly)) throw new ArgumentException('Object must be of type DateOnly.');
        return Math.sign(this._dayNumber - value._dayNumber);
    }
    equals(value: unknown): boolean { return value instanceof DateOnly && this._dayNumber === value._dayNumber; }
    getHashCode(): number { return this._dayNumber; }
    deconstruct(): [number, number, number] { return [this.year, this.month, this.day]; }
}
