using System.Reflection;
using System.Text.Json;
[AttributeUsage(AttributeTargets.Method)] internal class FactAttribute:Attribute {}
[AttributeUsage(AttributeTargets.Method)] internal class TheoryAttribute:Attribute {}
[AttributeUsage(AttributeTargets.Method,AllowMultiple=true)] internal class InlineDataAttribute(params object[] data):Attribute { internal object[] Data=data; }
[AttributeUsage(AttributeTargets.Method,AllowMultiple=true)] internal class MemberDataAttribute(string name):Attribute { internal string Name=name; }
internal static class Assert {
    internal static void Equal<T>(T expected,T actual) {if(!EqualityComparer<T>.Default.Equals(expected,actual))throw new InvalidOperationException($"Official assertion failed: {expected} != {actual}");}
    internal static void Equal(double expected,double actual,int precision) {if(Math.Round(expected,precision)!=Math.Round(actual,precision))throw new InvalidOperationException("Precision assertion failed.");}
    internal static void True(bool value,string? message=null) {if(!value)throw new InvalidOperationException(message??"True assertion failed.");}
    internal static void False(bool value) => True(!value);
    internal static void Throws<T>(Action invoke) where T:Exception {try {invoke();}catch(T){return;}throw new InvalidOperationException("Expected exception missing.");}
    internal static void Throws<T>(Func<ObservedTimeSpan> invoke) where T:Exception => Throws<T>((Action)(()=>{invoke();}));
}
internal static class AssertExtensions {
    internal static void Throws<T>(string? param,Action invoke) where T:ArgumentException {try{invoke();}catch(T e){if(e.ParamName!=param)throw new InvalidOperationException("Parameter assertion failed.");return;}throw new InvalidOperationException("Expected exception missing.");}
    internal static void Throws<T>(string? param,Func<ObservedTimeSpan> invoke) where T:ArgumentException => Throws<T>(param,(Action)(()=>{invoke();}));
}
internal static class TimeSpanArithmeticOracle {
    private static List<object>? Checks;
    private static object Normalize(object? value) => value switch {
        ObservedTimeSpan span=>new {kind="span",value=(object?)span.Value.Ticks.ToString()},
        System.TimeSpan span=>new {kind="span",value=(object?)span.Ticks.ToString()},
        long number=>new {kind="int64",value=(object?)number.ToString()},
        int number=>new {kind="int32",value=(object?)number},
        double number=>new {kind="double",value=double.IsFinite(number)?(object?)number:number.ToString(System.Globalization.CultureInfo.InvariantCulture)},
        bool flag=>new {kind="bool",value=(object?)flag},
        string text=>new {kind="string",value=(object?)text},
        null=>new {kind="null",value=(object?)null},
        _=>throw new InvalidOperationException("Unknown normalized type: "+value.GetType())
    };
    internal static object? Observe(string operation,object?[] arguments,Func<object?> invoke) {
        if(Checks is null)return invoke();
        try{var result=invoke();Checks.Add(new {operation,arguments=arguments.Select(Normalize),result=Normalize(result),error=(string?)null});return result;}
        catch(ArgumentException e){Checks.Add(new {operation,arguments=arguments.Select(Normalize),result=(object?)null,error=e.GetType().Name,message=e.Message,paramName=e.ParamName,actualValue=(e as ArgumentOutOfRangeException)?.ActualValue});throw;}
        catch(OverflowException e){Checks.Add(new {operation,arguments=arguments.Select(Normalize),result=(object?)null,error=e.GetType().Name,message=e.Message,paramName=(string?)null,actualValue=(object?)null});throw;}
    }
    internal static string Generate() {
        var rows=new List<object>();
        foreach(var method in typeof(TimeSpanArithmeticTests).GetMethods(BindingFlags.Public|BindingFlags.Static).Where(m=>m.IsDefined(typeof(FactAttribute))||m.IsDefined(typeof(TheoryAttribute)))) {
            var inputs=new List<object[]>();
            if(method.IsDefined(typeof(FactAttribute)))inputs.Add([]);
            foreach(var attribute in method.GetCustomAttributes<InlineDataAttribute>())inputs.Add(attribute.Data);
            foreach(var attribute in method.GetCustomAttributes<MemberDataAttribute>())inputs.AddRange((IEnumerable<object[]>)typeof(TimeSpanArithmeticTests).GetMethod(attribute.Name)!.Invoke(null,null)!);
            foreach(var input in inputs) {
                var parameters=method.GetParameters();
                var args=input.Select((value,index)=>value is ObservedTimeSpan?value:Convert.ChangeType(value,parameters[index].ParameterType)).ToArray();
                Checks=new();
                try{method.Invoke(null,args);}catch(TargetInvocationException e){throw new InvalidOperationException("Official test failed: "+method.Name,e.InnerException);}
                rows.Add(new {source="TimeSpanTests."+method.Name,input=input.Select(Normalize),checks=Checks});Checks=null;
            }
        }
        foreach(long ticks in new[]{long.MinValue,-9007199254740993L,-3L,-1L,0L,1L,3L,9007199254740993L,long.MaxValue}) {
            var span=new ObservedTimeSpan(ticks);
            Checks=new();
            foreach(double factor in new[]{double.NegativeInfinity,-1.000000001,-0.5,0.0,0.5,1.0,1.000000001,double.PositiveInfinity,double.NaN}) {
                try{span.Multiply(factor);}catch(ArgumentException){}catch(OverflowException){}
                try{span.Divide(factor);}catch(ArgumentException){}catch(OverflowException){}
            }
            foreach(long other in new[]{long.MinValue,-3L,-1L,0L,1L,3L,long.MaxValue})span.Divide(new ObservedTimeSpan(other));
            span.GetHashCode();
            rows.Add(new {source="Supplemental.TimeSpanArithmetic.Precision",input=new[]{Normalize(ticks)},checks=Checks});Checks=null;
        }
        return JsonSerializer.Serialize(new {runtime=Environment.Version.ToString(),sourceTag="v10.0.7",constants=typeof(System.TimeSpan).GetFields(BindingFlags.Public|BindingFlags.Static).Where(field=>field.IsLiteral).ToDictionary(field=>field.Name,field=>Normalize(field.GetRawConstantValue())),rows},new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
}
