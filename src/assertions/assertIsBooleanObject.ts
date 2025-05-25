import type { ErrorMessage } from '../types';
import { isBooleanObject } from '../guards/isBooleanObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBooleanObject(
    input: unknown,
    options?: ErrorMessage,
): asserts input is boolean {
    if (!isBooleanObject(input)) {
        throw new TypeError(
            options?.message ?? 'Input is not a Boolean object',
        );
    }
}
