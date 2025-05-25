import type { ErrorMessage } from '../types';
import { isNativeError } from '../guards/isNativeError';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNativeError(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Error {
    if (!isNativeError(input)) {
        throw new TypeError(options?.message);
    }
}
