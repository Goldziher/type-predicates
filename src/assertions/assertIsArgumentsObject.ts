import { isArgumentsObject } from '../guards/isArgumentsObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsArgumentsObject =
    createTypeAssertion<IArguments>(isArgumentsObject);
