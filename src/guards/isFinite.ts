import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isFinite = createTypeGuard<number>(
    (value) => typeof value === 'number' && Number.isFinite(value),
);
