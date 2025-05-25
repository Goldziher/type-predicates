import { isBigIntObject } from '../guards/isBigIntObject';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBigIntObject = createTypeAssertion<bigint>(isBigIntObject);
