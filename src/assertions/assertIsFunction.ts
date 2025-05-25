import { isFunction } from '../guards/isFunction';
import { ErrorMessage } from '../types';

/**
 * @remarks
 * This guard works only in ES2018 and above
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as (...args: unknown[]) => unknown
 * assertIsFunction(() => true);
 *
 * // Use type assertion for specific function types
 * const myFunc = (x: number): string => x.toString();
 * assertIsFunction(myFunc);
 * const typedFunc = myFunc as (x: number) => string;
 *
 * // throws - use isAsyncFunction for async functions
 * assertIsFunction(async () => Promise.resolve(null));
 *
 * // throws - use isGeneratorFunction for generator functions
 * assertIsFunction(function* () {});
 *
 * // throws - use isAsyncGeneratorFunction for async generator functions
 * assertIsFunction(async function* () {});
 *
 * // throws - use isConstructor for class constructors
 * assertIsFunction(MyClass);
 * ```
 *
 * @throws {TypeError} Will throw an error if the input is not a function
 */
export function assertIsFunction(
    input: unknown,
    options?: ErrorMessage,
): asserts input is (...args: unknown[]) => unknown {
    if (!isFunction(input)) {
        throw new TypeError(options?.message);
    }
}
