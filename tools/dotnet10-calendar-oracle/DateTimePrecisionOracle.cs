using System.Text.Json;

// Official Precision_TestData from dotnet/runtime v10.0.7 DateTimeTests.cs.
internal static class DateTimePrecisionOracle
{
        public enum DateTimeUnits
        {
            Microsecond,
            Millisecond,
            Second,
            Minute,
            Hour,
            Day
        }

        private static double MaxMicroseconds { get; } = GetMaxMicroseconds();

        // DateTime.MaxValue.Ticks / TimeSpan.TicksPerMicrosecond gives the number 315537897599999999.
        // This number cannot represented as a double number and will get rounded to 315537897600000000 which will exceed the Max of Microseconds.
        // GetMaxMicroseconds just calculate the greatest double number which can be used as Microseconds Max and not exceeding 315537897599999999.
        private static double GetMaxMicroseconds()
        {
            long max = DateTime.MaxValue.Ticks / TimeSpan.TicksPerMicrosecond;
            double maxMicroseconds = max;

            while ((long)Math.Truncate(maxMicroseconds) > max)
            {
                max--;
                maxMicroseconds = max;
            };

            return maxMicroseconds;
        }

        private static long MaxMilliseconds = DateTime.MaxValue.Ticks / TimeSpan.TicksPerMillisecond;
        private static long MaxSeconds = DateTime.MaxValue.Ticks / TimeSpan.TicksPerSecond;
        private static long MaxMinutes = DateTime.MaxValue.Ticks / TimeSpan.TicksPerMinute;
        private static long MaxHours = DateTime.MaxValue.Ticks / TimeSpan.TicksPerHour;
        private static long MaxDays = DateTime.MaxValue.Ticks / TimeSpan.TicksPerDay;

        public static IEnumerable<object[]> Precision_TestData()
        {
            yield return new object[] { 0.9999999, DateTime.MinValue, DateTimeUnits.Microsecond, false, (long)(0.9999999 * TimeSpan.TicksPerMicrosecond) };
            yield return new object[] { 0.9999999, DateTime.MaxValue, DateTimeUnits.Microsecond, true, 1 /* not important as the call should throws */ };
            yield return new object[] { 0.9999999, DateTime.MaxValue, DateTimeUnits.Millisecond, true, 1 /* not important as the call should throws */ };
            yield return new object[] { 0.9999999, DateTime.MaxValue, DateTimeUnits.Second, true, 1 /* not important as the call should throws */ };
            yield return new object[] { 0.9999999, DateTime.MaxValue, DateTimeUnits.Minute, true, 1 /* not important as the call should throws */ };
            yield return new object[] { 0.9999999, DateTime.MaxValue, DateTimeUnits.Hour, true, 1 /* not important as the call should throws */ };
            yield return new object[] { 0.9999999, DateTime.MaxValue, DateTimeUnits.Day, true, 1 /* not important as the call should throws */ };
            yield return new object[] { -0.9999999, DateTime.MinValue, DateTimeUnits.Microsecond, true, 1 /* not important as the call should throws */ };
            yield return new object[] { -0.9999999, DateTime.MinValue, DateTimeUnits.Millisecond, true, 1 /* not important as the call should throws */ };
            yield return new object[] { -0.9999999, DateTime.MinValue, DateTimeUnits.Second, true, 1 /* not important as the call should throws */ };
            yield return new object[] { -0.9999999, DateTime.MinValue, DateTimeUnits.Minute, true, 1 /* not important as the call should throws */ };
            yield return new object[] { -0.9999999, DateTime.MinValue, DateTimeUnits.Hour, true, 1 /* not important as the call should throws */ };
            yield return new object[] { -0.9999999, DateTime.MinValue, DateTimeUnits.Day, true, 1 /* not important as the call should throws */ };

            long calculatedMaxMicroseconds = (long)Math.Truncate(MaxMicroseconds) * TimeSpan.TicksPerMicrosecond + (long)((MaxMicroseconds - Math.Truncate(MaxMicroseconds)) * TimeSpan.TicksPerMicrosecond);
            yield return new object[] { MaxMicroseconds, DateTime.MinValue, DateTimeUnits.Microsecond, false, calculatedMaxMicroseconds };
            yield return new object[] { calculatedMaxMicroseconds + 1, DateTime.MinValue, DateTimeUnits.Microsecond, true, 1 /* not important as the call should throws */ };
            yield return new object[] { MaxMilliseconds, DateTime.MinValue, DateTimeUnits.Millisecond, false,  (long)(MaxMilliseconds * TimeSpan.TicksPerMillisecond) };
            yield return new object[] { MaxMilliseconds + 1, DateTime.MinValue, DateTimeUnits.Millisecond, true, 1 /* not important as the call should throws */ };
            yield return new object[] { MaxSeconds, DateTime.MinValue, DateTimeUnits.Second, false,  (long)(MaxSeconds * TimeSpan.TicksPerSecond) };
            yield return new object[] { MaxSeconds + 1, DateTime.MinValue, DateTimeUnits.Second, true, 1 /* not important as the call should throws */ };
            yield return new object[] { MaxMinutes, DateTime.MinValue, DateTimeUnits.Minute, false,  (long)(MaxMinutes * TimeSpan.TicksPerMinute)  };
            yield return new object[] { MaxMinutes + 1, DateTime.MinValue, DateTimeUnits.Minute, true, 1 /* not important as the call should throws */ };
            yield return new object[] { MaxHours, DateTime.MinValue, DateTimeUnits.Hour, false,  (long)(MaxHours * TimeSpan.TicksPerHour)  };
            yield return new object[] { MaxHours + 1, DateTime.MinValue, DateTimeUnits.Hour, true, 1 /* not important as the call should throws */ };
            yield return new object[] { MaxDays, DateTime.MinValue, DateTimeUnits.Day, false,  (long)(MaxDays * TimeSpan.TicksPerDay)  };
            yield return new object[] { MaxDays + 1, DateTime.MinValue, DateTimeUnits.Day, true, 1 /* not important as the call should throws */ };
        }

    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (object[] data in Precision_TestData())
        {
            double value = Convert.ToDouble(data[0]);
            var date = (DateTime)data[1];
            var unit = (DateTimeUnits)data[2];
            bool throws = (bool)data[3];
            long expected = Convert.ToInt64(data[4]);
            DateTime? result = null;
            Exception? error = null;
            try { result = unit switch {
                DateTimeUnits.Microsecond => date.AddMicroseconds(value),
                DateTimeUnits.Millisecond => date.AddMilliseconds(value),
                DateTimeUnits.Second => date.AddSeconds(value),
                DateTimeUnits.Minute => date.AddMinutes(value),
                DateTimeUnits.Hour => date.AddHours(value),
                _ => date.AddDays(value) }; }
            catch (Exception e) { error = e; }
            if (throws != (error != null) || (!throws && result!.Value.Ticks != expected))
                throw new InvalidOperationException("Official precision assertion failed.");
            string operation = unit switch { DateTimeUnits.Microsecond => "addMicroseconds",
                DateTimeUnits.Millisecond => "addMilliseconds", DateTimeUnits.Second => "addSeconds",
                DateTimeUnits.Minute => "addMinutes", DateTimeUnits.Hour => "addHours", _ => "addDays" };
            rows.Add(new { source = "DateTimeTests.TestDateTimeCalculationPrecision", operation, value,
                inputTicks = date.Ticks.ToString(), result = result?.Ticks.ToString(),
                error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName, message = error?.Message });
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
