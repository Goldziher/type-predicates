import type { ErrorMessage } from '../types';
import { isNull } from '../guards/isNull';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNull(input: unknown, options?: ErrorMessage): asserts input is null {
    if (!isNull(input)) {
        throw new TypeError(options?.message);
    }
}
