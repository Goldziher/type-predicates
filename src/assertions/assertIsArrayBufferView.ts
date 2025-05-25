import type { ErrorMessage } from '../types';
import { isArrayBufferView } from '../guards/isArrayBufferView';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsArrayBufferView(
    input: unknown,
    options?: ErrorMessage,
): asserts input is ArrayBufferView {
    if (!isArrayBufferView(input)) {
        throw new TypeError(options?.message);
    }
}
