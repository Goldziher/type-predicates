import type { ErrorMessage } from '../types';
import { isEmptyObject } from '../guards/isEmptyObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsEmptyObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Record<string, never> {
    if (!isEmptyObject(input)) {
        throw new TypeError(options?.message);
    }
}
