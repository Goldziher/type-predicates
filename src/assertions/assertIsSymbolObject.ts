import { isSymbolObject } from '../guards/isSymbolObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSymbolObject = createTypeAssertion<symbol>(isSymbolObject);
