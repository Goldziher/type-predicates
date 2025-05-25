import { isString } from '../guards/isString';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsString(
    input: unknown,
    options?: ErrorMessage,
): asserts input is string {
    if (!isString(input)) {
        throw new TypeError(options?.message);
    }
}
