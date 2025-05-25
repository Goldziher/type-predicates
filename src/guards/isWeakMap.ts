import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/** @category Type Guard */
export function isWeakMap<K extends object, V = unknown>(
    input: unknown,
): input is WeakMap<K, V> {
    return createTypeGuard<WeakMap<K, V>>(
        (value) =>
            value instanceof WeakMap ||
            (isObject(value) && toObjectString(value) === '[object WeakMap]'),
    )(input);
}
