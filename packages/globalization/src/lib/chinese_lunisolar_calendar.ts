import * as SR from '@xobin/core/internal/exception-resources';
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentOutOfRangeException } from '@xobin/core';
import { EastAsianLunisolarCalendar } from './east_asian_lunisolar_calendar';
import { DateTime } from './date_time';
import { calendarRangeMessage } from './calendar_exception';
import { registerCalendarIdentity } from './calendar_identity';
import { EraInfo } from './era_info';
import { yearInfo } from './chinese_lunisolar_calendar_data';

/**
 * Represents the Chinese lunisolar calendar.
 */
export class ChineseLunisolarCalendar extends EastAsianLunisolarCalendar {
    /**
     * Represents the calendar's era constant.
     */
    static readonly ChineseEra = 1;

    /**
     * Initializes a new instance of the ChineseLunisolarCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by this calendar.
     */
    override get minSupportedDateTime(): DateTime {
        return new DateTime(1901, 2, 19);
    }

    /**
     * Gets the latest date and time supported by this calendar.
     */
    override get maxSupportedDateTime(): DateTime {
        return new DateTime(2101, 1, 28, 23, 59, 59, 999).addTicks(9999n);
    }

    /**
     * Gets the number of days in the year preceding the minimum supported year.
     */
    protected override get daysInYearBeforeMinSupportedYear(): number {
        return 384;
    }

    /**
     * Gets the first supported lunisolar year.
     */
    protected override get minCalendarYear(): number {
        return 1901;
    }

    /**
     * Gets the last supported lunisolar year.
     */
    protected override get maxCalendarYear(): number {
        return 2100;
    }

    /**
     * Gets the era definitions used for year validation.
     */
    protected override get calEraInfo(): readonly EraInfo[] | null {
        return null;
    }

    /**
     * Gets the base Gregorian calendar identity for year settings.
     */
    protected override get baseCalendarID(): number {
        return 1;
    }

    /**
     * Gets the selected field of a lunisolar year table entry.
     */
    protected override getYearInfo(lunarYear: number, index: number): number {
        if (lunarYear < 1901 || lunarYear > 2100) {
            throw new ArgumentOutOfRangeException('year', lunarYear, calendarRangeMessage(1901, 2100));
        }
        return yearInfo[lunarYear - 1901]![index]!;
    }

    /**
     * Converts a lunisolar year to the year of the date's era.
     */
    protected override getYearForDate(year: number, time: DateTime): number {
        return year;
    }

    /**
     * Converts the specified era year to a Gregorian year.
     */
    protected override getGregorianYear(year: number, era: number): number {
        if (era !== 0 && era !== 1) {
            throw new ArgumentOutOfRangeException('era', era, SR.ArgumentOutOfRange_InvalidEraValue);
        }
        if (year < 1901 || year > 2100) {
            throw new ArgumentOutOfRangeException('year', year, calendarRangeMessage(1901, 2100));
        }
        return year;
    }

    /**
     * Gets the era for the specified date.
     * @param time The date and time to examine.
     */
    override getEra(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return 1;
    }

    /**
     * Gets the eras supported by this calendar.
     */
    override get eras(): number[] {
        return [1];
    }
}

registerCalendarIdentity(ChineseLunisolarCalendar.prototype, 'ChineseLunisolarCalendar', () => 15);
