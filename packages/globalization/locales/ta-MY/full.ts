// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ta-MY';
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
            "முஹர்ரம்",
            "சஃபர்",
            "ரபி 1",
            "ரபி 2",
            "ஜுமதா 1",
            "ஜுமதா 2",
            "ரஜப்",
            "ஷஃபான்",
            "ரமலான்",
            "ஷவ்வால்",
            "துல் கஃதா",
            "துல் ஹிஜ்ஜா",
            ""
          ],
          "abbreviatedMonthNames": [
            "முஹ.",
            "சஃப.",
            "ரபி 1",
            "ரபி 2",
            "ஜும. 1",
            "ஜும. 2",
            "ரஜ.",
            "ஷஃ.",
            "ரம.",
            "ஷவ்.",
            "துல் கஃ.",
            "துல் ஹிஜ்.",
            ""
          ],
          "monthGenitiveNames": [
            "முஹர்ரம்",
            "சஃபர்",
            "ரபி 1",
            "ரபி 2",
            "ஜுமதா 1",
            "ஜுமதா 2",
            "ரஜப்",
            "ஷஃபான்",
            "ரமலான்",
            "ஷவ்வால்",
            "துல் கஃதா",
            "துல் ஹிஜ்ஜா",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "முஹ.",
            "சஃப.",
            "ரபி 1",
            "ரபி 2",
            "ஜும. 1",
            "ஜும. 2",
            "ரஜ.",
            "ஷஃ.",
            "ரம.",
            "ஷவ்.",
            "துல் கஃ.",
            "துல் ஹிஜ்.",
            ""
          ],
          "nativeCalendarName": "இஸ்லாமிய நாள்காட்டி"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
