using System.Globalization;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text.Json;

internal static class ExceptionConstructorAssert
{
    internal static void Equal<T>(T expected, T actual) { if (!EqualityComparer<T>.Default.Equals(expected, actual)) throw new InvalidOperationException("Constructor equality assertion failed."); }
    internal static void Null(object? value) { if (value != null) throw new InvalidOperationException("Expected null."); }
    internal static void NotNull(object? value) { if (value == null) throw new InvalidOperationException("Expected a nonnull value."); }
    internal static void NotEmpty(string value) { if (string.IsNullOrEmpty(value)) throw new InvalidOperationException("Expected a nonempty message."); }
    internal static void Contains(string expected, string actual) { if (!actual.Contains(expected)) throw new InvalidOperationException("Message assertion failed."); }
    internal static void Same(object expected, object? actual) { if (!ReferenceEquals(expected, actual)) throw new InvalidOperationException("Expected the same inner exception."); }
}

internal static class ExceptionContractsOracle
{
    internal static string Source = "";
    private static List<object> Rows = new();

    private static object? Normalize(object? value) => value switch {
        null => null,
        Exception error => new { kind = "Exception", type = error.GetType().Name, message = error.Message, hResult = error.HResult },
        long number => new { kind = "Int64", value = number.ToString(CultureInfo.InvariantCulture) },
        double number => new { kind = "Double", value = number.ToString("R", CultureInfo.InvariantCulture) },
        _ => value
    };

    private static object Symbols(NumberFormatInfo format) => new {
        format.NumberDecimalSeparator, format.NegativeSign, format.PositiveSign, format.NaNSymbol,
        format.NegativeInfinitySymbol, format.PositiveInfinitySymbol
    };

    private static void Record(Exception error, object?[] args, string[] signature, int? hResultOverride = null, bool readMessageBeforeOverride = false)
    {
        Rows.Add(new { source = Source, type = error.GetType().Name, args = args.Select(Normalize).ToArray(), signature, hResultOverride, readMessageBeforeOverride,
            message = error.Message, hResult = error.HResult, innerMessage = error.InnerException?.Message,
            paramName = (error as ArgumentException)?.ParamName, actualValue = Normalize((error as ArgumentOutOfRangeException)?.ActualValue),
            invalidCultureName = (error as CultureNotFoundException)?.InvalidCultureName,
            invalidCultureId = (error as CultureNotFoundException)?.InvalidCultureId,
            numberFormat = Symbols(CultureInfo.CurrentCulture.NumberFormat) });
    }

    internal static T Create<T>(params object?[] args) where T : Exception
    {
        var signature = args.Select(value => value is Exception ? typeof(Exception) : value!.GetType()).ToArray();
        var error = (T)typeof(T).GetConstructor(signature)!.Invoke(args);
        Record(error, args, signature.Select(type => type.Name).ToArray());
        return error;
    }

    private static void Capture(Type type, Type[] signature, params object?[] args)
    {
        var error = (Exception)type.GetConstructor(signature)!.Invoke(args);
        Record(error, args, signature.Select(value => value.Name).ToArray());
    }

    internal static string Generate()
    {
        Rows = new();
        var previous = CultureInfo.CurrentCulture;
        try {
            CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
            AllExceptionConstructorReference.Run();
            Source = "Supplemental.ExceptionConstructors";
            foreach (Type type in new[] { typeof(Exception), typeof(SystemException), typeof(ArithmeticException), typeof(NullReferenceException),
                typeof(InvalidCastException), typeof(FormatException), typeof(SerializationException), typeof(NotImplementedException),
                typeof(AmbiguousMatchException), typeof(InvalidOperationException), typeof(IndexOutOfRangeException), typeof(InvalidProgramException),
                typeof(NotSupportedException), typeof(OverflowException) }) {
                Capture(type, Array.Empty<Type>());
                foreach (string? message in new string?[] { null, "", "custom\r\nmessage", "خطا" }) {
                    Capture(type, new[] { typeof(string) }, message);
                    Capture(type, new[] { typeof(string), typeof(Exception) }, message, new Exception("inner error"));
                }
            }
            foreach (string? paramName in new string?[] { null, "", "value", "پارامتر" }) {
                foreach (string? message in new string?[] { null, "", "custom message" }) {
                    Capture(typeof(ArgumentException), new[] { typeof(string), typeof(string) }, message, paramName);
                    Capture(typeof(ArgumentException), new[] { typeof(string), typeof(string), typeof(Exception) }, message, paramName, new Exception("inner error"));
                    Capture(typeof(ArgumentNullException), new[] { typeof(string), typeof(string) }, paramName, message);
                    Capture(typeof(ArgumentOutOfRangeException), new[] { typeof(string), typeof(string) }, paramName, message);
                    Capture(typeof(ArgumentOutOfRangeException), new[] { typeof(string), typeof(object), typeof(string) }, paramName, 42, message);
                }
            }
            foreach (Type type in new[] { typeof(ArgumentException), typeof(ArgumentNullException), typeof(ArgumentOutOfRangeException) }) {
                Capture(type, Array.Empty<Type>());
                foreach (string? text in new string?[] { null, "", "value" }) {
                    Capture(type, new[] { typeof(string) }, text);
                    Capture(type, new[] { typeof(string), typeof(Exception) }, text, new Exception("inner error"));
                }
            }
            Source = "Supplemental.ExceptionHResultMutation";
            foreach (Type type in new[] { typeof(Exception), typeof(SystemException), typeof(ArgumentException) }) {
                foreach (bool readMessageBeforeOverride in new[] { false, true }) {
                    var error = (Exception)type.GetConstructor(new[] { typeof(string) })!.Invoke(new object?[] { null });
                    if (readMessageBeforeOverride) _ = error.Message;
                    error.HResult = -42;
                    Record(error, new object?[] { null }, new[] { "String" }, -42, readMessageBeforeOverride);
                }
            }
            Source = "Supplemental.ExceptionConstructors";
            foreach (string? message in new string?[] { null, "", "custom message" }) {
                Capture(typeof(InvalidCastException), new[] { typeof(string), typeof(int) }, message, unchecked((int)0x80424242));
                Capture(typeof(CultureNotFoundException), Array.Empty<Type>());
                Capture(typeof(CultureNotFoundException), new[] { typeof(string) }, message);
                Capture(typeof(CultureNotFoundException), new[] { typeof(string), typeof(Exception) }, message, new Exception("inner error"));
                foreach (string? paramName in new string?[] { null, "", "name" }) {
                    Capture(typeof(CultureNotFoundException), new[] { typeof(string), typeof(string) }, paramName, message);
                    foreach (string? name in new string?[] { null, "", "abcd" })
                        Capture(typeof(CultureNotFoundException), new[] { typeof(string), typeof(string), typeof(string) }, paramName, name, message);
                    foreach (int id in new[] { -1, 0, 1033, int.MaxValue, int.MinValue })
                        Capture(typeof(CultureNotFoundException), new[] { typeof(string), typeof(int), typeof(string) }, paramName, id, message);
                }
                Capture(typeof(CultureNotFoundException), new[] { typeof(string), typeof(string), typeof(Exception) }, message, "abcd", new Exception("inner error"));
                Capture(typeof(CultureNotFoundException), new[] { typeof(string), typeof(int), typeof(Exception) }, message, 1033, new Exception("inner error"));
            }
            object?[] values = { null, "", "text", true, false, 0, -1, int.MinValue, int.MaxValue, long.MinValue, long.MaxValue,
                -0.0, 1.5, -1.5, 0.0001, 0.00001, 1e16, 1e17, 1e21, double.Epsilon, double.MaxValue, double.MinValue,
                double.NaN, double.PositiveInfinity, double.NegativeInfinity, 1000000000000000100.0, 0.8455124082255701 };
            var numericValues = values.ToList();
            ulong bits = 0x123456789abcdef0;
            for (int index = 0; index < 128; index++) {
                bits ^= bits << 13;
                bits ^= bits >> 7;
                bits ^= bits << 17;
                numericValues.Add(BitConverter.Int64BitsToDouble(unchecked((long)bits)));
            }
            foreach (string name in new[] { "", "en-US", "fr-FR", "fa-IR", "ar-SA" }) {
                CultureInfo.CurrentCulture = name == "" ? CultureInfo.InvariantCulture : new CultureInfo(name, false);
                Source = "Supplemental.ExceptionActualValue/" + name;
                foreach (object? value in numericValues)
                    Capture(typeof(ArgumentOutOfRangeException), new[] { typeof(string), typeof(object), typeof(string) }, "value", value, "custom message");
            }
            var custom = (CultureInfo)CultureInfo.InvariantCulture.Clone();
            custom.NumberFormat.NegativeSign = "NEG";
            custom.NumberFormat.PositiveSign = "POS";
            custom.NumberFormat.NumberDecimalSeparator = ":";
            custom.NumberFormat.NaNSymbol = "not-number";
            custom.NumberFormat.PositiveInfinitySymbol = "positive-infinity";
            custom.NumberFormat.NegativeInfinitySymbol = "negative-infinity";
            CultureInfo.CurrentCulture = custom;
            Source = "Supplemental.ExceptionActualValue/custom";
            foreach (object? value in numericValues)
                Capture(typeof(ArgumentOutOfRangeException), new[] { typeof(string), typeof(object), typeof(string) }, "value", value, "custom message");
        } finally { CultureInfo.CurrentCulture = previous; }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", platform = Environment.OSVersion.Platform.ToString(), newLine = Environment.NewLine, rows = Rows },
            new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
