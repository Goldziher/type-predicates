import { isPlainObject } from '../guards/isPlainObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsPlainObject =
    createTypeAssertion<Record<string, unknown>>(isPlainObject);
