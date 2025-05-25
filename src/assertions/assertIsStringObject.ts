import { isStringObject } from '../guards/isStringObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsStringObject = createTypeAssertion<string>(isStringObject);
