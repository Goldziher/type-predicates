import { isError } from '../guards/isError';
import { ErrorMessage } from '../types';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Error
 * assertIsError(new Error());
 *
 * // does not throw, value is typed as Error
 * // Use type assertion for specific error types
 * const error = new TypeError();
 * assertIsError(error);
 * const typeError = error as TypeError;
 *
 * // For custom errors, use type assertion after the check
 * class MyError extends Error {}
 * const myError = new MyError();
 * assertIsError(myError);
 * const typedError = myError as MyError;
 * ```
 *
 * @throws {TypeError} Will throw an error if the input is not an Error object
 */
export function assertIsError(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Error {
    if (!isError(input)) {
        throw new TypeError(options?.message);
    }
}
