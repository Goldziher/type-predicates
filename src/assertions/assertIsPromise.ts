import { isPromise } from '../guards/isPromise';
import { ErrorMessage } from '../types';

/**
 * @remarks
 * Works with custom promises as well, e.g. AxiosPromise or BlueBird
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsPromise<T = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Promise<T> {
    if (!isPromise(input)) {
        throw new TypeError(options?.message);
    }
}
