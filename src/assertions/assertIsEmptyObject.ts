import { isEmptyObject } from '../guards/isEmptyObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsEmptyObject =
    createTypeAssertion<Record<string, never>>(isEmptyObject);
