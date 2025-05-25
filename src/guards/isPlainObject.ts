import { createTypeGuard } from '../utils';

// Helper function to safely get the prototype of an object
function safeGetPrototypeOf(obj: unknown): null | object {
    try {
        // Type assertion to ensure we're working with an object
        const objAsObject = obj as object;
        // Explicitly type the result of getPrototypeOf
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
        // Check for null or non-object types
        if (value === null || typeof value !== 'object') {
            return false;
        }

        // Get the prototype of the value
        const proto = safeGetPrototypeOf(value);

        // Handle null prototype objects
        if (proto === null) {
            return true;
        }

        // Handle objects with Object as prototype
        if (proto === Object.prototype) {
            return true;
        }

        // Handle objects with a prototype of an object with a null prototype
        // (e.g., Object.create(null, { a: { value: 1 } }))
        const prototypeOfProto = safeGetPrototypeOf(proto);
        return prototypeOfProto === null;
    },
);
