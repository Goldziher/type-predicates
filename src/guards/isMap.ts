import { KeyValidator, ValueValidator } from '../types';
import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as Map<unknown, unknown>
 * isMap(new Map([['xyz', 'abc']]));
 *
 * // true, value is typed as Map<string, string | number>
 * isMap<string, string>(
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
 */
export function isMap(input: unknown): input is Map<unknown, unknown>;
export function isMap<K>(
    input: unknown,
    options: KeyValidator,
): input is Map<K, unknown>;
export function isMap<V>(
    input: unknown,
    options: ValueValidator,
): input is Map<unknown, V>;
export function isMap<K, V>(
    input: unknown,
    options: KeyValidator & ValueValidator,
): input is Map<K, V>;
export function isMap<K, V>(
    input: unknown,
    options?: Partial<KeyValidator & ValueValidator>,
): input is Map<K, V> {
    return createTypeGuard<
        Map<K, V>,
        Partial<KeyValidator & ValueValidator> | undefined
    >((value) => {
        if (
            !(value instanceof Map) &&
            (!isObject(value) || toObjectString(value) !== '[object Map]')
        ) {
            return false;
        }

        const map = value as Map<unknown, unknown>;

        if (options?.valueValidator) {
            for (const v of map.values()) {
                if (!options.valueValidator(v)) {
                    return false;
                }
            }
        }

        if (options?.keyValidator) {
            for (const k of map.keys()) {
                if (!options.keyValidator(k)) {
                    return false;
                }
            }
        }

        return true;
    })(input);
}
