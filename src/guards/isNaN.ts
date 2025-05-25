import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isNaN = createTypeGuard<number>(
    (value) => typeof value === 'number' && Number.isNaN(value),
);
