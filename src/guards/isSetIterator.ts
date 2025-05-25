import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isSetIterator = createTypeGuard<IterableIterator<unknown>>(
    (value) =>
        typeof value === 'object' &&
        value !== null &&
        Object.prototype.toString.call(value) === '[object Set Iterator]',
);
