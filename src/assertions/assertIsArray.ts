import { isArray } from '../guards/isArray';
import { ErrorMessage, ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as any[]
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
export function assertIsArray(input: unknown): asserts input is any[];
export function assertIsArray(
    input: unknown,
    options?: ErrorMessage,
): asserts input is any[];
export function assertIsArray<T>(
    input: unknown,
    options: ValueValidator,
): asserts input is T[];
export function assertIsArray<T>(
    input: unknown,
    options: ErrorMessage & ValueValidator,
): asserts input is T[];
export function assertIsArray<T>(
    input: unknown,
    options?: Partial<ErrorMessage & ValueValidator>,
): asserts input is T[] {
    createTypeAssertion<
        T[],
        Partial<ErrorMessage & ValueValidator> | undefined
    >(isArray)(input, options);
}
