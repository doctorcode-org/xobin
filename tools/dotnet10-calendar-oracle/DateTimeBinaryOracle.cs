using System.Text.Json;

internal static class DateTimeBinaryOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        void Capture(string source, string operation, string input, Func<object?> action)
        {
            object? result = null;
            Exception? error = null;
            try { result = action(); } catch (Exception e) { error = e; }
            rows.Add(new { source = "DateTimeTests." + source, operation, input, result,
                error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName, message = error?.Message });
        }
        foreach (var date in new[] { new DateTime(123456789101112, DateTimeKind.Utc),
            new DateTime(123456789101112), new DateTime(123456789101112, DateTimeKind.Local), DateTime.MaxValue, DateTime.MinValue })
            Capture("ToBinary_Invoke_ReturnsExpected", "toBinary", $"{date.Ticks}:{(int)date.Kind}", () => date.ToBinary().ToString());
        foreach (var date in new[] { new DateTime(2018, 12, 24, 17, 34, 30, 12),
            new DateTime(2018, 12, 24, 17, 34, 30, 12, DateTimeKind.Local) })
            Roundtrip(date);
        var today = DateTime.Today;
        if (DateTime.FromBinary(today.ToBinary()) != today) throw new InvalidOperationException("Today binary roundtrip failed.");
        Capture("FromBinary_Invoke_ReturnsExpected", "roundtrip", "today", () => new { binary = (string?)null, ticks = (string?)null, kind = 2 });
        Roundtrip(DateTime.MinValue);
        Roundtrip(DateTime.MaxValue);
        foreach (long binary in new[] { 3155378976000000000L, long.MaxValue, 7767064994427387904L })
            Capture("FromBinary_OutOfRangeTicks_ThrowsArgumentException", "fromBinary", binary.ToString(), () => DateTime.FromBinary(binary));
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), timeZone = TimeZoneInfo.Local.Id, rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";

        void Roundtrip(DateTime date)
        {
            Capture("FromBinary_Invoke_ReturnsExpected", "roundtrip", $"{date.Ticks}:{(int)date.Kind}", () => {
                long binary = date.ToBinary();
                var restored = DateTime.FromBinary(binary);
                return new { binary = binary.ToString(), ticks = restored.Ticks.ToString(), kind = (int)restored.Kind };
            });
        }
    }
}
