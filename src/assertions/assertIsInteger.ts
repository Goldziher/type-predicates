import type { ErrorMessage } from '../types';
import { isInteger } from '../guards/isInteger';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsInteger(
    input: unknown,
    options?: ErrorMessage,
): asserts input is number {
    if (!isInteger(input)) {
        throw new TypeError(options?.message);
    }
}
