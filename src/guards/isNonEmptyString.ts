import { isString } from './isString';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isNonEmptyString = createTypeGuard<string>(
    (value) => isString(value) && value.length > 0,
);
