import { createTypeAssertion, createTypeGuard, ValueValidator } from '../src';

// Used for testing type guards and assertions
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
        const mock = vi.fn((value: unknown) => !!value);
        const typeGuard = createTypeGuard<CustomClass, ValueValidator>(
            (value, { valueValidator }: ValueValidator) =>
                valueValidator(value),
            {
                valueValidator: mock,
            },
        );
        expect(typeGuard(true)).toBeTruthy();
        expect(mock).toHaveBeenCalledWith(true);
    });
});

describe('createTypeAssertion', () => {
    it('creates a type-assertion with the supplied guard', () => {
        const customTypeAssertion =
            createTypeAssertion<CustomClass>(customTypeGuard);
        expect(() => {
            customTypeAssertion(new CustomClass());
        }).not.toThrow();
        expect(() => {
            customTypeAssertion([]);
        }).toThrow();
    });
});
