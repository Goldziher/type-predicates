import type { ErrorMessage } from '../types';
import { isSharedArrayBuffer } from '../guards/isSharedArrayBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsSharedArrayBuffer(
    input: unknown,
    options?: ErrorMessage,
): asserts input is SharedArrayBuffer {
    if (!isSharedArrayBuffer(input)) {
        throw new TypeError(options?.message);
    }
}
