import { AsyncFunction, isAsyncFunction } from '../guards/isAsyncFunction';
import { ErrorMessage } from '../types';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncFunction<T = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is AsyncFunction<T> {
    if (!isAsyncFunction(input)) {
        throw new TypeError(options?.message);
    }
}
