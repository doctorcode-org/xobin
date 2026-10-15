// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { KoreanCalendar } from '@xobin/globalization/korean-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ko-KR';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "5": {
          "eraNames": [
            "단기"
          ],
          "abbreviatedEraNames": [
            "단기"
          ],
          "nativeCalendarName": "단기력"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new KoreanCalendar()]
};
