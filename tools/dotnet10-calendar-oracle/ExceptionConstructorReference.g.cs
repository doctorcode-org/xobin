// Derived from official .NET 10.0.7 constructor tests.
// Licensed to the .NET Foundation under the MIT license.
using System.Globalization;
using System.Reflection;
using System.Runtime.Serialization;
internal static class ExceptionConstructorReference {
private const int COR_E_EXCEPTION = unchecked((int)0x80131500);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<Exception>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_EXCEPTION, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "something went wrong";
            var exception = ExceptionContractsOracle.Create<Exception>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_EXCEPTION, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "something went wrong";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<Exception>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_EXCEPTION, innerException: innerException, message: message);
        }
}
internal static class SystemExceptionConstructorReference {
private const int COR_E_SYSTEM = -2146233087;
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<SystemException>();
            ExceptionConstructorAssert.NotEmpty(exception.Message);
            ExceptionConstructorAssert.Equal(COR_E_SYSTEM, exception.HResult);
        }
public static void Ctor_String()
        {
            string message = "Created SystemException";
            var exception = ExceptionContractsOracle.Create<SystemException>(message);
            ExceptionConstructorAssert.Equal(message, exception.Message);
            ExceptionConstructorAssert.Equal(COR_E_SYSTEM, exception.HResult);
        }
public static void Ctor_String_Exception()
        {
            string message = "Created SystemException";
            var innerException = ExceptionContractsOracle.Create<Exception>("Created inner exception");
            var exception = ExceptionContractsOracle.Create<SystemException>(message, innerException);

            ExceptionConstructorAssert.Equal(message, exception.Message);
            ExceptionConstructorAssert.Equal(COR_E_SYSTEM, exception.HResult);
            ExceptionConstructorAssert.Equal(innerException, exception.InnerException);
            ExceptionConstructorAssert.Equal(innerException.HResult, exception.InnerException.HResult);
        }
}
internal static class ArithmeticExceptionConstructorReference {
private const int COR_E_ARITHMETIC = unchecked((int)0x80070216);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<ArithmeticException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARITHMETIC, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "arithmetic operation error";
            var exception = ExceptionContractsOracle.Create<ArithmeticException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARITHMETIC, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "arithmetic operation error";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<ArithmeticException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARITHMETIC, innerException: innerException, message: message);
        }
}
internal static class NullReferenceExceptionConstructorReference {
private const string exceptionMessage = "Created an exception";
private const string innerExceptionMessage = "Created an InnerException";
private const uint COR_E_ENDOFSTREAM = 0x80070026;
private const uint E_POINTER = 0x80004003;
public static void NullReferenceException_Ctor_Empty()
        {
            NullReferenceException i = ExceptionContractsOracle.Create<NullReferenceException>();
            ExceptionConstructorAssert.Equal(E_POINTER, unchecked((uint)i.HResult));
        }
public static void NullReferenceException_Ctor_String()
        {
            NullReferenceException i = ExceptionContractsOracle.Create<NullReferenceException>(exceptionMessage);
            ExceptionConstructorAssert.Equal(exceptionMessage, i.Message);
            ExceptionConstructorAssert.Equal(E_POINTER, unchecked((uint)i.HResult));
        }
public static void NullReferenceException_Ctor_String_Exception()
        {
            Exception ex = ExceptionContractsOracle.Create<Exception>(innerExceptionMessage);
            NullReferenceException i = ExceptionContractsOracle.Create<NullReferenceException>(exceptionMessage, ex);

            ExceptionConstructorAssert.Equal(exceptionMessage, i.Message);
            ExceptionConstructorAssert.Equal(innerExceptionMessage, i.InnerException.Message);
            ExceptionConstructorAssert.Equal(ex.HResult, i.InnerException.HResult);
            ExceptionConstructorAssert.Equal(E_POINTER, unchecked((uint)i.HResult));
        }
}
internal static class InvalidCastExceptionConstructorReference {
private const int COR_E_INVALIDCAST = unchecked((int)0x80004002);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<InvalidCastException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDCAST, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "wrong type";
            var exception = ExceptionContractsOracle.Create<InvalidCastException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDCAST, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "wrong type";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<InvalidCastException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDCAST, innerException: innerException, message: message);
        }
public static void Ctor_String_Int32()
        {
            string message = "wrong type";
            int errorCode = unchecked((int)0x80424242);
            var exception = ExceptionContractsOracle.Create<InvalidCastException>(message, errorCode);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: errorCode, message: message);
        }
}
internal static class FormatExceptionConstructorReference {
private const int COR_E_FORMAT = unchecked((int)0x80131537);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<FormatException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_FORMAT, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "bad format";
            var exception = ExceptionContractsOracle.Create<FormatException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_FORMAT, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "bad format";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<FormatException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_FORMAT, innerException: innerException, message: message);
        }
}
internal static class SerializationExceptionConstructorReference {
private const int COR_E_SERIALIZATION = unchecked((int)0x8013150C);
public static void Ctor_Default()
        {
            var exception = ExceptionContractsOracle.Create<SerializationException>();
            ExceptionConstructorAssert.NotEmpty(exception.Message);
            ExceptionConstructorAssert.Null(exception.InnerException);
            ExceptionConstructorAssert.Equal(COR_E_SERIALIZATION, exception.HResult);
        }
public static void Ctor_String(string message)
        {
            var exception = ExceptionContractsOracle.Create<SerializationException>(message);
            ExceptionConstructorAssert.Equal(message, exception.Message);
            ExceptionConstructorAssert.Null(exception.InnerException);
            ExceptionConstructorAssert.Equal(COR_E_SERIALIZATION, exception.HResult);
        }
public static void Ctor_String_Exception(string message)
        {
            var innerException = ExceptionContractsOracle.Create<Exception>();
            var exception = ExceptionContractsOracle.Create<SerializationException>(message, innerException);
            ExceptionConstructorAssert.Equal(message, exception.Message);
            ExceptionConstructorAssert.Equal(innerException, exception.InnerException);
            ExceptionConstructorAssert.Equal(COR_E_SERIALIZATION, exception.HResult);
        }
}
internal static class NotImplementedExceptionConstructorReference {
private const int E_NOTIMPL = unchecked((int)0x80004001);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<NotImplementedException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_NOTIMPL, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "not implemented";
            var exception = ExceptionContractsOracle.Create<NotImplementedException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_NOTIMPL, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "not implemented";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<NotImplementedException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_NOTIMPL, innerException: innerException, message: message);
        }
}
internal static class AmbiguousMatchExceptionConstructorReference {
private const int COR_E_AMBIGUOUSMATCH = unchecked((int)0x8000211D);
private const int COR_E_INVALIDFILTERCRITERIA = unchecked((int)0x80131601);
private const int COR_E_TARGET = unchecked((int)0x80131603);
private const int COR_E_TARGETINVOCATION = unchecked((int)0x80131604);
private const int COR_E_TARGETPARAMCOUNT = unchecked((int)0x8002000E);
public static void AmbiguousMatchException()
        {
            AmbiguousMatchException ex = ExceptionContractsOracle.Create<AmbiguousMatchException>();

            ExceptionConstructorAssert.NotEmpty(ex.Message);
            ExceptionConstructorAssert.Null(ex.InnerException);
            ExceptionConstructorAssert.Equal(COR_E_AMBIGUOUSMATCH, ex.HResult);
        }
public static void AmbiguousMatchException_Message()
        {
            string message = "message";
            AmbiguousMatchException ex = ExceptionContractsOracle.Create<AmbiguousMatchException>(message);

            ExceptionConstructorAssert.Equal(message, ex.Message);
            ExceptionConstructorAssert.Null(ex.InnerException);
            ExceptionConstructorAssert.Equal(COR_E_AMBIGUOUSMATCH, ex.HResult);
        }
public static void AmbiguousMatchException_Message_InnerException()
        {
            string message = "message";
            Exception inner = ExceptionContractsOracle.Create<Exception>();
            AmbiguousMatchException ex = ExceptionContractsOracle.Create<AmbiguousMatchException>(message, inner);

            ExceptionConstructorAssert.Equal(message, ex.Message);
            ExceptionConstructorAssert.Same(inner, ex.InnerException);
            ExceptionConstructorAssert.Equal(COR_E_AMBIGUOUSMATCH, ex.HResult);
        }
}
internal static class InvalidOperationExceptionConstructorReference {
private const int COR_E_INVALIDOPERATION = unchecked((int)0x80131509);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<InvalidOperationException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDOPERATION, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "invalid operation";
            var exception = ExceptionContractsOracle.Create<InvalidOperationException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDOPERATION, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "invalid operation";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<InvalidOperationException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDOPERATION, innerException: innerException, message: message);
        }
}
internal static class IndexOutOfRangeExceptionConstructorReference {
private const int COR_E_INDEXOUTOFRANGE = unchecked((int)0x80131508);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<IndexOutOfRangeException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INDEXOUTOFRANGE, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "out of range";
            var exception = ExceptionContractsOracle.Create<IndexOutOfRangeException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INDEXOUTOFRANGE, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "out of range";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<IndexOutOfRangeException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INDEXOUTOFRANGE, innerException: innerException, message: message);
        }
}
internal static class InvalidProgramExceptionConstructorReference {
private const int COR_E_INVALIDPROGRAM = unchecked((int)0x8013153A);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<InvalidProgramException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDPROGRAM, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "bad program";
            var exception = ExceptionContractsOracle.Create<InvalidProgramException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDPROGRAM, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "bad program";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<InvalidProgramException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_INVALIDPROGRAM, innerException: innerException, message: message);
        }
}
internal static class NotSupportedExceptionConstructorReference {
private const int COR_E_NOTSUPPORTED = unchecked((int)0x80131515);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<NotSupportedException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_NOTSUPPORTED, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "not supported";
            var exception = ExceptionContractsOracle.Create<NotSupportedException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_NOTSUPPORTED, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "not supported";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<NotSupportedException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_NOTSUPPORTED, innerException: innerException, message: message);
        }
}
internal static class OverflowExceptionConstructorReference {
private const int COR_E_OVERFLOW = unchecked((int)0x80131516);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<OverflowException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_OVERFLOW, validateMessage: false);
        }
public static void Ctor_String()
        {
            string message = "overflow";
            var exception = ExceptionContractsOracle.Create<OverflowException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_OVERFLOW, message: message);
        }
public static void Ctor_String_Exception()
        {
            string message = "overflow";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<OverflowException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_OVERFLOW, innerException: innerException, message: message);
        }
}
internal static class ArgumentExceptionConstructorReference {
private const int COR_E_ARGUMENT = unchecked((int)0x80070057);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<ArgumentException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENT, validateMessage: false);
            ExceptionConstructorAssert.Null(exception.ParamName);
        }
public static void Ctor_String()
        {
            string message = "the argument is wrong";
            var exception = ExceptionContractsOracle.Create<ArgumentException>(message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENT, message: message);
            ExceptionConstructorAssert.Null(exception.ParamName);
        }
public static void Ctor_String_Exception()
        {
            string message = "the argument is wrong";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<ArgumentException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENT, innerException: innerException, message: message);
            ExceptionConstructorAssert.Null(exception.ParamName);
        }
public static void Ctor_String_String()
        {
            string message = "the argument is wrong";
            string argumentName = "theArgument";
            var exception = ExceptionContractsOracle.Create<ArgumentException>(message, argumentName);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENT, validateMessage: false);
            ExceptionConstructorAssert.Equal(argumentName, exception.ParamName);
            ExceptionConstructorAssert.Contains(message, exception.Message);
            ExceptionConstructorAssert.Contains(argumentName, exception.Message);
        }
public static void Ctor_String_String_Exception()
        {
            string message = "the argument is wrong";
            string argumentName = "theArgument";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<ArgumentException>(message, argumentName, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENT, innerException: innerException, validateMessage: false);
            ExceptionConstructorAssert.Equal(argumentName, exception.ParamName);
            ExceptionConstructorAssert.Contains(message, exception.Message);
            ExceptionConstructorAssert.Contains(argumentName, exception.Message);
        }
}
internal static class ArgumentNullExceptionConstructorReference {
private const int E_POINTER = unchecked((int)0x80004003);
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<ArgumentNullException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_POINTER, validateMessage: false);
            ExceptionConstructorAssert.Null(exception.ParamName);
        }
public static void Ctor_String()
        {
            string argumentName = "theNullArgument";
            var exception = ExceptionContractsOracle.Create<ArgumentNullException>(argumentName);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_POINTER, validateMessage: false);
            ExceptionConstructorAssert.Contains(argumentName, exception.Message);
        }
public static void Ctor_String_Exception()
        {
            string message = "the argument is null";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<ArgumentNullException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_POINTER, innerException: innerException, message: message);
            ExceptionConstructorAssert.Null(exception.ParamName);
        }
public static void Ctor_String_String()
        {
            string message = "the argument is null";
            string argumentName = "theNullArgument";
            var exception = ExceptionContractsOracle.Create<ArgumentNullException>(argumentName, message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: E_POINTER, validateMessage: false);
            ExceptionConstructorAssert.Equal(argumentName, exception.ParamName);
            ExceptionConstructorAssert.Contains(message, exception.Message);
            ExceptionConstructorAssert.Contains(argumentName, exception.Message);
        }
}
internal static class ArgumentOutOfRangeExceptionConstructorReference {
private const int COR_E_ARGUMENTOUTOFRANGE = unchecked((int)0x80131502);
private const string HelpersParamName = "value";
public static void Ctor_Empty()
        {
            var exception = ExceptionContractsOracle.Create<ArgumentOutOfRangeException>();
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENTOUTOFRANGE, validateMessage: false);
            ExceptionConstructorAssert.Null(exception.ParamName);
            ExceptionConstructorAssert.Null(exception.ActualValue);
        }
public static void Ctor_String()
        {
            string argumentName = "theArgument";
            var exception = ExceptionContractsOracle.Create<ArgumentOutOfRangeException>(argumentName);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENTOUTOFRANGE, validateMessage: false);
            ExceptionConstructorAssert.Equal(argumentName, exception.ParamName);
            ExceptionConstructorAssert.Null(exception.ActualValue);
        }
public static void Ctor_String_Exception()
        {
            string message = "the argument is out of range";
            var innerException = ExceptionContractsOracle.Create<Exception>("Inner exception");
            var exception = ExceptionContractsOracle.Create<ArgumentOutOfRangeException>(message, innerException);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENTOUTOFRANGE, innerException: innerException, message: message);
            ExceptionConstructorAssert.Null(exception.ParamName);
            ExceptionConstructorAssert.Null(exception.ActualValue);
        }
public static void Ctor_String_String()
        {
            string message = "the argument is out of range";
            string argumentName = "theArgument";
            var exception = ExceptionContractsOracle.Create<ArgumentOutOfRangeException>(argumentName, message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENTOUTOFRANGE, validateMessage: false);
            ExceptionConstructorAssert.Equal(argumentName, exception.ParamName);
            ExceptionConstructorAssert.Null(exception.ActualValue);
            ExceptionConstructorAssert.Contains(message, exception.Message);
            ExceptionConstructorAssert.Contains(argumentName, exception.Message);
        }
public static void Ctor_String_Object_String()
        {
            string message = "the argument is out of range";
            string argumentName = "theArgument";
            int argumentValue = Int32.MaxValue;
            var exception = ExceptionContractsOracle.Create<ArgumentOutOfRangeException>(argumentName, argumentValue, message);
            ExceptionConstructorHelpers.ValidateExceptionProperties(exception, hResult: COR_E_ARGUMENTOUTOFRANGE, validateMessage: false);
            ExceptionConstructorAssert.Equal(argumentName, exception.ParamName);
            ExceptionConstructorAssert.Contains(message, exception.Message);
            ExceptionConstructorAssert.Contains(argumentName, exception.Message);
            ExceptionConstructorAssert.Contains(argumentValue.ToString(), exception.Message);
        }
}
internal static class CultureNotFoundExceptionConstructorReference {
public static void Ctor_String()
        {
            string message = "this is a test string";
            CultureNotFoundException cultureNotFoundException = ExceptionContractsOracle.Create<CultureNotFoundException>(message);

            ExceptionConstructorAssert.Equal(message, cultureNotFoundException.Message);
        }
public static void Ctor_String_Exception()
        {
            string message = "this is a test string";
            Exception innerException = ExceptionContractsOracle.Create<Exception>("inner exception string");
            CultureNotFoundException cultureNotFoundException = ExceptionContractsOracle.Create<CultureNotFoundException>(message, innerException);

            ExceptionConstructorAssert.Equal(message, cultureNotFoundException.Message);
            ExceptionConstructorAssert.Same(innerException, cultureNotFoundException.InnerException);
        }
public static void Ctor_String_String()
        {
            string paramName = "nameOfParam";
            string message = "this is a test string";
            CultureNotFoundException cultureNotFoundException = ExceptionContractsOracle.Create<CultureNotFoundException>(paramName, message);

            ExceptionConstructorAssert.Equal(paramName, cultureNotFoundException.ParamName);
            ExceptionConstructorAssert.NotEmpty(cultureNotFoundException.Message);
        }
public static void Ctor_String_String_Exception()
        {
            string message = "this is a test string";
            string invalidCultureName = "abcd";
            Exception innerException = ExceptionContractsOracle.Create<Exception>("inner exception string");
            CultureNotFoundException cultureNotFoundException = ExceptionContractsOracle.Create<CultureNotFoundException>(message, invalidCultureName, innerException);

            ExceptionConstructorAssert.NotEmpty(cultureNotFoundException.Message);
            ExceptionConstructorAssert.Equal(invalidCultureName, cultureNotFoundException.InvalidCultureName);
            ExceptionConstructorAssert.Same(innerException, cultureNotFoundException.InnerException);
        }
public static void Ctor_String_String_String()
        {
            string paramName = "nameOfParam";
            string invalidCultureName = "abcd";
            string message = "this is a test string";
            CultureNotFoundException cultureNotFoundException = ExceptionContractsOracle.Create<CultureNotFoundException>(paramName, invalidCultureName, message);

            ExceptionConstructorAssert.Equal(paramName, cultureNotFoundException.ParamName);
            ExceptionConstructorAssert.Equal(invalidCultureName, cultureNotFoundException.InvalidCultureName);
            ExceptionConstructorAssert.NotEmpty(cultureNotFoundException.Message);
        }
}
public static class ExceptionConstructorHelpers
    {
        public static void ValidateExceptionProperties(Exception e,
            int hResult,
            int dataCount = 0,
            string helpLink = null,
            Exception innerException = null,
            string message = null,
            string source = null,
            string stackTrace = null,
            bool validateMessage = true)
        {
            ExceptionConstructorAssert.Equal(dataCount, e.Data.Count);
            ExceptionConstructorAssert.Equal(helpLink, e.HelpLink);
            ExceptionConstructorAssert.Equal(hResult, e.HResult);
            ExceptionConstructorAssert.Equal(innerException, e.InnerException);
            if (validateMessage)
            {
                ExceptionConstructorAssert.Equal(message, e.Message);
            }
            else
            {
                ExceptionConstructorAssert.NotNull(e.Message);
            }
            ExceptionConstructorAssert.Equal(source, e.Source);
            ExceptionConstructorAssert.Equal(stackTrace, e.StackTrace);
        }
    }
internal static class AllExceptionConstructorReference { internal static void Run() {
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ExceptionTests.cs::ExceptionTests.Ctor_Empty@20"; ExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ExceptionTests.cs::ExceptionTests.Ctor_String@27"; ExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ExceptionTests.cs::ExceptionTests.Ctor_String_Exception@35"; ExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/SystemExceptionTests.cs::SystemExceptionTests.Ctor_Empty@14"; SystemExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/SystemExceptionTests.cs::SystemExceptionTests.Ctor_String@22"; SystemExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/SystemExceptionTests.cs::SystemExceptionTests.Ctor_String_Exception@31"; SystemExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArithmeticExceptionTests.cs::ArithmeticExceptionTests.Ctor_Empty@13"; ArithmeticExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArithmeticExceptionTests.cs::ArithmeticExceptionTests.Ctor_String@20"; ArithmeticExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArithmeticExceptionTests.cs::ArithmeticExceptionTests.Ctor_String_Exception@28"; ArithmeticExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NullReferenceExceptionTests.cs::NullReferenceExceptionTests.NullReferenceException_Ctor_Empty@18"; NullReferenceExceptionConstructorReference.NullReferenceException_Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NullReferenceExceptionTests.cs::NullReferenceExceptionTests.NullReferenceException_Ctor_String@25"; NullReferenceExceptionConstructorReference.NullReferenceException_Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NullReferenceExceptionTests.cs::NullReferenceExceptionTests.NullReferenceException_Ctor_String_Exception@33"; NullReferenceExceptionConstructorReference.NullReferenceException_Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidCastExceptionTests.cs::InvalidCastExceptionTests.Ctor_Empty@13"; InvalidCastExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidCastExceptionTests.cs::InvalidCastExceptionTests.Ctor_String@20"; InvalidCastExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidCastExceptionTests.cs::InvalidCastExceptionTests.Ctor_String_Exception@28"; InvalidCastExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidCastExceptionTests.cs::InvalidCastExceptionTests.Ctor_String_Int32@37"; InvalidCastExceptionConstructorReference.Ctor_String_Int32();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/FormatExceptionTests.cs::FormatExceptionTests.Ctor_Empty@13"; FormatExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/FormatExceptionTests.cs::FormatExceptionTests.Ctor_String@20"; FormatExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/FormatExceptionTests.cs::FormatExceptionTests.Ctor_String_Exception@28"; FormatExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/Runtime/Serialization/SerializationExceptionTests.cs::SerializationExceptionTests.Ctor_Default@16"; SerializationExceptionConstructorReference.Ctor_Default();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/Runtime/Serialization/SerializationExceptionTests.cs::SerializationExceptionTests.Ctor_String@26"; SerializationExceptionConstructorReference.Ctor_String("message");
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/Runtime/Serialization/SerializationExceptionTests.cs::SerializationExceptionTests.Ctor_String_Exception@36"; SerializationExceptionConstructorReference.Ctor_String_Exception("message");
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NotImplementedExceptionTests.cs::NotImplementedExceptionTests.Ctor_Empty@13"; NotImplementedExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NotImplementedExceptionTests.cs::NotImplementedExceptionTests.Ctor_String@20"; NotImplementedExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NotImplementedExceptionTests.cs::NotImplementedExceptionTests.Ctor_String_Exception@28"; NotImplementedExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Reflection.Tests/ExceptionTests.cs::ExceptionTests.AmbiguousMatchException@107"; AmbiguousMatchExceptionConstructorReference.AmbiguousMatchException();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Reflection.Tests/ExceptionTests.cs::ExceptionTests.AmbiguousMatchException_Message@117"; AmbiguousMatchExceptionConstructorReference.AmbiguousMatchException_Message();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Reflection.Tests/ExceptionTests.cs::ExceptionTests.AmbiguousMatchException_Message_InnerException@128"; AmbiguousMatchExceptionConstructorReference.AmbiguousMatchException_Message_InnerException();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidOperationExceptionTests.cs::InvalidOperationExceptionTests.Ctor_Empty@13"; InvalidOperationExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidOperationExceptionTests.cs::InvalidOperationExceptionTests.Ctor_String@20"; InvalidOperationExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidOperationExceptionTests.cs::InvalidOperationExceptionTests.Ctor_String_Exception@28"; InvalidOperationExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/IndexOutOfRangeExceptionTests.cs::IndexOutOfRangeExceptionTests.Ctor_Empty@13"; IndexOutOfRangeExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/IndexOutOfRangeExceptionTests.cs::IndexOutOfRangeExceptionTests.Ctor_String@20"; IndexOutOfRangeExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/IndexOutOfRangeExceptionTests.cs::IndexOutOfRangeExceptionTests.Ctor_String_Exception@28"; IndexOutOfRangeExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidProgramExceptionTests.cs::InvalidProgramExceptionTests.Ctor_Empty@13"; InvalidProgramExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidProgramExceptionTests.cs::InvalidProgramExceptionTests.Ctor_String@20"; InvalidProgramExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/InvalidProgramExceptionTests.cs::InvalidProgramExceptionTests.Ctor_String_Exception@28"; InvalidProgramExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NotSupportedExceptionTests.cs::NotSupportedExceptionTests.Ctor_Empty@13"; NotSupportedExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NotSupportedExceptionTests.cs::NotSupportedExceptionTests.Ctor_String@20"; NotSupportedExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/NotSupportedExceptionTests.cs::NotSupportedExceptionTests.Ctor_String_Exception@28"; NotSupportedExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/OverflowExceptionTests.cs::OverflowExceptionTests.Ctor_Empty@13"; OverflowExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/OverflowExceptionTests.cs::OverflowExceptionTests.Ctor_String@20"; OverflowExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/OverflowExceptionTests.cs::OverflowExceptionTests.Ctor_String_Exception@28"; OverflowExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentExceptionTests.cs::ArgumentExceptionTests.Ctor_Empty@13"; ArgumentExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentExceptionTests.cs::ArgumentExceptionTests.Ctor_String@21"; ArgumentExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentExceptionTests.cs::ArgumentExceptionTests.Ctor_String_Exception@30"; ArgumentExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentExceptionTests.cs::ArgumentExceptionTests.Ctor_String_String@40"; ArgumentExceptionConstructorReference.Ctor_String_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentExceptionTests.cs::ArgumentExceptionTests.Ctor_String_String_Exception@52"; ArgumentExceptionConstructorReference.Ctor_String_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentNullExceptionTests.cs::ArgumentNullExceptionTests.Ctor_Empty@13"; ArgumentNullExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentNullExceptionTests.cs::ArgumentNullExceptionTests.Ctor_String@21"; ArgumentNullExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentNullExceptionTests.cs::ArgumentNullExceptionTests.Ctor_String_Exception@30"; ArgumentNullExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentNullExceptionTests.cs::ArgumentNullExceptionTests.Ctor_String_String@40"; ArgumentNullExceptionConstructorReference.Ctor_String_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentOutOfRangeExceptionTests.cs::ArgumentOutOfRangeExceptionTests.Ctor_Empty@14"; ArgumentOutOfRangeExceptionConstructorReference.Ctor_Empty();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentOutOfRangeExceptionTests.cs::ArgumentOutOfRangeExceptionTests.Ctor_String@23"; ArgumentOutOfRangeExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentOutOfRangeExceptionTests.cs::ArgumentOutOfRangeExceptionTests.Ctor_String_Exception@33"; ArgumentOutOfRangeExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentOutOfRangeExceptionTests.cs::ArgumentOutOfRangeExceptionTests.Ctor_String_String@44"; ArgumentOutOfRangeExceptionConstructorReference.Ctor_String_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Runtime.Tests/System/ArgumentOutOfRangeExceptionTests.cs::ArgumentOutOfRangeExceptionTests.Ctor_String_Object_String@57"; ArgumentOutOfRangeExceptionConstructorReference.Ctor_String_Object_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Globalization.Tests/System/Globalization/CultureNotFoundExceptionTests.cs::CultureNotFoundExceptionTests.Ctor_String@11"; CultureNotFoundExceptionConstructorReference.Ctor_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Globalization.Tests/System/Globalization/CultureNotFoundExceptionTests.cs::CultureNotFoundExceptionTests.Ctor_String_Exception@20"; CultureNotFoundExceptionConstructorReference.Ctor_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Globalization.Tests/System/Globalization/CultureNotFoundExceptionTests.cs::CultureNotFoundExceptionTests.Ctor_String_String@31"; CultureNotFoundExceptionConstructorReference.Ctor_String_String();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Globalization.Tests/System/Globalization/CultureNotFoundExceptionTests.cs::CultureNotFoundExceptionTests.Ctor_String_String_Exception@42"; CultureNotFoundExceptionConstructorReference.Ctor_String_String_Exception();
ExceptionContractsOracle.Source = "src/libraries/System.Runtime/tests/System.Globalization.Tests/System/Globalization/CultureNotFoundExceptionTests.cs::CultureNotFoundExceptionTests.Ctor_String_String_String@55"; CultureNotFoundExceptionConstructorReference.Ctor_String_String_String();
} }
