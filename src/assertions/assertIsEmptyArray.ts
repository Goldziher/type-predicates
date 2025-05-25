import { isEmptyArray } from '../guards/isEmptyArray';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsEmptyArray = createTypeAssertion<[]>(isEmptyArray);
