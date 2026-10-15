using System.Runtime.Serialization;
using System.Text.Json;

internal static class ExceptionTypesOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (Type type in new[] { typeof(Exception), typeof(FormatException), typeof(InvalidCastException), typeof(SerializationException) })
        {
            foreach (string? message in new string?[] { null, "", "custom message", "خطا" })
            {
                for (int overload = 0; overload < 3; overload++)
                {
                    var inner = new Exception("inner error");
                    var error = (Exception)(overload switch {
                        0 => Activator.CreateInstance(type)!,
                        1 => Activator.CreateInstance(type, new object?[] { message })!,
                        _ => Activator.CreateInstance(type, new object?[] { message, inner })!
                    });
                    rows.Add(new { type = type.Name, overload, message, expectedMessage = error.Message,
                        innerMessage = error.InnerException?.Message });
                }
            }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows },
            new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
