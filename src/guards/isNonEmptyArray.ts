import { isArray } from './isArray';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isNonEmptyArray = createTypeGuard<[unknown, ...unknown[]]>(
    (value) => isArray(value) && value.length > 0,
);
