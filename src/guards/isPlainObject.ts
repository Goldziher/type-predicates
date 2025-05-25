import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isPlainObject = createTypeGuard<Record<string, unknown>>(
    (value) => {
        if (typeof value !== 'object' || value === null) {
            return false;
        }

        // Check if it's a plain object (not a class instance)
        const proto = Object.getPrototypeOf(value);
        return (
            proto === null ||
            proto === Object.prototype ||
            Object.getPrototypeOf(proto) === null
        );
    },
);
