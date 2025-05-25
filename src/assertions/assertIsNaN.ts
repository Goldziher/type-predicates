import type { ErrorMessage } from '../types';
import { isNaN } from '../guards/isNaN';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNaN(
    input: unknown,
    options?: ErrorMessage,
): asserts input is number {
    if (!isNaN(input)) {
        throw new TypeError(options?.message);
    }
}
