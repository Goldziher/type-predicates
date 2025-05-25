import { ErrorMessage, ValueValidator } from '../types';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as unknown[]
 * assertIsArray(['xyz']);
 *
 * // doesn't throw, value is typed as string[]
 * assertIsArray<string>(['xyz'], { valueValidator: isString });
 *
 * // throws
 * assertIsArray<string>(['xyz', 1], { valueValidator: isString });
 * ```
 *
 * @throws TypeError
 */
export function assertIsArray(
    input: unknown,
    options?: ErrorMessage,
): asserts input is unknown[];

export function assertIsArray<T>(
    input: unknown,
    options: (ErrorMessage & ValueValidator) | ValueValidator,
): asserts input is T[];

export function assertIsArray<T>(
    input: unknown,
    options?: Partial<ErrorMessage & ValueValidator>,
): asserts input is T[] {
    if (!Array.isArray(input)) {
        throw new TypeError(options?.message);
    }

    if (options?.valueValidator && !input.every(options.valueValidator)) {
        throw new TypeError(options.message);
    }
}
