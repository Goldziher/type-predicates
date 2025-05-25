import type { ErrorMessage } from '../types';
import { isBigInt } from '../guards/isBigInt';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsBigInt(BigInt(9007199254740991));
 *
 * // throws
 * assertIsBigInt(9007199254740991n);
 * ```
 *
 * @throws TypeError
 */
export function assertIsBigInt(
    input: unknown,
    options?: ErrorMessage,
): asserts input is bigint {
    if (!isBigInt(input)) {
        throw new TypeError(options?.message);
    }
}
