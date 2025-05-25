import type { ErrorMessage } from '../types';
import { isMapIterator } from '../guards/isMapIterator';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsMapIterator(
    input: unknown,
    options?: ErrorMessage,
): asserts input is IterableIterator<[unknown, unknown]> {
    if (!isMapIterator(input)) {
        throw new TypeError(options?.message);
    }
}
