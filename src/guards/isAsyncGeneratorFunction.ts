import { createTypeGuard, toObjectString } from '../utils';

export type TypedAsyncGeneratorFunction<Y, R, N> = (
    ...args: unknown[]
) => AsyncGenerator<Y, R, N>;

/**
 * @remarks
 * This guard works only in ES2018 and above
 * @category Type Guard
 */
export function isAsyncGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createTypeGuard<TypedAsyncGeneratorFunction<Y, R, N>>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object AsyncGeneratorFunction]',
    )(input);
}
