// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, ThaiBuddhistCalendar, GregorianCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/th-TH';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats
    },
    calendarFactories: [() => new ThaiBuddhistCalendar(), () => new GregorianCalendar(1)]
};
