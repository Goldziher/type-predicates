import { ValueValidator } from '../types';
import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as Set<unknown>
 * isSet(new Set(['xyz']));
 *
 * // true, value is typed as Set<string>
 * isSet<string>(new Set(['xyz']), { valueValidator: isString });
 * ```
 */
export function isSet(input: unknown): input is Set<unknown>;
export function isSet<T>(
    input: unknown,
    options: ValueValidator,
): input is Set<T>;
export function isSet<T>(
    input: unknown,
    options?: ValueValidator,
): input is Set<T> {
    return createTypeGuard<Set<T>, undefined | ValueValidator>((value) => {
        if (
            !isObject(value) ||
            (toObjectString(value) !== '[object Set]' &&
                !(value instanceof Set))
        ) {
            return false;
        }

        const set = value as Set<unknown>;

        if (options?.valueValidator) {
            for (const item of set) {
                if (!options.valueValidator(item)) {
                    return false;
                }
            }
        }

        return true;
    })(input);
}
