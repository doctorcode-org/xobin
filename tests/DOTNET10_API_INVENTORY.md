‏ماتریس API مرجع `.NET 10`

‏مرجع این ماتریس runtime واقعی `.NET 10.0.7` و سورس `dotnet/runtime` در برچسب `v10.0.7` و کامیت `7706f546bac1a99b3d891afe3591dc88c67f0cc4` است.

‏فایل `tests/dotnet10-api-reference.json` شکل عمومی انواع مرجع را از metadata همان runtime ثبت می‌کند. فایل `tests/dotnet10-api-inventory.json` هر عضو مرجع را با AST سورس `TypeScript` پروژه تطبیق می‌دهد. ابزارهای تولید به‌ترتیب `tools/dotnet10-calendar-oracle` و `tools/dotnet10-api-inventory.mjs` هستند.

‏دامنه شامل `DateTime`، `TimeSpan`، `DateOnly`، `TimeOnly`، پایهٔ `Calendar`، هر چهارده تقویم concrete، پایهٔ `EastAsianLunisolarCalendar`، نوع `ISOWeek`، نوع `DateTimeFormatInfo`، اعضای تاریخ و زمان `CultureInfo` و enumهای وابسته است.

‏برای `CultureInfo` فقط constructorها و اعضای `Calendar`، `OptionalCalendars`، `DateTimeFormat`، `CurrentCulture`، `CurrentUICulture`، `InvariantCulture`، `Name`، `Clone` و `GetCultureInfo` در دامنه قرار دارند. سایر قابلیت‌های عدد، متن و مقایسهٔ فرهنگ خارج از هدف تاریخ و زمان هستند.

‏اعضای ارث‌رسیده فقط در نوع تعریف‌کننده ثبت می‌شوند. بنابراین API مشترک تقویم‌ها در `Calendar` قرار دارد و در هر تقویم concrete تکرار نشده است.

‏وضعیت «موجود» یعنی سطح متناظر `TypeScript` یا adapter مستند عملگر جاوااسکریپت پیدا شده است. این وضعیت به‌تنهایی برابری رفتاری را ثابت نمی‌کند.

‏وضعیت «ناقص» یعنی نام مرتبط وجود دارد، اما arity، static یا instance بودن، شکل نوع یا بدنهٔ پیاده‌سازی کامل نیست. `DateTime.toString` به‌دلیل بدنهٔ خالی و `DateTimeFormatInfo` به‌دلیل interface بودن در این گروه قرار می‌گیرند.

‏وضعیت «غایب» یعنی نوع یا عضو متناظر در سورس `TypeScript` وجود ندارد.

‏نتیجهٔ فعلی شامل ۲۹ نوع و ۸۰۷ عضو یا overload است. از این تعداد ۲۸۲ عضو موجود، ۴۰ عضو ناقص و ۴۸۵ عضو غایب هستند.

‏پانزده نوع کامل هنوز غایب‌اند: `DateOnly`، `TimeOnly`، `DateTimeStyles`، `ISOWeek`، `EastAsianLunisolarCalendar` و ده تقویم `JapaneseCalendar`، `KoreanCalendar`، `TaiwanCalendar`، `HijriCalendar`، `HebrewCalendar`، `JulianCalendar`، `ChineseLunisolarCalendar`، `JapaneseLunisolarCalendar`، `KoreanLunisolarCalendar` و `TaiwanLunisolarCalendar`.

‏نوع `DateTime` دارای ۷۱ عضو موجود، چهار overload ناقص `ToString` و ۴۲ عضو غایب است.

‏نوع `TimeSpan` دارای ۵۴ عضو موجود، پنج overload ناقص factory و ۵۸ عضو غایب است.

‏پایهٔ `Calendar` دارای ۳۴ عضو موجود، هشت overload ناقص وابسته به era و سه عضو غایب است.

‏چهار تقویم موجود در مجموع سطح اصلی خود را دارند، اما اعضای پراکنده و subpathهای کامل هنوز باید طبق تسک‌های `CAL` و `PKG` تکمیل شوند.

‏نوع `DateTimeFormatInfo` در دات‌نت یک کلاس رفتاری است. در پروژه فعلی فقط interface آن وجود دارد؛ ۲۱ عضو شکلی ناقص و ۲۳ عضو غایب ثبت شده‌اند.

‏نوع `DateTimeKind` در جاوااسکریپت به‌صورت value-wrapper class نمایش داده شده است. این adaptation در سطح نوع ثبت شده و سه مقدار آن موجود هستند.

‏عملگرهای دات‌نت با adapter عمومی جاوااسکریپت ثبت می‌شوند. برابری با `equals`، جمع و تفریق با متدهای نمونه و مقایسهٔ رابطه‌ای با primitive حاصل از `valueOf` تطبیق داده می‌شود. نبود operator overloading در زبان جاوااسکریپت به‌عنوان تفاوت زبان ثبت می‌شود، نه عضو گم‌شده.

‏هر رکورد ماتریس یک `roadmapTask` دارد. هیچ عضو بدون تسک باقی نمانده است. وضعیت رفتاری هر عضو به‌صورت مستقل در `tests/dotnet10-test-inventory.json` و fixtureهای oracle دنبال می‌شود.

‏از ۲۹ نوع هدف، پانزده نوع از export ریشه و ۲۱ نوع از subpath مستقل غایب هستند. تکمیل این مسیرها در تسک‌های `PKG` انجام می‌شود.

‏برای بازتولید fixture مرجع، ابزار oracle با گزینهٔ `--api-inventory` اجرا می‌شود. برای بررسی ماتریس، ابزار `tools/dotnet10-api-inventory.mjs` با مسیر runtime و گزینهٔ `--check` اجرا می‌شود. گزینهٔ `--write` فقط برای تغییر عمدی ماتریس استفاده می‌شود.

‏شرط پایان این موجودی، ثبات شناسهٔ تمام ۸۰۷ عضو، نداشتن شناسهٔ تکراری، داشتن تسک برای هر عضو و یکسان بودن خروجی بازتولیدشده با فایل‌های ثبت‌شده است.
