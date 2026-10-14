// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, UmAlQuraCalendar, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
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
