import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/** @category Type Guard */
export function isWeakSet<T extends object>(
    input: unknown,
): input is WeakSet<T> {
    return createTypeGuard<WeakSet<T>>(
        (value) =>
            value instanceof WeakSet ||
            (isObject(value) && toObjectString(value) === '[object WeakSet]'),
    )(input);
}
