using System.Globalization;
using System.Text.Json;

internal static partial class DateOnlyConstructorOracle
{
    private static readonly List<object> Rows = new();
    private static string Source = "";
    private static object Snapshot(DateOnly date) => new { dayNumber = date.DayNumber, year = date.Year, month = date.Month, day = date.Day };
    private static DateOnly Record(string operation, object[] arguments, Func<DateOnly> invoke)
    {
        try { DateOnly date = invoke(); Rows.Add(new { source = Source, operation, arguments, result = Snapshot(date), error = (string?)null }); return date; }
        catch (ArgumentException error) { Rows.Add(new { source = Source, operation, arguments, result = (object?)null, error = error.GetType().Name, message = error.Message, paramName = error.ParamName, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue }); throw; }
    }
    private static DateOnly Create(int year, int month, int day) => Record("ctor", [year, month, day], () => new DateOnly(year, month, day));
    private static DateOnly Create(int year, int month, int day, Calendar? calendar) => Record("calendar", [year, month, day, calendar?.GetType().Name!], () => new DateOnly(year, month, day, calendar!));
    private static class Assert
    {
        internal static void Equal(int expected, int actual) { if (expected != actual) throw new InvalidOperationException("Official DateOnly assertion failed."); }
        internal static void Throws<T>(Action invoke) where T : Exception { try { invoke(); } catch (T) { return; } throw new InvalidOperationException("Official exception missing."); }
    }
    internal static string Generate()
    {
        Rows.Clear();
        Source = "DateOnlyTests.MinMaxValuesTest"; MinMaxValuesTest();
        Source = "DateOnlyTests.ConstructorsTest";
        foreach (object[] input in Constructor_TestData()) ConstructorsTest((int)input[0], (int)input[1], (int)input[2], (Calendar)input[3]);
        Source = "DateOnlyTests.ConstructorsNegativeCasesTest"; ConstructorsNegativeCasesTest();
        Source = "Supplemental.DateOnly.Constructors";
        Record("default", [], () => new DateOnly());
        try { Create(2020, 1, 1, null); } catch (ArgumentException) { }
        foreach (Calendar calendar in new Calendar[] { new GregorianCalendar(), new PersianCalendar(), new ThaiBuddhistCalendar(), new UmAlQuraCalendar(), new JapaneseCalendar(), new KoreanCalendar(), new TaiwanCalendar(), new HijriCalendar(), new HebrewCalendar(), new JulianCalendar(), new ChineseLunisolarCalendar(), new JapaneseLunisolarCalendar(), new KoreanLunisolarCalendar(), new TaiwanLunisolarCalendar() })
            foreach (DateTime date in new[] { calendar.MinSupportedDateTime, calendar.MaxSupportedDateTime })
                try { Create(calendar.GetYear(date), calendar.GetMonth(date), calendar.GetDayOfMonth(date), calendar); } catch (ArgumentException) { }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows = Rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
