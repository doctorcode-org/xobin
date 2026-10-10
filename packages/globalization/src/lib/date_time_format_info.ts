import { ArgumentNullException, InvalidOperationException, IFormatProvider } from '@xobin/core';
import { Calendar } from './calendar';
import { GregorianCalendar } from './gregorian_calendar';
import { DayOfWeek } from './day_of_week';
import { CalendarWeekRule } from './calendar_week_rule';
import { getCurrentFormatContext, invariantDateTimeFormat } from './date_time_format_context';
import { DateTimeFormatData, DateTimeFormatState, dateTimeFormatStates, registerDateTimeFormatInfoType } from './date_time_format_data';

/**
 * Provides culture-specific information for formatting and parsing dates and times.
 */
export class DateTimeFormatInfo implements IFormatProvider {
    private static _invariantInfo: DateTimeFormatInfo;

    /**
     * Initializes a writable instance using the invariant culture's formatting information.
     */
    constructor() {
        dateTimeFormatStates.set(this, {
            data: copyFormatData(invariantDateTimeFormat),
            calendar: new GregorianCalendar(),
            isReadOnly: false,
        });
    }

    /**
     * Gets the read-only, culture-independent formatting information.
     */
    static get invariantInfo(): DateTimeFormatInfo {
        return this._invariantInfo ??= DateTimeFormatInfo.readOnly(new DateTimeFormatInfo());
    }

    /**
     * Gets the formatting information of the current culture.
     */
    static get currentInfo(): DateTimeFormatInfo {
        const context = getCurrentFormatContext();
        const provider = context as Partial<IFormatProvider>;
        const info = typeof provider.getFormat === 'function'
            ? provider.getFormat(DateTimeFormatInfo) : context.dateTimeFormat;
        return info instanceof DateTimeFormatInfo ? info : DateTimeFormatInfo.invariantInfo;
    }

    /**
     * Gets formatting information from a provider, falling back to the current culture.
     * @param provider The provider that supplies date and time formatting information.
     */
    static getInstance(provider?: IFormatProvider | null): DateTimeFormatInfo {
        if (provider == null) return DateTimeFormatInfo.currentInfo;
        if (provider instanceof DateTimeFormatInfo) return provider;
        const info = provider.getFormat(DateTimeFormatInfo);
        return info instanceof DateTimeFormatInfo ? info : DateTimeFormatInfo.currentInfo;
    }

    /**
     * Gets this instance for the DateTimeFormatInfo type, or null for an unsupported type.
     * @param formatType The type of formatting information requested.
     */
    getFormat(formatType: unknown): object | null {
        return formatType === DateTimeFormatInfo || formatType === 'DateTimeFormatInfo' ? this : null;
    }

    /**
     * Creates a writable copy of this instance and its calendar.
     */
    clone(): this {
        const clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this) as this;
        dateTimeFormatStates.set(clone, {
            data: { ...this.state.data },
            calendar: this.calendar.clone(),
            isReadOnly: false,
        });
        return clone;
    }

    /**
     * Returns a read-only copy, or the original instance if it is already read-only.
     * @param dtfi The formatting information to make read-only.
     */
    static readOnly(dtfi: DateTimeFormatInfo): DateTimeFormatInfo {
        if (dtfi == null) throw new ArgumentNullException('dtfi');
        if (dtfi.isReadOnly) return dtfi;
        const copy = Object.assign(Object.create(Object.getPrototypeOf(dtfi)), dtfi) as DateTimeFormatInfo;
        dateTimeFormatStates.set(copy, {
            data: { ...dtfi.state.data },
            calendar: Calendar.readOnly(dtfi.calendar),
            isReadOnly: true,
        });
        return copy;
    }

    /**
     * Gets whether this instance is read-only.
     */
    get isReadOnly(): boolean {
        return this.state.isReadOnly;
    }

    /**
     * Gets or sets the calendar used to interpret dates and times.
     */
    get calendar(): Calendar {
        return this.state.calendar as Calendar;
    }

    set calendar(value: Calendar) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.calendar = value;
    }

    /**
     * Gets or sets the abbreviated names of the days of the week.
     */
    get abbreviatedDayNames(): string[] {
        return this.state.data.abbreviatedDayNames.slice();
    }

    set abbreviatedDayNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.abbreviatedDayNames = value;
    }

    /**
     * Gets or sets the abbreviated genitive names of the months.
     */
    get abbreviatedMonthGenitiveNames(): string[] {
        return this.state.data.abbreviatedMonthGenitiveNames.slice();
    }

    set abbreviatedMonthGenitiveNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.abbreviatedMonthGenitiveNames = value;
    }

    /**
     * Gets or sets the abbreviated names of the months.
     */
    get abbreviatedMonthNames(): string[] {
        return this.state.data.abbreviatedMonthNames.slice();
    }

    set abbreviatedMonthNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.abbreviatedMonthNames = value;
    }

    /**
     * Gets or sets the designator for hours before noon.
     */
    get amDesignator(): string {
        return this.state.data.amDesignator;
    }

    set amDesignator(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.amDesignator = value;
    }

    /**
     * Gets or sets the rule used to determine the first week of the year.
     */
    get calendarWeekRule(): CalendarWeekRule {
        return this.state.data.calendarWeekRule ?? CalendarWeekRule.FirstDay;
    }

    set calendarWeekRule(value: CalendarWeekRule) {
        this.verifyWritable();
        this.state.data.calendarWeekRule = value;
    }

    /**
     * Gets or sets the string that separates date components.
     */
    get dateSeparator(): string {
        return this.state.data.dateSeparator;
    }

    set dateSeparator(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.dateSeparator = value;
    }

    /**
     * Gets or sets the full names of the days of the week.
     */
    get dayNames(): string[] {
        return this.state.data.dayNames.slice();
    }

    set dayNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.dayNames = value;
    }

    /**
     * Gets or sets the first day of the week.
     */
    get firstDayOfWeek(): DayOfWeek {
        return this.state.data.firstDayOfWeek;
    }

    set firstDayOfWeek(value: DayOfWeek) {
        this.verifyWritable();
        this.state.data.firstDayOfWeek = value;
    }

    /**
     * Gets or sets the custom format pattern for a long date and a long time.
     */
    get fullDateTimePattern(): string {
        return this.state.data.fullDateTimePattern;
    }

    set fullDateTimePattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.fullDateTimePattern = value;
    }

    /**
     * Gets or sets the custom format pattern for a long date.
     */
    get longDatePattern(): string {
        return this.state.data.longDatePattern;
    }

    set longDatePattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.longDatePattern = value;
        this.state.data.fullDateTimePattern = this.longDatePattern + ' ' + this.longTimePattern;
    }

    /**
     * Gets or sets the custom format pattern for a long time.
     */
    get longTimePattern(): string {
        return this.state.data.longTimePattern;
    }

    set longTimePattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.longTimePattern = value;
        this.state.data.fullDateTimePattern = this.longDatePattern + ' ' + this.longTimePattern;
    }

    /**
     * Gets or sets the custom format pattern for a month and day.
     */
    get monthDayPattern(): string {
        return this.state.data.monthDayPattern;
    }

    set monthDayPattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.monthDayPattern = value;
    }

    /**
     * Gets or sets the genitive names of the months.
     */
    get monthGenitiveNames(): string[] {
        return this.state.data.monthGenitiveNames.slice();
    }

    set monthGenitiveNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.monthGenitiveNames = value;
    }

    /**
     * Gets or sets the full names of the months.
     */
    get monthNames(): string[] {
        return this.state.data.monthNames.slice();
    }

    set monthNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.monthNames = value;
    }

    /**
     * Gets the native name of the calendar.
     */
    get nativeCalendarName(): string {
        return this.state.data.nativeCalendarName;
    }

    /**
     * Gets or sets the designator for hours after noon.
     */
    get pmDesignator(): string {
        return this.state.data.pmDesignator;
    }

    set pmDesignator(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.pmDesignator = value;
    }

    /**
     * Gets the format pattern defined by the RFC 1123 specification.
     */
    get rfc1123Pattern(): string {
        return this.state.data.rfC1123Pattern;
    }

    /**
     * Gets or sets the custom format pattern for a short date.
     */
    get shortDatePattern(): string {
        return this.state.data.shortDatePattern;
    }

    set shortDatePattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.shortDatePattern = value;
    }

    /**
     * Gets or sets the shortest names of the days of the week.
     */
    get shortestDayNames(): string[] {
        return this.state.data.shortestDayNames.slice();
    }

    set shortestDayNames(value: string[]) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.shortestDayNames = value;
    }

    /**
     * Gets or sets the custom format pattern for a short time.
     */
    get shortTimePattern(): string {
        return this.state.data.shortTimePattern;
    }

    set shortTimePattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.shortTimePattern = value;
    }

    /**
     * Gets the sortable date and time format pattern.
     */
    get sortableDateTimePattern(): string {
        return this.state.data.sortableDateTimePattern;
    }

    /**
     * Gets or sets the string that separates time components.
     */
    get timeSeparator(): string {
        return this.state.data.timeSeparator;
    }

    set timeSeparator(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.timeSeparator = value;
    }

    /**
     * Gets the universal sortable date and time format pattern.
     */
    get universalSortableDateTimePattern(): string {
        return this.state.data.universalSortableDateTimePattern;
    }

    /**
     * Gets or sets the custom format pattern for a year and month.
     */
    get yearMonthPattern(): string {
        return this.state.data.yearMonthPattern;
    }

    set yearMonthPattern(value: string) {
        this.verifyWritable();
        if (value == null) throw new ArgumentNullException('value');
        this.state.data.yearMonthPattern = value;
    }

    /**
     * Gets the private state associated with this instance.
     */
    private get state(): DateTimeFormatState {
        return dateTimeFormatStates.get(this)!;
    }

    /**
     * Rejects changes to a read-only instance.
     */
    private verifyWritable(): void {
        if (this.isReadOnly) throw new InvalidOperationException('Instance is read-only.');
    }
}

registerDateTimeFormatInfoType(DateTimeFormatInfo);

/**
 * Creates a format-info instance from explicitly loaded locale data.
 * @param data The locale's date and time format data.
 * @param calendar The culture's calendar instance.
 * @internal
 */
export function createDateTimeFormatInfo(data: DateTimeFormatData, calendar: Calendar): DateTimeFormatInfo {
    const info = new DateTimeFormatInfo();
    dateTimeFormatStates.set(info, { data: copyFormatData(data), calendar, isReadOnly: false });
    return info;
}

/**
 * Copies initial locale data while preserving the reference runtime's shallow clone behavior.
 * @param data The date and time format data to copy.
 */
function copyFormatData(data: DateTimeFormatData): DateTimeFormatData {
    const copy = { ...data };
    for (const key of Object.keys(copy) as Array<keyof DateTimeFormatData>) {
        const value = copy[key];
        if (Array.isArray(value)) (copy as unknown as Record<string, unknown>)[key] = value.slice();
    }
    if (data.allDateTimePatterns) {
        copy.allDateTimePatterns = Object.fromEntries(Object.entries(data.allDateTimePatterns)
            .map(([key, patterns]) => [key, patterns.slice()]));
    }
    return copy;
}
