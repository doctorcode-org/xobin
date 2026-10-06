using System.Globalization;
using System.Text.Json;

internal static class DateTimeConstructorOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();
        var nullCalendarRows = new List<string>();

        void Capture(List<string> target, string source, string input, string variant, Action action)
        {
            try
            {
                action();
            }
            catch (Exception error)
            {
                var argument = error as ArgumentException;
                target.Add(JsonSerializer.Serialize(new
                {
                    source,
                    input,
                    variant,
                    error = error.GetType().Name,
                    paramName = argument?.ParamName,
                    message = error.Message,
                    actualValue = (error as ArgumentOutOfRangeException)?.ActualValue?.ToString(),
                }));
                return;
            }
            throw new InvalidOperationException($"Expected an exception: {source}/{input}/{variant}.");
        }

        foreach (long ticks in new[] { DateTime.MinValue.Ticks - 1, DateTime.MaxValue.Ticks + 1 })
        {
            const string source = "DateTimeTests.Ctor_InvalidTicks_ThrowsArgumentOutOfRangeException";
            Capture(rows, source, ticks.ToString(), "ticks", () => _ = new DateTime(ticks));
            Capture(rows, source, ticks.ToString(), "ticks-kind", () => _ = new DateTime(ticks, DateTimeKind.Utc));
        }

        void CaptureDatePart(string source, int value, Func<int, (int year, int month, int day)> date)
        {
            var (year, month, day) = date(value);
            var variants = new (string name, Action invoke)[]
            {
                ("date", () => _ = new DateTime(year, month, day)),
                ("date-calendar", () => _ = new DateTime(year, month, day, new GregorianCalendar())),
                ("date-time", () => _ = new DateTime(year, month, day, 1, 1, 1)),
                ("date-time-kind", () => _ = new DateTime(year, month, day, 1, 1, 1, DateTimeKind.Utc)),
                ("date-time-calendar", () => _ = new DateTime(year, month, day, 1, 1, 1, new GregorianCalendar())),
                ("date-time-millisecond", () => _ = new DateTime(year, month, day, 1, 1, 1, 1)),
                ("date-time-millisecond-kind", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, DateTimeKind.Utc)),
                ("date-time-millisecond-calendar", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, new GregorianCalendar())),
                ("date-time-millisecond-calendar-kind", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, new GregorianCalendar(), DateTimeKind.Utc)),
                ("date-time-millisecond-microsecond", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, 1)),
                ("date-time-millisecond-microsecond-kind", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, 1, DateTimeKind.Utc)),
                ("date-time-millisecond-microsecond-calendar", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, 1, new GregorianCalendar())),
                ("date-time-millisecond-microsecond-calendar-kind", () => _ = new DateTime(year, month, day, 1, 1, 1, 1, 1, new GregorianCalendar(), DateTimeKind.Utc)),
            };
            foreach (var (variant, invoke) in variants)
                Capture(rows, source, value.ToString(), variant, invoke);
        }

        foreach (int value in new[] { 0, 10000 })
            CaptureDatePart("DateTimeTests.Ctor_InvalidYear_ThrowsArgumentOutOfRangeException", value, value => (value, 1, 1));
        foreach (int value in new[] { 0, 13 })
            CaptureDatePart("DateTimeTests.Ctor_InvalidMonth_ThrowsArgumentOutOfRangeException", value, value => (1, value, 1));
        foreach (int value in new[] { 0, 32 })
            CaptureDatePart("DateTimeTests.Ctor_InvalidDay_ThrowsArgumentOutOfRangeException", value, value => (1, 1, value));

        void CaptureTimePart(string source, int value, Func<int, (int hour, int minute, int second)> time, bool includeCalendarOnly)
        {
            var (hour, minute, second) = time(value);
            var variants = new List<(string name, Action invoke)>
            {
                ("date-time", () => _ = new DateTime(1, 1, 1, hour, minute, second)),
                ("date-time-kind", () => _ = new DateTime(1, 1, 1, hour, minute, second, DateTimeKind.Utc)),
                ("date-time-calendar", () => _ = new DateTime(1, 1, 1, hour, minute, second, new GregorianCalendar())),
                ("date-time-millisecond", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1)),
                ("date-time-millisecond-kind", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, DateTimeKind.Utc)),
            };
            if (includeCalendarOnly)
                variants.Add(("date-time-millisecond-calendar", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, new GregorianCalendar())));
            variants.Add(("date-time-millisecond-calendar-kind", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, new GregorianCalendar(), DateTimeKind.Utc)));
            variants.Add(("date-time-millisecond-microsecond", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, 1)));
            variants.Add(("date-time-millisecond-microsecond-kind", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, 1, DateTimeKind.Utc)));
            if (includeCalendarOnly)
                variants.Add(("date-time-millisecond-microsecond-calendar", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, 1, new GregorianCalendar())));
            variants.Add(("date-time-millisecond-microsecond-calendar-kind", () => _ = new DateTime(1, 1, 1, hour, minute, second, 1, 1, new GregorianCalendar(), DateTimeKind.Utc)));
            foreach (var (variant, invoke) in variants)
                Capture(rows, source, value.ToString(), variant, invoke);
        }

        foreach (int value in new[] { -1, 24 })
            CaptureTimePart("DateTimeTests.Ctor_InvalidHour_ThrowsArgumentOutOfRangeException", value, value => (value, 1, 1), true);
        foreach (int value in new[] { -1, 60 })
            CaptureTimePart("DateTimeTests.Ctor_InvalidMinute_ThrowsArgumentOutOfRangeException", value, value => (1, value, 1), true);
        foreach (int value in new[] { -1, 60 })
            CaptureTimePart("DateTimeTests.Ctor_InvalidSecond_ThrowsArgumentOutOfRangeException", value, value => (1, 1, value), false);

        foreach (int value in new[] { -1, 1000 })
        {
            const string source = "DateTimeTests.Ctor_InvalidMillisecond_ThrowsArgumentOutOfRangeException";
            var variants = new (string name, Action invoke)[]
            {
                ("date-time-millisecond", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value)),
                ("date-time-millisecond-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, DateTimeKind.Utc)),
                ("date-time-millisecond-calendar", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, new GregorianCalendar())),
                ("date-time-millisecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, new GregorianCalendar(), DateTimeKind.Utc)),
                ("date-time-millisecond-microsecond", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, 1)),
                ("date-time-millisecond-microsecond-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, 1, DateTimeKind.Utc)),
                ("date-time-millisecond-microsecond-calendar", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, 1, new GregorianCalendar())),
                ("date-time-millisecond-microsecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value, 1, new GregorianCalendar(), DateTimeKind.Utc)),
            };
            foreach (var (variant, invoke) in variants)
                Capture(rows, source, value.ToString(), variant, invoke);
        }

        foreach (int value in new[] { -1, 1000 })
        {
            const string source = "DateTimeTests.Ctor_InvalidMicrosecond_ThrowsArgumentOutOfRangeException";
            var variants = new (string name, Action invoke)[]
            {
                ("date-time-millisecond-microsecond", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, value)),
                ("date-time-millisecond-microsecond-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, value, DateTimeKind.Utc)),
                ("date-time-millisecond-microsecond-calendar", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, value, new GregorianCalendar())),
                ("date-time-millisecond-microsecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, value, new GregorianCalendar(), DateTimeKind.Utc)),
            };
            foreach (var (variant, invoke) in variants)
                Capture(rows, source, value.ToString(), variant, invoke);
        }

        foreach (DateTimeKind value in new[] { DateTimeKind.Unspecified - 1, DateTimeKind.Local + 1 })
        {
            const string source = "DateTimeTests.Ctor_InvalidDateTimeKind_ThrowsArgumentException";
            var variants = new (string name, Action invoke)[]
            {
                ("ticks-kind", () => _ = new DateTime(0, value)),
                ("date-time-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, value)),
                ("date-time-millisecond-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, value)),
                ("date-time-millisecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, new GregorianCalendar(), value)),
                ("date-time-millisecond-microsecond-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, 1, value)),
                ("date-time-millisecond-microsecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, 1, new GregorianCalendar(), value)),
            };
            foreach (var (variant, invoke) in variants)
                Capture(rows, source, ((int)value).ToString(), variant, invoke);
        }

#pragma warning disable CS8625
        const string nullSource = "DateTimeTests.Ctor_NullCalendar_ThrowsArgumentNullException";
        var nullVariants = new (string name, Action invoke)[]
        {
            ("date-calendar", () => _ = new DateTime(1, 1, 1, null)),
            ("date-time-calendar", () => _ = new DateTime(1, 1, 1, 1, 1, 1, null)),
            ("date-time-millisecond-calendar", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, null)),
            ("date-time-millisecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, null, DateTimeKind.Local)),
            ("date-time-millisecond-microsecond-calendar", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, 1, null)),
            ("date-time-millisecond-microsecond-calendar-kind", () => _ = new DateTime(1, 1, 1, 1, 1, 1, 1, 1, null, DateTimeKind.Local)),
        };
#pragma warning restore CS8625
        foreach (var (variant, invoke) in nullVariants)
            Capture(nullCalendarRows, nullSource, "null", variant, invoke);

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ],\n  \"nullCalendar\": [\n"
            + string.Join(",\n", nullCalendarRows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
