import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isSymbolObject = createTypeGuard<symbol>(
    (value) =>
        typeof value === 'object' &&
        value !== null &&
        Object.prototype.toString.call(value) === '[object Symbol]',
);
