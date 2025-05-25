import type { ErrorMessage } from '../types';
import { isSymbol } from '../guards/isSymbol';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsSymbol(input: unknown, options?: ErrorMessage): asserts input is symbol {
    if (!isSymbol(input)) {
        throw new TypeError(options?.message);
    }
}
