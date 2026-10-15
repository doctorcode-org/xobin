// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HebrewCalendar } from '@xobin/globalization/hebrew-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ar-IL';
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
            "ربيع الأول",
            "ربيع الآخر",
            "جمادى الأولى",
            "جمادى الآخرة",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذو القعدة",
            "ذو الحجة",
            ""
          ],
          "abbreviatedMonthNames": [
            "محرم",
            "صفر",
            "ربيع الأول",
            "ربيع الآخر",
            "جمادى الأولى",
            "جمادى الآخرة",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذو القعدة",
            "ذو الحجة",
            ""
          ],
          "monthGenitiveNames": [
            "محرم",
            "صفر",
            "ربيع الأول",
            "ربيع الآخر",
            "جمادى الأولى",
            "جمادى الآخرة",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذو القعدة",
            "ذو الحجة",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "محرم",
            "صفر",
            "ربيع الأول",
            "ربيع الآخر",
            "جمادى الأولى",
            "جمادى الآخرة",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذو القعدة",
            "ذو الحجة",
            ""
          ],
          "nativeCalendarName": "التقويم الهجري"
        },
        "8": {
          "leapYearMonthNames": [
            "تشري",
            "مرحشوان",
            "كيسلو",
            "طيفت",
            "شباط",
            "آذار الأول",
            "آذار الثاني",
            "نيسان",
            "أيار",
            "سيفان",
            "تموز",
            "آب",
            "أيلول"
          ],
          "eraNames": [
            "C.E."
          ],
          "abbreviatedEraNames": [
            "C.E."
          ],
          "monthNames": [
            "تشري",
            "مرحشوان",
            "كيسلو",
            "طيفت",
            "شباط",
            "آذار",
            "آذار الثاني",
            "نيسان",
            "أيار",
            "سيفان",
            "تموز",
            "آب",
            "أيلول"
          ],
          "abbreviatedMonthNames": [
            "تشري",
            "مرحشوان",
            "كيسلو",
            "طيفت",
            "شباط",
            "آذار الأول",
            "آذار",
            "نيسان",
            "أيار",
            "سيفان",
            "تموز",
            "آب",
            "أيلول"
          ],
          "monthGenitiveNames": [
            "تشري",
            "مرحشوان",
            "كيسلو",
            "طيفت",
            "شباط",
            "آذار الأول",
            "آذار",
            "نيسان",
            "أيار",
            "سيفان",
            "تموز",
            "آب",
            "أيلول"
          ],
          "abbreviatedMonthGenitiveNames": [
            "تشري",
            "مرحشوان",
            "كيسلو",
            "طيفت",
            "شباط",
            "آذار الأول",
            "آذار",
            "نيسان",
            "أيار",
            "سيفان",
            "تموز",
            "آب",
            "أيلول"
          ],
          "nativeCalendarName": "التقويم العبري"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HebrewCalendar(), () => new HijriCalendar()]
};
