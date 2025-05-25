import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isSafeInteger = createTypeGuard<number>(
    (value) => typeof value === 'number' && Number.isSafeInteger(value),
);
