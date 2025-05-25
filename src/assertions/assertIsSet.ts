import { isSet } from '../guards/isSet';
import { ErrorMessage, ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as Set<any>
 * assertIsSet(new Set(['xyz']));
 *
 * // doesn't throw, value is typed as Set<string>
 * assertIsSet<string>(new Set(['xyz']), { valueValidator: isString });
 * ```
 *
 * @throws TypeError
 */
export function assertIsSet(input: unknown): asserts input is Set<any>;
export function assertIsSet(
    input: unknown,
    options: ErrorMessage,
): asserts input is Set<any>;
export function assertIsSet<T>(
    input: unknown,
    options: ValueValidator,
): asserts input is Set<T>;
export function assertIsSet<T>(
    input: unknown,
    options?: Partial<ErrorMessage & ValueValidator>,
): asserts input is Set<T> {
    createTypeAssertion<
        Set<T>,
        Partial<ErrorMessage & ValueValidator> | undefined
    >(isSet)(input, options);
}
