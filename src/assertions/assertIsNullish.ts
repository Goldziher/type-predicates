import type { ErrorMessage } from '../types';
import { isNullish } from '../guards/isNullish';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNullish(input: unknown, options?: ErrorMessage): asserts input is null | undefined {
    if (!isNullish(input)) {
        throw new TypeError(options?.message);
    }
}
