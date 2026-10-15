export * from '@xobin/globalization';
export { DateTime as DirectDateTime } from '@xobin/globalization/date-time';
export { TimeSpan as DirectTimeSpan } from '@xobin/globalization/time-span';

export async function loadLocale(name, full = false) {
    if (name === 'fa-IR') return full
        ? (await import('@xobin/globalization/locales/fa-IR/full')).cultureData
        : (await import('@xobin/globalization/locales/fa-IR')).cultureData;
    if (name === 'en-US' && !full) return (await import('@xobin/globalization/locales/en-US')).cultureData;
    throw new Error('Unsupported browser test locale.');
}
