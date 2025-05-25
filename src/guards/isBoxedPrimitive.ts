import { isBooleanObject } from './isBooleanObject';
import { isNumberObject } from './isNumberObject';
import { isStringObject } from './isStringObject';
import { isBigIntObject } from './isBigIntObject';
import { isSymbolObject } from './isSymbolObject';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isBoxedPrimitive = createTypeGuard<
    bigint | boolean | number | string | symbol
>(
    (value) =>
        isBooleanObject(value) ||
        isNumberObject(value) ||
        isStringObject(value) ||
        isBigIntObject(value) ||
        isSymbolObject(value),
);
