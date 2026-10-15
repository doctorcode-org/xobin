// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ur-PK';
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
            "ر بیع الاول",
            "ر بیع الثانی",
            "جمادی الاول",
            "جمادی الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعدۃ",
            "ذوالحجۃ",
            ""
          ],
          "abbreviatedMonthNames": [
            "محرم",
            "صفر",
            "ربیع الاوّل",
            "ربیع الثّانی",
            "جمادی الاوّل",
            "جمادی الثّانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعدۃ",
            "ذوالحجۃ",
            ""
          ],
          "monthGenitiveNames": [
            "محرم",
            "صفر",
            "ر بیع الاول",
            "ر بیع الثانی",
            "جمادی الاول",
            "جمادی الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعدۃ",
            "ذوالحجۃ",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "محرم",
            "صفر",
            "ربیع الاوّل",
            "ربیع الثانی",
            "جمادی الاوّل",
            "جمادی الثانی",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعدۃ",
            "ذوالحجۃ",
            ""
          ],
          "nativeCalendarName": "اسلامی کیلنڈر"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
