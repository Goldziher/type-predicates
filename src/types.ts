export interface ErrorMessage {
    message: string | undefined;
}
export interface KeyValidator {
    keyValidator: TypeValidator;
}
export type TypeAssertion<
    T,
    O extends TypeAssertionOptions | undefined = undefined,
> = (input: unknown, options?: O) => asserts input is T;
export type TypeAssertionOptions = Partial<ErrorMessage> & TypeGuardOptions;
export type TypedArray =
    | BigInt64Array
    | BigUint64Array
    | Float32Array
    | Float64Array
    | Int16Array
    | Int32Array
    | Int8Array
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | Uint8ClampedArray;
export type TypedGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => Generator<Y, R, N>;
export type TypeGuard<T, O extends TypeGuardOptions | undefined = undefined> = (
    input: unknown,
    options?: O,
) => input is T;
export type TypeGuardOptions = Partial<KeyValidator & ValueValidator>;
export type TypeValidator = (input: unknown, ...args: any[]) => boolean;
export interface ValueValidator {
    valueValidator: TypeValidator;
}
