import { ValueValidator } from '../types';
import { createTypeGuard } from '../utils';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as unknown[]
 * isArray(['xyz']);
 *
 * // true, typed as string[]
 * isArray<string>(['xyz'], { valueValidator: isString });
 * ```
 */
export function isArray(input: unknown): input is unknown[];
export function isArray<T>(
    input: unknown,
    options: ValueValidator,
): input is T[];
export function isArray<T>(
    input: unknown,
    options?: ValueValidator,
): input is T[] {
    return createTypeGuard<T[], undefined | ValueValidator>(
        (value) =>
            Array.isArray(value) &&
            (!options?.valueValidator || value.every(options.valueValidator)),
    )(input);
}
