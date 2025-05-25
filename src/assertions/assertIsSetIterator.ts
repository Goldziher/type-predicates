import type { ErrorMessage } from '../types';
import { isSetIterator } from '../guards/isSetIterator';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsSetIterator(
    input: unknown,
    options?: ErrorMessage,
): asserts input is IterableIterator<unknown> {
    if (!isSetIterator(input)) {
        throw new TypeError(options?.message);
    }
}
