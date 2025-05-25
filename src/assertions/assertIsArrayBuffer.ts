import type { ErrorMessage } from '../types';
import { isArrayBuffer } from '../guards/isArrayBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsArrayBuffer(input: unknown, options?: ErrorMessage): asserts input is ArrayBuffer {
    if (!isArrayBuffer(input)) {
        throw new TypeError(options?.message);
    }
}
