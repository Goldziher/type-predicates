import { isNaN } from '../guards/isNaN';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNaN = createTypeAssertion<number>(isNaN);
