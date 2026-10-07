using System.Globalization;
using System.Reflection;
using System.Text.Json;

internal static class ApiInventoryOracle
{
    private sealed record Target(Type Type, string Group, HashSet<string>? MemberNames = null);
    private sealed record ApiParameter(string Name, string Type, string Modifier, bool Optional);
    private sealed record ApiMember(
        string Id,
        string Kind,
        string Name,
        bool Static,
        string Type,
        string Signature,
        ApiParameter[] Parameters);
    private sealed record ApiType(
        string FullName,
        string Name,
        string Group,
        string Kind,
        bool Abstract,
        string? BaseType,
        ApiMember[] Members);

    internal static string Generate()
    {
        var cultureMembers = new HashSet<string>(StringComparer.Ordinal)
        {
            ".ctor", "Calendar", "Clone", "CurrentCulture", "CurrentUICulture", "DateTimeFormat",
            "GetCultureInfo", "InvariantCulture", "Name", "OptionalCalendars"
        };
        Target[] targets =
        [
            new(typeof(DateTime), "Temporal"),
            new(typeof(TimeSpan), "Temporal"),
            new(typeof(DateOnly), "Temporal"),
            new(typeof(TimeOnly), "Temporal"),
            new(typeof(Calendar), "Calendar"),
            new(typeof(GregorianCalendar), "Calendar"),
            new(typeof(PersianCalendar), "Calendar"),
            new(typeof(ThaiBuddhistCalendar), "Calendar"),
            new(typeof(UmAlQuraCalendar), "Calendar"),
            new(typeof(JapaneseCalendar), "Calendar"),
            new(typeof(KoreanCalendar), "Calendar"),
            new(typeof(TaiwanCalendar), "Calendar"),
            new(typeof(HijriCalendar), "Calendar"),
            new(typeof(HebrewCalendar), "Calendar"),
            new(typeof(JulianCalendar), "Calendar"),
            new(typeof(EastAsianLunisolarCalendar), "Calendar"),
            new(typeof(ChineseLunisolarCalendar), "Calendar"),
            new(typeof(JapaneseLunisolarCalendar), "Calendar"),
            new(typeof(KoreanLunisolarCalendar), "Calendar"),
            new(typeof(TaiwanLunisolarCalendar), "Calendar"),
            new(typeof(ISOWeek), "ISOWeek"),
            new(typeof(DateTimeFormatInfo), "Formatting"),
            new(typeof(CultureInfo), "Culture", cultureMembers),
            new(typeof(DateTimeKind), "Enum"),
            new(typeof(DayOfWeek), "Enum"),
            new(typeof(DateTimeStyles), "Enum"),
            new(typeof(CalendarAlgorithmType), "Enum"),
            new(typeof(CalendarWeekRule), "Enum"),
            new(typeof(GregorianCalendarTypes), "Enum"),
        ];

        ApiType[] types = targets.Select(CreateType).OrderBy(type => type.FullName, StringComparer.Ordinal).ToArray();
        var document = new
        {
            runtime = "10.0.7",
            types,
        };
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true,
        };
        return JsonSerializer.Serialize(document, options).Replace("\r\n", "\n") + "\n";
    }

    private static ApiType CreateType(Target target)
    {
        Type type = target.Type;
        var members = new List<ApiMember>();
        const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static | BindingFlags.DeclaredOnly;

        if (type.IsEnum)
        {
            foreach (string name in Enum.GetNames(type))
            {
                object value = Enum.Parse(type, name);
                string numericValue = Convert.ToInt64(value, CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture);
                members.Add(CreateMember("enum-value", name, true, FormatType(Enum.GetUnderlyingType(type)),
                    $"{name} = {numericValue}", []));
            }
        }
        else
        {
            foreach (ConstructorInfo constructor in type.GetConstructors(flags))
            {
                if (!Include(target, ".ctor")) continue;
                ApiParameter[] parameters = constructor.GetParameters().Select(CreateParameter).ToArray();
                members.Add(CreateMember("constructor", ".ctor", false, type.Name,
                    $"{type.Name}({FormatParameters(parameters)})", parameters));
            }

            foreach (FieldInfo field in type.GetFields(flags))
            {
                if (!Include(target, field.Name)) continue;
                string modifier = field.IsLiteral ? "const" : field.IsInitOnly ? "readonly" : "field";
                members.Add(CreateMember("field", field.Name, field.IsStatic, FormatType(field.FieldType),
                    $"{modifier} {FormatType(field.FieldType)} {field.Name}", []));
            }

            foreach (PropertyInfo property in type.GetProperties(flags))
            {
                if (!Include(target, property.Name)) continue;
                MethodInfo? accessor = property.GetMethod ?? property.SetMethod;
                bool isStatic = accessor?.IsStatic ?? false;
                string access = $"{{ {(property.CanRead ? "get; " : "")}{(property.CanWrite ? "set; " : "")} }}";
                members.Add(CreateMember("property", property.Name, isStatic, FormatType(property.PropertyType),
                    $"{FormatType(property.PropertyType)} {property.Name} {access}", []));
            }

            foreach (MethodInfo method in type.GetMethods(flags))
            {
                if (method.IsSpecialName && !method.Name.StartsWith("op_", StringComparison.Ordinal)) continue;
                if (!Include(target, method.Name)) continue;
                ApiParameter[] parameters = method.GetParameters().Select(CreateParameter).ToArray();
                string generic = method.IsGenericMethodDefinition ? $"<{method.GetGenericArguments().Length}>" : "";
                members.Add(CreateMember("method", method.Name, method.IsStatic, FormatType(method.ReturnType),
                    $"{FormatType(method.ReturnType)} {method.Name}{generic}({FormatParameters(parameters)})", parameters));
            }
        }

        ApiMember[] ordered = members
            .OrderBy(member => member.Kind, StringComparer.Ordinal)
            .ThenBy(member => member.Name, StringComparer.Ordinal)
            .ThenBy(member => member.Signature, StringComparer.Ordinal)
            .ToArray();
        string kind = type.IsEnum ? "enum" : type.IsValueType ? "struct" : type.IsAbstract && type.IsSealed ? "static-class" : "class";
        return new ApiType(type.FullName!, type.Name, target.Group, kind, type.IsAbstract,
            type.BaseType?.FullName, ordered);
    }

    private static bool Include(Target target, string memberName) =>
        target.MemberNames is null || target.MemberNames.Contains(memberName);

    private static ApiMember CreateMember(string kind, string name, bool isStatic, string type,
        string signature, ApiParameter[] parameters)
    {
        string parameterKey = string.Join(',', parameters.Select(parameter =>
            $"{parameter.Modifier}:{parameter.Type}{(parameter.Optional ? "?" : "")}"));
        string id = $"{kind}:{name}:{(isStatic ? "static" : "instance")}:{parameterKey}";
        return new ApiMember(id, kind, name, isStatic, type, signature, parameters);
    }

    private static ApiParameter CreateParameter(ParameterInfo parameter)
    {
        Type parameterType = parameter.ParameterType;
        string modifier = "value";
        if (parameterType.IsByRef)
        {
            parameterType = parameterType.GetElementType()!;
            modifier = parameter.IsOut ? "out" : parameter.IsIn ? "in" : "ref";
        }
        return new ApiParameter(parameter.Name ?? "value", FormatType(parameterType), modifier, parameter.IsOptional);
    }

    private static string FormatParameters(ApiParameter[] parameters) => string.Join(", ", parameters.Select(parameter =>
        $"{(parameter.Modifier == "value" ? "" : parameter.Modifier + " ")}{parameter.Type} {parameter.Name}{(parameter.Optional ? " = default" : "")}"));

    private static string FormatType(Type type)
    {
        if (type.IsArray) return $"{FormatType(type.GetElementType()!)}[]";
        if (type.IsGenericType)
        {
            Type definition = type.GetGenericTypeDefinition();
            if (definition == typeof(Nullable<>)) return $"{FormatType(type.GetGenericArguments()[0])}?";
            string name = definition.Name.Split('`')[0];
            return $"{name}<{string.Join(", ", type.GetGenericArguments().Select(FormatType))}>";
        }
        return type == typeof(void) ? "void"
            : type == typeof(bool) ? "bool"
            : type == typeof(byte) ? "byte"
            : type == typeof(sbyte) ? "sbyte"
            : type == typeof(short) ? "short"
            : type == typeof(ushort) ? "ushort"
            : type == typeof(int) ? "int"
            : type == typeof(uint) ? "uint"
            : type == typeof(long) ? "long"
            : type == typeof(ulong) ? "ulong"
            : type == typeof(float) ? "float"
            : type == typeof(double) ? "double"
            : type == typeof(decimal) ? "decimal"
            : type == typeof(char) ? "char"
            : type == typeof(string) ? "string"
            : type == typeof(object) ? "object"
            : type.Name;
    }
}
