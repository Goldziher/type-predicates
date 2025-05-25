import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBooleanObject(new Boolean(true));
 *
 * // false
 * isBooleanObject(true);
 * ```
 */
export const isBooleanObject = createTypeGuard<boolean>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object Boolean]' ||
            value instanceof Boolean),
);
