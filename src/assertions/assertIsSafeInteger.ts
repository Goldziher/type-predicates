import type { ErrorMessage } from '../types';
import { isSafeInteger } from '../guards/isSafeInteger';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsSafeInteger(
    input: unknown,
    options?: ErrorMessage,
): asserts input is number {
    if (!isSafeInteger(input)) {
        throw new TypeError(options?.message);
    }
}
