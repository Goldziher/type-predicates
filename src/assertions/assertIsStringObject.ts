import type { ErrorMessage } from '../types';
import { isStringObject } from '../guards/isStringObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsStringObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is string {
    if (!isStringObject(input)) {
        throw new TypeError(options?.message);
    }
}
