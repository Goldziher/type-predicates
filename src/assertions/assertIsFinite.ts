import type { ErrorMessage } from '../types';
import { isFinite } from '../guards/isFinite';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsFinite(
    input: unknown,
    options?: ErrorMessage,
): asserts input is number {
    if (!isFinite(input)) {
        throw new TypeError(options?.message);
    }
}
