import { isGenerator } from '../guards/isGenerator';
import { ErrorMessage } from '../types';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Generator<Y, R, N> {
    if (!isGenerator(input)) {
        throw new TypeError(options?.message);
    }
}
