import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isBigIntObject = createTypeGuard<bigint>(
    (value) =>
        typeof value === 'object' &&
        value !== null &&
        Object.prototype.toString.call(value) === '[object BigInt]',
);
