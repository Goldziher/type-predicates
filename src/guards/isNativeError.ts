import { createTypeGuard } from '../utils';

/** @category Type Guard */
export const isNativeError = createTypeGuard<Error>(
    (value) =>
        value instanceof Error ||
        value instanceof EvalError ||
        value instanceof RangeError ||
        value instanceof ReferenceError ||
        value instanceof SyntaxError ||
        value instanceof TypeError ||
        value instanceof URIError ||
        (typeof AggregateError !== 'undefined' &&
            value instanceof AggregateError),
);
