// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/jv-Latn';
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
            "Sura",
            "Sapar",
            "Mulud",
            "Bakda Mulud",
            "Jumadilawal",
            "Jumadilakir",
            "Rejeb",
            "Ruwah",
            "Pasa",
            "Sawal",
            "Selo",
            "Besar",
            ""
          ],
          "abbreviatedMonthNames": [
            "Sur.",
            "Sap.",
            "Mul.",
            "B. Mul.",
            "Jum. Aw.",
            "Jum. Ak.",
            "Rej.",
            "Ruw.",
            "Pso.",
            "Shaw.",
            "Slo.",
            "Bsar.",
            ""
          ],
          "monthGenitiveNames": [
            "Sura",
            "Sapar",
            "Mulud",
            "Bakda Mulud",
            "Jumadilawal",
            "Jumadilakir",
            "Rejeb",
            "Ruwah",
            "Pasa",
            "Sawal",
            "Selo",
            "Besar",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "Sur.",
            "Sap.",
            "Mul.",
            "B. Mul.",
            "Jum. Aw.",
            "Jum. Ak.",
            "Rej.",
            "Ruw.",
            "Pso.",
            "Shaw.",
            "Slo.",
            "Bsar.",
            ""
          ],
          "nativeCalendarName": "Tanggalan Islam"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
