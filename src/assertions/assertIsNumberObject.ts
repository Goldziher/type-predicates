import type { ErrorMessage } from '../types';
import { isNumberObject } from '../guards/isNumberObject';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsNumberObject(new Number(1));
 *
 * // throws
 * assertIsNumberObject(1);
 * ```
 *
 * @throws TypeError
 */
export function assertIsNumberObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is number {
    if (!isNumberObject(input)) {
        throw new TypeError(options?.message);
    }
}
