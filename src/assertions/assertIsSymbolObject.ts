import type { ErrorMessage } from '../types';
import { isSymbolObject } from '../guards/isSymbolObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsSymbolObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is symbol {
    if (!isSymbolObject(input)) {
        throw new TypeError(options?.message);
    }
}
