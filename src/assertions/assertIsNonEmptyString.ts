import { isNonEmptyString } from '../guards/isNonEmptyString';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNonEmptyString =
    createTypeAssertion<string>(isNonEmptyString);
