import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isMapIterator = createTypeGuard<
    IterableIterator<[unknown, unknown]>
>(
    (value) =>
        typeof value === 'object' &&
        value !== null &&
        Object.prototype.toString.call(value) === '[object Map Iterator]',
);
