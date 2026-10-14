// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ps-PK';
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
            "د صفرے د",
            "ربيع",
            "ربيع II",
            "جماعه",
            "جموما II",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "دالقاعده",
            "ذي الحج",
            ""
          ],
          "abbreviatedMonthNames": [
            "محرم",
            "صفر",
            "ربيع",
            "ربيع II",
            "جماعه",
            "جمادي ۲",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "دالقاعده",
            "ذي الحج",
            ""
          ],
          "monthGenitiveNames": [
            "محرم",
            "د صفرے د",
            "ربيع",
            "ربيع II",
            "جماعه",
            "جموما II",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "ذي القعده",
            "ذي الحج",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "محرم",
            "صفر",
            "ربيع",
            "ربيع II",
            "جماد ۱",
            "جماد ۲",
            "رجب",
            "شعبان",
            "رمضان",
            "شوال",
            "دالقاعده",
            "ذي الحج",
            ""
          ],
          "nativeCalendarName": "اسلامي جنتري"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
