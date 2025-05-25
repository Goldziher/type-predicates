import { isNumber } from '../guards/isNumber';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsNumber(1);
 *
 * // throws
 * assertIsNumber(new Number(1));
 * ```
 *
 * @throws TypeError
 */
export function assertIsNumber(
    input: unknown,
    options?: ErrorMessage,
): asserts input is number {
    if (!isNumber(input)) {
        throw new TypeError(options?.message);
    }
}
