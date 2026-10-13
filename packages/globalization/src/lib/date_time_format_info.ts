import { ArgumentException, ArgumentNullException, ArgumentOutOfRangeException, InvalidOperationException, IFormatProvider } from '@xobin/core';
import { Calendar } from './calendar';
import { GregorianCalendar } from './gregorian_calendar';
import { DayOfWeek } from './day_of_week';
import { CalendarWeekRule } from './calendar_week_rule';
import { getCurrentFormatContext, invariantDateTimeFormat } from './date_time_format_context';
import { DateTimeFormatData, DateTimeFormatState, dateTimeFormatStates, registerDateTimeFormatInfoType, getCalendarFormatData, clearMonthFormatFlags, copyMonthFormatFlags } from './date_time_format_data';
import { getCalendarIdentity } from './calendar_identity';

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
            cultureName: '',
            decimalSeparator: '.',
            calendarFormats: new Map([[1, copyFormatData(invariantDateTimeFormat)]]),
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
            calendarFormats: this.state.calendarFormats,
            cultureName: this.state.cultureName,
            decimalSeparator: this.state.decimalSeparator,
        });
        copyMonthFormatFlags(this.state.data, clone.state.data);
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
            calendarFormats: dtfi.state.calendarFormats,
            cultureName: dtfi.state.cultureName,
            decimalSeparator: dtfi.state.decimalSeparator,
        });
        copyMonthFormatFlags(dtfi.state.data, copy.state.data);
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
        if (value === this.calendar) return;
        const data = getCalendarFormatData(this.state, getCalendarIdentity(value).id);
        if (!data) throw new ArgumentOutOfRangeException('value', value, 'Not a valid calendar for the given culture.');
        this.state.data = data;
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
        this.verifyDayNames(value);
        clearMonthFormatFlags(this.state.data);
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
        this.verifyMonthNames(value);
        clearMonthFormatFlags(this.state.data);
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
        this.verifyMonthNames(value);
        clearMonthFormatFlags(this.state.data);
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
        clearMonthFormatFlags(this.state.data);
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
        if (!Number.isInteger(value) || value < CalendarWeekRule.FirstDay || value > CalendarWeekRule.FirstFourDayWeek) {
            throw new ArgumentOutOfRangeException('value', value, 'Valid values are between FirstDay and FirstFourDayWeek, inclusive.');
        }
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
        clearMonthFormatFlags(this.state.data);
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
        this.verifyDayNames(value);
        clearMonthFormatFlags(this.state.data);
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
        if (!Number.isInteger(value) || value < DayOfWeek.Sunday || value > DayOfWeek.Saturday) {
            throw new ArgumentOutOfRangeException('value', value, 'Valid values are between Sunday and Saturday, inclusive.');
        }
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
        clearMonthFormatFlags(this.state.data);
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
        clearMonthFormatFlags(this.state.data);
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
        this.verifyMonthNames(value);
        clearMonthFormatFlags(this.state.data);
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
        this.verifyMonthNames(value);
        clearMonthFormatFlags(this.state.data);
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
        clearMonthFormatFlags(this.state.data);
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
        clearMonthFormatFlags(this.state.data);
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
        this.verifyDayNames(value);
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
        clearMonthFormatFlags(this.state.data);
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
        clearMonthFormatFlags(this.state.data);
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
        clearMonthFormatFlags(this.state.data);
        this.state.data.yearMonthPattern = value;
    }

    /**
     * Gets the era number matching a culture-specific or English era name.
     * @param eraName The full or abbreviated era name to find.
     */
    getEra(eraName: string): number {
        if (eraName == null) throw new ArgumentNullException('eraName');
        if (eraName.length === 0) return -1;
        const data = this.state.data;
        const local = new Intl.Collator(this.state.cultureName || 'en', { sensitivity: 'accent' });
        const english = new Intl.Collator('en', { sensitivity: 'accent' });
        for (const [names, comparer] of [
            [data.eraNames ?? [], local], [data.abbreviatedEraNames ?? [], local],
            [data.abbreviatedEnglishEraNames ?? [], english],
        ] as const) {
            for (let i = 0; i < names.length; i++) {
                if (names[i]!.length > 0 && comparer.compare(eraName, names[i]!) === 0) return i + 1;
            }
        }
        return -1;
    }

    /**
     * Gets the full name of the specified era.
     * @param era The era number, or zero for the calendar's current era.
     */
    getEraName(era: number): string {
        return this.getEraNameFromArray(era, this.state.data.eraNames ?? []);
    }

    /**
     * Gets the abbreviated name of the specified era.
     * @param era The era number, or zero for the calendar's current era.
     */
    getAbbreviatedEraName(era: number): string {
        const names = this.state.data.abbreviatedEraNames;
        return names?.length ? this.getEraNameFromArray(era, names) : this.getEraName(era);
    }

    /**
     * Resolves a one-based era index using the calendar's current era for zero.
     * @param era The requested era number.
     * @param names The calendar's era names in ascending era order.
     */
    private getEraNameFromArray(era: number, names: ReadonlyArray<string>): string {
        const calendarData = this.state.calendarFormats.get(getCalendarIdentity(this.calendar).id);
        const selected = era === 0 ? calendarData?.eraNames?.length || 1 : era;
        if (!Number.isInteger(selected) || selected < 1 || selected > names.length) {
            throw new ArgumentOutOfRangeException('era', selected, 'Era value was not valid.');
        }
        return names[selected - 1]!;
    }

    /**
     * Gets the full name of a day of the week.
     * @param dayofweek The day from Sunday through Saturday.
     */
    getDayName(dayofweek: DayOfWeek): string {
        return this.getDayNameFromArray(dayofweek, 'dayofweek', this.state.data.dayNames);
    }

    /**
     * Gets the abbreviated name of a day of the week.
     * @param dayofweek The day from Sunday through Saturday.
     */
    getAbbreviatedDayName(dayofweek: DayOfWeek): string {
        return this.getDayNameFromArray(dayofweek, 'dayofweek', this.state.data.abbreviatedDayNames);
    }

    /**
     * Gets the shortest name of a day of the week.
     * @param dayOfWeek The day from Sunday through Saturday.
     */
    getShortestDayName(dayOfWeek: DayOfWeek): string {
        return this.getDayNameFromArray(dayOfWeek, 'dayOfWeek', this.state.data.shortestDayNames);
    }

    /**
     * Gets the full name of a month.
     * @param month The month from one through thirteen.
     */
    getMonthName(month: number): string {
        return this.getMonthNameFromArray(month, this.state.data.monthNames);
    }

    /**
     * Gets the abbreviated name of a month.
     * @param month The month from one through thirteen.
     */
    getAbbreviatedMonthName(month: number): string {
        return this.getMonthNameFromArray(month, this.state.data.abbreviatedMonthNames);
    }

    /**
     * Gets all standard patterns, or those for one standard format specifier.
     * @param format The standard format specifier, or undefined for all specifiers.
     */
    getAllDateTimePatterns(format?: string): string[] {
        if (format === undefined) return [...'dDfFgGmMoOrRstTuUyY'].flatMap(value => this.getAllDateTimePatterns(value));
        const patterns = (key: 'd' | 'D' | 't' | 'T' | 'y'): string[] => {
            const active = key === 'd' ? this.shortDatePattern : key === 'D' ? this.longDatePattern
                : key === 't' ? this.shortTimePattern : key === 'T' ? this.longTimePattern : this.yearMonthPattern;
            const values = (this.state.data.allDateTimePatterns?.[key] ?? [active]).slice();
            if (values[0] === active) return values;
            const index = values.indexOf(active);
            if (index < 0) return [active, ...values];
            values[index] = values[0]!;
            values[0] = active;
            return values;
        };
        switch (format) {
            case 'd': case 'D': case 't': case 'T': return patterns(format);
            case 'y': case 'Y': return patterns('y');
            case 'm': case 'M': return [this.monthDayPattern];
            case 'o': case 'O': return ["yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffK"];
            case 'r': case 'R': return [this.rfc1123Pattern];
            case 's': return [this.sortableDateTimePattern];
            case 'u': return [this.universalSortableDateTimePattern];
            case 'f': case 'F': case 'g': case 'G': case 'U':
                return patterns(format === 'g' || format === 'G' ? 'd' : 'D')
                    .flatMap(date => patterns(format === 'f' || format === 'g' ? 't' : 'T').map(time => date + ' ' + time));
            default: throw new ArgumentException(`Format specifier '${format}' was invalid.`, 'format');
        }
    }

    /**
     * Replaces date, time, or year-month patterns, using the first pattern as default.
     * @param patterns The non-empty array of non-null patterns, retained by reference.
     * @param format One of d, D, t, T, y, or Y.
     */
    setAllDateTimePatterns(patterns: string[], format: string): void {
        this.verifyWritable();
        if (patterns == null) throw new ArgumentNullException('patterns');
        if (patterns.length === 0) throw new ArgumentException('Array must not be of length zero.', 'patterns');
        for (let i = 0; i < patterns.length; i++) {
            if (patterns[i] == null) throw new ArgumentNullException(`patterns[${i}]`, 'Found a null value within an array.');
        }
        if (format.length !== 1 || !'dDtTyY'.includes(format)) {
            throw new ArgumentException(`Format specifier '${format}' was invalid.`, 'format');
        }
        const key = format === 'Y' ? 'y' : format;
        this.state.data.allDateTimePatterns = { ...this.state.data.allDateTimePatterns, [key]: patterns };
        if (key === 'd') this.shortDatePattern = patterns[0]!;
        else if (key === 'D') this.longDatePattern = patterns[0]!;
        else if (key === 't') this.shortTimePattern = patterns[0]!;
        else if (key === 'T') this.longTimePattern = patterns[0]!;
        else this.yearMonthPattern = patterns[0]!;
    }

    /**
     * Validates a day index and returns its name without copying the array.
     * @param day The day index to validate.
     * @param paramName The public method's parameter name.
     * @param names The selected day-name array.
     */
    private getDayNameFromArray(day: DayOfWeek, paramName: string, names: ReadonlyArray<string>): string {
        if (!Number.isInteger(day) || day < 0 || day > 6) {
            throw new ArgumentOutOfRangeException(paramName, day, 'Valid values are between Sunday and Saturday, inclusive.');
        }
        return names[day]!;
    }

    /**
     * Validates a month index and returns its name without copying the array.
     * @param month The one-based month index.
     * @param names The selected month-name array.
     */
    private getMonthNameFromArray(month: number, names: ReadonlyArray<string>): string {
        if (!Number.isInteger(month) || month < 1 || month > 13) {
            throw new ArgumentOutOfRangeException('month', month, 'Valid values are between 1 and 13, inclusive.');
        }
        return names[month - 1]!;
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

    /**
     * Validates the seven non-null entries required by a day-name array.
     * @param value The array supplied to a day-name property.
     */
    private verifyDayNames(value: string[]): void {
        if (value == null) throw new ArgumentNullException('value');
        if (value.length !== 7) throw new ArgumentException('Length of the array must be 7.', 'value');
        for (let i = 0; i < value.length; i++) {
            if (value[i] == null) throw new ArgumentNullException('value', 'Found a null value within an array.');
        }
    }

    /**
     * Validates thirteen month entries, allowing a null thirteenth month as in .NET.
     * @param value The array supplied to a month-name property.
     */
    private verifyMonthNames(value: string[]): void {
        if (value == null) throw new ArgumentNullException('value');
        if (value.length !== 13) throw new ArgumentException('Length of the array must be 13.', 'value');
        for (let i = 0; i < 12; i++) {
            if (value[i] == null) throw new ArgumentNullException('value', 'Found a null value within an array.');
        }
    }
}

registerDateTimeFormatInfoType(DateTimeFormatInfo);

/**
 * Creates a format-info instance from explicitly loaded locale data.
 * @param data The locale's date and time format data.
 * @param calendar The culture's calendar instance.
 * @param calendarFormats The optional calendars and their format-data overrides from the locale oracle.
 * @param cultureName The culture used for linguistic era-name comparison.
 * @param decimalSeparator The culture's original decimal separator for TimeSpan formatting.
 * @internal
 */
export function createDateTimeFormatInfo(data: DateTimeFormatData, calendar: Calendar,
    calendarFormats?: Readonly<Record<number, Partial<DateTimeFormatData>>>, cultureName: string = '', decimalSeparator: string = '.'): DateTimeFormatInfo {
    const info = new DateTimeFormatInfo();
    const formats = new Map<number, DateTimeFormatData>(Object.entries(calendarFormats ?? {})
        .map(([id, overrides]) => [Number(id), copyFormatData({ ...data, ...overrides })]));
    formats.set(getCalendarIdentity(calendar).id, copyFormatData(data));
    dateTimeFormatStates.set(info, { data: copyFormatData(data), calendar, isReadOnly: false, calendarFormats: formats, cultureName, decimalSeparator });
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
