import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isInteger = createTypeGuard<number>(
    (value) => typeof value === 'number' && Number.isInteger(value),
);
