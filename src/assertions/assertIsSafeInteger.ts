import { isSafeInteger } from '../guards/isSafeInteger';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSafeInteger = createTypeAssertion<number>(isSafeInteger);
