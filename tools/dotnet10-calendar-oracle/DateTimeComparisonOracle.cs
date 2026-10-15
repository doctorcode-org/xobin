using System.Text.Json;

internal static class DateTimeComparisonOracle
{
    internal static string Generate()
    {
        const string compareSource = "DateTimeTests.CompareTo_Invoke_ReturnsExpected";
        const string equalsSource = "DateTimeTests.Equals_Invoke_ReturnsExpected";

        var compareRows = new List<object>();
        foreach ((DateTime date, object? other) in new (DateTime, object?)[]
        {
            (new DateTime(10), new DateTime(10)),
            (new DateTime(10), new DateTime(11)),
            (new DateTime(10), new DateTime(9)),
            (new DateTime(10), null),
        })
        {
            if (other is DateTime otherDate)
            {
                compareRows.Add(new
                {
                    source = compareSource,
                    dateTicks = date.Ticks.ToString(),
                    otherKind = "dateTime",
                    otherTicks = otherDate.Ticks.ToString(),
                    compareTo = date.CompareTo(other),
                    staticCompare = DateTime.Compare(date, otherDate),
                    greaterThan = date > otherDate,
                    greaterThanOrEqual = date >= otherDate,
                    lessThan = date < otherDate,
                    lessThanOrEqual = date <= otherDate,
                });
            }
            else
            {
                compareRows.Add(new
                {
                    source = compareSource,
                    dateTicks = date.Ticks.ToString(),
                    otherKind = "null",
                    otherTicks = (string?)null,
                    compareTo = date.CompareTo(other),
                    staticCompare = (int?)null,
                    greaterThan = (bool?)null,
                    greaterThanOrEqual = (bool?)null,
                    lessThan = (bool?)null,
                    lessThanOrEqual = (bool?)null,
                });
            }
        }

        var equalsRows = new List<object>();
        foreach ((DateTime date, object? other, string otherKind) in new (DateTime, object?, string)[]
        {
            (new DateTime(10), new DateTime(10), "dateTime"),
            (new DateTime(10), new DateTime(11), "dateTime"),
            (new DateTime(10), new DateTime(9), "dateTime"),
            (new DateTime(10), new object(), "object"),
            (new DateTime(10), null, "null"),
        })
        {
            if (other is DateTime otherDate)
            {
                equalsRows.Add(new
                {
                    source = equalsSource,
                    dateTicks = date.Ticks.ToString(),
                    otherKind,
                    otherTicks = otherDate.Ticks.ToString(),
                    instanceEquals = date.Equals(other),
                    staticEquals = DateTime.Equals(date, otherDate),
                    hashCodesEqual = date.GetHashCode().Equals(otherDate.GetHashCode()),
                    equalOperator = date == otherDate,
                    notEqualOperator = date != otherDate,
                    dateHashCode = date.GetHashCode(),
                    otherHashCode = otherDate.GetHashCode(),
                });
            }
            else
            {
                equalsRows.Add(new
                {
                    source = equalsSource,
                    dateTicks = date.Ticks.ToString(),
                    otherKind,
                    otherTicks = (string?)null,
                    instanceEquals = date.Equals(other),
                    staticEquals = (bool?)null,
                    hashCodesEqual = (bool?)null,
                    equalOperator = (bool?)null,
                    notEqualOperator = (bool?)null,
                    dateHashCode = date.GetHashCode(),
                    otherHashCode = (int?)null,
                });
            }
        }

        object invalidCompare;
        try
        {
            _ = new DateTime(10).CompareTo(new object());
            throw new InvalidOperationException("Expected CompareTo(object) to throw.");
        }
        catch (ArgumentException error)
        {
            invalidCompare = new
            {
                source = "DateTimeTests.CompareTo_NotDateTime_ThrowsArgumentException",
                error = error.GetType().Name,
                paramName = error.ParamName,
                message = error.Message,
            };
        }

        var rows = compareRows.Concat(equalsRows);
        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + JsonSerializer.Serialize(row)))
            + "\n  ],\n  \"invalidCompare\": " + JsonSerializer.Serialize(invalidCompare) + "\n}\n";
    }
}
