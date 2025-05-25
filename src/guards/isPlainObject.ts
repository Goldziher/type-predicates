import { createTypeGuard } from '../utils';

function safeGetPrototypeOf(obj: unknown): null | object {
    try {
        const objAsObject = obj as object;

        const proto = Object.getPrototypeOf(objAsObject) as null | object;
        return proto;
    } catch {
        return null;
    }
}

/**
 * Checks if the value is a plain object (not a class instance)
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isPlainObject({});
 * isPlainObject({ a: 1 });
 * isPlainObject(Object.create(null));
 * isPlainObject(Object.create(Object.prototype));
 *
 * // false
 * isPlainObject(new Date());
 * isPlainObject([]);
 * isPlainObject(null);
 * isPlainObject(undefined);
 * ```
 */
export const isPlainObject = createTypeGuard<Record<string, unknown>>(
    (value: unknown): value is Record<string, unknown> => {
        if (value === null || typeof value !== 'object') {
            return false;
        }

        const proto = safeGetPrototypeOf(value);

        if (proto === null) {
            return true;
        }

        if (proto === Object.prototype) {
            return true;
        }

        const prototypeOfProto = safeGetPrototypeOf(proto);
        return prototypeOfProto === null;
    },
);
