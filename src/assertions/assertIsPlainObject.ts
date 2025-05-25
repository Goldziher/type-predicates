import type { ErrorMessage } from '../types';
import { isPlainObject } from '../guards/isPlainObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsPlainObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Record<string, unknown> {
    if (!isPlainObject(input)) {
        throw new TypeError(options?.message);
    }
}
