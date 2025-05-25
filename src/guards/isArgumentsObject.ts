import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isArgumentsObject = createTypeGuard<IArguments>(
    (value) =>
        typeof value === 'object' &&
        value !== null &&
        Object.prototype.toString.call(value) === '[object Arguments]',
);
