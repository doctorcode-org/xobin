// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/id-ID';
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
            "Jumadilawal",
            "Jumadilakhir",
            "Rajab",
            "Syakban",
            "Ramadan",
            "Syawal",
            "Zulkaidah",
            "Zulhijah",
            ""
          ],
          "abbreviatedMonthNames": [
            "Muh.",
            "Saf.",
            "Rab. Awal",
            "Rab. Akhir",
            "Jum. Awal",
            "Jum. Akhir",
            "Raj.",
            "Sya.",
            "Ram.",
            "Syaw.",
            "Zulka.",
            "Zulhi.",
            ""
          ],
          "monthGenitiveNames": [
            "Muharam",
            "Safar",
            "Rabiulawal",
            "Rabiulakhir",
            "Jumadilawal",
            "Jumadilakhir",
            "Rajab",
            "Syakban",
            "Ramadan",
            "Syawal",
            "Zulkaidah",
            "Zulhijah",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "Muh.",
            "Saf.",
            "Rab. Awal",
            "Rab. Akhir",
            "Jum. Awal",
            "Jum. Akhir",
            "Raj.",
            "Sya.",
            "Ram.",
            "Syaw.",
            "Zulka.",
            "Zulhi.",
            ""
          ],
          "nativeCalendarName": "Kalender Islam"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
