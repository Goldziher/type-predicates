import type { ErrorMessage } from '../types';
import { isNonEmptyArray } from '../guards/isNonEmptyArray';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNonEmptyArray(
    input: unknown,
    options?: ErrorMessage,
): asserts input is [unknown, ...unknown[]] {
    if (!isNonEmptyArray(input)) {
        throw new TypeError(options?.message);
    }
}
