import { ArgumentNullException, IndexOutOfRangeException } from "./exceptions";

const PLACE_HOLDER_RX = /{(\d+)}/g;

/**
 * 
 * @param format
 * @param args
 */
export function formatString(format: string, ...args: any[]): string {
    return format
        .replace(PLACE_HOLDER_RX, (match: string, index: number) => (typeof args[index] !== 'undefined') ? args[index] : match);
}

/**
 * 
 * @param text
 */
export function toCamelCase(text: string): string {
    if (isNullOrEmpty(text))
        return text;

    if (!isUpperChar(text, 0))
        return text;

    let chArray = text.split('');
    for (var i = 0; i < chArray.length; i++) {
        let flag = (i + 1) < chArray.length;
        if (((i > 0) && flag) && !isUpperChar(chArray[i + 1]!)) {
            break;
        }
        chArray[i] = chArray[i]!.toLowerCase();
    }

    return chArray.join('');
}

/**
 * 
 * @param text
 */
export function isNullOrEmpty(text: string): boolean {
    return text == null || text.length === 0;
}

/**
 * 
 * @param text
 * @param index
 */
export function isUpperChar(text: string, index: number = 0): boolean {
    if (text === null || text === undefined) {
        throw new ArgumentNullException('text');
    }

    if (index > text.length - 1) {
        throw new IndexOutOfRangeException();
    }

    return text[index] === text[index]!.toUpperCase();
}

/**
 * 
 * @param text
 * @param index
 */
export function isLowerChar(text: string, index: number = 0): boolean {
    if (text === null || text === undefined) {
        throw new ArgumentNullException('text');
    }

    if (index > text.length - 1) {
        throw new IndexOutOfRangeException();
    }

    return text[index] === text[index]!.toLowerCase();
}