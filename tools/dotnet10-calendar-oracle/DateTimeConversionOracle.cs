using System.Runtime.Serialization;
using System.Text.Json;

internal static class DateTimeConversionOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        IConvertible date = new DateTime(10, DateTimeKind.Utc);
        void Capture(string source, string operation, Func<object?> action)
        {
            object? result = null;
            Exception? error = null;
            try { result = action(); } catch (Exception e) { error = e; }
            rows.Add(new { source = "DateTimeTests." + source, operation, result,
                error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName, message = error?.Message });
        }
        Capture("GetTypeCode_Invoke_ReturnsExpected", "getTypeCode", () => (int)date.GetTypeCode());
        var methods = new[] { "ToBoolean", "ToChar", "ToSByte", "ToByte", "ToInt16", "ToUInt16", "ToInt32", "ToUInt32",
            "ToInt64", "ToUInt64", "ToSingle", "ToDouble", "ToDecimal" };
        foreach (string method in methods)
            Capture(method + "_Invoke_ThrowsInvalidCastException", char.ToLowerInvariant(method[0]) + method[1..], () => {
                try { return typeof(IConvertible).GetMethod(method)!.Invoke(date, new object?[] { null }); }
                catch (System.Reflection.TargetInvocationException e) { throw e.InnerException!; }
            });
        object Parts(object value) { var d = (DateTime)value; return new { ticks = d.Ticks.ToString(), kind = (int)d.Kind }; }
        Capture("ToDateTime_Invoke_ReturnsExpected", "toDateTime", () => Parts(date.ToDateTime(null)));
        Capture("ToType_DateTime_ReturnsExpected", "toType", () => Parts(date.ToType(typeof(DateTime), null)));
#pragma warning disable SYSLIB0050
        Capture("GetObjectData_Invoke_ReturnsExpected", "getObjectData", () => {
            var info = new SerializationInfo(typeof(DateTime), new FormatterConverter());
            ((ISerializable)date).GetObjectData(info, new StreamingContext());
            return new { ticks = info.GetInt64("ticks").ToString(), dateData = info.GetUInt64("dateData").ToString() };
        });
        Capture("GetObjectData_NullInfo_ThrowsArgumentNullException", "getObjectDataNull", () => {
            ((ISerializable)date).GetObjectData(null!, new StreamingContext());
            return null;
        });
#pragma warning restore SYSLIB0050
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
