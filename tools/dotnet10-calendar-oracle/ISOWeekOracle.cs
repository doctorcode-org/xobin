using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

internal static class ISOWeekOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        object? Normalize(object? value) => value is DateTime date ? date.Ticks.ToString(CultureInfo.InvariantCulture)
            : value is DateOnly dateOnly ? dateOnly.DayNumber : value;
        void Capture(string source, string operation, object[] arguments, Func<object?> invoke, object? expected = null)
        {
            try
            {
                object? result = Normalize(invoke());
                if (expected is not null && !Equals(result, Normalize(expected))) throw new InvalidOperationException("Official ISOWeek expected value differs.");
                rows.Add(new { source, operation, arguments = arguments.Select(Normalize), result, error = (string?)null });
            }
            catch (ArgumentException error)
            {
                rows.Add(new { source, operation, arguments = arguments.Select(Normalize), result = (object?)null,
                    error = error.GetType().Name, message = error.Message, paramName = error.ParamName,
                    actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
            }
        }
        foreach (var input in ISOWeekReferenceInputs.GetWeekOfYear_TestData())
            Capture("ISOWeekTests.GetWeekOfYear", "getWeekOfYear", [input[0]], () => ISOWeek.GetWeekOfYear((DateTime)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetWeekOfYear_DateOnly_TestData())
            Capture("ISOWeekTests.GetWeekOfYearUsingDateOnly", "getWeekOfYearDateOnly", [input[0]], () => ISOWeek.GetWeekOfYear((DateOnly)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYear_TestData())
            Capture("ISOWeekTests.GetYear", "getYear", [input[0]], () => ISOWeek.GetYear((DateTime)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYear_DateOnly_TestData())
            Capture("ISOWeekTests.GetYearUsingDateOnly", "getYearDateOnly", [input[0]], () => ISOWeek.GetYear((DateOnly)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYearStart_TestData())
            Capture("ISOWeekTests.GetYearStart", "getYearStart", [input[0]], () => ISOWeek.GetYearStart((int)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYearEnd_TestData())
            Capture("ISOWeekTests.GetYearEnd", "getYearEnd", [input[0]], () => ISOWeek.GetYearEnd((int)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.WeeksInYear_TestData())
            Capture("ISOWeekTests.GetWeeksInYear", "getWeeksInYear", [input[0]], () => ISOWeek.GetWeeksInYear((int)input[0]), input[1]);
        foreach (int year in new[] { 0,10000 })
        {
            Capture("ISOWeekTests.GetWeeksInYear_WithInvalidYear_Throws", "getWeeksInYear", [year], () => ISOWeek.GetWeeksInYear(year));
            Capture("Supplemental.ISOWeek.InvalidYear", "getYearStart", [year], () => ISOWeek.GetYearStart(year));
            Capture("Supplemental.ISOWeek.InvalidYear", "getYearEnd", [year], () => ISOWeek.GetYearEnd(year));
        }
        Capture("ISOWeekTests.GetYearEnd_ForYear9999_Throws", "getYearEnd", [9999], () => ISOWeek.GetYearEnd(9999));

        static string ErrorText(ArgumentException error) => string.Join('|', error.GetType().Name, error.ParamName, error.Message, (error as ArgumentOutOfRangeException)?.ActualValue);
        using var yearHash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
        for (int year = 1; year <= 9999; year++)
        {
            string end;
            try { end = ISOWeek.GetYearEnd(year).Ticks.ToString(CultureInfo.InvariantCulture); }
            catch (ArgumentException error) { end = ErrorText(error); }
            string line = string.Join('|', year, ISOWeek.GetWeeksInYear(year), ISOWeek.GetYearStart(year).Ticks, end) + "\n";
            yearHash.AppendData(Encoding.UTF8.GetBytes(line));
        }
        var days = new List<object>();
        for (int year = 2000; year < 2400; year++)
        {
            using var hash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
            int count = 0;
            for (var date = new DateTime(year,1,1); date.Year == year; date = date.AddDays(1))
            {
                var dateOnly = DateOnly.FromDateTime(date);
                string line = string.Join('|', date.Ticks, ISOWeek.GetWeekOfYear(date), ISOWeek.GetYear(date), ISOWeek.GetWeekOfYear(dateOnly), ISOWeek.GetYear(dateOnly)) + "\n";
                hash.AppendData(Encoding.UTF8.GetBytes(line));
                count++;
            }
            days.Add(new { year, count, sha256 = Convert.ToHexString(hash.GetHashAndReset()).ToLowerInvariant() });
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows,
            allYears = new { count = 9999, sha256 = Convert.ToHexString(yearHash.GetHashAndReset()).ToLowerInvariant() }, days }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
