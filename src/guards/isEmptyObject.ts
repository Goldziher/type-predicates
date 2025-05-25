import { isObject } from './isObject';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isEmptyObject = createTypeGuard<Record<string, never>>(
    (value) => isObject(value) && Object.keys(value).length === 0,
);
