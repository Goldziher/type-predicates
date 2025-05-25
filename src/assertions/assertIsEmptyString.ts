import type { ErrorMessage } from '../types';
import { isEmptyString } from '../guards/isEmptyString';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsEmptyString(
    input: unknown,
    options?: ErrorMessage,
): asserts input is '' {
    if (!isEmptyString(input)) {
        throw new TypeError(options?.message);
    }
}
