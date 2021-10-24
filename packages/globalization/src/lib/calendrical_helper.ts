import { DateTime } from "./date_time";
import { TicksPerDay } from './var';

export const MeanTropicalYearInDays = 365.242189;
const FullCircleOfArc = 360.0; // 360.0;
const HalfCircleOfArc = 180;
const TwelveHours = 0.5; // half a day
const Noon2000Jan01 = 730120.5;
const MeanSpeedOfSun = MeanTropicalYearInDays / FullCircleOfArc;
const LongitudeSpring = 0.0;
const TwoDegreesAfterSpring = 2.0;
const SecondsPerDay = 24 * 60 * 60; // 24 hours * 60 minutes * 60 seconds

const DaysInUniformLengthCentury = 36525;
const SecondsPerMinute = 60;
const MinutesPerDegree = 60;

const StartOf1810 = getNumberOfDays(new DateTime(1810, 1, 1));
const StartOf1900Century = getNumberOfDays(new DateTime(1900, 1, 1));

const Coefficients1900to1987 = [-0.00002, 0.000297, 0.025184, -0.181133, 0.553040, -0.861938, 0.677066, -0.212591];
const Coefficients1800to1899 = [-0.000009, 0.003844, 0.083563, 0.865736, 4.867575, 15.845535, 31.332267, 38.291999, 28.316289, 11.636204, 2.043794];
const Coefficients1700to1799 = [8.118780842, -0.005092142, 0.003336121, -0.0000266484];
const Coefficients1620to1699 = [196.58333, -4.0675, 0.0219167];
const LambdaCoefficients = [280.46645, 36000.76983, 0.0003032];
const AnomalyCoefficients = [357.52910, 35999.05030, -0.0001559, -0.00000048];
const EccentricityCoefficients = [0.016708617, -0.000042037, -0.0000001236];
const Coefficients = [
    angle(23, 26, 21.448),
    angle(0, 0, -46.8150),
    angle(0, 0, -0.00059),
    angle(0, 0, 0.001813)
];
const CoefficientsA = [124.90, -1934.134, 0.002063];
const CoefficientsB = [201.11, 72001.5377, 0.00057];

enum CorrectionAlgorithm {
    Default,
    Year1988to2019,
    Year1900to1987,
    Year1800to1899,
    Year1700to1799,
    Year1620to1699
}

const s_ephemerisCorrectionTable: ReadonlyArray<EphemerisCorrectionAlgorithmMap> = [
    { lowestYear: 2020, algorithm: CorrectionAlgorithm.Default },
    { lowestYear: 1988, algorithm: CorrectionAlgorithm.Year1988to2019 },
    { lowestYear: 1900, algorithm: CorrectionAlgorithm.Year1900to1987 },
    { lowestYear: 1800, algorithm: CorrectionAlgorithm.Year1800to1899 },
    { lowestYear: 1700, algorithm: CorrectionAlgorithm.Year1700to1799 },
    { lowestYear: 1620, algorithm: CorrectionAlgorithm.Year1620to1699 },
    { lowestYear: -2147483648, algorithm: CorrectionAlgorithm.Default }
];

export function persianNewYearOnOrBefore(numberOfDays: number) {
    const date = numberOfDays;

    const approx = estimatePrior(LongitudeSpring, middayAtPersianObservationSite(date));
    const lowerBoundNewYearDay = Math.floor(approx) - 1;
    const upperBoundNewYearDay = lowerBoundNewYearDay + 3; // estimate is generally within a day of the actual occurrence (at the limits, the error expands, since the calculations rely on the mean tropical year which changes...)
    let day = lowerBoundNewYearDay;
    for (; day != upperBoundNewYearDay; ++day) {
        const midday = middayAtPersianObservationSite(day);
        const l = compute(midday);
        if ((LongitudeSpring <= l) && (l <= TwoDegreesAfterSpring)) {
            break;
        }
    }

    return day - 1;
}

export function asSeason(longitude: number): number {
    return (longitude < 0) ? (longitude + FullCircleOfArc) : longitude;
}

export function compute(time: number): number {
    const julian = julianCenturies(time);
    const lambda = 282.7771834
        + (36000.76953744 * julian)
        + (0.000005729577951308232 * sumLongSequenceOfPeriodicTerms(julian));

    const longitude = lambda + aberration(julian) + nutation(julian);
    return initLongitude(longitude);
}

// midday-in-tehran
export function middayAtPersianObservationSite(date: number): number {
    return midday(date, initLongitude(52.5)); // 52.5 degrees east - longitude of UTC+3:30 which defines Iranian Standard Time
}

export function julianCenturies(moment: number): number {
    const dynamicalMoment = moment + ephemerisCorrection(moment);
    return (dynamicalMoment - Noon2000Jan01) / DaysInUniformLengthCentury;
}

export function asDayFraction(longitude: number): number {
    return longitude / FullCircleOfArc;
}

export function midday(date: number, longitude: number): number {
    return asLocalTime(date + TwelveHours, longitude) - asDayFraction(longitude);
}

export function getNumberOfDays(date: DateTime): number {
    return date.ticks / TicksPerDay;
}

export function angle(degrees: number, minutes: number, seconds: number): number {
    return ((seconds / SecondsPerMinute + minutes) / MinutesPerDegree) + degrees;
}

//------------------------------------------------------------------------------------


function estimatePrior(longitude: number, time: number): number {
    const timeSunLastAtLongitude = time - (MeanSpeedOfSun * asSeason(initLongitude(compute(time) - longitude)));
    const longitudeErrorDelta = initLongitude(compute(timeSunLastAtLongitude) - longitude);
    return Math.min(time, timeSunLastAtLongitude - (MeanSpeedOfSun * longitudeErrorDelta));
}

function nutation(julianCenturies: number): number {
    const a = polynomialSum(CoefficientsA, julianCenturies);
    const b = polynomialSum(CoefficientsB, julianCenturies);
    return (-0.004778 * sinOfDegree(a)) - (0.0003667 * sinOfDegree(b));
}

function aberration(julianCenturies: number): number {
    return (0.0000974 * cosOfDegree(177.63 + (35999.01848 * julianCenturies))) - 0.005575;
}

function sumLongSequenceOfPeriodicTerms(julianCenturies: number): number {
    let sum = 0.0;
    sum += periodicTerm(julianCenturies, 403406, 270.54861, 0.9287892);
    sum += periodicTerm(julianCenturies, 195207, 340.19128, 35999.1376958);
    sum += periodicTerm(julianCenturies, 119433, 63.91854, 35999.4089666);
    sum += periodicTerm(julianCenturies, 112392, 331.2622, 35998.7287385);
    sum += periodicTerm(julianCenturies, 3891, 317.843, 71998.20261);
    sum += periodicTerm(julianCenturies, 2819, 86.631, 71998.4403);
    sum += periodicTerm(julianCenturies, 1721, 240.052, 36000.35726);
    sum += periodicTerm(julianCenturies, 660, 310.26, 71997.4812);
    sum += periodicTerm(julianCenturies, 350, 247.23, 32964.4678);
    sum += periodicTerm(julianCenturies, 334, 260.87, -19.441);
    sum += periodicTerm(julianCenturies, 314, 297.82, 445267.1117);
    sum += periodicTerm(julianCenturies, 268, 343.14, 45036.884);
    sum += periodicTerm(julianCenturies, 242, 166.79, 3.1008);
    sum += periodicTerm(julianCenturies, 234, 81.53, 22518.4434);
    sum += periodicTerm(julianCenturies, 158, 3.5, -19.9739);
    sum += periodicTerm(julianCenturies, 132, 132.75, 65928.9345);
    sum += periodicTerm(julianCenturies, 129, 182.95, 9038.0293);
    sum += periodicTerm(julianCenturies, 114, 162.03, 3034.7684);
    sum += periodicTerm(julianCenturies, 99, 29.8, 33718.148);
    sum += periodicTerm(julianCenturies, 93, 266.4, 3034.448);
    sum += periodicTerm(julianCenturies, 86, 249.2, -2280.773);
    sum += periodicTerm(julianCenturies, 78, 157.6, 29929.992);
    sum += periodicTerm(julianCenturies, 72, 257.8, 31556.493);
    sum += periodicTerm(julianCenturies, 68, 185.1, 149.588);
    sum += periodicTerm(julianCenturies, 64, 69.9, 9037.75);
    sum += periodicTerm(julianCenturies, 46, 8.0, 107997.405);
    sum += periodicTerm(julianCenturies, 38, 197.1, -4444.176);
    sum += periodicTerm(julianCenturies, 37, 250.4, 151.771);
    sum += periodicTerm(julianCenturies, 32, 65.3, 67555.316);
    sum += periodicTerm(julianCenturies, 29, 162.7, 31556.08);
    sum += periodicTerm(julianCenturies, 28, 341.5, -4561.54);
    sum += periodicTerm(julianCenturies, 27, 291.6, 107996.706);
    sum += periodicTerm(julianCenturies, 27, 98.5, 1221.655);
    sum += periodicTerm(julianCenturies, 25, 146.7, 62894.167);
    sum += periodicTerm(julianCenturies, 24, 110.0, 31437.369);
    sum += periodicTerm(julianCenturies, 21, 5.2, 14578.298);
    sum += periodicTerm(julianCenturies, 21, 342.6, -31931.757);
    sum += periodicTerm(julianCenturies, 20, 230.9, 34777.243);
    sum += periodicTerm(julianCenturies, 18, 256.1, 1221.999);
    sum += periodicTerm(julianCenturies, 17, 45.3, 62894.511);
    sum += periodicTerm(julianCenturies, 14, 242.9, -4442.039);
    sum += periodicTerm(julianCenturies, 13, 115.2, 107997.909);
    sum += periodicTerm(julianCenturies, 13, 151.8, 119.066);
    sum += periodicTerm(julianCenturies, 13, 285.3, 16859.071);
    sum += periodicTerm(julianCenturies, 12, 53.3, -4.578);
    sum += periodicTerm(julianCenturies, 10, 126.6, 26895.292);
    sum += periodicTerm(julianCenturies, 10, 205.7, -39.127);
    sum += periodicTerm(julianCenturies, 10, 85.9, 12297.536);
    sum += periodicTerm(julianCenturies, 10, 146.1, 90073.778);
    return sum;
}

function periodicTerm(julianCenturies: number, x: number, y: number, z: number): number {
    return x * sinOfDegree(y + z * julianCenturies);
}

function initLongitude(longitude: number): number {
    return normalizeLongitude(longitude + HalfCircleOfArc) - HalfCircleOfArc;
}

function asLocalTime(apparentMidday: number, longitude: number): number {
    // slightly inaccurate since equation of time takes mean time not apparent time as its argument, but the difference is negligible
    const universalTime = apparentMidday - asDayFraction(longitude);
    return apparentMidday - equationOfTime(universalTime);
}

function equationOfTime(time: number): number {
    const julian = julianCenturies(time);
    const lambda = polynomialSum(LambdaCoefficients, julian);
    const anomaly = polynomialSum(AnomalyCoefficients, julian);
    const eccentricity = polynomialSum(EccentricityCoefficients, julian);

    const epsilon = obliquity(julian);
    const tanHalfEpsilon = tanOfDegree(epsilon / 2);
    const y = tanHalfEpsilon * tanHalfEpsilon;

    const dividend = ((y * sinOfDegree(2 * lambda))
        - (2 * eccentricity * sinOfDegree(anomaly))
        + (4 * eccentricity * y * sinOfDegree(anomaly) * cosOfDegree(2 * lambda))
        - (0.5 * Math.pow(y, 2) * sinOfDegree(4 * lambda))
        - (1.25 * Math.pow(eccentricity, 2) * sinOfDegree(2 * anomaly)));
    const divisor = 2 * Math.PI;
    const equation = dividend / divisor;

    // approximation of equation of time is not valid for dates that are many millennia in the past or future
    // thus limited to a half day
    return copySign(Math.min(Math.abs(equation), TwelveHours), equation);
}

function copySign(value: number, sign: number): number {
    return (isNegative(value) == isNegative(sign)) ? value : -value;
}

function isNegative(value: number): boolean {
    return Math.sign(value) == -1;
}

function ephemerisCorrection(time: number): number {
    const year = getGregorianYear(time);
    for (let map of s_ephemerisCorrectionTable) {
        if (map.lowestYear <= year) {
            switch (map.algorithm) {
                case CorrectionAlgorithm.Default: return defaultEphemerisCorrection(year);
                case CorrectionAlgorithm.Year1988to2019: return ephemerisCorrection1988to2019(year);
                case CorrectionAlgorithm.Year1900to1987: return ephemerisCorrection1900to1987(year);
                case CorrectionAlgorithm.Year1800to1899: return ephemerisCorrection1800to1899(year);
                case CorrectionAlgorithm.Year1700to1799: return ephemerisCorrection1700to1799(year);
                case CorrectionAlgorithm.Year1620to1699: return ephemerisCorrection1620to1699(year);
            }

            break; // break the loop and assert eventually
        }
    }

    return defaultEphemerisCorrection(year);
}

function ephemerisCorrection1620to1699(gregorianYear: number): number {
    const yearsSince1600 = gregorianYear - 1600;
    return polynomialSum(Coefficients1620to1699, yearsSince1600) / SecondsPerDay;
}

function ephemerisCorrection1700to1799(gregorianYear: number): number {
    const yearsSince1700 = gregorianYear - 1700;
    return polynomialSum(Coefficients1700to1799, yearsSince1700) / SecondsPerDay;
}

function ephemerisCorrection1800to1899(gregorianYear: number): number {
    const centuries = centuriesFrom1900(gregorianYear);
    return polynomialSum(Coefficients1800to1899, centuries);
}

function ephemerisCorrection1900to1987(gregorianYear: number): number {
    const centuries = centuriesFrom1900(gregorianYear);
    return polynomialSum(Coefficients1900to1987, centuries);
}

function ephemerisCorrection1988to2019(gregorianYear: number): number {
    return (gregorianYear - 1933) / SecondsPerDay;
}

function defaultEphemerisCorrection(gregorianYear: number): number {
    const january1stOfYear = getNumberOfDays(new DateTime(gregorianYear, 1, 1));
    const daysSinceStartOf1810 = january1stOfYear - StartOf1810;
    const x = TwelveHours + daysSinceStartOf1810;
    return ((Math.pow(x, 2) / 41048480) - 15) / SecondsPerDay;
}

function centuriesFrom1900(gregorianYear: number): number {
    const july1stOfYear = getNumberOfDays(new DateTime(gregorianYear, 7, 1));
    return (july1stOfYear - StartOf1900Century) / DaysInUniformLengthCentury;
}

function polynomialSum(coefficients: number[], indeterminate: number): number {
    let sum = coefficients[0]!;
    let indeterminateRaised = 1;
    for (let i = 1; i < coefficients.length; i++) {
        indeterminateRaised *= indeterminate;
        sum += (coefficients[i]! * indeterminateRaised);
    }

    return sum;
}

function normalizeLongitude(longitude: number): number {
    longitude = reminder(longitude, FullCircleOfArc);
    if (longitude < 0) {
        longitude += FullCircleOfArc;
    }
    return longitude;
}

function reminder(divisor: number, dividend: number): number {
    const whole = Math.floor(divisor / dividend);
    return divisor - (dividend * whole);
}

function getGregorianYear(numberOfDays: number): number {
    return new DateTime(Math.min((Math.floor(numberOfDays) * TicksPerDay), DateTime.maxValue.ticks)).year;
}

function obliquity(julianCenturies: number): number {
    return polynomialSum(Coefficients, julianCenturies);
}

function cosOfDegree(degree: number): number {
    return Math.cos(radiansFromDegrees(degree));
}

function tanOfDegree(degree: number): number {
    return Math.tan(radiansFromDegrees(degree));
}

function sinOfDegree(degree: number): number {
    return Math.sin(radiansFromDegrees(degree));
}

function radiansFromDegrees(degree: number): number {
    return degree * Math.PI / 180;
}


interface EphemerisCorrectionAlgorithmMap {
    lowestYear: number;
    algorithm: CorrectionAlgorithm;
}

