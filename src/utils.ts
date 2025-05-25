import { TypeGuard, TypeGuardOptions, TypeValidator } from './types';

/*
 * @internal
 * */
export const toObjectString = (value: unknown): string =>
    Object.prototype.toString.call(value);

/**
 * @category Utility
 * @example
 *
 * ```typescript
 * // myTypeGuard === (input: unknown, { throwError: boolean }) => input is MyClass
 * const myTypeGuard = createTypeGuard<MyClass>(
 *     (value) => isObject(value) && Reflect.get(value, 'myProp'),
 *     MyClass.name,
 * );
 * ```
 */
export function createTypeGuard<
    T,
    O extends TypeGuardOptions | undefined = undefined,
>(validator: TypeValidator, options?: O): TypeGuard<T, O> {
    return options
        ? (input: unknown): input is T => validator(input, options)
        : (input: unknown): input is T => validator(input);
}

/**
 * @category Utility
 * @example
 *
 * ```typescript
 * // unionTypeGuard === <T>(input: unknown, ...args: unknown[]) => input is T
 * const unionTypeGuard = isUnion<string | number | symbol>(
 *     isString,
 *     isNumber,
 *     isSymbol,
 * );
 * ```
 */
export function isUnion<T>(...guards: TypeGuard<T>[]): TypeGuard<T> {
    return function (input: unknown, ...args: unknown[]): input is T {
        for (const guard of guards) {
            if (guard(input, ...args)) {
                return true;
            }
        }
        return false;
    };
}
