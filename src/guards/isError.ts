import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isError(new Error());
 *
 * // true, value is typed as Error
 * isError(new TypeError());
 *
 * // true, value is still typed as Error (use type assertion if needed)
 * const error = new TypeError();
 * if (isError(error)) {
 *     // error is now typed as Error
 * }
 *
 * // For custom errors, you can use type assertion
 * class MyCustomError extends Error {}
 * const customError = new MyCustomError();
 * if (isError(customError)) {
 *     // customError is typed as Error
 *     const myError = customError as MyCustomError;
 * }
 * ```
 */
export function isError(input: unknown): input is Error {
    return createTypeGuard<Error>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Error]' ||
                value instanceof Error),
    )(input);
}
