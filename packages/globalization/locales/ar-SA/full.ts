// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { UmAlQuraCalendar } from '@xobin/globalization/um-al-qura-calendar';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ar-SA';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "6": {
          "nativeCalendarName": "التقويم الهجري"
        }
    },
    calendarFactories: [() => new UmAlQuraCalendar(), () => new GregorianCalendar(1), () => new HijriCalendar()]
};
