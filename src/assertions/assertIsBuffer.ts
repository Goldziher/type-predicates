import type { ErrorMessage } from '../types';
import { isBuffer } from '../guards/isBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBuffer(input: unknown, options?: ErrorMessage): asserts input is Buffer {
    if (!isBuffer(input)) {
        throw new TypeError(options?.message);
    }
}
