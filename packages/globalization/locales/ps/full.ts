// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { PersianCalendar } from '@xobin/globalization/persian-calendar';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ps';
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
            "صفر",
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
    calendarFactories: [() => new PersianCalendar(), () => new GregorianCalendar(1), () => new HijriCalendar()]
};
