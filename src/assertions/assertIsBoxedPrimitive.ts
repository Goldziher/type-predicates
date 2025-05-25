import type { ErrorMessage } from '../types';
import { isBoxedPrimitive } from '../guards/isBoxedPrimitive';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsBoxedPrimitive(
    input: unknown,
    options?: ErrorMessage,
): asserts input is bigint | boolean | number | string | symbol {
    if (!isBoxedPrimitive(input)) {
        throw new TypeError(
            options?.message ?? 'Input is not a boxed primitive',
        );
    }
}
