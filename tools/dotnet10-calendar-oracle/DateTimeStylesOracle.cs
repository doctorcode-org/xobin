using System.Globalization;
using System.Reflection;
using System.Text.Json;

// Supplementary exhaustive checks of the runtime's internal validation method.
// Public parsing tests remain separate and must be mapped when parsing is implemented.
internal static class DateTimeStylesOracle
{
    internal static string Generate()
    {
        MethodInfo validate = typeof(DateTimeFormatInfo).GetMethod("ValidateStyles", BindingFlags.NonPublic | BindingFlags.Static)!;
        var values = Enum.GetValues<DateTimeStyles>().ToDictionary(value => value.ToString(), value => (int)value);
        var rows = new List<object>();
        var inputs = Enumerable.Range(0, 256).Concat(new[] { -1, int.MinValue, int.MaxValue, 256, 257, 511, 512, 1024 });
        foreach (int value in inputs)
        {
            foreach (bool styles in new[] { false, true })
            {
                try
                {
                    validate.Invoke(null, new object[] { (DateTimeStyles)value, styles });
                    rows.Add(new { value, styles, error = (string?)null, paramName = (string?)null, message = (string?)null });
                }
                catch (TargetInvocationException exception) when (exception.InnerException is ArgumentException)
                {
                    var error = (ArgumentException)exception.InnerException;
                    rows.Add(new { value, styles, error = error.GetType().Name, paramName = error.ParamName, message = error.Message });
                }
            }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), source = "DateTimeFormatInfo.ValidateStyles", values, rows },
            new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
