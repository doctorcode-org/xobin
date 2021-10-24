import { cultureData } from '@xobin/globalization/locales/en';
import { CultureInfo, GregorianCalendar } from '@xobin/globalization';

describe("CultureInfo class", () => {

    it("Loading culture data and verify all members", () => {
        const cultureInfo = CultureInfo.loadCultureInfo("en", cultureData);
        expect(cultureInfo.calendar instanceof GregorianCalendar).toBe(true);
        expect(cultureInfo.englishName).toBe("English");
        expect(cultureInfo.isNeutralCulture).toBe(true);
        expect(cultureInfo.lcid).toBe(9);
        expect(cultureInfo.name).toBe("en");
        expect(cultureInfo.nativeName).toBe("English");
        expect(cultureInfo.isRightToLeft).toBe(false);
        expect(cultureInfo.listSeparator).toBe(",");
        expect(cultureInfo.threeLetterISOLanguageName).toBe("eng");
        expect(cultureInfo.twoLetterISOLanguageName).toBe("en");

        expect(cultureInfo.parent.name).toBe("");
        expect(cultureInfo.dateTimeFormat.shortestDayNames).toEqual(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
        expect(cultureInfo.dateTimeFormat.abbreviatedDayNames).toEqual(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
        expect(cultureInfo.dateTimeFormat.abbreviatedMonthNames).toEqual(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]);
        
    });

});