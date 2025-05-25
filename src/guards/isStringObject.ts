import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isStringObject(new String('xyz'));
 *
 * // false
 * isStringObject('xyz');
 * ```
 */
export const isStringObject = createTypeGuard<string>(
    (value) =>
        isObject(value) &&
        toObjectString(value) === '[object String]' &&
        typeof value.valueOf() === 'string',
);
