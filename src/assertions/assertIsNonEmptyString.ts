import type { ErrorMessage } from '../types';
import { isNonEmptyString } from '../guards/isNonEmptyString';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNonEmptyString(
    input: unknown,
    options?: ErrorMessage,
): asserts input is string {
    if (!isNonEmptyString(input)) {
        throw new TypeError(
            options?.message ?? 'Input is not a non-empty string',
        );
    }
}
