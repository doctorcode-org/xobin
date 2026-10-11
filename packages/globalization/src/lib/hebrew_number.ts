// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

/** Formats a Hebrew calendar number using the .NET HebrewNumber rules. */
export function formatHebrewNumber(value: number): string {
    if (value > 5000) value -= 5000;
    const hundreds = Math.trunc(value / 100);
    let result = 'ת'.repeat(Math.trunc(hundreds / 4));
    if (hundreds % 4) result += String.fromCharCode(0x05e6 + hundreds % 4);
    value %= 100;
    if (value === 15) result += 'טו';
    else if (value === 16) result += 'טז';
    else {
        result += ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'][Math.trunc(value / 10)];
        if (value % 10) result += String.fromCharCode(0x05d0 + value % 10 - 1);
    }
    return result.length > 1 ? result.slice(0, -1) + '"' + result.slice(-1) : result + "'";
}
