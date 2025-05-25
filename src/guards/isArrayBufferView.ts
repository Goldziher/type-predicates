import { isTypedArray } from './isTypedArray';
import { isDataView } from './isDataView';
import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isArrayBufferView = createTypeGuard<ArrayBufferView>(
    (value) => isTypedArray(value) || isDataView(value),
);
