import type { ErrorMessage } from '../types';
import { isEmptyArray } from '../guards/isEmptyArray';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsEmptyArray(
    input: unknown,
    options?: ErrorMessage,
): asserts input is [] {
    if (!isEmptyArray(input)) {
        throw new TypeError(options?.message);
    }
}
