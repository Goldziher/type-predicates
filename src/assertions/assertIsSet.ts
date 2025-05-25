import { isSet } from '../guards/isSet';
import { ErrorMessage, ValueValidator } from '../types';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as Set<unknown>
 * assertIsSet(new Set(['xyz']));
 *
 * // doesn't throw, value is typed as Set<string>
 * assertIsSet<string>(new Set(['xyz']), { valueValidator: isString });
 * ```
 *
 * @throws TypeError
 */
export function assertIsSet(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Set<unknown>;
export function assertIsSet<T>(
    input: unknown,
    options: (ErrorMessage & ValueValidator) | ValueValidator,
): asserts input is Set<T>;
export function assertIsSet<T>(
    input: unknown,
    options?: Partial<ErrorMessage & ValueValidator>,
): asserts input is Set<T> {
    if (!isSet(input)) {
        throw new TypeError(options?.message);
    }

    if (options?.valueValidator) {
        const values = [...input];
        if (!values.every(options.valueValidator)) {
            throw new TypeError(options.message);
        }
    }
}
