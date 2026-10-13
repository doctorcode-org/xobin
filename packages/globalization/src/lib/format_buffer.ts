import { ArgumentOutOfRangeException } from '@xobin/core';
import type { OutParam } from '@xobin/core';

/** Copies a formatted value into UTF-16 or UTF-8 storage without changing undersized buffers. */
export function writeFormatBuffer(text: string, destination: string[] | Uint16Array | Uint8Array, written: OutParam<number>): boolean {
    if (destination instanceof Uint8Array) {
        const bytes = new TextEncoder().encode(text);
        if (bytes.length > destination.length) { written.result = 0; return false; }
        destination.set(bytes);
        written.result = bytes.length;
    } else {
        if (text.length > destination.length) { written.result = 0; return false; }
        for (let i = 0; i < text.length; i++) {
            if (destination instanceof Uint16Array) destination[i] = text.charCodeAt(i);
            else destination[i] = text[i]!;
        }
        written.result = text.length;
    }
    return true;
}

/** Individual writes used by the reference's character and byte builders. */
export type FormatEmitter = (text: string, kind: 'text' | 'char' | 'escaped' | 'remove') => void;

/** Preserves native buffer growth, escaped-byte casts, and single-character UTF-8 validation. */
export function tryWriteFormatted(render: (emit: FormatEmitter) => string, destination: string[] | Uint16Array | Uint8Array, written: OutParam<number>, partial: boolean): boolean {
    const bytes = destination instanceof Uint8Array;
    const units: number[] = [];
    let grew = false;
    let emitted = false;
    const put = (index: number, value: number) => {
        if (Array.isArray(destination)) destination[index] = String.fromCharCode(value);
        else destination[index] = value;
    };
    const emit: FormatEmitter = (text, kind) => {
        emitted = true;
        if (kind === 'remove') { units.pop(); return; }
        let chunk: number[];
        if (!bytes) chunk = Array.from({ length: text.length }, (_, i) => text.charCodeAt(i));
        else if (kind === 'escaped') chunk = [text.charCodeAt(0) & 255];
        else {
            if (kind === 'char' && text.length && text.charCodeAt(0) >= 0xd800 && text.charCodeAt(0) <= 0xdfff) throw new ArgumentOutOfRangeException('ch');
            chunk = Array.from(new TextEncoder().encode(text));
        }
        if (units.length + chunk.length > destination.length) grew = true;
        if (partial && !grew) chunk.forEach((value, index) => put(units.length + index, value));
        for (const value of chunk) units.push(value);
    };
    const text = render(emit);
    if (!emitted) return writeFormatBuffer(text, destination, written);
    if (units.length > destination.length) { written.result = 0; return false; }
    if (!partial || grew) units.forEach((value, index) => put(index, value));
    written.result = units.length;
    return true;
}
