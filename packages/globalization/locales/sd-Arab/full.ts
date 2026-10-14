// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/sd-Arab';
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
            "ربيع الاول",
            "ربیع الاخر",
            "جمادی الاول",
            "جمادي الاخر",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعد",
            "ذوالحجہ",
            ""
          ],
          "abbreviatedMonthNames": [
            "محرم",
            "صفر",
            "ربيع الاول",
            "ربیع الاخر",
            "جمادی الاول",
            "جمادي الاخر",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعد",
            "ذوالحجہ",
            ""
          ],
          "monthGenitiveNames": [
            "محرم",
            "صفر",
            "ربيع الاول",
            "ربیع الاخر",
            "جمادی الاول",
            "جمادي الاخر",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعد",
            "ذوالحجہ",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "محرم",
            "صفر",
            "ربيع الاول",
            "ربیع الاخر",
            "جمادی الاول",
            "جمادي الاخر",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذوالقعد",
            "ذوالحجہ",
            ""
          ],
          "nativeCalendarName": "اسلامي ڪئلينڊر"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
