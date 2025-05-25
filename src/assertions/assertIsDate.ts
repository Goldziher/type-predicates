import type { ErrorMessage } from '../types';
import { isDate } from '../guards/isDate';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsDate(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Date {
    if (!isDate(input)) {
        throw new TypeError(options?.message);
    }
}
