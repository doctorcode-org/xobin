import * as SR from '@xobin/core/internal/exception-resources';
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentException, ArgumentOutOfRangeException } from '@xobin/core';
import { EastAsianLunisolarCalendar } from './east_asian_lunisolar_calendar';
import { DateTime } from './date_time';
import { calendarRangeMessage } from './calendar_exception';
import { registerCalendarIdentity } from './calendar_identity';
import { EraInfo } from './era_info';
import { yearInfo } from './taiwan_lunisolar_calendar_data';
import { GregorianCalendarHelper } from './gregorian_calendar_helper';

/**
 * Represents the Taiwan lunisolar calendar.
 */
export class TaiwanLunisolarCalendar extends EastAsianLunisolarCalendar {
    private readonly _helper = new GregorianCalendarHelper(this,
        [new EraInfo(1, 1912, 1, 1, 1911, 1, 8088)]);

    /**
     * Initializes a new instance of the TaiwanLunisolarCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by this calendar.
     */
    override get minSupportedDateTime(): DateTime {
        return new DateTime(1912, 2, 18);
    }

    /**
     * Gets the latest date and time supported by this calendar.
     */
    override get maxSupportedDateTime(): DateTime {
        return new DateTime(2051, 2, 10, 23, 59, 59, 999).addTicks(9999n);
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
        return 1912;
    }

    /**
     * Gets the last supported lunisolar year.
     */
    protected override get maxCalendarYear(): number {
        return 2050;
    }

    /**
     * Gets the era definitions used for year validation.
     */
    protected override get calEraInfo(): readonly EraInfo[] | null {
        return this._helper.eraInfo;
    }

    /**
     * Gets the base Gregorian calendar identity for year settings.
     */
    protected override get baseCalendarID(): number {
        return 4;
    }

    /**
     * Gets the selected field of a lunisolar year table entry.
     */
    protected override getYearInfo(lunarYear: number, index: number): number {
        if (lunarYear < 1912 || lunarYear > 2050) {
            throw new ArgumentOutOfRangeException('year', lunarYear, calendarRangeMessage(1912, 2050));
        }
        return yearInfo[lunarYear - 1912]![index]!;
    }

    /**
     * Converts a lunisolar year to the year of the date's era.
     */
    protected override getYearForDate(year: number, time: DateTime): number {
        const info = this._helper.eraInfo.find(item => time.ticks >= item.ticks && year > item.yearOffset);
        if (!info) throw new ArgumentException(SR.Argument_NoEra);
        return year - info.yearOffset;
    }

    /**
     * Converts the specified era year to a Gregorian year.
     */
    protected override getGregorianYear(year: number, era: number): number {
        this._helper.getDaysInYear(year, era);
        const info = this._helper.eraInfo.find(item => item.era === (era === 0 ? this._helper.eras[0] : era))!;
        return year + info.yearOffset;
    }

    /**
     * Gets the era for the specified date.
     * @param time The date and time to examine.
     */
    override getEra(time: DateTime): number {
        return this._helper.getEra(time);
    }

    /**
     * Gets the eras supported by this calendar.
     */
    override get eras(): number[] {
        return this._helper.eras;
    }
}

registerCalendarIdentity(TaiwanLunisolarCalendar.prototype, 'TaiwanLunisolarCalendar', () => 21);
