import {
    isAsyncGeneratorFunction,
    TypedAsyncGeneratorFunction,
} from '../guards/isAsyncGeneratorFunction';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncGeneratorFunction<
    Y = unknown,
    R = unknown,
    N = unknown,
>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is TypedAsyncGeneratorFunction<Y, R, N> {
    if (!isAsyncGeneratorFunction(input)) {
        throw new TypeError(options?.message);
    }
}
