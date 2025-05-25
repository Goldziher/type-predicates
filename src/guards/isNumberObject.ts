import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isNumberObject(new Number(1));
 *
 * // false
 * isNumberObject(1);
 * ```
 */
export const isNumberObject = createTypeGuard<number>(
    (value) =>
        isObject(value) &&
        toObjectString(value) === '[object Number]' &&
        typeof value.valueOf() === 'number',
);
