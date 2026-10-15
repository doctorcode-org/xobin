// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ms-ID';
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
            "Muharam",
            "Safar",
            "Rabiulawal",
            "Rabiulakhir",
            "Jamadilawal",
            "Jamadilakhir",
            "Rejab",
            "Syaaban",
            "Ramadan",
            "Syawal",
            "Zulkaedah",
            "Zulhijah",
            ""
          ],
          "abbreviatedMonthNames": [
            "Muh.",
            "Saf.",
            "Rab. I",
            "Rab. II",
            "Jam. I",
            "Jam. II",
            "Rej.",
            "Syaa.",
            "Ram.",
            "Syaw.",
            "Zulk.",
            "Zulh.",
            ""
          ],
          "monthGenitiveNames": [
            "Muharam",
            "Safar",
            "Rabiulawal",
            "Rabiulakhir",
            "Jamadilawal",
            "Jamadilakhir",
            "Rejab",
            "Syaaban",
            "Ramadan",
            "Syawal",
            "Zulkaedah",
            "Zulhijah",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "Muh.",
            "Saf.",
            "Rab. I",
            "Rab. II",
            "Jam. I",
            "Jam. II",
            "Rej.",
            "Syaa.",
            "Ram.",
            "Syaw.",
            "Zulk.",
            "Zulh.",
            ""
          ],
          "nativeCalendarName": "Kalendar Islam"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
