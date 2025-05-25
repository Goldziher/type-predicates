import type { ErrorMessage } from '../types';
import { isArgumentsObject } from '../guards/isArgumentsObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsArgumentsObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is IArguments {
    if (!isArgumentsObject(input)) {
        throw new TypeError(options?.message);
    }
}
