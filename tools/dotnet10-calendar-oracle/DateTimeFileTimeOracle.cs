using System.Text.Json;

internal static class DateTimeFileTimeOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        void Capture(string source, string operation, DateTime? date, long? fileTime, Func<object> action)
        {
            object? result = null;
            Exception? error = null;
            try { result = action(); } catch (Exception e) { error = e; }
            rows.Add(new { source = "DateTimeTests." + source, operation,
                inputTicks = date?.Ticks.ToString(), inputKind = date.HasValue ? (int?)date.Value.Kind : null,
                fileTime = fileTime?.ToString(), result,
                error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName,
                message = error?.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
        }
        object Parts(DateTime date) => new { ticks = date.Ticks.ToString(), kind = (int)date.Kind };
        var epoch = new DateTime(1601, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        foreach (var date in new[] { epoch, epoch.AddTicks(1), new DateTime(2018, 12, 24, 0, 0, 0, DateTimeKind.Utc),
            new DateTime(2018, 11, 24, 17, 57, 30, 12, DateTimeKind.Utc),
            new DateTime(2018, 12, 24, 0, 0, 0, DateTimeKind.Local),
            new DateTime(2018, 11, 24, 17, 57, 30, 12, DateTimeKind.Local) })
            Capture("ToFileTime_Invoke_ReturnsExpected", "toFileTime", date, null, () => date.ToFileTime().ToString());
        foreach (var date in new[] { new DateTime(1601, 1, 1), new DateTime(1601, 1, 1).AddTicks(1),
            new DateTime(2018, 12, 24), new DateTime(2018, 12, 24, 0, 0, 0, DateTimeKind.Local),
            new DateTime(2018, 11, 24, 17, 57, 30, 12), DateTime.MaxValue })
            Capture("ToFileTimeUtc_Invoke_ReturnsExpected", "toFileTimeUtc", date, null, () => date.ToFileTimeUtc().ToString());
        foreach (var operation in new[] { "toFileTime", "toFileTimeUtc" })
            foreach (var date in new[] { DateTime.MinValue, new DateTime(1600, 12, 31) })
                Capture(operation == "toFileTime" ? "ToFileTime_SmallDate_ThrowsArgumentOutOfRangeException" : "ToFileTimeUtc_SmallDate_ThrowsArgumentOutOfRangeException",
                    operation, date, null, () => (operation == "toFileTime" ? date.ToFileTime() : date.ToFileTimeUtc()).ToString());
        foreach (var operation in new[] { "fromFileTime", "fromFileTimeUtc" })
        {
            foreach (var value in new[] { 0L, 2650467743999999999L, 131875558500120000L })
                Capture(operation == "fromFileTime" ? "FromFileTime_Invoke_ReturnsExpected" : "FromFileTimeUtc_Invoke_ReturnsExpected",
                    operation, null, value, () => Parts(operation == "fromFileTime" ? DateTime.FromFileTime(value) : DateTime.FromFileTimeUtc(value)));
            foreach (var value in new[] { -1L, 2650467744000000000L })
                Capture(operation == "fromFileTime" ? "FromFileTime_OutOfRange_ThrowsArgumentOutOfRangeException" : "FromFileTimeUtc_OutOfRange_ThrowsArgumentOutOfRangeException",
                    operation, null, value, () => Parts(operation == "fromFileTime" ? DateTime.FromFileTime(value) : DateTime.FromFileTimeUtc(value)));
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), timeZone = TimeZoneInfo.Local.Id, rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
