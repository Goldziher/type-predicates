import { isArrayBufferView } from '../guards/isArrayBufferView';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsArrayBufferView =
    createTypeAssertion<ArrayBufferView>(isArrayBufferView);
