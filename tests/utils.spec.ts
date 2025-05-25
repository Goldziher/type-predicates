import { createTypeGuard, isUnion } from '../src';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CustomClass {}
const customTypeGuard = createTypeGuard<CustomClass>(
    (value) => value instanceof CustomClass,
);

describe('createTypeGuard', () => {
    it('creates a type-guard', () => {
        expect(customTypeGuard(new CustomClass())).toBeTruthy();
    });
    it('creates a type-guard with options', () => {
        const mock = vi.fn(
            (value: unknown): value is CustomClass =>
                value instanceof CustomClass,
        );
        const options = { valueValidator: mock };
        const typeGuard = createTypeGuard<
            CustomClass,
            { valueValidator: (value: unknown) => value is CustomClass }
        >((value, opts) => {
            if (!(value instanceof CustomClass)) {
                return false;
            }
            // @ts-ignore - optional property access
            if (opts?.valueValidator) {
                return opts.valueValidator(value);
            }
            return true;
        }, options);
        const testValue = new CustomClass();
        expect(typeGuard(testValue)).toBe(true);
        expect(mock).toHaveBeenCalledWith(testValue);
    });
});

describe('isUnion', () => {
    it('creates a union type guard', () => {
        const isString = (v: unknown): v is string => typeof v === 'string';

        const isNumber = (v: unknown): v is number => typeof v === 'number';

        const guard = isUnion<number | string>(isString, isNumber);

        expect(guard('test')).toBe(true);
        expect(guard(123)).toBe(true);
        expect(guard(true)).toBe(false);
    });
});
