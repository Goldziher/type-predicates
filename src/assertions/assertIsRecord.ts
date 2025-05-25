import { isRecord } from '../guards/isRecord';
import { ErrorMessage, KeyValidator, ValueValidator } from '../types';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Record<string | symbol, unknown>
 * assertIsRecord({ key1: 'aaa', key2: 123 });
 *
 * // does not throw, value is typed as Record<string, string | number>
 * assertIsRecord<string, string | number>(
 *     { key1: 'aaa', key2: 123 },
 *     {
 *         keyValidator: isString,
 *         valueValidator: isUnion(isString, isNumber),
 *     },
 * );
 * ```
 *
 * @throws TypeError
 */
export function assertIsRecord(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Record<string | symbol, unknown>;
export function assertIsRecord<K extends string | symbol>(
    input: unknown,
    options: (ErrorMessage & KeyValidator) | KeyValidator,
): asserts input is Record<K, unknown>;
export function assertIsRecord<V>(
    input: unknown,
    options: (ErrorMessage & ValueValidator) | ValueValidator,
): asserts input is Record<string, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options:
        | (ErrorMessage & KeyValidator & ValueValidator)
        | (KeyValidator & ValueValidator),
): asserts input is Record<K, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options?: Partial<ErrorMessage & KeyValidator & ValueValidator>,
): asserts input is Record<K, V> {
    if (!isRecord(input)) {
        throw new TypeError(options?.message);
    }

    if (options?.keyValidator) {
        const keys = Object.keys(input);
        if (!keys.every(options.keyValidator)) {
            throw new TypeError(options.message);
        }
    }

    if (options?.valueValidator) {
        const values = Object.values(input);
        if (!values.every(options.valueValidator)) {
            throw new TypeError(options.message);
        }
    }
}
