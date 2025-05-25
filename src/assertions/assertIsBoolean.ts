import { isBoolean } from '../guards/isBoolean';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBoolean(
    input: unknown,
    options?: ErrorMessage,
): asserts input is boolean {
    if (!isBoolean(input)) {
        throw new TypeError(options?.message);
    }
}
