import type { ErrorMessage } from '../types';
import { isBigIntObject } from '../guards/isBigIntObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBigIntObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is bigint {
    if (!isBigIntObject(input)) {
        throw new TypeError(options?.message);
    }
}
