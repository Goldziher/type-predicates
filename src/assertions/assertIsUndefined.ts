import type { ErrorMessage } from '../types';
import { isUndefined } from '../guards/isUndefined';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsUndefined(
    input: unknown,
    options?: ErrorMessage,
): asserts input is undefined {
    if (!isUndefined(input)) {
        throw new TypeError(options?.message);
    }
}
