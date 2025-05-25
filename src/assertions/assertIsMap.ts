import { isMap } from '../guards/isMap';
import { ErrorMessage, KeyValidator, ValueValidator } from '../types';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Map<unknown, unknown>
 * assertIsMap(new Map([['xyz', 'abc']]));
 *
 * // does not throw, value is typed as Map<string, string | number>
 * assertIsMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     {
 *         keyValidator: isString,
 *         valueValidator: isUnion(isString, isNumber),
 *     },
 * );
 * ```
 *
 * @throws TypeError
 */
export function assertIsMap(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Map<unknown, unknown>;

export function assertIsMap<K>(
    input: unknown,
    options: (ErrorMessage & KeyValidator) | KeyValidator,
): asserts input is Map<K, unknown>;

export function assertIsMap<V>(
    input: unknown,
    options: (ErrorMessage & ValueValidator) | ValueValidator,
): asserts input is Map<string, V>;

export function assertIsMap<K, V>(
    input: unknown,
    options:
        | (ErrorMessage & KeyValidator & ValueValidator)
        | (KeyValidator & ValueValidator),
): asserts input is Map<K, V>;

export function assertIsMap<K, V>(
    input: unknown,
    options?: Partial<ErrorMessage & KeyValidator & ValueValidator>,
): asserts input is Map<K, V> {
    if (!isMap(input)) {
        throw new TypeError(options?.message);
    }

    if (options?.keyValidator) {
        const keys = [...input.keys()];
        if (!keys.every(options.keyValidator)) {
            throw new TypeError(
                options.message,
            );
        }
    }

    if (options?.valueValidator) {
        const values = [...input.values()];
        if (!values.every(options.valueValidator)) {
            throw new TypeError(
                options.message,
            );
        }
    }
}
