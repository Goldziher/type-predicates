import { isFinite } from '../guards/isFinite';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsFinite = createTypeAssertion<number>(isFinite);
