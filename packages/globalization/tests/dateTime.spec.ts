import { DateTime, DateTimeKind, GregorianCalendar, Calendar, DayOfWeek, TimeSpan } from '@xobin/globalization';

describe('DateTime class', () => {

    it('MaxValue', () => verifyDateTime(DateTime.maxValue, 9999, 12, 31, 22, 59, 7, 941, DateTimeKind.unspecified));
    it('MinValue', () => verifyDateTime(DateTime.minValue, 1, 1, 1, 0, 0, 0, 0, DateTimeKind.unspecified));

    it('constructor(ticks: number)', () => verifyDateTime(new DateTime(315537893947941), 9999, 12, 31, 22, 59, 7, 941, DateTimeKind.unspecified));

    it('constructor(ticks: number, kind: DateTimeKind)', () => verifyDateTime(new DateTime(315537893947941, DateTimeKind.utc), 9999, 12, 31, 22, 59, 7, 941, DateTimeKind.utc));

    it('InvalidTicks_ThrowsArgumentOutOfRangeException constructor(ticks: number)', () => {
        const Ctor_InvalidTicks_TestData = [
            DateTime.minValue.ticks - 1,
            DateTime.maxValue.ticks + 1
        ];
        for (let ticks of Ctor_InvalidTicks_TestData) {
            expect(() => new DateTime(ticks)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(ticks, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('constructor(year: number, month: number, day: number)', () =>
        verifyDateTime(new DateTime(2012, 6, 11), 2012, 6, 11, 0, 0, 0, 0, DateTimeKind.unspecified));

    it('constructor(year: number, month: number, day: number, calendar: Calendar)', () =>
        verifyDateTime(new DateTime(2012, 6, 11, new GregorianCalendar()), 2012, 6, 11, 0, 0, 0, 0, DateTimeKind.unspecified));

    it('constructor(year: number, month: number, day: number, hour: number, minute: number, second: number)', () =>
        verifyDateTime(new DateTime(2012, 12, 31, 13, 50, 10), 2012, 12, 31, 13, 50, 10, 0, DateTimeKind.unspecified));

    it('constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, kind: DateTimeKind)', () =>
        verifyDateTime(new DateTime(1986, 8, 15, 10, 20, 5, DateTimeKind.local), 1986, 8, 15, 10, 20, 5, 0, DateTimeKind.local));

    it('constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, calendar: Calendar)', () =>
        verifyDateTime(new DateTime(2012, 12, 31, 13, 50, 10, new GregorianCalendar()), 2012, 12, 31, 13, 50, 10, 0, DateTimeKind.unspecified));

    const Ctor_Int_Int_Int_Int_Int_Int_Int_Int_TestData: [number, number, number, number, number, number, number][] = [
        [1986, 8, 15, 10, 20, 5, 600],
        [1986, 2, 28, 10, 20, 5, 600],
        [1986, 12, 31, 10, 20, 5, 600],
        [2000, 2, 28, 10, 20, 5, 600],
        [2000, 2, 29, 10, 20, 5, 600],
        [2000, 12, 31, 10, 20, 5, 600],
        [1900, 2, 28, 10, 20, 5, 600],
        [1900, 12, 31, 10, 20, 5, 600]
    ];

    it('constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number)', () => {
        function test(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) {
            const dateTime = new DateTime(year, month, day, hour, minute, second, millisecond);
            verifyDateTime(dateTime, year, month, day, hour, minute, second, millisecond, DateTimeKind.unspecified);
        }

        Ctor_Int_Int_Int_Int_Int_Int_Int_Int_TestData.forEach(data => test.apply(null, data));
    });

    it('constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, calendar: Calendar)', () => {
        function test(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) {
            const dateTime = new DateTime(year, month, day, hour, minute, second, millisecond, new GregorianCalendar());
            verifyDateTime(dateTime, year, month, day, hour, minute, second, millisecond, DateTimeKind.unspecified);
        }

        Ctor_Int_Int_Int_Int_Int_Int_Int_Int_TestData.forEach(data => test.apply(null, data));
    });

    it('constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind)', () => {
        function test(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) {
            const dateTime = new DateTime(year, month, day, hour, minute, second, millisecond, DateTimeKind.local);
            verifyDateTime(dateTime, year, month, day, hour, minute, second, millisecond, DateTimeKind.local);
        }

        Ctor_Int_Int_Int_Int_Int_Int_Int_Int_TestData.forEach(data => test.apply(null, data));
    });

    it('Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind', () => {
        function test(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number) {
            const dateTime = new DateTime(year, month, day, hour, minute, second, millisecond, new GregorianCalendar(), DateTimeKind.local);
            verifyDateTime(dateTime, year, month, day, hour, minute, second, millisecond, DateTimeKind.local);
        }

        Ctor_Int_Int_Int_Int_Int_Int_Int_Int_TestData.forEach(data => test.apply(null, data));
    });

    it('Ctor_InvalidYear_ThrowsArgumentOutOfRangeException', () => {
        const years = [0, 10000];
        for (let year of years) {
            expect(() => new DateTime(year, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(year, 1, 1, 1, 1, 1, 1, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidMonth_ThrowsArgumentOutOfRangeException', () => {
        const monthes = [0, 13];
        for (let month of monthes) {
            expect(() => new DateTime(1, month, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, month, 1, 1, 1, 1, 1, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidDay_ThrowsArgumentOutOfRangeException', () => {
        const days = [0, 32];
        for (let day of days) {
            expect(() => new DateTime(1, 1, day)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, day, 1, 1, 1, 1, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidHour_ThrowsArgumentOutOfRangeException', () => {
        const hours = [-1, 24];
        for (let hour of hours) {
            expect(() => new DateTime(1, 1, 1, hour, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, hour, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, hour, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, hour, 1, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, hour, 1, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, hour, 1, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, hour, 1, 1, 1, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidMinute_ThrowsArgumentOutOfRangeException', () => {
        const minutes = [-1, 60];
        for (let minute of minutes) {
            expect(() => new DateTime(1, 1, 1, 1, minute, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, minute, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, minute, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, minute, 1, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, minute, 1, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, minute, 1, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, minute, 1, 1, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidSecond_ThrowsArgumentOutOfRangeException', () => {
        const seconds = [-1, 60];
        for (let second of seconds) {
            expect(() => new DateTime(1, 1, 1, 1, 1, second)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, second, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, second, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, second, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, second, 1, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, second, 1, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, second, 1, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidMillisecond_ThrowsArgumentOutOfRangeException', () => {
        const milliseconds = [-1, 1000];
        for (let millisecond of milliseconds) {
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, millisecond)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, millisecond, DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, millisecond, new GregorianCalendar())).toThrowError(Error/*ArgumentOutOfRangeException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, millisecond, new GregorianCalendar(), DateTimeKind.utc)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }
    });

    it('Ctor_InvalidDateTimeKind_ThrowsArgumentException', () => {
        const kinds = [
            new DateTimeKind(-1),
            new DateTimeKind(3)
        ];

        for (let kind of kinds) {
            expect(() => new DateTime(0, kind)).toThrowError();
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, kind)).toThrowError(Error/*ArgumentException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, 1, kind)).toThrowError(Error/*ArgumentException*/);
            expect(() => new DateTime(1, 1, 1, 1, 1, 1, 1, new GregorianCalendar(), kind)).toThrowError(Error/*ArgumentException*/);
        }
    });

    it('Ctor_NullCalendar_ThrowsArgumentNullException', () => {
        expect(() => new DateTime(1, 1, 1, <any>null)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new DateTime(1, 1, 1, 1, 1, 1, <any>null)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new DateTime(1, 1, 1, 1, 1, 1, 1, <any>null)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new DateTime(1, 1, 1, 1, 1, 1, 1, <any>null, DateTimeKind.local)).toThrowError(Error/*ArgumentOutOfRangeException*/);
    });

    it('Ctor_OverflowingCalendar_ThrowsArgumentException', () => {
        class DateMaxCalendar extends Calendar {
            constructor() {
                super();
            }

            isLeapYear(_year: number): boolean {
                return false;
            }

            isLeapMonth(_year: number, _month: number): boolean {
                return false;
            }

            isLeapDay(_year: number, _month: number, _day: number): boolean {
                return false;
            }

            addYears(time: DateTime, _years: number): DateTime {
                return time;
            }

            addMonths(time: DateTime, _months: number): DateTime {
                return time;
            }

            getDayOfMonth(_time: DateTime): number {
                return 0;
            }

            getDayOfWeek(_time: DateTime): DayOfWeek {
                return DayOfWeek.Monday;
            }

            getDayOfYear(_time: DateTime): number {
                return 0;
            }

            getYear(_time: DateTime): number {
                return 0;
            }

            getMonth(_time: DateTime): number {
                return 0;
            }

            getMonthsInYear(_year: number): number {
                return 0;
            }

            getDaysInYear(_year: number): number {
                return 0;
            }
            getDaysInMonth(_year: number, _month: number): number {
                return 0;
            }

            toDateTime(_year: number, _month: number, _day: number, _hour: number, _minute: number, _second: number, _millisecond: number): DateTime {
                return DateTime.maxValue;
            }
        }

        expect(() => new DateTime(1, 1, 1, 1, 1, 1, 1, new DateMaxCalendar())).toThrowError(Error/*ArgumentException*/);
        expect(() => new DateTime(1, 1, 1, 1, 1, 1, 1, new DateMaxCalendar(), DateTimeKind.local)).toThrowError(Error/*ArgumentException*/);
    });

    it('DaysInMonth_Invoke_ReturnsExpected', () => {
        const memberData: [number, number, number][] = [
            [2004, 1, 31],
            [2004, 2, 29],
            [2004, 3, 31],
            [2004, 4, 30],
            [2004, 5, 31],
            [2004, 6, 30],
            [2004, 7, 31],
            [2004, 8, 31],
            [2004, 9, 30],
            [2004, 10, 31],
            [2004, 11, 30],
            [2004, 12, 31],
            [2005, 1, 31],
            [2005, 2, 28],
            [2005, 3, 31],
            [2005, 4, 30],
            [2005, 5, 31],
            [2005, 6, 30],
            [2005, 7, 31],
            [2005, 8, 31],
            [2005, 9, 30],
            [2005, 10, 31],
            [2005, 11, 30],
            [2005, 12, 31]
        ];

        function test(year: number, month: number, expected: number) {
            expect(expected).toBe(DateTime.daysInMonth(year, month));
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('DaysInMonth_InvalidMonth_ThrowsArgumentOutOfRangeException', () => {
        expect(() => DateTime.daysInMonth(1, 0)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => DateTime.daysInMonth(1, 13)).toThrowError(Error/*ArgumentOutOfRangeException*/);
    });

    it('DaysInMonth_InvalidYear_ThrowsArgumentOutOfRangeException', () => {
        expect(() => DateTime.daysInMonth(0, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => DateTime.daysInMonth(10000, 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
    });

    it('IsLeapYear_Invoke_ReturnsExpected', () => {
        const memberData: [number, boolean][] = [
            [2004, true],
            [2000, true],
            [1900, false],
            [2005, false]
        ];

        function test(year: number, expected: boolean) {
            expect(DateTime.isLeapYear(year)).toBe(expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('IsLeapYear_InvalidYear_ThrowsArgumentOutOfRangeException', () => {
        expect(() => DateTime.isLeapYear(0)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => DateTime.isLeapYear(10000)).toThrowError(Error/*ArgumentOutOfRangeException*/);
    });

    it('Add_TimeSpan_ReturnsExpected', () => {
        const memberData: [DateTime, TimeSpan, DateTime][] = [
            [new DateTime(1000), new TimeSpan(10), new DateTime(1010)],
            [new DateTime(1000), TimeSpan.zero, new DateTime(1000)],
            [new DateTime(1000), new TimeSpan(-10), new DateTime(990)]
        ];

        function test(dateTime: DateTime, timeSpan: TimeSpan, expected: DateTime) {
            expect(dateTime.add(timeSpan).equals(expected)).toBe(true);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('Add_TimeSpan_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, TimeSpan][] = [
            [DateTime.now, TimeSpan.maxValue],
            [DateTime.now, TimeSpan.minValue],
            [DateTime.maxValue, new TimeSpan(1)],
            [DateTime.minValue, new TimeSpan(-1)]
        ];

        function test(date: DateTime, value: TimeSpan) {
            expect(() => date.add(value)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddYears_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 10, new DateTime(1996, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -10, new DateTime(1976, 8, 15, 10, 20, 5, 70)]
        ];

        function test(dateTime: DateTime, years: number, expected: DateTime) {
            expect(+dateTime.addYears(years)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddYears_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number, string][] = [
            [DateTime.now, 10001, "value"],
            [DateTime.now, -10001, "value"],
            [DateTime.maxValue, 1, "months"],
            [DateTime.minValue, -1, "months"],
        ];

        //TODO: Add paramName to error check
        function test(date: DateTime, years: number, _paramName: string) {
            expect(() => date.addYears(years)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMonths_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 2, new DateTime(1986, 10, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 31, 10, 20, 5, 70), 1, new DateTime(1986, 9, 30, 10, 20, 5, 70)],
            [new DateTime(1986, 9, 30, 10, 20, 5, 70), 1, new DateTime(1986, 10, 30, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -2, new DateTime(1986, 6, 15, 10, 20, 5, 70)],
            [new DateTime(1900, 2, 28, 10, 20, 5, 70), 1, new DateTime(1900, 3, 28, 10, 20, 5, 70)],
            [new DateTime(1900, 1, 31, 10, 20, 5, 70), 1, new DateTime(1900, 2, 28, 10, 20, 5, 70)],
            [new DateTime(2000, 1, 31, 10, 20, 5, 70), 1, new DateTime(2000, 2, 29, 10, 20, 5, 70)],
            [new DateTime(2000, 2, 29, 10, 20, 5, 70), 1, new DateTime(2000, 3, 29, 10, 20, 5, 70)],
            [new DateTime(2004, 1, 31, 10, 20, 5, 70), 1, new DateTime(2004, 2, 29, 10, 20, 5, 70)],
            [new DateTime(2004, 2, 29, 10, 20, 5, 70), 1, new DateTime(2004, 3, 29, 10, 20, 5, 70)],
            [new DateTime(2000, 12, 31), 1, new DateTime(2001, 1, 31)]
        ];

        function test(dateTime: DateTime, months: number, expected: DateTime) {
            expect(+dateTime.addMonths(months)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMonths_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.now, 120001],
            [DateTime.now, -120001],
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1]
        ];

        function test(date: DateTime, months: number) {
            expect(() => date.addMonths(months)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddDays_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 2, new DateTime(1986, 8, 17, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 2, new DateTime(1986, 8, 17, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -2, new DateTime(1986, 8, 13, 10, 20, 5, 70)]
        ];

        function test(dateTime: DateTime, days: number, expected: DateTime) {
            expect(+dateTime.addDays(days)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddDays_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1],
            [DateTime.now, Number.MAX_SAFE_INTEGER],
            [DateTime.now, Number.MIN_SAFE_INTEGER]
        ];

        function test(date: DateTime, days: number) {
            expect(() => date.addDays(days)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddHours_Invoke_RetunsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 3, new DateTime(1986, 8, 15, 13, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -3, new DateTime(1986, 8, 15, 7, 20, 5, 70)]
        ];

        function test(dateTime: DateTime, hours: number, expected: DateTime) {
            expect(+dateTime.addHours(hours)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddHours_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1],
            [DateTime.now, Number.MAX_SAFE_INTEGER],
            [DateTime.now, Number.MIN_SAFE_INTEGER]
        ];

        function test(date: DateTime, hours: number) {
            expect(() => date.addHours(hours)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMinutes_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 5, new DateTime(1986, 8, 15, 10, 25, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -5, new DateTime(1986, 8, 15, 10, 15, 5, 70)]
        ];

        function test(dateTime: DateTime, minutes: number, expected: DateTime) {
            expect(+dateTime.addMinutes(minutes)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMinutes_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1],
            [DateTime.now, Number.MAX_SAFE_INTEGER],
            [DateTime.now, Number.MIN_SAFE_INTEGER]
        ];

        function test(date: DateTime, minutes: number) {
            expect(() => date.addMinutes(minutes)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddSeconds_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 30, new DateTime(1986, 8, 15, 10, 20, 35, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -3, new DateTime(1986, 8, 15, 10, 20, 2, 70)]
        ];

        function test(dateTime: DateTime, seconds: number, expected: DateTime) {
            expect(+dateTime.addSeconds(seconds)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddSeconds_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1],
            [DateTime.now, Number.MAX_SAFE_INTEGER],
            [DateTime.now, Number.MIN_SAFE_INTEGER]
        ];

        function test(date: DateTime, seconds: number) {
            expect(() => date.addSeconds(seconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMilliseconds_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 10, new DateTime(1986, 8, 15, 10, 20, 5, 80)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), 0, new DateTime(1986, 8, 15, 10, 20, 5, 70)],
            [new DateTime(1986, 8, 15, 10, 20, 5, 70), -10, new DateTime(1986, 8, 15, 10, 20, 5, 60)]
        ];

        function test(dateTime: DateTime, milliseconds: number, expected: DateTime) {
            expect(+dateTime.addMilliseconds(milliseconds)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMilliseconds_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1],
            [DateTime.now, Number.MAX_SAFE_INTEGER],
            [DateTime.now, Number.MIN_SAFE_INTEGER]
        ];

        function test(date: DateTime, milliseconds: number) {
            expect(() => date.addMilliseconds(milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddTicks_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, number, DateTime][] = [
            [new DateTime(1000), 10, new DateTime(1010)],
            [new DateTime(1000), 0, new DateTime(1000)],
            [new DateTime(1000), -10, new DateTime(990)]
        ];

        function test(dateTime: DateTime, ticks: number, expected: DateTime) {
            expect(+dateTime.addTicks(ticks)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('AddMilliseconds_NewDateOutOfRange_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, number][] = [
            [DateTime.maxValue, 1],
            [DateTime.minValue, -1],
            [DateTime.now, Number.MAX_SAFE_INTEGER],
            [DateTime.now, Number.MIN_SAFE_INTEGER]
        ];

        function test(date: DateTime, ticks: number) {
            expect(() => date.addTicks(ticks)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('CompareTo_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, any, number][] = [
            [new DateTime(10), new DateTime(10), 0],
            [new DateTime(10), new DateTime(11), -1],
            [new DateTime(10), new DateTime(9), 1],
            [new DateTime(10), null, 1],
        ];

        function test(date: DateTime, other: any, expected: number) {
            if (other instanceof DateTime) {
                expect(date.compareTo(other)).toBe(expected);
                expect(DateTime.compare(date, other)).toBe(expected);

                expect(expected > 0).toBe(+date > +other);
                expect(expected >= 0).toBe(+date >= +other);
                expect(expected < 0).toBe(+date < +other);
                expect(expected <= 0).toBe(+date <= +other);
            }

            expect(date.compareTo(other)).toBe(expected);
        }


        memberData.forEach(data => test.apply(null, data));
    });

    it('CompareTo_NotDateTime_ThrowsArgumentException', () => {
        expect(() => DateTime.now.compareTo(new Object())).toThrowError(Error/*ArgumentException*/);
    });

    it('Equals_Invoke_ReturnsExpected', () => {
        const memberData: [DateTime, any, boolean][] = [
            [new DateTime(10), new DateTime(10), true],
            [new DateTime(10), new DateTime(11), false],
            [new DateTime(10), new DateTime(9), false],
            [new DateTime(10), new Object(), false],
            [new DateTime(10), null, false]
        ];

        function test(date: DateTime, other: any, expected: boolean) {
            if (other instanceof DateTime) {
                expect(date.equals(other)).toBe(expected);
                expect(DateTime.equals(date, other)).toBe(expected);

                expect(+date == +other).toBe(expected);
                expect(+date != +other).toBe(!expected);
            }

            expect(date.equals(other)).toBe(expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('DayOfWeek_Get_ReturnsExpected', () => {
        const dateTime = new DateTime(2012, 6, 18);
        expect(dateTime.dayOfWeek).toBe(DayOfWeek.Monday);
    });

    it('DayOfYear_Get_ReturnsExpected', () => {
        const dateTime = new DateTime(2012, 6, 18);
        expect(dateTime.dayOfYear).toBe(170);
    });

    it('TimeOfDay_Get_ReturnsExpected', () => {
        const dateTime = new DateTime(2012, 6, 18, 10, 5, 1, 0);
        const ts = dateTime.timeOfDay;
        const newDate = dateTime.subtract(ts);
        expect(new DateTime(2012, 6, 18, 0, 0, 0, 0).ticks).toBe(newDate.ticks);
        expect(dateTime.ticks).toBe(newDate.add(ts).ticks);
    });

    it('Today_Get_ReturnsExpected', () => {
        debugger
        let today = DateTime.today;
        const now = DateTime.now;
        verifyDateTime(today, now.year, now.month, now.day, 0, 0, 0, 0, DateTimeKind.local);

        today = new DateTime(now.year, now.month, now.day, now.hour, now.minute, now.second, DateTimeKind.utc);
        expect(today.kind.value).toEqual(DateTimeKind.utc.value);
    });

    it('Subtract_TimeSpan_ReturnsExpected', () => {
        const dateTime = new DateTime(2012, 6, 18, 10, 5, 1, 0, DateTimeKind.utc);
        const memberData: [DateTime, TimeSpan, DateTime][] = [
            [dateTime, new TimeSpan(10, 5, 1), new DateTime(2012, 6, 18, 0, 0, 0, 0, DateTimeKind.utc)],
            [dateTime, new TimeSpan(-10, -5, -1), new DateTime(2012, 6, 18, 20, 10, 2, 0, DateTimeKind.utc)]
        ];

        function test(dateTime: DateTime, timeSpan: TimeSpan, expected: DateTime) {
            expect(+dateTime.subtract(timeSpan)).toBe(+expected);
            expect(+dateTime - (+timeSpan)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('Subtract_OutOfRangeTimeSpan_ThrowsArgumentOutOfRangeException', () => {
        const memberData: [DateTime, TimeSpan][] = [
            [DateTime.now, TimeSpan.minValue],
            [DateTime.now, TimeSpan.maxValue],
            [DateTime.maxValue, new TimeSpan(-1)],
            [DateTime.minValue, new TimeSpan(1)],
        ];

        function test(date: DateTime, value: TimeSpan) {
            expect(() => date.subtract(value)).toThrowError(Error/**/);
            //expect(() => +date - (+value)).toThrowError(Error/**/);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('Subtract_DateTime_ReturnsExpected', () => {
        const dateTime1 = new DateTime(1996, 6, 3, 22, 15, 0, DateTimeKind.utc);
        const dateTime2 = new DateTime(1996, 12, 6, 13, 2, 0, DateTimeKind.utc);

        const memberData: [DateTime, DateTime, TimeSpan][] = [
            [dateTime2, dateTime1, new TimeSpan(185, 14, 47, 0)],
            [dateTime1, dateTime2, new TimeSpan(-185, -14, -47, 0)],
            [dateTime1, dateTime2, new TimeSpan(-185, -14, -47, 0)]
        ];

        function test(dateTime1: DateTime, dateTime2: DateTime, expected: TimeSpan) {
            expect(+dateTime1.subtract(dateTime2)).toBe(+expected);
            expect(+dateTime1 - (+dateTime2)).toBe(+expected);
        }

        memberData.forEach(data => test.apply(null, data));
    });

    it('TestTimeSynchronizationWithTheSystem', () => {
        const st = new Date();
        const dt = DateTime.utcNow;
        const st1 = new Date();
        const systemDateTimeNow1 = new DateTime(st.getUTCFullYear(), st.getUTCMonth() + 1, st.getUTCDate(), st.getUTCHours(), st.getUTCMinutes(), st.getUTCSeconds(), st.getUTCMilliseconds(), DateTimeKind.utc);
        const systemDateTimeNow2 = new DateTime(st1.getUTCFullYear(), st1.getUTCMonth() + 1, st1.getUTCDate(), st1.getUTCHours(), st1.getUTCMinutes(), st1.getUTCSeconds(), st1.getUTCMilliseconds(), DateTimeKind.utc);
        let diff = systemDateTimeNow2.subtract(systemDateTimeNow1);
        if (+diff < +TimeSpan.fromSeconds(1)) {
            diff = dt.subtract(systemDateTimeNow1);
            expect(+diff < +TimeSpan.fromSeconds(1)).toBeTruthy();
        }
    });

    it('UnixEpoch', () => verifyDateTime(DateTime.unixEpoch, 1970, 1, 1, 0, 0, 0, 0, DateTimeKind.utc));

    function verifyDateTime(dateTime: DateTime, year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, kind: DateTimeKind): void {
        expect(year).toBe(dateTime.year);
        expect(month).toBe(dateTime.month);
        expect(day).toBe(dateTime.day);
        expect(hour).toBe(dateTime.hour);
        expect(minute).toBe(dateTime.minute);
        expect(second).toBe(dateTime.second);
        expect(millisecond).toBe(dateTime.millisecond);
        expect(kind).toBe(dateTime.kind);
    }
});