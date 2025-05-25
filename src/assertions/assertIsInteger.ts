import { isInteger } from '../guards/isInteger';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsInteger = createTypeAssertion<number>(isInteger);
