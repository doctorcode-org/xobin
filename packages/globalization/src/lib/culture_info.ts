import { invariantDateTimeFormat, setCurrentFormatContext } from './date_time_format_context';
import { Calendar } from './calendar';
import { DateTimeFormatInfo, createDateTimeFormatInfo } from './date_time_format_info';
import { NumberFormatInfo } from './number_format_info';
import { getOrCreateValue, PlainObject, setValue, ArgumentNullException, InvalidOperationException, getValue } from '@xobin/core';
import { CultureData } from './culture_data';
import { CultureNotFoundException } from './exceptions';
import { GregorianCalendar } from './gregorian_calendar';

const optionalCalendarFactories = new WeakMap<CultureInfo, readonly (() => Calendar)[]>();

const CULTURES_DATA: PlainObject<CultureData> = {
    '': {
        parent: "",
        lcid: 127,
        name: "",
        nativeName: "Invariant Language (Invariant Country)",
        englishName: "Invariant Language (Invariant Country)",
        twoLetterISOLanguageName: "iv",
        threeLetterISOLanguageName: "ivl",
        listSeparator: ",",
        isRightToLeft: false,
        isNeutralCulture: false,
        numberFormat: {
            currencyDecimalDigits: 2,
            currencyDecimalSeparator: ".",
            currencyGroupSizes: [3],
            numberGroupSizes: [3],
            percentGroupSizes: [3],
            currencyGroupSeparator: ",",
            currencySymbol: "¤",
            naNSymbol: "NaN",
            currencyNegativePattern: 0,
            numberNegativePattern: 1,
            percentPositivePattern: 0,
            percentNegativePattern: 0,
            negativeInfinitySymbol: "-Infinity",
            negativeSign: "-",
            numberDecimalDigits: 2,
            numberDecimalSeparator: ".",
            numberGroupSeparator: ",",
            currencyPositivePattern: 0,
            positiveInfinitySymbol: "Infinity",
            positiveSign: "+",
            percentDecimalDigits: 2,
            percentDecimalSeparator: ".",
            percentGroupSeparator: ",",
            percentSymbol: "%",
            perMilleSymbol: "‰",
            nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            digitSubstitution: 1
        },
        dateTimeFormat: invariantDateTimeFormat,
        calendar: new GregorianCalendar()
    }
};
const READ_ONLY_CULTURES = new WeakSet<CultureInfo>();

/**
 * Represents a type of standard culture name.
 */
export type CultureName = (keyof CultureCollection);

/**
 * Provides information about a specific culture (called a locale for unmanaged code development). 
 * The information includes the names for the culture, the writing system, the calendar used, the sort order of strings, and formatting for dates and numbers.
 */
export class CultureInfo {
    /**
     * Gets an object that defines the format of the specified type.
     * @param formatType The type of formatting information to retrieve.
     */
    getFormat(formatType: unknown): object | null {
        return formatType === DateTimeFormatInfo || formatType === 'DateTimeFormatInfo' ? this.dateTimeFormat
            : formatType === 'NumberFormatInfo' ? this.numberFormat : null;
    }

    /**
     * Gets the default calendar used by the culture.
     */
    readonly calendar!: Calendar

    /**
     * Gets or sets a DateTimeFormatInfo that defines the culturally appropriate format of displaying dates and times.
     */
    get dateTimeFormat(): DateTimeFormatInfo {
        return getValue(this, 'dateTimeFormat');
    }

    set dateTimeFormat(value: DateTimeFormatInfo) {
        if (READ_ONLY_CULTURES.has(this)) throw new InvalidOperationException('Instance is read-only.');
        if (value == null) throw new ArgumentNullException('value');
        setValue(this, 'dateTimeFormat', value);
    }

    /**
     * Gets the culture name in the format languagefull [country/regionfull] in English.
     */
    readonly englishName!: string;

    /**
     * Gets a value indicating whether the current CultureInfo represents a neutral culture.
     */
    readonly isNeutralCulture!: boolean;

    /**
     * Gets the culture identifier for the current CultureInfo.
     */
    readonly lcid!: number;

    /**
     * Gets the culture name in the format languagecode2-country/regioncode2.
     */
    readonly name!: string;

    /**
     * Gets the culture name, consisting of the language, the country/region, and the optional script, that the culture is set to display.
     */
    readonly nativeName!: string;

    /**
     * Gets or sets a NumberFormatInfo that defines the culturally appropriate format of displaying numbers, currency, and percentage.
     */
    readonly numberFormat!: NumberFormatInfo;

    /**
     * Gets a value indicating whether the current culture object represents a writing system where text flows from right to left.
     */
    readonly isRightToLeft!: boolean;

    /**
     * Gets or sets the string that separates items in a list.
     */
    readonly listSeparator!: string;

    /**
     * Gets the ISO 639-2 three-letter code for the language of the current CultureInfo.
     */
    readonly threeLetterISOLanguageName!: string;

    /**
     * Gets the ISO 639-1 two-letter code for the language of the current CultureInfo.
     */
    readonly twoLetterISOLanguageName!: string;

    /**
     * Initializes a new instance of the CultureInfo class based on the culture specified by name.
     * @param name A predefined CultureInfo name, Name of an existing CultureInfo. name is not case-sensitive.
     */
    constructor(name: CultureName) {

        const cultureData: any = CULTURES_DATA[name.toLocaleLowerCase()];
        if (!cultureData) {
            throw new CultureNotFoundException(name);
        }

        Object.keys(cultureData)
            .filter(property => !['dateTimeFormat', 'calendarFormats', 'gregorianDateTimeFormat', 'calendarFactories'].includes(property))
            .forEach(property => {
                const propertyValue = cultureData[property];
                if (property === 'parent') {
                    setValue(this, 'parent', propertyValue);
                }
                else {
                    Object.defineProperty(this, property, {
                        configurable: true,
                        enumerable: true,
                        writable: false,
                        value: property === 'numberFormat'
                            ? cloneFormatInfo(propertyValue)
                            : property === 'calendar' ? propertyValue.clone() : propertyValue
                    });
                }                
            });
        optionalCalendarFactories.set(this, cultureData.calendarFactories ?? [() => this.calendar.clone()]);
        const calendarFormats = cultureData.calendarFormats ?? (cultureData.gregorianDateTimeFormat
            ? { 1: cultureData.gregorianDateTimeFormat } : undefined);
        this.dateTimeFormat = createDateTimeFormatInfo(cultureData.dateTimeFormat, this.calendar, calendarFormats, name, cultureData.numberFormat.numberDecimalSeparator);
    }

    /**
     * Gets the calendars that can be used by the culture.
     */
    get optionalCalendars(): Calendar[] {
        return optionalCalendarFactories.get(this)!.map(createCalendar => createCalendar());
    }

    /**
     * Gets the CultureInfo that represents the parent culture of the current CultureInfo.
     */
    get parent(): CultureInfo {
        let value: any = getValue(this, "parent");
        if (!(value instanceof CultureInfo)) {
            value = new CultureInfo(value);
            setValue(this, "parent", value);
        }

        return value
    }

    /**
     * Gets or sets the CultureInfo object that represents the culture used by the current thread.
     */
    static get currentCulture(): CultureInfo {
        return getOrCreateValue(this, "currentCulture", () => this.invariantCulture);
    }

    static set currentCulture(culture: CultureInfo) {
        if (!(culture instanceof CultureInfo)) {
            throw new Error("Invalid CultureInfo instance.");
        }

        setValue(this, "currentCulture", culture);
        setCurrentFormatContext(culture);
    }

    /**
     * Gets or sets the CultureInfo object that represents the current user interface culture used by the Resource Manager to look up culture-specific resources at run time.
     */
    static get currentUICulture(): CultureInfo {
        return getOrCreateValue(this, "currentUICulture", () => this.invariantCulture);
    }

    static set currentUICulture(culture: CultureInfo) {
        if (!(culture instanceof CultureInfo)) {
            throw new Error("Invalid CultureInfo instance.");
        }

        setValue(this, "currentUICulture", culture);
    }

    /**
     * Gets the CultureInfo object that is culture-independent (invariant).
     */
    static get invariantCulture(): CultureInfo {
        return getOrCreateValue(this, "invariantCulture", () => {
            const culture = new CultureInfo('');
            culture.dateTimeFormat = DateTimeFormatInfo.invariantInfo;
            Object.defineProperty(culture, 'calendar', { value: DateTimeFormatInfo.invariantInfo.calendar });
            READ_ONLY_CULTURES.add(culture);
            return culture;
        });
    }

    /**
     * Gets the CultureInfo that represents the culture installed with the operating system.
     */
    static get invariantUICulture(): CultureInfo {
        return this.invariantCulture;
    }

    /**
     * Registers explicitly imported culture data and returns a culture initialized from that data.
     * @param name The name of the culture to register.
     * @param data The culture data imported from its individual locale module.
     * @returns A new CultureInfo for the registered culture.
     */
    static loadCultureInfo(name: CultureName, data: CultureData): CultureInfo {
        if (!name) {
            throw new ArgumentNullException(name);
        }

        CULTURES_DATA[name.toLocaleLowerCase()] = data;
        return new CultureInfo(name);
    }

}

/**
 * Copies format data so culture instances do not share mutable arrays or pattern collections.
 * @param info The date or number format data to copy.
 */
function cloneFormatInfo<T extends object>(info: T): T {
    const copy = { ...info };
    for (const key of Object.keys(info) as Array<keyof T>) {
        const value = info[key];
        if (Array.isArray(value)) {
            copy[key] = value.slice() as T[keyof T];
        }
        else if (value !== null && typeof value === 'object') {
            copy[key] = cloneFormatInfo(value) as T[keyof T];
        }
    }
    return copy;
}

interface CultureCollection {
    "": CultureInfo;
    "aa": CultureInfo;
    "aa-DJ": CultureInfo;
    "aa-ER": CultureInfo;
    "aa-ET": CultureInfo;
    "af": CultureInfo;
    "af-NA": CultureInfo;
    "af-ZA": CultureInfo;
    "agq": CultureInfo;
    "agq-CM": CultureInfo;
    "ak": CultureInfo;
    "ak-GH": CultureInfo;
    "am": CultureInfo;
    "am-ET": CultureInfo;
    "ar": CultureInfo;
    "ar-001": CultureInfo;
    "ar-AE": CultureInfo;
    "ar-BH": CultureInfo;
    "ar-DJ": CultureInfo;
    "ar-DZ": CultureInfo;
    "ar-EG": CultureInfo;
    "ar-ER": CultureInfo;
    "ar-IL": CultureInfo;
    "ar-IQ": CultureInfo;
    "ar-JO": CultureInfo;
    "ar-KM": CultureInfo;
    "ar-KW": CultureInfo;
    "ar-LB": CultureInfo;
    "ar-LY": CultureInfo;
    "ar-MA": CultureInfo;
    "ar-MR": CultureInfo;
    "ar-OM": CultureInfo;
    "ar-PS": CultureInfo;
    "ar-QA": CultureInfo;
    "ar-SA": CultureInfo;
    "ar-SD": CultureInfo;
    "ar-SO": CultureInfo;
    "ar-SS": CultureInfo;
    "ar-SY": CultureInfo;
    "ar-TD": CultureInfo;
    "ar-TN": CultureInfo;
    "ar-YE": CultureInfo;
    "arn": CultureInfo;
    "arn-CL": CultureInfo;
    "as": CultureInfo;
    "as-IN": CultureInfo;
    "asa": CultureInfo;
    "asa-TZ": CultureInfo;
    "ast": CultureInfo;
    "ast-ES": CultureInfo;
    "az": CultureInfo;
    "az-Cyrl": CultureInfo;
    "az-Cyrl-AZ": CultureInfo;
    "az-Latn": CultureInfo;
    "az-Latn-AZ": CultureInfo;
    "ba": CultureInfo;
    "ba-RU": CultureInfo;
    "bas": CultureInfo;
    "bas-CM": CultureInfo;
    "be": CultureInfo;
    "be-BY": CultureInfo;
    "bem": CultureInfo;
    "bem-ZM": CultureInfo;
    "bez": CultureInfo;
    "bez-TZ": CultureInfo;
    "bg": CultureInfo;
    "bg-BG": CultureInfo;
    "bgc": CultureInfo;
    "bgc-IN": CultureInfo;
    "bho": CultureInfo;
    "bho-IN": CultureInfo;
    "bin": CultureInfo;
    "bin-NG": CultureInfo;
    "bm": CultureInfo;
    "bm-Latn": CultureInfo;
    "bm-Latn-ML": CultureInfo;
    "bm-ML": CultureInfo;
    "bn": CultureInfo;
    "bn-BD": CultureInfo;
    "bn-IN": CultureInfo;
    "bo": CultureInfo;
    "bo-CN": CultureInfo;
    "bo-IN": CultureInfo;
    "br": CultureInfo;
    "br-FR": CultureInfo;
    "brx": CultureInfo;
    "brx-IN": CultureInfo;
    "bs": CultureInfo;
    "bs-Cyrl": CultureInfo;
    "bs-Cyrl-BA": CultureInfo;
    "bs-Latn": CultureInfo;
    "bs-Latn-BA": CultureInfo;
    "byn": CultureInfo;
    "byn-ER": CultureInfo;
    "ca": CultureInfo;
    "ca-AD": CultureInfo;
    "ca-ES": CultureInfo;
    "ca-ES-VALENCIA": CultureInfo;
    "ca-FR": CultureInfo;
    "ca-IT": CultureInfo;
    "ccp": CultureInfo;
    "ccp-BD": CultureInfo;
    "ccp-Cakm": CultureInfo;
    "ccp-Cakm-BD": CultureInfo;
    "ccp-Cakm-IN": CultureInfo;
    "ccp-IN": CultureInfo;
    "ce": CultureInfo;
    "ce-RU": CultureInfo;
    "ceb": CultureInfo;
    "ceb-Latn": CultureInfo;
    "ceb-Latn-PH": CultureInfo;
    "ceb-PH": CultureInfo;
    "cgg": CultureInfo;
    "cgg-UG": CultureInfo;
    "chr": CultureInfo;
    "chr-Cher": CultureInfo;
    "chr-Cher-US": CultureInfo;
    "chr-US": CultureInfo;
    "ckb": CultureInfo;
    "ckb-IQ": CultureInfo;
    "ckb-IR": CultureInfo;
    "co": CultureInfo;
    "co-FR": CultureInfo;
    "cs": CultureInfo;
    "cs-CZ": CultureInfo;
    "cu": CultureInfo;
    "cu-RU": CultureInfo;
    "cv": CultureInfo;
    "cv-RU": CultureInfo;
    "cy": CultureInfo;
    "cy-GB": CultureInfo;
    "da": CultureInfo;
    "da-DK": CultureInfo;
    "da-GL": CultureInfo;
    "dav": CultureInfo;
    "dav-KE": CultureInfo;
    "de": CultureInfo;
    "de-AT": CultureInfo;
    "de-BE": CultureInfo;
    "de-CH": CultureInfo;
    "de-DE": CultureInfo;
    "de-IT": CultureInfo;
    "de-LI": CultureInfo;
    "de-LU": CultureInfo;
    "dje": CultureInfo;
    "dje-NE": CultureInfo;
    "doi": CultureInfo;
    "doi-IN": CultureInfo;
    "dsb": CultureInfo;
    "dsb-DE": CultureInfo;
    "dua": CultureInfo;
    "dua-CM": CultureInfo;
    "dv": CultureInfo;
    "dv-MV": CultureInfo;
    "dyo": CultureInfo;
    "dyo-SN": CultureInfo;
    "dz": CultureInfo;
    "dz-BT": CultureInfo;
    "ebu": CultureInfo;
    "ebu-KE": CultureInfo;
    "ee": CultureInfo;
    "ee-GH": CultureInfo;
    "ee-TG": CultureInfo;
    "el": CultureInfo;
    "el-CY": CultureInfo;
    "el-GR": CultureInfo;
    "en": CultureInfo;
    "en-001": CultureInfo;
    "en-029": CultureInfo;
    "en-150": CultureInfo;
    "en-AE": CultureInfo;
    "en-AG": CultureInfo;
    "en-AI": CultureInfo;
    "en-AS": CultureInfo;
    "en-AT": CultureInfo;
    "en-AU": CultureInfo;
    "en-BB": CultureInfo;
    "en-BE": CultureInfo;
    "en-BI": CultureInfo;
    "en-BM": CultureInfo;
    "en-BS": CultureInfo;
    "en-BW": CultureInfo;
    "en-BZ": CultureInfo;
    "en-CA": CultureInfo;
    "en-CC": CultureInfo;
    "en-CH": CultureInfo;
    "en-CK": CultureInfo;
    "en-CM": CultureInfo;
    "en-CX": CultureInfo;
    "en-CY": CultureInfo;
    "en-DE": CultureInfo;
    "en-DK": CultureInfo;
    "en-DM": CultureInfo;
    "en-ER": CultureInfo;
    "en-FI": CultureInfo;
    "en-FJ": CultureInfo;
    "en-FK": CultureInfo;
    "en-FM": CultureInfo;
    "en-GB": CultureInfo;
    "en-GD": CultureInfo;
    "en-GG": CultureInfo;
    "en-GH": CultureInfo;
    "en-GI": CultureInfo;
    "en-GM": CultureInfo;
    "en-GU": CultureInfo;
    "en-GY": CultureInfo;
    "en-HK": CultureInfo;
    "en-ID": CultureInfo;
    "en-IE": CultureInfo;
    "en-IL": CultureInfo;
    "en-IM": CultureInfo;
    "en-IN": CultureInfo;
    "en-IO": CultureInfo;
    "en-JE": CultureInfo;
    "en-JM": CultureInfo;
    "en-KE": CultureInfo;
    "en-KI": CultureInfo;
    "en-KN": CultureInfo;
    "en-KY": CultureInfo;
    "en-LC": CultureInfo;
    "en-LR": CultureInfo;
    "en-LS": CultureInfo;
    "en-MG": CultureInfo;
    "en-MH": CultureInfo;
    "en-MO": CultureInfo;
    "en-MP": CultureInfo;
    "en-MS": CultureInfo;
    "en-MT": CultureInfo;
    "en-MU": CultureInfo;
    "en-MV": CultureInfo;
    "en-MW": CultureInfo;
    "en-MY": CultureInfo;
    "en-NA": CultureInfo;
    "en-NF": CultureInfo;
    "en-NG": CultureInfo;
    "en-NL": CultureInfo;
    "en-NR": CultureInfo;
    "en-NU": CultureInfo;
    "en-NZ": CultureInfo;
    "en-PG": CultureInfo;
    "en-PH": CultureInfo;
    "en-PK": CultureInfo;
    "en-PN": CultureInfo;
    "en-PR": CultureInfo;
    "en-PW": CultureInfo;
    "en-RW": CultureInfo;
    "en-SB": CultureInfo;
    "en-SC": CultureInfo;
    "en-SD": CultureInfo;
    "en-SE": CultureInfo;
    "en-SG": CultureInfo;
    "en-SH": CultureInfo;
    "en-SI": CultureInfo;
    "en-SL": CultureInfo;
    "en-SS": CultureInfo;
    "en-SX": CultureInfo;
    "en-SZ": CultureInfo;
    "en-TC": CultureInfo;
    "en-TK": CultureInfo;
    "en-TO": CultureInfo;
    "en-TT": CultureInfo;
    "en-TV": CultureInfo;
    "en-TZ": CultureInfo;
    "en-UG": CultureInfo;
    "en-UM": CultureInfo;
    "en-US": CultureInfo;
    "en-US-POSIX": CultureInfo;
    "en-VC": CultureInfo;
    "en-VG": CultureInfo;
    "en-VI": CultureInfo;
    "en-VU": CultureInfo;
    "en-WS": CultureInfo;
    "en-ZA": CultureInfo;
    "en-ZM": CultureInfo;
    "en-ZW": CultureInfo;
    "eo": CultureInfo;
    "eo-001": CultureInfo;
    "es": CultureInfo;
    "es-419": CultureInfo;
    "es-AR": CultureInfo;
    "es-BO": CultureInfo;
    "es-BR": CultureInfo;
    "es-BZ": CultureInfo;
    "es-CL": CultureInfo;
    "es-CO": CultureInfo;
    "es-CR": CultureInfo;
    "es-CU": CultureInfo;
    "es-DO": CultureInfo;
    "es-EC": CultureInfo;
    "es-ES": CultureInfo;
    "es-GQ": CultureInfo;
    "es-GT": CultureInfo;
    "es-HN": CultureInfo;
    "es-MX": CultureInfo;
    "es-NI": CultureInfo;
    "es-PA": CultureInfo;
    "es-PE": CultureInfo;
    "es-PH": CultureInfo;
    "es-PR": CultureInfo;
    "es-PY": CultureInfo;
    "es-SV": CultureInfo;
    "es-US": CultureInfo;
    "es-UY": CultureInfo;
    "es-VE": CultureInfo;
    "et": CultureInfo;
    "et-EE": CultureInfo;
    "eu": CultureInfo;
    "eu-ES": CultureInfo;
    "ewo": CultureInfo;
    "ewo-CM": CultureInfo;
    "fa": CultureInfo;
    "fa-AF": CultureInfo;
    "fa-IR": CultureInfo;
    "ff": CultureInfo;
    "ff-Adlm": CultureInfo;
    "ff-Adlm-BF": CultureInfo;
    "ff-Adlm-CM": CultureInfo;
    "ff-Adlm-GH": CultureInfo;
    "ff-Adlm-GM": CultureInfo;
    "ff-Adlm-GN": CultureInfo;
    "ff-Adlm-GW": CultureInfo;
    "ff-Adlm-LR": CultureInfo;
    "ff-Adlm-MR": CultureInfo;
    "ff-Adlm-NE": CultureInfo;
    "ff-Adlm-NG": CultureInfo;
    "ff-Adlm-SL": CultureInfo;
    "ff-Adlm-SN": CultureInfo;
    "ff-Latn": CultureInfo;
    "ff-Latn-BF": CultureInfo;
    "ff-Latn-CM": CultureInfo;
    "ff-Latn-GH": CultureInfo;
    "ff-Latn-GM": CultureInfo;
    "ff-Latn-GN": CultureInfo;
    "ff-Latn-GW": CultureInfo;
    "ff-Latn-LR": CultureInfo;
    "ff-Latn-MR": CultureInfo;
    "ff-Latn-NE": CultureInfo;
    "ff-Latn-NG": CultureInfo;
    "ff-Latn-SL": CultureInfo;
    "ff-Latn-SN": CultureInfo;
    "fi": CultureInfo;
    "fi-FI": CultureInfo;
    "fil": CultureInfo;
    "fil-PH": CultureInfo;
    "fo": CultureInfo;
    "fo-DK": CultureInfo;
    "fo-FO": CultureInfo;
    "fr": CultureInfo;
    "fr-029": CultureInfo;
    "fr-BE": CultureInfo;
    "fr-BF": CultureInfo;
    "fr-BI": CultureInfo;
    "fr-BJ": CultureInfo;
    "fr-BL": CultureInfo;
    "fr-CA": CultureInfo;
    "fr-CD": CultureInfo;
    "fr-CF": CultureInfo;
    "fr-CG": CultureInfo;
    "fr-CH": CultureInfo;
    "fr-CI": CultureInfo;
    "fr-CM": CultureInfo;
    "fr-DJ": CultureInfo;
    "fr-DZ": CultureInfo;
    "fr-FR": CultureInfo;
    "fr-GA": CultureInfo;
    "fr-GF": CultureInfo;
    "fr-GN": CultureInfo;
    "fr-GP": CultureInfo;
    "fr-GQ": CultureInfo;
    "fr-HT": CultureInfo;
    "fr-KM": CultureInfo;
    "fr-LU": CultureInfo;
    "fr-MA": CultureInfo;
    "fr-MC": CultureInfo;
    "fr-MF": CultureInfo;
    "fr-MG": CultureInfo;
    "fr-ML": CultureInfo;
    "fr-MQ": CultureInfo;
    "fr-MR": CultureInfo;
    "fr-MU": CultureInfo;
    "fr-NC": CultureInfo;
    "fr-NE": CultureInfo;
    "fr-PF": CultureInfo;
    "fr-PM": CultureInfo;
    "fr-RE": CultureInfo;
    "fr-RW": CultureInfo;
    "fr-SC": CultureInfo;
    "fr-SN": CultureInfo;
    "fr-SY": CultureInfo;
    "fr-TD": CultureInfo;
    "fr-TG": CultureInfo;
    "fr-TN": CultureInfo;
    "fr-VU": CultureInfo;
    "fr-WF": CultureInfo;
    "fr-YT": CultureInfo;
    "fur": CultureInfo;
    "fur-IT": CultureInfo;
    "fy": CultureInfo;
    "fy-NL": CultureInfo;
    "ga": CultureInfo;
    "ga-GB": CultureInfo;
    "ga-IE": CultureInfo;
    "gd": CultureInfo;
    "gd-GB": CultureInfo;
    "gl": CultureInfo;
    "gl-ES": CultureInfo;
    "gn": CultureInfo;
    "gn-PY": CultureInfo;
    "gsw": CultureInfo;
    "gsw-CH": CultureInfo;
    "gsw-FR": CultureInfo;
    "gsw-LI": CultureInfo;
    "gu": CultureInfo;
    "gu-IN": CultureInfo;
    "guz": CultureInfo;
    "guz-KE": CultureInfo;
    "gv": CultureInfo;
    "gv-IM": CultureInfo;
    "ha": CultureInfo;
    "ha-GH": CultureInfo;
    "ha-Latn": CultureInfo;
    "ha-Latn-GH": CultureInfo;
    "ha-Latn-NE": CultureInfo;
    "ha-Latn-NG": CultureInfo;
    "ha-NE": CultureInfo;
    "ha-NG": CultureInfo;
    "haw": CultureInfo;
    "haw-US": CultureInfo;
    "he": CultureInfo;
    "he-IL": CultureInfo;
    "hi": CultureInfo;
    "hi-IN": CultureInfo;
    "hi-Latn": CultureInfo;
    "hi-Latn-IN": CultureInfo;
    "hr": CultureInfo;
    "hr-BA": CultureInfo;
    "hr-HR": CultureInfo;
    "hsb": CultureInfo;
    "hsb-DE": CultureInfo;
    "hu": CultureInfo;
    "hu-HU": CultureInfo;
    "hy": CultureInfo;
    "hy-AM": CultureInfo;
    "ia": CultureInfo;
    "ia-001": CultureInfo;
    "ibb": CultureInfo;
    "ibb-NG": CultureInfo;
    "id": CultureInfo;
    "id-ID": CultureInfo;
    "ig": CultureInfo;
    "ig-NG": CultureInfo;
    "ii": CultureInfo;
    "ii-CN": CultureInfo;
    "is": CultureInfo;
    "is-IS": CultureInfo;
    "it": CultureInfo;
    "it-CH": CultureInfo;
    "it-IT": CultureInfo;
    "it-SM": CultureInfo;
    "it-VA": CultureInfo;
    "iu": CultureInfo;
    "iu-CA": CultureInfo;
    "iu-Cans": CultureInfo;
    "iu-Cans-CA": CultureInfo;
    "iu-Latn": CultureInfo;
    "iu-Latn-CA": CultureInfo;
    "ja": CultureInfo;
    "ja-JP": CultureInfo;
    "jgo": CultureInfo;
    "jgo-CM": CultureInfo;
    "jmc": CultureInfo;
    "jmc-TZ": CultureInfo;
    "jv": CultureInfo;
    "jv-ID": CultureInfo;
    "jv-Java": CultureInfo;
    "jv-Java-ID": CultureInfo;
    "jv-Latn": CultureInfo;
    "jv-Latn-ID": CultureInfo;
    "ka": CultureInfo;
    "ka-GE": CultureInfo;
    "kab": CultureInfo;
    "kab-DZ": CultureInfo;
    "kam": CultureInfo;
    "kam-KE": CultureInfo;
    "kde": CultureInfo;
    "kde-TZ": CultureInfo;
    "kea": CultureInfo;
    "kea-CV": CultureInfo;
    "kgp": CultureInfo;
    "kgp-BR": CultureInfo;
    "khq": CultureInfo;
    "khq-ML": CultureInfo;
    "ki": CultureInfo;
    "ki-KE": CultureInfo;
    "kk": CultureInfo;
    "kk-KZ": CultureInfo;
    "kkj": CultureInfo;
    "kkj-CM": CultureInfo;
    "kl": CultureInfo;
    "kl-GL": CultureInfo;
    "kln": CultureInfo;
    "kln-KE": CultureInfo;
    "km": CultureInfo;
    "km-KH": CultureInfo;
    "kn": CultureInfo;
    "kn-IN": CultureInfo;
    "ko": CultureInfo;
    "ko-KP": CultureInfo;
    "ko-KR": CultureInfo;
    "kok": CultureInfo;
    "kok-IN": CultureInfo;
    "kr": CultureInfo;
    "kr-Latn": CultureInfo;
    "kr-Latn-NG": CultureInfo;
    "ks": CultureInfo;
    "ks-Arab": CultureInfo;
    "ks-Arab-IN": CultureInfo;
    "ks-Deva": CultureInfo;
    "ks-Deva-IN": CultureInfo;
    "ksb": CultureInfo;
    "ksb-TZ": CultureInfo;
    "ksf": CultureInfo;
    "ksf-CM": CultureInfo;
    "ksh": CultureInfo;
    "ksh-DE": CultureInfo;
    "ku": CultureInfo;
    "ku-Arab": CultureInfo;
    "ku-Arab-IQ": CultureInfo;
    "ku-Arab-IR": CultureInfo;
    "kw": CultureInfo;
    "kw-GB": CultureInfo;
    "ky": CultureInfo;
    "ky-KG": CultureInfo;
    "la": CultureInfo;
    "la-001": CultureInfo;
    "la-VA": CultureInfo;
    "lag": CultureInfo;
    "lag-TZ": CultureInfo;
    "lb": CultureInfo;
    "lb-LU": CultureInfo;
    "lg": CultureInfo;
    "lg-UG": CultureInfo;
    "lkt": CultureInfo;
    "lkt-US": CultureInfo;
    "ln": CultureInfo;
    "ln-AO": CultureInfo;
    "ln-CD": CultureInfo;
    "ln-CF": CultureInfo;
    "ln-CG": CultureInfo;
    "lo": CultureInfo;
    "lo-LA": CultureInfo;
    "lrc": CultureInfo;
    "lrc-IQ": CultureInfo;
    "lrc-IR": CultureInfo;
    "lt": CultureInfo;
    "lt-LT": CultureInfo;
    "lu": CultureInfo;
    "lu-CD": CultureInfo;
    "luo": CultureInfo;
    "luo-KE": CultureInfo;
    "luy": CultureInfo;
    "luy-KE": CultureInfo;
    "lv": CultureInfo;
    "lv-LV": CultureInfo;
    "mai": CultureInfo;
    "mai-IN": CultureInfo;
    "mas": CultureInfo;
    "mas-KE": CultureInfo;
    "mas-TZ": CultureInfo;
    "mer": CultureInfo;
    "mer-KE": CultureInfo;
    "mfe": CultureInfo;
    "mfe-MU": CultureInfo;
    "mg": CultureInfo;
    "mg-MG": CultureInfo;
    "mgh": CultureInfo;
    "mgh-MZ": CultureInfo;
    "mgo": CultureInfo;
    "mgo-CM": CultureInfo;
    "mi": CultureInfo;
    "mi-NZ": CultureInfo;
    "mk": CultureInfo;
    "mk-MK": CultureInfo;
    "ml": CultureInfo;
    "ml-IN": CultureInfo;
    "mn": CultureInfo;
    "mn-Cyrl": CultureInfo;
    "mn-MN": CultureInfo;
    "mn-Mong": CultureInfo;
    "mn-Mong-CN": CultureInfo;
    "mn-Mong-MN": CultureInfo;
    "mni": CultureInfo;
    "mni-Beng": CultureInfo;
    "mni-Beng-IN": CultureInfo;
    "mni-IN": CultureInfo;
    "moh": CultureInfo;
    "moh-CA": CultureInfo;
    "mr": CultureInfo;
    "mr-IN": CultureInfo;
    "ms": CultureInfo;
    "ms-BN": CultureInfo;
    "ms-ID": CultureInfo;
    "ms-MY": CultureInfo;
    "ms-SG": CultureInfo;
    "mt": CultureInfo;
    "mt-MT": CultureInfo;
    "mua": CultureInfo;
    "mua-CM": CultureInfo;
    "my": CultureInfo;
    "my-MM": CultureInfo;
    "mzn": CultureInfo;
    "mzn-IR": CultureInfo;
    "naq": CultureInfo;
    "naq-NA": CultureInfo;
    "nb": CultureInfo;
    "nb-NO": CultureInfo;
    "nb-SJ": CultureInfo;
    "nd": CultureInfo;
    "nd-ZW": CultureInfo;
    "nds": CultureInfo;
    "nds-DE": CultureInfo;
    "nds-NL": CultureInfo;
    "ne": CultureInfo;
    "ne-IN": CultureInfo;
    "ne-NP": CultureInfo;
    "nl": CultureInfo;
    "nl-AW": CultureInfo;
    "nl-BE": CultureInfo;
    "nl-BQ": CultureInfo;
    "nl-CW": CultureInfo;
    "nl-NL": CultureInfo;
    "nl-SR": CultureInfo;
    "nl-SX": CultureInfo;
    "nmg": CultureInfo;
    "nmg-CM": CultureInfo;
    "nn": CultureInfo;
    "nn-NO": CultureInfo;
    "nnh": CultureInfo;
    "nnh-CM": CultureInfo;
    "no": CultureInfo;
    "nqo": CultureInfo;
    "nqo-GN": CultureInfo;
    "nr": CultureInfo;
    "nr-ZA": CultureInfo;
    "nso": CultureInfo;
    "nso-ZA": CultureInfo;
    "nus": CultureInfo;
    "nus-SS": CultureInfo;
    "nyn": CultureInfo;
    "nyn-UG": CultureInfo;
    "oc": CultureInfo;
    "oc-ES": CultureInfo;
    "oc-FR": CultureInfo;
    "om": CultureInfo;
    "om-ET": CultureInfo;
    "om-KE": CultureInfo;
    "or": CultureInfo;
    "or-IN": CultureInfo;
    "os": CultureInfo;
    "os-GE": CultureInfo;
    "os-RU": CultureInfo;
    "pa": CultureInfo;
    "pa-Arab": CultureInfo;
    "pa-Arab-PK": CultureInfo;
    "pa-Guru": CultureInfo;
    "pa-Guru-IN": CultureInfo;
    "pa-IN": CultureInfo;
    "pap": CultureInfo;
    "pap-029": CultureInfo;
    "pcm": CultureInfo;
    "pcm-NG": CultureInfo;
    "pl": CultureInfo;
    "pl-PL": CultureInfo;
    "prg": CultureInfo;
    "prg-001": CultureInfo;
    "prs": CultureInfo;
    "prs-AF": CultureInfo;
    "ps": CultureInfo;
    "ps-AF": CultureInfo;
    "ps-PK": CultureInfo;
    "pt": CultureInfo;
    "pt-AO": CultureInfo;
    "pt-BR": CultureInfo;
    "pt-CH": CultureInfo;
    "pt-CV": CultureInfo;
    "pt-GQ": CultureInfo;
    "pt-GW": CultureInfo;
    "pt-LU": CultureInfo;
    "pt-MO": CultureInfo;
    "pt-MZ": CultureInfo;
    "pt-PT": CultureInfo;
    "pt-ST": CultureInfo;
    "pt-TL": CultureInfo;
    "qu": CultureInfo;
    "qu-BO": CultureInfo;
    "qu-EC": CultureInfo;
    "qu-PE": CultureInfo;
    "quc": CultureInfo;
    "quc-GT": CultureInfo;
    "quc-Latn": CultureInfo;
    "quc-Latn-GT": CultureInfo;
    "quz": CultureInfo;
    "quz-BO": CultureInfo;
    "quz-EC": CultureInfo;
    "quz-PE": CultureInfo;
    "raj": CultureInfo;
    "raj-IN": CultureInfo;
    "rm": CultureInfo;
    "rm-CH": CultureInfo;
    "rn": CultureInfo;
    "rn-BI": CultureInfo;
    "ro": CultureInfo;
    "ro-MD": CultureInfo;
    "ro-RO": CultureInfo;
    "rof": CultureInfo;
    "rof-TZ": CultureInfo;
    "ru": CultureInfo;
    "ru-BY": CultureInfo;
    "ru-KG": CultureInfo;
    "ru-KZ": CultureInfo;
    "ru-MD": CultureInfo;
    "ru-RU": CultureInfo;
    "ru-UA": CultureInfo;
    "rw": CultureInfo;
    "rw-RW": CultureInfo;
    "rwk": CultureInfo;
    "rwk-TZ": CultureInfo;
    "sa": CultureInfo;
    "sa-IN": CultureInfo;
    "sah": CultureInfo;
    "sah-RU": CultureInfo;
    "saq": CultureInfo;
    "saq-KE": CultureInfo;
    "sat": CultureInfo;
    "sat-Olck": CultureInfo;
    "sat-Olck-IN": CultureInfo;
    "sbp": CultureInfo;
    "sbp-TZ": CultureInfo;
    "sc": CultureInfo;
    "sc-IT": CultureInfo;
    "sd": CultureInfo;
    "sd-Arab": CultureInfo;
    "sd-Arab-PK": CultureInfo;
    "sd-Deva": CultureInfo;
    "sd-Deva-IN": CultureInfo;
    "se": CultureInfo;
    "se-FI": CultureInfo;
    "se-NO": CultureInfo;
    "se-SE": CultureInfo;
    "seh": CultureInfo;
    "seh-MZ": CultureInfo;
    "ses": CultureInfo;
    "ses-ML": CultureInfo;
    "sg": CultureInfo;
    "sg-CF": CultureInfo;
    "shi": CultureInfo;
    "shi-Latn": CultureInfo;
    "shi-Latn-MA": CultureInfo;
    "shi-Tfng": CultureInfo;
    "shi-Tfng-MA": CultureInfo;
    "si": CultureInfo;
    "si-LK": CultureInfo;
    "sk": CultureInfo;
    "sk-SK": CultureInfo;
    "sl": CultureInfo;
    "sl-SI": CultureInfo;
    "sma": CultureInfo;
    "sma-NO": CultureInfo;
    "sma-SE": CultureInfo;
    "smj": CultureInfo;
    "smj-NO": CultureInfo;
    "smj-SE": CultureInfo;
    "smn": CultureInfo;
    "smn-FI": CultureInfo;
    "sms": CultureInfo;
    "sms-FI": CultureInfo;
    "sn": CultureInfo;
    "sn-Latn": CultureInfo;
    "sn-Latn-ZW": CultureInfo;
    "sn-ZW": CultureInfo;
    "so": CultureInfo;
    "so-DJ": CultureInfo;
    "so-ET": CultureInfo;
    "so-KE": CultureInfo;
    "so-SO": CultureInfo;
    "sq": CultureInfo;
    "sq-AL": CultureInfo;
    "sq-MK": CultureInfo;
    "sq-XK": CultureInfo;
    "sr": CultureInfo;
    "sr-Cyrl": CultureInfo;
    "sr-Cyrl-BA": CultureInfo;
    "sr-Cyrl-ME": CultureInfo;
    "sr-Cyrl-RS": CultureInfo;
    "sr-Cyrl-XK": CultureInfo;
    "sr-Latn": CultureInfo;
    "sr-Latn-BA": CultureInfo;
    "sr-Latn-ME": CultureInfo;
    "sr-Latn-RS": CultureInfo;
    "sr-Latn-XK": CultureInfo;
    "ss": CultureInfo;
    "ss-SZ": CultureInfo;
    "ss-ZA": CultureInfo;
    "ssy": CultureInfo;
    "ssy-ER": CultureInfo;
    "st": CultureInfo;
    "st-LS": CultureInfo;
    "st-ZA": CultureInfo;
    "su": CultureInfo;
    "su-Latn": CultureInfo;
    "su-Latn-ID": CultureInfo;
    "sv": CultureInfo;
    "sv-AX": CultureInfo;
    "sv-FI": CultureInfo;
    "sv-SE": CultureInfo;
    "sw": CultureInfo;
    "sw-CD": CultureInfo;
    "sw-KE": CultureInfo;
    "sw-TZ": CultureInfo;
    "sw-UG": CultureInfo;
    "syr": CultureInfo;
    "syr-SY": CultureInfo;
    "ta": CultureInfo;
    "ta-IN": CultureInfo;
    "ta-LK": CultureInfo;
    "ta-MY": CultureInfo;
    "ta-SG": CultureInfo;
    "te": CultureInfo;
    "te-IN": CultureInfo;
    "teo": CultureInfo;
    "teo-KE": CultureInfo;
    "teo-UG": CultureInfo;
    "tg": CultureInfo;
    "tg-Cyrl": CultureInfo;
    "tg-Cyrl-TJ": CultureInfo;
    "tg-TJ": CultureInfo;
    "th": CultureInfo;
    "th-TH": CultureInfo;
    "ti": CultureInfo;
    "ti-ER": CultureInfo;
    "ti-ET": CultureInfo;
    "tig": CultureInfo;
    "tig-ER": CultureInfo;
    "tk": CultureInfo;
    "tk-TM": CultureInfo;
    "tn": CultureInfo;
    "tn-BW": CultureInfo;
    "tn-ZA": CultureInfo;
    "to": CultureInfo;
    "to-TO": CultureInfo;
    "tr": CultureInfo;
    "tr-CY": CultureInfo;
    "tr-TR": CultureInfo;
    "ts": CultureInfo;
    "ts-ZA": CultureInfo;
    "tt": CultureInfo;
    "tt-RU": CultureInfo;
    "twq": CultureInfo;
    "twq-NE": CultureInfo;
    "tzm": CultureInfo;
    "tzm-Arab": CultureInfo;
    "tzm-Arab-MA": CultureInfo;
    "tzm-DZ": CultureInfo;
    "tzm-Latn": CultureInfo;
    "tzm-Latn-DZ": CultureInfo;
    "tzm-Latn-MA": CultureInfo;
    "tzm-MA": CultureInfo;
    "tzm-Tfng": CultureInfo;
    "tzm-Tfng-MA": CultureInfo;
    "ug": CultureInfo;
    "ug-CN": CultureInfo;
    "uk": CultureInfo;
    "uk-UA": CultureInfo;
    "ur": CultureInfo;
    "ur-IN": CultureInfo;
    "ur-PK": CultureInfo;
    "uz": CultureInfo;
    "uz-Arab": CultureInfo;
    "uz-Arab-AF": CultureInfo;
    "uz-Cyrl": CultureInfo;
    "uz-Cyrl-UZ": CultureInfo;
    "uz-Latn": CultureInfo;
    "uz-Latn-UZ": CultureInfo;
    "vai": CultureInfo;
    "vai-Latn": CultureInfo;
    "vai-Latn-LR": CultureInfo;
    "vai-Vaii": CultureInfo;
    "vai-Vaii-LR": CultureInfo;
    "ve": CultureInfo;
    "ve-ZA": CultureInfo;
    "vi": CultureInfo;
    "vi-VN": CultureInfo;
    "vo": CultureInfo;
    "vo-001": CultureInfo;
    "vun": CultureInfo;
    "vun-TZ": CultureInfo;
    "wae": CultureInfo;
    "wae-CH": CultureInfo;
    "wal": CultureInfo;
    "wal-ET": CultureInfo;
    "wo": CultureInfo;
    "wo-SN": CultureInfo;
    "xh": CultureInfo;
    "xh-ZA": CultureInfo;
    "xog": CultureInfo;
    "xog-UG": CultureInfo;
    "yav": CultureInfo;
    "yav-CM": CultureInfo;
    "yi": CultureInfo;
    "yi-001": CultureInfo;
    "yo": CultureInfo;
    "yo-BJ": CultureInfo;
    "yo-NG": CultureInfo;
    "yrl": CultureInfo;
    "yrl-BR": CultureInfo;
    "yrl-CO": CultureInfo;
    "yrl-VE": CultureInfo;
    "zgh": CultureInfo;
    "zgh-MA": CultureInfo;
    "zgh-Tfng": CultureInfo;
    "zgh-Tfng-MA": CultureInfo;
    "zh": CultureInfo;
    "zh-CN": CultureInfo;
    "zh-HK": CultureInfo;
    "zh-Hans": CultureInfo;
    "zh-Hans-CN": CultureInfo;
    "zh-Hans-HK": CultureInfo;
    "zh-Hans-MO": CultureInfo;
    "zh-Hans-SG": CultureInfo;
    "zh-Hant": CultureInfo;
    "zh-Hant-HK": CultureInfo;
    "zh-Hant-MO": CultureInfo;
    "zh-Hant-TW": CultureInfo;
    "zh-MO": CultureInfo;
    "zh-SG": CultureInfo;
    "zh-TW": CultureInfo;
    "zu": CultureInfo;
    "zu-ZA": CultureInfo;
}
