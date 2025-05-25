import type { ErrorMessage } from '../types';
import { isAnyArrayBuffer } from '../guards/isAnyArrayBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAnyArrayBuffer(
    input: unknown,
    options?: ErrorMessage,
): asserts input is ArrayBuffer | SharedArrayBuffer {
    if (!isAnyArrayBuffer(input)) {
        throw new TypeError(options?.message);
    }
}
