import { isString } from './isString';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isEmptyString = createTypeGuard<''>(
    (value) => isString(value) && value.length === 0,
);
