import type { ErrorMessage } from '../types';
import { isRegExp } from '../guards/isRegExp';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsRegExp(new RegExp('abc'));
 *
 * // does not throw
 * assertIsRegExp(/'abc'/);
 * ```
 *
 * @throws TypeError
 */
export function assertIsRegExp(
    input: unknown,
    options?: ErrorMessage,
): asserts input is RegExp {
    if (!isRegExp(input)) {
        throw new TypeError(options?.message);
    }
}
