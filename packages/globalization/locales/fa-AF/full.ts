// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, PersianCalendar, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/fa-AF';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "6": {
          "eraNames": [
            "بعد الهجرة"
          ],
          "abbreviatedEraNames": [
            "هـ"
          ],
          "monthNames": [
            "محرم",
            "صفر",
            "ربیع‌الاول",
            "ربیع‌الثانی",
            "جمادی‌الاول",
            "جمادی‌الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذیقعده",
            "ذیحجه",
            ""
          ],
          "abbreviatedMonthNames": [
            "محرم",
            "صفر",
            "ربیع‌الاول",
            "ربیع‌الثانی",
            "جمادی‌الاول",
            "جمادی‌الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذیقعده",
            "ذیحجه",
            ""
          ],
          "monthGenitiveNames": [
            "محرم",
            "صفر",
            "ربیع‌الاول",
            "ربیع‌الثانی",
            "جمادی‌الاول",
            "جمادی‌الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذیقعدهٔ",
            "ذیحجهٔ",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "محرم",
            "صفر",
            "ربیع‌الاول",
            "ربیع‌الثانی",
            "جمادی‌الاول",
            "جمادی‌الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذیقعدهٔ",
            "ذیحجهٔ",
            ""
          ],
          "nativeCalendarName": "تقویم هجری قمری"
        }
    },
    calendarFactories: [() => new PersianCalendar(), () => new GregorianCalendar(1), () => new HijriCalendar()]
};
