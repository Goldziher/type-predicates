import { isArray } from './isArray';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isEmptyArray = createTypeGuard<[]>(
    (value) => isArray(value) && value.length === 0,
);
