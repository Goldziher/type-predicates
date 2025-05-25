import { isBooleanObject } from '../guards/isBooleanObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBooleanObject =
    createTypeAssertion<boolean>(isBooleanObject);
