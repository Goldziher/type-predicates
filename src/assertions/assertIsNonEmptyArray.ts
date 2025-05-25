import { isNonEmptyArray } from '../guards/isNonEmptyArray';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNonEmptyArray =
    createTypeAssertion<[unknown, ...unknown[]]>(isNonEmptyArray);
