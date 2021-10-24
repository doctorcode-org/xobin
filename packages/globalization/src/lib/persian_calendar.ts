import { Calendar, checkAddResult, timeToTicks } from './calendar';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { getOrCreateValue, ArgumentOutOfRangeException, InvalidOperationException, setValue, int } from '@xobin/core';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { TicksPerDay, DatePartYear, DatePartMonth, DatePartDay, DatePartDayOfYear } from './var';
import { MeanTropicalYearInDays, persianNewYearOnOrBefore, getNumberOfDays } from './calendrical_helper';

const MaxCalendarYear = 9378;
const MaxCalendarMonth = 10;
const MaxCalendarDay = 13;
const MonthsPerYear = 12;
const DaysToMonth = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366];
const s_persianEpoch = (new DateTime(622, 3, 22).ticks) / TicksPerDay;
const ApproximateHalfYear = 180;

/**
 * Represents the Persian calendar.
 */
export class PersianCalendar extends Calendar {

    /**
     * Initializes a new instance of the PersianCalendar class.
     */
    constructor() {
        super();
    }

    /**
    * Gets the earliest date and time supported by the PersianCalendar class.
    */
   override get minSupportedDateTime(): DateTime {
        return getOrCreateValue(this, 'minSupportedDateTime', () => new DateTime(622, 3, 22));
    }

    /**
    * Gets the latest date and time supported by the PersianCalendar class.
    */
    override get maxSupportedDateTime(): DateTime {
        return DateTime.maxValue;
    }

    /**
    * Gets a value indicating whether the current calendar is solar-based, lunar-based, or lunisolar-based.
    */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.SolarCalendar;
    }

    /**
    * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
    */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () => 1410);
    }

    override set twoDigitYearMax(value) {
        if (value < 99 || value > MaxCalendarYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(value),
                //value,
                //SR.Format(SR.ArgumentOutOfRange_Range, 99, MaxYear)
            );
        }

        setValue(this, 'twoDigitYearMax', value);
    }

    /**
     * Determines whether the specified year in the specified era is a leap year.
     * @param year An integer from 1 through 9378 that represents the year.
     */
    isLeapYear(year: number): boolean {
        checkYearRange(year);

        if (year == MaxCalendarYear) {
            return false;
        }

        return (getAbsoluteDatePersian(year + 1, 1, 1) - getAbsoluteDatePersian(year, 1, 1)) == 366;
    }

    /**
     * Determines whether the specified month in the specified year and era is a leap month.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer that represents the month and ranges from 1 through 12 if year is not 9378, or 1 through 10 if year is 9378.
     */
    isLeapMonth(year: number, month: number): boolean {
        checkYearMonthRange(year, month);
        return false;
    }

    /**
     * Determines whether the specified date is a leap day.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer that represents the month and ranges from 1 through 12 if year is not 9378, or 1 through 10 if year is 9378.
     * @param day An integer from 1 through 31 that represents the day.
     */
    isLeapDay(year: number, month: number, day: number): boolean {
        // The year/month/era value checking is done in GetDaysInMonth().
        const daysInMonth = this.getDaysInMonth(year, month);
        if (day < 1 || day > daysInMonth) {
            throw new ArgumentOutOfRangeException(
                //nameof(day),
                //day,
                //SR.Format(SR.ArgumentOutOfRange_Day, daysInMonth, month)
            );
        }

        return this.isLeapYear(year) && month == 12 && day == 30;
    }

    /**
     * Returns the leap month for a specified year.
     * @param year An integer from 1 through 9378 that represents the year to convert.
     */
    override getLeapMonth(year: number): number {
        checkYearRange(year);
        return 0;
    }

    /**
     * Returns a DateTime object that is offset the specified number of years from the specified DateTime object.
     * @param time The DateTime to which to add years.
     * @param years The positive or negative number of years to add.
     */
    addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, years * 12);
    }

    /**
     * Returns a DateTime object that is offset the specified number of months from the specified DateTime object.
     * @param time The DateTime to which to add months.
     * @param months The positive or negative number of months to add.
     */
    addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException(
                //nameof(months),
                //months,
                //SR.Format(SR.ArgumentOutOfRange_Range, -120000, 120000)
            );
        }

        // Get the date in Persian calendar.
        let y = getDatePart.call(this, time.ticks, DatePartYear);
        let m = getDatePart.call(this, time.ticks, DatePartMonth);
        let d = getDatePart.call(this, time.ticks, DatePartDay);
        let i = m - 1 + months;
        if (i >= 0) {
            m = i % 12 + 1;
            y += i / 12;
        }
        else {
            m = 12 + (i + 1) % 12;
            y += (i - 11) / 12;
        }
        const days = this.getDaysInMonth(y, m);
        if (d > days) {
            d = days;
        }

        const ticks = getAbsoluteDatePersian(y, m, d) * TicksPerDay + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    /**
     * Returns the day of the month in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getDayOfMonth(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartDay);
    }

    /**
     * Returns the day of the week in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getDayOfWeek(time: DateTime): DayOfWeek {
        return int((time.ticks / TicksPerDay + 1) % 7);
    }

    /**
     * Returns the day of the year in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getDayOfYear(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartDayOfYear);
    }

    /**
     * Returns the year in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getYear(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartYear);
    }

    /**
     * Returns the month in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getMonth(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartMonth);
    }

    /**
     * Returns the number of months in the specified year.
     * @param year An integer from 1 through 9378 that represents the year.
     */
    getMonthsInYear(year: number): number {
        checkYearRange(year);
        if (year == MaxCalendarYear) {
            return MaxCalendarMonth;
        }

        return 12;
    }

    /**
     * Returns the number of days in the specified year.
     * @param year An integer from 1 through 9378 that represents the year.
     */
    getDaysInYear(year: number): number {
        if (year == MaxCalendarYear) {
            return DaysToMonth[MaxCalendarMonth - 1]! + MaxCalendarDay;
        }

        return this.isLeapYear(year) ? 366 : 365;
    }

    /**
     * Returns the number of days in the specified month of the specified year.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer that represents the month, and ranges from 1 through 12 if year is not 9378, or 1 through 10 if year is 9378.
     */
    getDaysInMonth(year: number, month: number): number {
        checkYearMonthRange(year, month);

        if ((month == MaxCalendarMonth) && (year == MaxCalendarYear)) {
            return MaxCalendarDay;
        }

        let daysInMonth = DaysToMonth[month]! - DaysToMonth[month - 1]!;
        if ((month == MonthsPerYear) && !this.isLeapYear(year)) {
            --daysInMonth;
        }

        return daysInMonth;
    }

    /**
     * Converts the specified year to a four-digit year representation.
     * @param year An integer from 1 through 9378 that represents the year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year < 0) {
            throw new ArgumentOutOfRangeException(/*nameof(year), year, SR.ArgumentOutOfRange_NeedNonNegNum*/);
        }

        if (year < 100) {
            return super.toFourDigitYear(year);
        }

        if (year > MaxCalendarYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxCalendarYear)
            );
        }

        return year;
    }

    /**
     * Returns a DateTime object that is set to the specified date and time.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer from 1 through 12 that represents the month.
     * @param day An integer from 1 through 31 that represents the day.
     * @param hour An integer from 0 through 23 that represents the hour.
     * @param minute An integer from 0 through 59 that represents the minute.
     * @param second An integer from 0 through 59 that represents the second.
     * @param millisecond An integer from 0 through 999 that represents the millisecond.
     */
    toDateTime(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number): DateTime {
        // The year/month/era checking is done in GetDaysInMonth().
        const daysInMonth = this.getDaysInMonth(year, month);
        if (day < 1 || day > daysInMonth) {
            throw new ArgumentOutOfRangeException(
                //nameof(day),
                //day,
                //SR.Format(SR.ArgumentOutOfRange_Day, daysInMonth, month)
            );
        }

        const lDate = getAbsoluteDatePersian(year, month, day);

        if (lDate < 0) {
            throw new ArgumentOutOfRangeException(/*null, SR.ArgumentOutOfRange_BadYearMonthDay*/);
        }

        return new DateTime(lDate * TicksPerDay + timeToTicks(hour, minute, second, millisecond));
    }
}

function checkTicksRange(this: Calendar, ticks: number) {
    if (ticks < this.minSupportedDateTime.ticks || ticks > this.maxSupportedDateTime.ticks) {
        throw new ArgumentOutOfRangeException(
            //"time",
            //ticks,
            //SR.Format(SR.ArgumentOutOfRange_CalendarRange, s_minDate, s_maxDate)
        );
    }
}

function getDatePart(this: Calendar, ticks: number, part: number): number {
    checkTicksRange.call(this, ticks);

    // Get the absolute date. The absolute date is the number of days from January 1st, 1 A.D.
    // 1/1/0001 is absolute date 1.
    const numDays = ticks / TicksPerDay + 1;

    // Calculate the appromixate Persian Year.
    const yearStart = persianNewYearOnOrBefore(numDays);
    const y = int(Math.floor(((yearStart - s_persianEpoch) / MeanTropicalYearInDays) + 0.5)) + 1;

    if (part == DatePartYear) {
        return y;
    }

    // Calculate the Persian Month.
    const ordinalDay = int(numDays - getNumberOfDays(this.toDateTime(y, 1, 1, 0, 0, 0, 0)));
    if (part == DatePartDayOfYear) {
        return ordinalDay;
    }

    const m = monthFromOrdinalDay(ordinalDay);
    if (part == DatePartMonth) {
        return m;
    }

    const d = ordinalDay - daysInPreviousMonths(m);
    // Calculate the Persian Day.
    if (part == DatePartDay) {
        return d;
    }

    // Incorrect part value.
    throw new InvalidOperationException(/*SR.InvalidOperation_DateTimeParsing*/);
}

function checkYearRange(year: number) {
    if (year < 1 || year > MaxCalendarYear) {
        throw new ArgumentOutOfRangeException(
            //nameof(year),
            //year,
            //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxCalendarYear)
        );
    }
}

function getAbsoluteDatePersian(year: number, month: number, day: number) {
    if (year < 1 || year > MaxCalendarYear || month < 1 || month > 12) {
        throw new ArgumentOutOfRangeException(/*null, SR.ArgumentOutOfRange_BadYearMonthDay*/);
    }

    // day is one based, make 0 based since this will be the number of days we add to beginning of year below
    const ordinalDay = daysInPreviousMonths(month) + day - 1;
    const approximateDaysFromEpochForYearStart = int(MeanTropicalYearInDays * (year - 1));
    let yearStart = persianNewYearOnOrBefore(s_persianEpoch + approximateDaysFromEpochForYearStart + ApproximateHalfYear);
    yearStart += ordinalDay;
    return yearStart;
}

function checkYearMonthRange(year: number, month: number): void {
    checkYearRange(year);
    if (year == MaxCalendarYear) {
        if (month > MaxCalendarMonth) {
            throw new ArgumentOutOfRangeException(
                //nameof(month),
                //month,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxCalendarMonth)
            );
        }
    }

    if (month < 1 || month > 12) {
        throw new ArgumentOutOfRangeException(/*nameof(month), month, SR.ArgumentOutOfRange_Month*/);
    }
}

function monthFromOrdinalDay(ordinalDay: number): number {
    let index = 0;
    while (ordinalDay > DaysToMonth[index]!) {
        index++;
    }

    return index;
}

function daysInPreviousMonths(month: number): number {
    // months are one based but for calculations use 0 based
    --month;
    return DaysToMonth[month]!;
}