import { isNumberObject } from '../guards/isNumberObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsNumberObject(new Number(1));
 *
 * // throws
 * assertIsNumberObject(1);
 * ```
 *
 * @throws TypeError
 */
export const assertIsNumberObject = createTypeAssertion<number>(isNumberObject);
