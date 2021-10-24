import { TimeSpan } from "@xobin/globalization";
import { int, Nullable } from '@xobin/core';

describe('TimeSpan class', () => {

    it('TimeSpan.maxValue', () => verifyTimeSpan(TimeSpan.maxValue, 104249991, 8, 59, 0, 991));

    it('TimeSpan.minValue', () => verifyTimeSpan(TimeSpan.minValue, -104249991, -8, -59, 0, -991));

    it('TimeSpan.zero', () => verifyTimeSpan(TimeSpan.zero, 0, 0, 0, 0, 0));

    it('constructor()', () => verifyTimeSpan(new TimeSpan(), 0, 0, 0, 0, 0));

    it('constructor(ticks: number)', () => verifyTimeSpan(new TimeSpan(Number.MAX_SAFE_INTEGER), 104249991, 8, 59, 0, 991));

    it('constructor(hours: number, minutes: number, seconds: number)', () => {
        const timeSpan = new TimeSpan(10, 9, 8);
        verifyTimeSpan(timeSpan, 0, 10, 9, 8, 0);
    });

    it('Invalid constructor(hours: number, minutes: number, seconds: number)', () => {
        expect(() => new TimeSpan(int(TimeSpan.minValue.totalHours) - 1, 0, 0)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(int(TimeSpan.maxValue.totalHours) + 1, 0, 0)).toThrowError(Error/*ArgumentOutOfRangeException*/);
    });

    it('constructor(hours: number, minutes: number, seconds: number)', () => verifyTimeSpan(new TimeSpan(10, 9, 8), 0, 10, 9, 8, 0));

    it('constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number)', () => verifyTimeSpan(new TimeSpan(10, 9, 8, 7, 6), 10, 9, 8, 7, 6));

    it('Invalid constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number)', () => {
        const min = TimeSpan.minValue;
        expect(() => new TimeSpan(min.days - 1, min.hours, min.minutes, min.seconds, min.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);

        expect(() => new TimeSpan(min.days, min.hours - 1, min.minutes, min.seconds, min.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(min.days, min.hours, min.minutes - 1, min.seconds, min.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(min.days, min.hours, min.minutes, min.seconds - 1, min.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(min.days, min.hours, min.minutes, min.seconds, min.milliseconds - 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);

        const max = TimeSpan.maxValue;
        expect(() => new TimeSpan(max.days + 1, max.hours, max.minutes, max.seconds, max.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(max.days, max.hours + 1, max.minutes, max.seconds, max.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(max.days, max.hours, max.minutes + 1, max.seconds, max.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(max.days, max.hours, max.minutes, max.seconds + 1, max.milliseconds)).toThrowError(Error/*ArgumentOutOfRangeException*/);
        expect(() => new TimeSpan(max.days, max.hours, max.minutes, max.seconds, max.milliseconds + 1)).toThrowError(Error/*ArgumentOutOfRangeException*/);
    });

    it('Total_Days_Hours_Minutes_Seconds_Milliseconds', () => {
        const memberData = [
            [new TimeSpan(0, 0, 0, 0, 0), 0.0, 0.0, 0.0, 0.0, 0.0],
            [new TimeSpan(0, 0, 0, 0, 500), 0.5 / 60.0 / 60.0 / 24.0, 0.5 / 60.0 / 60.0, 0.5 / 60.0, 0.5, 500.0],
            [new TimeSpan(0, 1, 0, 0, 0), 1 / 24.0, 1, 60, 3600, 3600000],
            [new TimeSpan(1, 0, 0, 0, 0), 1, 24, 1440, 86400, 86400000],
            [new TimeSpan(1, 1, 0, 0, 0), 25.0 / 24.0, 25, 1500, 90000, 90000000]
        ];

        for (let data of memberData) {
            const timeSpan = data[0] as TimeSpan;
            const expectedDays = data[1];
            const expectedHours = data[2];
            const expectedMinutes = data[3];
            const expectedSeconds = data[4];
            const expectedMilliseconds = data[5];

            // Use ToString() to prevent any rounding errors when comparing
            //Assert.Equal(expectedDays.ToString("G15"), timeSpan.TotalDays.ToString("G15"));
            expect(expectedDays).toBe(timeSpan.totalDays);
            expect(expectedHours).toBe(timeSpan.totalHours);
            expect(expectedMinutes).toBe(timeSpan.totalMinutes);
            expect(expectedSeconds).toBe(timeSpan.totalSeconds);
            expect(expectedMilliseconds).toBe(timeSpan.totalMilliseconds);
        }
    });

    it('TotalMilliseconds_Invalid', () => {
        const maxMilliseconds = 9007199254740991 / 1000;
        const minMilliseconds = -9007199254740991 / 1000;
        expect(maxMilliseconds).toBe(TimeSpan.maxValue.totalMilliseconds);
        expect(minMilliseconds).toBe(TimeSpan.minValue.totalMilliseconds);
    });

    it('TimeSpan.Add', () => {
        const memberData = [
            [new TimeSpan(0, 0, 0), new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3)],
            [new TimeSpan(1, 2, 3), new TimeSpan(4, 5, 6), new TimeSpan(5, 7, 9)],
            [new TimeSpan(1, 2, 3), new TimeSpan(-4, -5, -6), new TimeSpan(-3, -3, -3)],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3), new TimeSpan(1, 3, 5, 7, 5)],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(10, 12, 13, 14, 15), new TimeSpan(11, 14, 16, 18, 20)],
            [new TimeSpan(10000), new TimeSpan(200000), new TimeSpan(210000)]
        ];

        for (let data of memberData) {
            const timeSpan1 = data[0]!;
            const timeSpan2 = data[1]!;
            const expected = data[2]!;

            expect(timeSpan1.add(timeSpan2).ticks).toBe(expected.ticks);
        }
    });

    it('Add_Invalid', () => {
        expect(() => TimeSpan.maxValue.add(new TimeSpan(1))).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.minValue.add(new TimeSpan(-1))).toThrowError(Error/*OverflowException*/);
    });

    it('FromMinMaxValue_DoesNotThrow', () => {
        const maxTimeSpan = TimeSpan.fromDays(TimeSpan.maxValue.totalDays);
        const minTimeSpan = TimeSpan.fromDays(TimeSpan.minValue.totalDays);

        expect(maxTimeSpan.equals(TimeSpan.maxValue)).toBe(true);
        expect(minTimeSpan.equals(TimeSpan.minValue)).toBe(true);
    });

    it('compareTo', () => {
        const memberData: [TimeSpan, Nullable<object>, number][] = [
            [new TimeSpan(10000), new TimeSpan(10000), 0],
            [new TimeSpan(20000), new TimeSpan(10000), 1],
            [new TimeSpan(10000), new TimeSpan(20000), -1],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3), 0],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 4), -1],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 2), 1],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 3, 3), -1],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 1, 3), 1],
            [new TimeSpan(1, 2, 3), new TimeSpan(2, 2, 3), -1],
            [new TimeSpan(1, 2, 3), new TimeSpan(0, 2, 3), 1],

            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 4), 0],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 5), -1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 3), 1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 4, 4), -1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 2, 4), 1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 3, 3, 4), -1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 1, 3, 4), 1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(2, 2, 3, 4), -1],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(0, 2, 3, 4), 1],

            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 5), 0],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 6), -1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 4), 1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 5, 5), -1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 3, 5), 1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 4, 4, 5), -1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 2, 4, 5), 1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 3, 3, 4, 5), -1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 1, 3, 4, 5), 1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 2, 3, 4, 5), -1],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(0, 2, 3, 4, 5), 1],

            [new TimeSpan(10000), null, 1]
        ];

        function compareTo(timeSpan: TimeSpan, obj: Nullable<object>, expected: number) {
            if (obj instanceof TimeSpan) {
                expect(expected).toBe(Math.sign(timeSpan.compareTo(obj)));
                expect(expected).toBe(Math.sign(TimeSpan.compare(timeSpan, obj)));
            }

            expect(expected).toBe(Math.sign(timeSpan.compareTo(obj)));
        }

        memberData.forEach(data => compareTo.apply(null, data));
    });

    it('CompareTo_ObjectNotTimeSpan_ThrowsArgumentException', () => {
        expect(() => {
            const comparable = new TimeSpan(10000);
            comparable.compareTo(Object(10));
        }).toThrowError(Error/*ArgumentException*/);
    });

    it('TimeSpan.duration', () => {
        const memberData: [TimeSpan, TimeSpan][] = [
            [new TimeSpan(0, 0, 0), new TimeSpan(0, 0, 0)],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3)],
            [new TimeSpan(-1, -2, -3), new TimeSpan(1, 2, 3)],
            [new TimeSpan(12345), new TimeSpan(12345)],
            [new TimeSpan(-12345), new TimeSpan(12345)]
        ];

        function duration(timeSpan: TimeSpan, expected: TimeSpan) {
            expect(expected.equals(timeSpan.duration())).toBeTruthy();
        }

        memberData.forEach(data => duration.apply(null, data));
    });

    it('Duration_Invalid', () => {
        expect(() => TimeSpan.minValue.duration()).toThrowError(Error/*OverflowException*/);
        expect(() => new TimeSpan(TimeSpan.minValue.ticks).duration()).toThrowError(Error/*OverflowException*/);
    });

    it('EqualsTest', () => {
        const memberData: [TimeSpan, Nullable<any>, boolean][] = [
            [new TimeSpan(0, 0, 0), new TimeSpan(0, 0, 0), true],

            [new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3), true],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 4), false],
            [new TimeSpan(1, 2, 3), new TimeSpan(1, 3, 3), false],
            [new TimeSpan(1, 2, 3), new TimeSpan(2, 2, 3), false],
            [new TimeSpan(1, 2, 3), new TimeSpan(0, 1, 2, 3), true],
            [new TimeSpan(1, 2, 3), new TimeSpan(0, 1, 2, 3, 0), true],

            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 4), true],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 5), false],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 4, 4), false],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 3, 3, 4), false],
            [new TimeSpan(1, 2, 3, 4), new TimeSpan(2, 2, 3, 4), false],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 3, 4), false],

            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 5), true],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 6), false],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 5, 5), false],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 4, 4, 5), false],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 3, 3, 4, 5), false],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 2, 3, 4, 5), false],

            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4), false],
            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 2, 3), false],

            [new TimeSpan(10000), new TimeSpan(10000), true],
            [new TimeSpan(10000), new TimeSpan(20000), false],

            //[new TimeSpan(10000), "20000", false],
            //[new TimeSpan(10000), null, false],
        ];

        function equalsTest(timeSpan: TimeSpan, obj: any, expected: boolean) {
            if (obj instanceof TimeSpan) {
                expect(expected).toBe(TimeSpan.equals(timeSpan, obj));
                expect(expected).toBe(timeSpan.equals(obj));
            }

            //expect(expected).toBe(timeSpan.equals(obj));
        }

        memberData.forEach(data => equalsTest.apply(null, data));
    });

    it('FromDays', () => {
        const memberData: [number, TimeSpan][] = [
            [100.5, new TimeSpan(100, 12, 0, 0)],
            [2.5, new TimeSpan(2, 12, 0, 0)],
            [1.0, new TimeSpan(1, 0, 0, 0)],
            [0.0, new TimeSpan(0, 0, 0, 0)],
            [-1.0, new TimeSpan(-1, 0, 0, 0)],
            [-2.5, new TimeSpan(-2, -12, 0, 0)],
            [-100.5, new TimeSpan(-100, -12, 0, 0)]
        ];

        function fromDays(value: number, expected: TimeSpan) {
            expect(expected.equals(TimeSpan.fromDays(value))).toBeTruthy();
        }

        memberData.forEach(data => fromDays.apply(null, data));
    });

    it('FromDays_Invalid', () => {
        expect(() => TimeSpan.fromDays(Number.POSITIVE_INFINITY)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromDays(Number.NEGATIVE_INFINITY)).toThrowError(Error/*OverflowException*/);

        const maxDays = Number.MAX_SAFE_INTEGER / (1000.0 / 60.0 / 60.0 / 24.0);
        expect(() => TimeSpan.fromDays(maxDays)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromDays(-maxDays)).toThrowError(Error/*OverflowException*/);

        expect(() => TimeSpan.fromMinutes(Number.NaN)).toThrowError(Error/*OverflowException*/);
    });

    it('FromHours', () => {
        const memberData: [number, TimeSpan][] = [
            [100.5, new TimeSpan(4, 4, 30, 0)],
            [2.5, new TimeSpan(2, 30, 0)],
            [1.0, new TimeSpan(1, 0, 0)],
            [0.0, new TimeSpan(0, 0, 0)],
            [-1.0, new TimeSpan(-1, 0, 0)],
            [-2.5, new TimeSpan(-2, -30, 0)],
            [-100.5, new TimeSpan(-4, -4, -30, 0)]
        ];

        function fromHours(value: number, expected: TimeSpan) {
            expect(expected.equals(TimeSpan.fromHours(value))).toBeTruthy();
        }

        memberData.forEach(data => fromHours.apply(null, data));
    });

    it('FromHours_Invalid', () => {
        expect(() => TimeSpan.fromHours(Number.POSITIVE_INFINITY)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromHours(Number.NEGATIVE_INFINITY)).toThrowError(Error/*OverflowException*/);

        const maxHours = Number.MAX_SAFE_INTEGER / (1000.0 / 60.0 / 60.0);
        expect(() => TimeSpan.fromHours(maxHours)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromHours(-maxHours)).toThrowError(Error/*OverflowException*/);

        expect(() => TimeSpan.fromMinutes(Number.NaN)).toThrowError(Error/*OverflowException*/);
    });

    it('FromMinutes', () => {
        const memberData: [number, TimeSpan][] = [
            [100.5, new TimeSpan(1, 40, 30)],
            [2.5, new TimeSpan(0, 2, 30)],
            [1.0, new TimeSpan(0, 1, 0)],
            [0.0, new TimeSpan(0, 0, 0)],
            [-1.0, new TimeSpan(0, -1, 0)],
            [-2.5, new TimeSpan(0, -2, -30)],
            [-100.5, new TimeSpan(-1, -40, -30)],
        ];

        function fromMinutes(value: number, expected: TimeSpan) {
            expect(expected.equals(TimeSpan.fromMinutes(value))).toBeTruthy();
        }

        memberData.forEach(data => fromMinutes.apply(null, data));
    });

    it('FromMinutes_Invalid', () => {
        expect(() => TimeSpan.fromMinutes(Number.POSITIVE_INFINITY)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromMinutes(Number.NEGATIVE_INFINITY)).toThrowError(Error/*OverflowException*/);

        const maxMinutes = Number.MAX_SAFE_INTEGER / (1000.0 / 60.0);
        expect(() => TimeSpan.fromMinutes(maxMinutes)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromMinutes(-maxMinutes)).toThrowError(Error/*OverflowException*/);

        expect(() => TimeSpan.fromMinutes(Number.NaN)).toThrowError(Error/*OverflowException*/);
    });

    it('FromSeconds', () => {
        const memberData: [number, TimeSpan][] = [
            [100.5, new TimeSpan(0, 0, 1, 40, 500)],
            [2.5, new TimeSpan(0, 0, 0, 2, 500)],
            [1.0, new TimeSpan(0, 0, 0, 1, 0)],
            [0.0, new TimeSpan(0, 0, 0, 0, 0)],
            [-1.0, new TimeSpan(0, 0, 0, -1, 0)],
            [-2.5, new TimeSpan(0, 0, 0, -2, -500)],
            [-100.5, new TimeSpan(0, 0, -1, -40, -500)],
        ];

        function fromSeconds(value: number, expected: TimeSpan) {
            expect(expected.equals(TimeSpan.fromSeconds(value))).toBeTruthy();
        }

        memberData.forEach(data => fromSeconds.apply(null, data));
    });

    it('FromSeconds_Invalid', () => {
        expect(() => TimeSpan.fromSeconds(Number.POSITIVE_INFINITY)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromSeconds(Number.NEGATIVE_INFINITY)).toThrowError(Error/*OverflowException*/);

        const maxSeconds = (Number.MAX_SAFE_INTEGER / 1000.0) + 1;
        expect(() => TimeSpan.fromSeconds(maxSeconds)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromSeconds(-maxSeconds)).toThrowError(Error/*OverflowException*/);

        expect(() => TimeSpan.fromSeconds(Number.NaN)).toThrowError(Error/*OverflowException*/);
    });

    it('FromMilliseconds', () => {
        const memberData: [number, TimeSpan][] = [
            [1500.5, new TimeSpan(1500.5)],
            [2.5, new TimeSpan(2.5)],
            [1.0, new TimeSpan(1.0)],
            [0.0, new TimeSpan(0)],
            [-1.0, new TimeSpan(-1.0)],
            [-2.5, new TimeSpan(-2.5)],
            [-1500.5, new TimeSpan(-1500.5)]
        ];

        function fromMilliseconds(value: number, expected: TimeSpan) {
            expect(expected.equals(TimeSpan.fromMilliseconds(value))).toBeTruthy();
        }

        memberData.forEach(data => fromMilliseconds.apply(null, data));
    });

    it('FromMilliseconds_Invalid', () => {
        expect(() => TimeSpan.fromMilliseconds(Number.POSITIVE_INFINITY)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromMilliseconds(Number.NEGATIVE_INFINITY)).toThrowError(Error/*OverflowException*/);

        const maxMilliseconds = TimeSpan.maxValue.ticks / 1 + 1;
        expect(() => TimeSpan.fromMilliseconds(maxMilliseconds)).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.fromMilliseconds(-maxMilliseconds)).toThrowError(Error/*OverflowException*/);

        expect(() => TimeSpan.fromMilliseconds(Number.NaN)).toThrowError(Error/*OverflowException*/);
    });

    it('TotalSeconds_ExactRepresentation', () => {
        const memberData: [TimeSpan][] = [
            [new TimeSpan(0, 0, 0, 0, 0)],
            [new TimeSpan(0, 0, 0, 1, 0)],
            [new TimeSpan(0, 0, 0, 1, 100)],
            [new TimeSpan(0, 0, 0, 0, -100)],
            [new TimeSpan(0, 0, 0, 0, 34967800)]
        ];

        function fromSeconds(value: TimeSpan) {
            expect(value.equals(TimeSpan.fromSeconds(value.totalSeconds))).toBeTruthy();
        }

        memberData.forEach(data => fromSeconds.apply(null, data));
    });

    it('Negate', () => {
        const memberData: [TimeSpan, TimeSpan][] = [
            [new TimeSpan(0, 0, 0), new TimeSpan(0, 0, 0)],
            [new TimeSpan(1, 2, 3), new TimeSpan(-1, -2, -3)],
            [new TimeSpan(-1, -2, -3), new TimeSpan(1, 2, 3)],
            [new TimeSpan(12345), new TimeSpan(-12345)],
            [new TimeSpan(-12345), new TimeSpan(12345)]
        ];

        function negate(timeSpan: TimeSpan, expected: TimeSpan) {
            expect(expected.equals(timeSpan.negate())).toBeTruthy();
        }

        memberData.forEach(data => negate.apply(null, data));
    });

    it('Negate_Invalid', () => {
        expect(() => TimeSpan.minValue.negate()).toThrowError(Error/*OverflowException*/);
    });

    it('Subtract', () => {
        const memberData: [TimeSpan, TimeSpan, TimeSpan][] = [
            [new TimeSpan(0, 0, 0), new TimeSpan(1, 2, 3), new TimeSpan(-1, -2, -3)],
            [new TimeSpan(1, 2, 3), new TimeSpan(4, 5, 6), new TimeSpan(-3, -3, -3)],
            [new TimeSpan(1, 2, 3), new TimeSpan(-4, -5, -6), new TimeSpan(5, 7, 9)],

            [new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3), new TimeSpan(1, 1, 1, 1, 5)],
            [new TimeSpan(10, 11, 12, 13, 14), new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(9, 9, 9, 9, 9)],
            [new TimeSpan(200000), new TimeSpan(10000), new TimeSpan(190000)]
        ];

        function subtract(ts1: TimeSpan, ts2: TimeSpan, expected: TimeSpan) {
            expect(ts1.subtract(ts2).equals(expected)).toBeTruthy();
        }

        memberData.forEach(data => subtract.apply(null, data));
    });

    it('Subtract_Invalid', () => {
        expect(() => TimeSpan.maxValue.subtract(new TimeSpan(-1))).toThrowError(Error/*OverflowException*/);
        expect(() => TimeSpan.minValue.subtract(new TimeSpan(1))).toThrowError(Error/*OverflowException*/);
    });

    it('ConvertToTimeSpanPrecisionTest', () => {
        expect(TimeSpan.fromMilliseconds(1.23456).ticks).toBe(1);
        expect(TimeSpan.fromMilliseconds(1.234567).ticks).toBe(1);

        expect(TimeSpan.fromSeconds(1.23456).ticks).toBe(1234);

        expect(TimeSpan.fromMinutes(1.23456).ticks).toBe(int(1.23456 * 60 * 1000));
    });

    function verifyTimeSpan(timeSpan: TimeSpan, days: number, hours: number, minutes: number, seconds: number, milliseconds: number): void {
        expect(days).toBe(timeSpan.days);
        expect(hours).toBe(timeSpan.hours);
        expect(minutes).toBe(timeSpan.minutes);
        expect(seconds).toBe(timeSpan.seconds);
        expect(milliseconds).toBe(timeSpan.milliseconds);

        //Assert.Equal(timeSpan, +timeSpan);
    }

});