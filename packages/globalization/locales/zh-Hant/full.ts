// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, TaiwanCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/zh-Hant';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "4": {
          "eraNames": [
            "中華民國"
          ],
          "abbreviatedEraNames": [
            "民國"
          ],
          "nativeCalendarName": "中華民國曆"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new TaiwanCalendar()]
};
