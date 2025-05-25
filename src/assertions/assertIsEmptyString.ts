import { isEmptyString } from '../guards/isEmptyString';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsEmptyString = createTypeAssertion<''>(isEmptyString);
