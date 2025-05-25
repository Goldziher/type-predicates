import { isObject } from '../guards/isObject';
import type { ErrorMessage } from '../types';

/**
 * @remarks
 * Tests true for all objects that have a typeof 'object' excluding null
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as object
 * assertIsObject({});
 *
 * // does not throw, value is typed as object
 * assertIsObject([]);
 *
 * // throws
 * assertIsObject(null);
 * ```
 *
 * @throws TypeError
 */
export function assertIsObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is object {
    if (!isObject(input)) {
        throw new TypeError(options?.message);
    }
}
