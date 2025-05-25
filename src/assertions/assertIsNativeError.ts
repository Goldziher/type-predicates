import { isNativeError } from '../guards/isNativeError';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNativeError = createTypeAssertion<Error>(isNativeError);
