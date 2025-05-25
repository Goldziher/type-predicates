import { createTypeGuard, toObjectString } from '../utils';

/**
 * @remarks
 * This guard works only in ES2018 and above
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as (...args: unknown[]) => unknown
 * isFunction(() => null);
 *
 * // false - use isAsyncFunction for async functions
 * isFunction(async () => Promise.resolve(null));
 *
 * // false - use isGeneratorFunction for generator functions
 * isFunction(function* () {});
 *
 * // false - use isAsyncGeneratorFunction for async generator functions
 * isFunction(async function* () {});
 *
 * // false - use isConstructor for class constructors
 * isFunction(MyClass);
 *
 * // Type assertion can be used for specific function types
 * const specificFn = (x: number): string => x.toString();
 * if (isFunction(specificFn)) {
 *     // specificFn is now typed as (...args: unknown[]) => unknown
 *     // Use type assertion if needed: (specificFn as (x: number) => string)(42);
 * }
 * ```
 */
export function isFunction(
    input: unknown,
): input is (...args: unknown[]) => unknown {
    return createTypeGuard<(...args: unknown[]) => unknown>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object Function]',
    )(input);
}
