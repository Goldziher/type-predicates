import { isWeakSet } from '../guards/isWeakSet';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsWeakSet<T extends object>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is WeakSet<T> {
    if (!isWeakSet(input)) {
        throw new TypeError(options?.message);
    }
}
