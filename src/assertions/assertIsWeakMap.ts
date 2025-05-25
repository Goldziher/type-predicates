import { isWeakMap } from '../guards/isWeakMap';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsWeakMap<K extends object, V = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is WeakMap<K, V> {
    if (!isWeakMap(input)) {
        throw new TypeError(options?.message);
    }
}
